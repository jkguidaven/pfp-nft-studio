import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { Layer } from 'src/app/store/models/layer';

export interface EditLayerFormResult {
  type: 'save' | 'remove';
  data?: Layer;
}

@Component({
  selector: 'app-edit-layer-form',
  templateUrl: './edit-layer-form.component.html',
  styleUrls: ['./edit-layer-form.component.scss'],
})
export class EditLayerFormComponent implements OnInit {
  guaranteeValue!: number;
  hiddenValue!: boolean;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Layer,
    private dialogRef: MatDialogRef<EditLayerFormComponent>
  ) {}

  ngOnInit(): void {
    this.form.get('name')?.setValue(this.data.name);
    this.guaranteeValue = this.data.guarantee;
    this.hiddenValue = Boolean(this.data.hidden);
  }

  save(): void {
    this.dialogRef.close({
      type: 'save',
      data: {
        name: this.form.get('name')?.value,
        guarantee: this.guaranteeValue,
        hidden: this.hiddenValue,
      },
    });
  }

  changeGuaranteeValue(event: MatSliderChange) {
    this.guaranteeValue = event.value ?? 1;
  }

  changeHiddenValue(event: MatCheckboxChange) {
    this.hiddenValue = event.checked;
  }

  remove(): void {
    this.dialogRef.close({
      type: 'remove',
    });
  }

  close(): void {
    this.dialogRef.close(null);
  }
}
