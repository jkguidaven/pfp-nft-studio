import { Component, NgZone, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fabric } from 'fabric';
import { Observable, take } from 'rxjs';
import { updateTraitVariant } from 'src/app/store/actions/trait-variant.action';
import { Collection } from 'src/app/store/models/collection';
import { Trait, TraitVariant } from 'src/app/store/models/trait';
import { State as AppState } from 'src/app/store/reducers';
import { selectCurrentCollection } from 'src/app/store/selectors/collection.selector';
import { selectActiveTraitVariants } from 'src/app/store/selectors/editor.selector';
import { selectTraits } from 'src/app/store/selectors/trait.selector';

@Component({
  selector: 'app-editor-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  canvas!: fabric.Canvas;
  public collection$!: Observable<Collection | undefined>;
  private traits$!: Observable<Trait[] | undefined>;
  private variants$!: Observable<TraitVariant[]>;
  private traitsOrdering: (number | undefined)[] | undefined;

  private images: Record<number, fabric.Image> = {};

  constructor(private zone: NgZone, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.collection$ = this.store.select(selectCurrentCollection);
    this.traits$ = this.store.select(selectTraits);
    this.variants$ = this.store.select(selectActiveTraitVariants);

    this.collection$.subscribe((collection) => {
      if (collection && !this.canvas) {
        this.zone.runOutsideAngular(() => {
          this.canvas = new fabric.Canvas('canvas', {
            width: collection?.width ?? 600,
            height: collection?.height ?? 600,
            backgroundColor: '#fff',
            selection: false,
            preserveObjectStacking: true,
          });

          this.canvas.on('object:modified', ($event) =>
            this.onCanvasObjectModified($event)
          );
        });

        this.variants$.subscribe((active) =>
          this.onActiveVariantChange(active)
        );
        this.traits$.subscribe((value) => {
          const traitsOrdering = value?.map(({ id }) => id);

          let shouldUpdate = false;

          if (traitsOrdering && this.traitsOrdering) {
            if (traitsOrdering.length !== this.traitsOrdering.length) {
              shouldUpdate = true;
            } else {
              for (let i = 0; i < traitsOrdering.length; i++) {
                if (traitsOrdering[i] !== this.traitsOrdering[i]) {
                  shouldUpdate = true;
                  break;
                }
              }
            }
          } else {
            shouldUpdate = true;
          }

          if (shouldUpdate) {
            this.traitsOrdering = traitsOrdering;
            this.variants$
              .pipe(take(1))
              .subscribe((active) => this.onActiveVariantChange(active));
          }
        });
      }
    });
  }

  onActiveVariantChange(selected: TraitVariant[]) {
    if (!this.traitsOrdering || this.traitsOrdering.length === 0) return;

    const traitsOrdering = this.traitsOrdering;

    const prevSelected: number[] = Object.keys(this.images).map((key) =>
      Number(key)
    );

    const toBeRemove = prevSelected.filter(
      (id) => !selected.find((variant) => variant.id === id)
    );

    const toBeAdded = selected.filter(({ id }) => {
      return id && !this.images[id];
    });

    for (let variant of toBeAdded) {
      if (variant.id) {
        const variantId = variant.id;
        if (!this.images[variantId] && variant.src) {
          fabric.Image.fromURL(
            variant.src,
            (image) => {
              this.images[variantId] = image;
              this.canvas.add(image);
            },
            {
              scaleX: variant.scaleX ?? 1,
              scaleY: variant.scaleY ?? 1,
              top: variant.top ?? 0,
              left: variant.left ?? 0,
              data: {
                id: variant.traitId,
              },
            }
          );
        }
      }
    }

    toBeRemove.forEach((id) => {
      this.canvas.remove(this.images[id]);
      delete this.images[id];
    });

    setTimeout(() => {
      for (let i = 0; i < this.canvas._objects.length; i++) {
        this.canvas._objects[i].data.zIndex = traitsOrdering.indexOf(
          this.canvas._objects[i].data.id
        );
      }

      this.canvas._objects.sort((a, b) => b.data.zIndex - a.data.zIndex);
      this.canvas.renderAll();
    }, 1);
  }

  onCanvasObjectModified(obj: any) {
    const key = Object.keys(this.images).find(
      (key) => obj.target === this.images[Number(key)]
    );

    this.variants$.pipe(take(1)).subscribe((variants) => {
      const toUpdate = variants.find(({ id }: any) => id === Number(key));
      if (toUpdate) {
        this.store.dispatch(
          updateTraitVariant({
            variant: {
              ...toUpdate,
              scaleX: obj.target.scaleX,
              scaleY: obj.target.scaleY,
              top: obj.target.top,
              left: obj.target.left,
            },
          })
        );
      }
    });
  }
}
