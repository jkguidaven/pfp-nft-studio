import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Model } from 'src/app/store/models/model';
import { Trait, TraitVariant } from 'src/app/store/models/trait';

@Component({
  selector: 'app-model-viewer-dialog',
  templateUrl: './model-viewer-dialog.component.html',
  styleUrls: ['./model-viewer-dialog.component.scss'],
})
export class ModelViewerDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { model: Model; traits: Trait[] },
    private dialogRef: MatDialogRef<ModelViewerDialogComponent>
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

  get attributes(): TraitVariant[] {
    return this.data.model.layers.map((layer) => layer.variant);
  }

  getAttributeName(variant: TraitVariant): string {
    const trait = this.data.traits.find(
      (comp: Trait) => comp.id === variant.traitId
    );

    return trait?.name ?? '';
  }
}
