import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { triggerAddTraitVariants } from 'src/app/store/actions/trait-variant.action';
import {
  removeTraitVariant,
  selectTraitVariant,
  triggerAddTrait,
  triggerMoveTrait,
  triggerRemoveTrait,
  triggerUpdateTrait,
  updateTraitVariant,
} from 'src/app/store/actions/trait.action';
import { Collection } from 'src/app/store/models/collection';
import {
  Trait,
  TraitVariant,
  TraitVariantDictionary,
} from 'src/app/store/models/trait';
import { State as AppState } from 'src/app/store/reducers';
import { selectCurrentCollection } from 'src/app/store/selectors/collection.selector';
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

  adding!: boolean;

  newTraitName: string = '';

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.traits$ = this.store.select(selectTraits);
    this.collection$ = this.store.select(selectCurrentCollection);
    this.traitVariantDictionary$ = this.store.select(selectTraitVariants);
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
            expand: true,
            guarantee: 100,
            hidden: false,
          },
        })
      );
    }

    this.toggleAddTrait();
  }

  openTraitForm(data: Trait, index: number): void {
    const dialogRef = this.dialog.open(EditTraitFormComponent, {
      panelClass: 'custom-mat-dialog-container',
      width: '500px',
      height: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe((result: EditTraitFormResult) => {
      if (result) {
        if (result.type === 'save' && result.data) {
          this.updateTrait(index, {
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

  toggleExpandTraitDetails(index: number, trait: Trait): void {
    this.updateTrait(index, {
      ...trait,
      expand: !trait.expand,
    });
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

  onVariantChange(
    traitIndex: number,
    variant: TraitVariant,
    variantIndex: number
  ): void {
    this.store.dispatch(
      updateTraitVariant({
        traitIndex,
        variantIndex,
        variant,
      })
    );
  }

  onVariantSelected(traitIndex: number, variantIndex: number): void {
    this.store.dispatch(selectTraitVariant({ traitIndex, variantIndex }));
  }

  onDeleteVariant(traitIndex: number, variantIndex: number): void {
    this.store.dispatch(removeTraitVariant({ traitIndex, variantIndex }));
  }

  updateTrait(index: number, trait: Trait): void {
    this.store.dispatch(
      triggerUpdateTrait({
        trait,
      })
    );
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
}
