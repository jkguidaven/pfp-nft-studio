import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Collection } from 'src/app/store/models/collection';

@Component({
  selector: 'app-create-collection-form',
  templateUrl: './create-collection-form.component.html',
  styleUrls: [],
})
export class CreateCollectionFormComponent implements OnInit {
  coverPhoto!: string;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    width: new FormControl(1024, [Validators.required]),
    height: new FormControl(1024, [Validators.required]),
    supply: new FormControl(10000),
    royalty: new FormControl(5),
    mintPricePresale: new FormControl(0.5),
    mintPricePublic: new FormControl(1),
    maxMintPresale: new FormControl(2),
    maxMintPublic: new FormControl(10),
    maxMintPerWallet: new FormControl(15),
  });

  constructor(private dialogRef: MatDialogRef<CreateCollectionFormComponent>) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close(null);
  }

  create() {
    const collection: Collection = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      width: this.form.get('width')?.value,
      height: this.form.get('height')?.value,
      supply: this.form.get('supply')?.value,
      royalty: this.form.get('royalty')?.value,
      mintPrice: {
        presale: this.form.get('mintPricePresale')?.value,
        public: this.form.get('mintPricePublic')?.value,
      },
      maxMint: {
        presale: this.form.get('maxMintPresale')?.value,
        public: this.form.get('maxMintPublic')?.value,
      },
      coverPhoto: this.coverPhoto,
      traitsOrdering: [],
    };

    this.dialogRef.close(collection);
  }
}
