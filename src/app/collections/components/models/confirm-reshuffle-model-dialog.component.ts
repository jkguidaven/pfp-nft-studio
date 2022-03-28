import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-reshuffle-model-dialog',
  templateUrl: './confirm-reshuffle-model-dialog.component.html',
  styleUrls: ['./confirm-reshuffle-model-dialog.component.scss'],
})
export class ConfirmReshuffleModelDialogComponent implements AfterViewInit {
  @ViewChild('confirmButton') confirmButton!: MatButton;
  constructor(
    private dialogRef: MatDialogRef<ConfirmReshuffleModelDialogComponent>
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
