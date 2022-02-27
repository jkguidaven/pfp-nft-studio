import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() fullWidth!: boolean;
  @Input() max!: number;
  @Input() min!: number;

  constructor() {}

  ngOnInit(): void {}
}
