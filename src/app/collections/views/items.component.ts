import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, take } from 'rxjs';
import { Collection } from 'src/app/store/models/collection';
import { Trait, TraitVariantDictionary } from 'src/app/store/models/trait';
import { State as AppState } from 'src/app/store/reducers';
import { selectCurrentCollection } from 'src/app/store/selectors/collection.selector';
import { selectTraitVariants } from 'src/app/store/selectors/trait-variant.selector';
import { selectTraits } from 'src/app/store/selectors/trait.selector';
import { ConfirmGenerateModelDialogComponent } from '../components/items/confirm-generate-model-dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class CollectionItemsViewComponent implements OnInit {
  collection$!: Observable<Collection | undefined>;
  traits$!: Observable<Trait[] | undefined>;
  traitVariantDictionary$!: Observable<TraitVariantDictionary | undefined>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.collection$ = this.store.select(selectCurrentCollection);
    this.traits$ = this.store.select(selectTraits);
    this.traitVariantDictionary$ = this.store.select(selectTraitVariants);
  }

  gotToEditor(): void {
    const id = this.activatedRoute.snapshot.parent?.params['id'];

    if (id) {
      this.router.navigate(['/collections', id, 'editor']);
    }
  }

  confirmGenerateModels(): void {
    forkJoin([
      this.collection$.pipe(take(1)),
      this.traits$.pipe(take(1)),
      this.traitVariantDictionary$.pipe(take(1)),
    ]).subscribe(([collection, traits, traitVariantDictionary]) => {
      let totalPossibleCombinations = 1;

      if (traits && traitVariantDictionary) {
        for (let trait of traits) {
          if (trait.id)
            totalPossibleCombinations *=
              traitVariantDictionary[trait.id].length +
              (trait.guarantee < 100 ? 1 : 0);
        }
      }

      const maxSupply = collection?.supply ?? 0;

      const dialogRef = this.dialog.open(ConfirmGenerateModelDialogComponent, {
        width: '500px',
        panelClass: 'custom-mat-dialog-container',
        data:
          maxSupply < totalPossibleCombinations
            ? maxSupply
            : totalPossibleCombinations,
      });

      dialogRef.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          // TO-DO begin generating
        }
      });
    });
  }
}
