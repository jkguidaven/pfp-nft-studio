import { Component, NgZone, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fabric } from 'fabric';
import { Observable, take } from 'rxjs';
import { updateTraitVariant } from 'src/app/store/actions/trait-variant.action';
import { TraitVariant } from 'src/app/store/models/trait';
import { State as AppState } from 'src/app/store/reducers';
import { selectActiveTraitVariants } from 'src/app/store/selectors/editor.selector';

@Component({
  selector: 'app-editor-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  private canvas!: fabric.Canvas;
  private variants$!: Observable<any>;

  private images: Record<number, fabric.Image> = {};

  constructor(private zone: NgZone, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.variants$ = this.store.select(selectActiveTraitVariants);

    this.zone.runOutsideAngular(() => {
      this.canvas = new fabric.Canvas('canvas', {
        backgroundColor: '#fff',
        selection: false,
        preserveObjectStacking: true,
      });

      this.canvas.on('object:modified', ($event) =>
        this.onCanvasObjectModified($event)
      );
    });

    this.variants$.subscribe((active) => this.onActiveVariantChange(active));
  }

  onActiveVariantChange(selected: TraitVariant[]) {
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
            }
          );
        }
      }
    }

    toBeRemove.forEach((id) => {
      this.canvas.remove(this.images[id]);
      delete this.images[id];
    });
  }

  onCanvasObjectModified(obj: any) {
    const key = Object.keys(this.images).find(
      (key) => obj.target === this.images[Number(key)]
    );

    this.variants$.pipe(take(1)).subscribe((variants) => {
      const toUpdate = variants.find(({ id }: any) => id === Number(key));
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
    });
  }
}
