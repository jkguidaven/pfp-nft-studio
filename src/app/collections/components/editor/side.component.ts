import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addTrait,
  moveTrait,
  removeTrait,
  updateTrait,
} from 'src/app/store/actions/trait.action';
import { Collection } from 'src/app/store/models/collection';
import { Trait, TraitVariant } from 'src/app/store/models/trait';
import { State as AppState } from 'src/app/store/reducers';
import { selectCurrentCollection } from 'src/app/store/selectors/collection.selector';
import { selectTraits } from 'src/app/store/selectors/trait.selector';
import { fade, slide } from '../../animations';
import {
  EditTraitFormComponent,
  EditTraitFormResult,
} from '../forms/edit-trait-form.component';

@Component({
  selector: 'app-editor-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
  animations: [fade, slide],
})
export class SideComponent implements OnInit {
  @ViewChild('traitInputField') traitInputField!: ElementRef;
  traits$!: Observable<Trait[] | undefined>;
  collection$!: Observable<Collection | undefined>;

  adding!: boolean;

  newTraitName: string = '';

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.traits$ = this.store.select(selectTraits);
    this.collection$ = this.store.select(selectCurrentCollection);
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
        addTrait({
          trait: {
            name: this.newTraitName,
            expand: false,
            guarantee: 100,
            hidden: false,
            variants: [],
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
        } else if (result.type === 'remove') {
          this.store.dispatch(
            removeTrait({
              index,
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

  addNewVariant(index: number, trait: Trait): void {
    this.updateTrait(index, {
      ...trait,
      variants: [
        ...trait.variants,
        {
          name: `Variant ${trait.variants.length + 1}`,
        },
      ],
    });
  }

  async addVariantFromFileList(
    index: number,
    trait: Trait,
    files: FileList
  ): Promise<void> {
    const variants: TraitVariant[] = [];
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];

      if (file.type.startsWith('image/')) {
        variants.push({
          name: file.name,
          src: await this.getSrcFromFile(file),
        });
      }
    }

    this.updateTrait(index, {
      ...trait,
      variants: [...trait.variants, ...variants],
    });
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

  updateTrait(index: number, trait: Trait): void {
    this.store.dispatch(
      updateTrait({
        index,
        trait,
      })
    );
  }

  onVariantChange(variant: TraitVariant, trait: Trait, index: number): void {
    trait.variants[index] = {
      ...trait.variants[index],
      ...variant,
    };
  }

  positionChange(event: CdkDragDrop<any[]>): void {
    this.store.dispatch(
      moveTrait({
        fromIndex: event.previousIndex,
        toIndex: event.currentIndex,
      })
    );
  }
}
