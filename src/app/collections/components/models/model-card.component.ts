import { Component, Input, OnInit } from '@angular/core';
import { Model } from 'src/app/store/models/model';

@Component({
  selector: 'app-model-card',
  templateUrl: './model-card.component.html',
  styleUrls: ['./model-card.component.scss'],
})
export class ModelCardComponent implements OnInit {
  @Input() processing!: boolean;
  @Input() model!: Model;

  constructor() {}

  ngOnInit(): void {}

  get icon(): string {
    return this.processing ? 'refresh-cw' : 'alert-circle';
  }

  get imageUrl(): string {
    return `url(${this.model.image})`;
  }
}
