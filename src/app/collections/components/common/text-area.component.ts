import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class TextAreaComponent implements OnInit {
  @Input() label!: string;
  @Input() fullWidth!: boolean;
  @Input() rows!: number;
  @Input() cols!: number;

  @Input() controlName!: string;

  constructor() {}

  ngOnInit(): void {}
}
