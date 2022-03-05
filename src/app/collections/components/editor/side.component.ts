import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Layer } from 'src/app/store/models/layer';
import { fade, slide } from '../../animations';
import {
  EditLayerFormComponent,
  EditLayerFormResult,
} from '../forms/edit-layer-form.component';

@Component({
  selector: 'app-editor-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
  animations: [fade, slide],
})
export class SideComponent implements OnInit {
  @ViewChild('layerInputField') layerInputField!: ElementRef;
  layers: Layer[] = [];

  adding!: boolean;

  layerName: string = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  toggleAddLayer(): void {
    this.adding = !this.adding;

    if (this.adding) {
      setTimeout(() => this.layerInputField.nativeElement.select(), 10);
    } else {
      this.layerName = '';
    }
  }

  addNewLayer(): void {
    if (this.layerName) {
      this.layers.unshift({
        name: this.layerName,
        expand: false,
        guarantee: 100,
        hidden: false,
      });
    }

    this.toggleAddLayer();
  }

  openLayerForm(data: Layer, index: number): void {
    const dialogRef = this.dialog.open(EditLayerFormComponent, {
      panelClass: 'custom-mat-dialog-container',
      width: '500px',
      height: '500px',
      data,
    });

    dialogRef.afterClosed().subscribe((result: EditLayerFormResult) => {
      if (result) {
        if (result.type === 'save' && result.data) {
          this.layers[index] = {
            ...this.layers[index],
            ...result.data,
          };
        } else if (result.type === 'remove') {
          this.layers.splice(index, 1);
        }
      }
    });
  }

  positionChange(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.layers, event.previousIndex, event.currentIndex);
  }
}
