import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-inline-input-field',
  templateUrl: './inline-input-field.component.html',
  styleUrls: [],
})
export class InlineInputFieldComponent implements OnInit {
  @Input() value!: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  editting!: boolean;

  @ViewChild('inputField') inputField!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('dblclick')
  onEdit(): void {
    this.editting = true;

    setTimeout(() => {
      if (this.inputField.nativeElement) {
        const input: HTMLInputElement = this.inputField.nativeElement;
        input.select();
      }
    }, 10);
  }

  onEnter(): void {
    if (this.inputField.nativeElement) {
      const input: HTMLInputElement = this.inputField.nativeElement;
      this.valueChange.emit(input.value);
    }

    this.onExitEdit();
  }

  onExitEdit(): void {
    this.editting = false;
  }

  changeValue($event: Event): void {
    const input: HTMLInputElement = $event.target as HTMLInputElement;

    if (input.value) {
      this.valueChange.emit(input.value);
    }
  }
}
