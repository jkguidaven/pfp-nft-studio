import {
  Component,
  ElementRef,
  Inject,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-generate-model-dialog',
  templateUrl: './confirm-generate-model-dialog.component.html',
  styleUrls: ['./confirm-generate-model-dialog.component.scss'],
})
export class ConfirmGenerateModelDialogComponent implements AfterViewInit {
  @ViewChild('confirmButton') confirmButton!: MatButton;
  constructor(
    @Inject(MAT_DIALOG_DATA) public totalSupply: number,
    private dialogRef: MatDialogRef<ConfirmGenerateModelDialogComponent>
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.confirmButton.focus(), 200);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close();
  }
}
