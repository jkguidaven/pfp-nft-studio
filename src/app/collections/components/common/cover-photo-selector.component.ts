import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cover-photo-selector',
  templateUrl: './cover-photo-selector.component.html',
  styleUrls: ['./cover-photo-selector.component.scss'],
})
export class CoverPhotoSelectorComponent implements OnInit {
  @Input() model!: string | undefined;
  @Output() modelChange: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onCoverPhotoSelected($event: any) {
    const file: File = $event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.modelChange.emit(reader.result as string);
      };
    }
  }
}
