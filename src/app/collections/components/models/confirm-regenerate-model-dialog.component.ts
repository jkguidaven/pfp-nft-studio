import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-regenerate-model-dialog',
  templateUrl: './confirm-regenerate-model-dialog.component.html',
  styleUrls: ['./confirm-regenerate-model-dialog.component.scss'],
})
export class ConfirmRegenerateModelDialogComponent implements AfterViewInit {
  @ViewChild('confirmButton') confirmButton!: MatButton;
  constructor(
    private dialogRef: MatDialogRef<ConfirmRegenerateModelDialogComponent>
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
