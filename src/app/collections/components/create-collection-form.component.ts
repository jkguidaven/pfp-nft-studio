import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-collection-form',
  templateUrl: './create-collection-form.component.html',
  styleUrls: ['./create-collection-form.component.scss'],
})
export class CreateCollectionFormComponent implements OnInit {
  coverPhoto!: string;

  constructor(private dialogRef: MatDialogRef<CreateCollectionFormComponent>) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
