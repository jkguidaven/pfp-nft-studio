import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('layerInputField') layerInputField!: ElementRef;
  layers: Layer[] = [];

  adding!: boolean;

  layerName: string = '';

  constructor() {}

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
      for (let i = 0; i < 100; i++)
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
