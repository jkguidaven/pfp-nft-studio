import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TraitVariant } from 'src/app/store/models/trait';

@Component({
  selector: 'app-trait-variant-item',
  templateUrl: './trait-variant-item.component.html',
  styleUrls: [],
})
export class TraitVariantItemComponent implements OnInit {
  @Input() variant!: TraitVariant;
  @Input() selected!: boolean;
  @Output() variantChange: EventEmitter<TraitVariant> =
    new EventEmitter<TraitVariant>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() select: EventEmitter<void> = new EventEmitter<void>();

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

  get name(): string {
    return this.variant.name;
  }

  set name(value: string) {
    this.variantChange.emit({
      ...this.variant,
      name: value,
    });
  }
}
