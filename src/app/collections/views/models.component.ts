import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin, map, Observable, take } from 'rxjs';
import {
  generateModelQueue,
  resetGeneratingQueue,
} from 'src/app/store/actions/model.action';
import { Collection } from 'src/app/store/models/collection';
import { Trait, TraitVariantDictionary } from 'src/app/store/models/trait';
import { State as AppState } from 'src/app/store/reducers';
import { GeneratedModelQueue } from 'src/app/store/reducers/model.reducer';
import { selectCurrentCollection } from 'src/app/store/selectors/collection.selector';
import { selectGeneratedModelQueue } from 'src/app/store/selectors/model.selector';
import { selectTraitVariants } from 'src/app/store/selectors/trait-variant.selector';
import { selectTraits } from 'src/app/store/selectors/trait.selector';
import { ConfirmGenerateModelDialogComponent } from '../components/models/confirm-generate-model-dialog.component';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
})
export class CollectionModelsViewComponent implements OnInit {
  collection$!: Observable<Collection | undefined>;
  traits$!: Observable<Trait[] | undefined>;
  traitVariantDictionary$!: Observable<TraitVariantDictionary | undefined>;
  queues$!: Observable<Record<number, GeneratedModelQueue> | undefined>;

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
    this.queues$ = this.store.select(selectGeneratedModelQueue);
  }

  gotToEditor(): void {
    const id = this.activatedRoute.snapshot.parent?.params['id'];

    if (id) {
      this.router.navigate(['/collections', id, 'editor']);
    }
  }

  get currentQueue$(): Observable<GeneratedModelQueue | undefined> {
    return forkJoin([
      this.collection$.pipe(take(1)),
      this.queues$.pipe(take(1)),
    ]).pipe(
      map(([collection, queues]) =>
        collection && collection.id && queues
          ? queues[collection.id]
          : undefined
      )
    );
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
        const collectionId = collection?.id;
        if (confirmed && collectionId) {
          this.store.dispatch(resetGeneratingQueue({ collectionId }));
          this.store.dispatch(generateModelQueue({ collectionId }));
        }
      });
    });
  }
}
