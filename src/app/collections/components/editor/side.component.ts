import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Trait, TraitVariant } from 'src/app/store/models/trait';
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
  traits: Trait[] = [
    {
      name: 'Head',
      guarantee: 100,
      expand: true,
      variants: [],
    },
  ];

  adding!: boolean;

  newTraitName: string = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

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
      this.traits.unshift({
        name: this.newTraitName,
        expand: false,
        guarantee: 100,
        hidden: false,
        variants: [],
      });
    }

    this.toggleAddTrait();
  }

  openTraitForm(data: Trait, index: number): void {
    const dialogRef = this.dialog.open(EditTraitFormComponent, {
      panelClass: 'custom-mat-dialog-container',
      width: '500px',
      height: '500px',
      data,
    });

    dialogRef.afterClosed().subscribe((result: EditTraitFormResult) => {
      if (result) {
        if (result.type === 'save' && result.data) {
          this.traits[index] = {
            ...this.traits[index],
            ...result.data,
          };
        } else if (result.type === 'remove') {
          this.traits.splice(index, 1);
        }
      }
    });
  }

  addNewVariant(trait: Trait): void {
    trait.variants.push({
      name: `Variant ${trait.variants.length + 1}`,
    });
  }

  onVariantChange(variant: TraitVariant, trait: Trait, index: number): void {
    trait.variants[index] = {
      ...trait.variants[index],
      ...variant,
    };
  }

  positionChange(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.traits, event.previousIndex, event.currentIndex);
  }

  addVariantFromFileList(trait: Trait, files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          trait.variants.push({
            name: file.name,
            src: reader.result as string,
          });
        };
      }
    }
  }
}
