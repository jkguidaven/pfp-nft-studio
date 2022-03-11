import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as editorActions from 'src/app/store/actions/editor.action';
import {
  triggerAddTraitVariants,
  triggerRemoveTraitVariant,
  updateTraitVariant,
} from 'src/app/store/actions/trait-variant.action';
import {
  triggerAddTrait,
  triggerMoveTrait,
  triggerRemoveTrait,
  updateTrait,
} from 'src/app/store/actions/trait.action';
import { Collection } from 'src/app/store/models/collection';
import {
  Trait,
  TraitVariant,
  TraitVariantDictionary,
} from 'src/app/store/models/trait';
import { State as AppState } from 'src/app/store/reducers';
import { selectCurrentCollection } from 'src/app/store/selectors/collection.selector';
import {
  selectEditorCollapsed,
  selectEditorSelected,
} from 'src/app/store/selectors/editor.selector';
import { selectTraitVariants } from 'src/app/store/selectors/trait-variant.selector';
import { selectTraits } from 'src/app/store/selectors/trait.selector';
import { fade, slide } from '../../animations';
import {
  EditTraitFormComponent,
  EditTraitFormResult,
} from '../forms/edit-trait-form.component';

@Component({
  selector: 'app-editor-side',
  templateUrl: './side.component.html',
  styleUrls: [],
  animations: [fade, slide],
})
export class SideComponent implements OnInit {
  @ViewChild('traitInputField') traitInputField!: ElementRef;
  traits$!: Observable<Trait[] | undefined>;
  collection$!: Observable<Collection | undefined>;
  traitVariantDictionary$!: Observable<TraitVariantDictionary | undefined>;
  editorCollapsed$!: Observable<Record<number, boolean> | undefined>;
  editorSelected$!: Observable<Record<number, number> | undefined>;

  adding!: boolean;

  newTraitName: string = '';

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.traits$ = this.store.select(selectTraits);
    this.collection$ = this.store.select(selectCurrentCollection);
    this.traitVariantDictionary$ = this.store.select(selectTraitVariants);
    this.editorCollapsed$ = this.store.select(selectEditorCollapsed);
    this.editorSelected$ = this.store.select(selectEditorSelected);
  }

  toggleAddTrait(): void {
    this.adding = !this.adding;

    if (this.adding) {
      setTimeout(() => this.traitInputField.nativeElement.select(), 10);
    } else {
      this.newTraitName = '';
    }
  }

  addNewTrait(): void {
    if (this.newTraitName) {
      this.store.dispatch(
        triggerAddTrait({
          trait: {
            name: this.newTraitName,
            guarantee: 100,
            hidden: false,
          },
        })
      );
    }

    this.toggleAddTrait();
  }

  openTraitForm(data: Trait): void {
    const dialogRef = this.dialog.open(EditTraitFormComponent, {
      panelClass: 'custom-mat-dialog-container',
      width: '500px',
      height: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe((result: EditTraitFormResult) => {
      if (result) {
        if (result.type === 'save' && result.data) {
          this.updateTrait({
            ...data,
            ...result.data,
          });
        } else if (result.type === 'remove' && data.id) {
          this.store.dispatch(
            triggerRemoveTrait({
              id: data.id,
            })
          );
        }
      }
    });
  }

  toggleCollapse(trait: Trait): void {
    if (trait.id) {
      this.store.dispatch(editorActions.toggleCollapse({ traitId: trait.id }));
    }
  }

  addNewVariant(traitId: number | undefined, src: string): void {
    if (traitId) {
      this.store.dispatch(
        triggerAddTraitVariants({
          variants: [
            {
              traitId,
              name: `New Variant`,
              src,
            },
          ],
        })
      );
    }
  }

  async addVariantsFromFileList(
    traitId: number | undefined,
    files: FileList
  ): Promise<void> {
    if (!traitId) return;

    const variants: TraitVariant[] = [];
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];

      if (file.type.startsWith('image/')) {
        variants.push({
          traitId,
          name: file.name,
          src: await this.getSrcFromFile(file),
        });
      }
    }

    if (variants.length) {
      this.store.dispatch(
        triggerAddTraitVariants({
          variants,
        })
      );
    }
  }

  private getSrcFromFile(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
    });
  }

  onVariantChange(variant: TraitVariant): void {
    this.store.dispatch(updateTraitVariant({ variant }));
  }

  onVariantSelected(trait: Trait, selectedVariant: number | undefined): void {
    if (trait.id && selectedVariant) {
      this.store.dispatch(
        editorActions.setSelectedTraitVariant({
          traitId: trait.id,
          variantId: selectedVariant,
        })
      );
    }
  }

  onDeleteVariant(variant: TraitVariant): void {
    this.store.dispatch(triggerRemoveTraitVariant({ variant }));
  }

  updateTrait(trait: Trait): void {
    this.store.dispatch(updateTrait({ trait }));
  }

  positionChange(event: CdkDragDrop<any[]>): void {
    this.store.dispatch(
      triggerMoveTrait({
        fromIndex: event.previousIndex,
        toIndex: event.currentIndex,
      })
    );
  }

  getTraitVariantList(trait: Trait): Observable<TraitVariant[]> {
    return this.traitVariantDictionary$.pipe(
      map((dictionary) => {
        return dictionary ? dictionary[`${trait.id}`] : [];
      })
    );
  }

  isTraitPanelCollapsed(trait: Trait): Observable<boolean> {
    return this.editorCollapsed$.pipe(
      map((collapsed) => (trait.id && collapsed ? collapsed[trait.id] : false))
    );
  }

  isVariantSelected(trait: Trait, variant: TraitVariant): Observable<boolean> {
    return this.editorSelected$.pipe(
      map((selected) =>
        trait.id && selected ? selected[trait.id] === variant.id : false
      )
    );
  }
}
