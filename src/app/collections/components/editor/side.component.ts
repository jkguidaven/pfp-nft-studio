import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

export interface Layer {
  name: string;
  expand?: boolean;
}

@Component({
  selector: 'app-editor-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
})
export class SideComponent implements OnInit {
  layers: Layer[] = [
    {
      name: 'Head',
      expand: false,
    },
    {
      name: 'Mouth',
      expand: false,
    },
    {
      name: 'Ears',
      expand: false,
    },
  ];

  adding!: boolean;

  layerName: string = '';

  constructor() {}

  ngOnInit(): void {}

  toggleAddLayer(): void {
    this.adding = !this.adding;

    if (!this.adding) {
      this.layerName = '';
    }
  }

  addNewLayer(): void {
    if (this.layerName) {
      this.layers.push({
        name: this.layerName,
        expand: false,
      });
    }

    this.toggleAddLayer();
  }

  positionChange(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.layers, event.previousIndex, event.currentIndex);
  }
}
