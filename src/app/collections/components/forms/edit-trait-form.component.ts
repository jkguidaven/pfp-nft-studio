import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { Trait } from 'src/app/store/models/trait';

export interface EditTraitFormResult {
  type: 'save' | 'remove';
  data?: Trait;
}

@Component({
  selector: 'app-edit-trait-form',
  templateUrl: './edit-trait-form.component.html',
  styleUrls: ['./edit-trait-form.component.scss'],
})
export class EditTraitFormComponent implements OnInit {
  guaranteeValue!: number;
  hiddenValue!: boolean;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Trait,
    private dialogRef: MatDialogRef<EditTraitFormComponent>
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
