import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TraitVariant } from 'src/app/store/models/trait';

@Component({
  selector: 'app-trait-variant-item',
  templateUrl: './trait-variant-item.component.html',
  styleUrls: ['./trait-variant-item.component.scss'],
})
export class TraitVariantItemComponent implements OnInit {
  @Input() variant!: TraitVariant;
  @Output() variantChange: EventEmitter<TraitVariant> =
    new EventEmitter<TraitVariant>();

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
