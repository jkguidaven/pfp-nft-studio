import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-trait-variant-button',
  templateUrl: './add-trait-variant-button.component.html',
  styleUrls: [],
})
export class AddTraitVariantButtonComponent implements OnInit {
  @Output() add: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onPhotoSelected($event: any) {
    const file: File = $event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.add.emit(reader.result as string);
      };
    }
  }
}
