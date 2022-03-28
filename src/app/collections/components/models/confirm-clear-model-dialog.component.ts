import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-clear-model-dialog',
  templateUrl: './confirm-clear-model-dialog.component.html',
  styleUrls: ['./confirm-clear-model-dialog.component.scss'],
})
export class ConfirmClearModelDialogComponent implements AfterViewInit {
  @ViewChild('confirmButton') confirmButton!: MatButton;
  constructor(
    private dialogRef: MatDialogRef<ConfirmClearModelDialogComponent>
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
