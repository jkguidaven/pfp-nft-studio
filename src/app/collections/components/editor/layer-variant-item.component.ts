import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayerVariant } from 'src/app/store/models/layer';

@Component({
  selector: 'app-layer-variant-item',
  templateUrl: './layer-variant-item.component.html',
  styleUrls: ['./layer-variant-item.component.scss'],
})
export class LayerVariantItemComponent implements OnInit {
  @Input() variant!: LayerVariant;
  @Output() variantChange: EventEmitter<LayerVariant> =
    new EventEmitter<LayerVariant>();

  constructor() {}

  ngOnInit(): void {}
}
