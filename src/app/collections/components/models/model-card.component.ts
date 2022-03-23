import { Component, Input, OnInit } from '@angular/core';
import { Model } from 'src/app/store/models/model';

@Component({
  selector: 'app-model-card',
  templateUrl: './model-card.component.html',
  styleUrls: ['./model-card.component.scss'],
})
export class ModelCardComponent implements OnInit {
  @Input() model!: Model;

  constructor() {}

  ngOnInit(): void {}
}
