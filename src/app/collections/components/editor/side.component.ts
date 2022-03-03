import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { fade, slide } from '../../animations';

export interface Layer {
  name: string;
  expand?: boolean;
}

@Component({
  selector: 'app-editor-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
  animations: [fade, slide],
})
export class SideComponent implements OnInit {
  layers: Layer[] = [];

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
      this.layers.unshift({
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
