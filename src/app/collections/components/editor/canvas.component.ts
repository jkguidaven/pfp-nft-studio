import { Component, NgZone, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fabric } from 'fabric';
import { State as AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-editor-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  private canvas!: fabric.Canvas;

  constructor(private zone: NgZone, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.canvas = new fabric.Canvas('canvas', {
        backgroundColor: '#fff',
        selection: false,
        preserveObjectStacking: true,
      });
    });
  }
}
