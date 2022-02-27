import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class InputFieldComponent implements OnInit {
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() fullWidth!: boolean;
  @Input() max!: number;
  @Input() min!: number;

  @Input() controlName!: string;

  constructor() {}

  ngOnInit(): void {}
}
