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

  onPhotoSelected($event: any) {
    const file: File = $event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.variantChange.emit({
          ...this.variant,
          src: reader.result as string,
        });
      };
    }
  }

  backgroundImageURL(): string {
    return `url(${this.variant.src})`;
  }
}
