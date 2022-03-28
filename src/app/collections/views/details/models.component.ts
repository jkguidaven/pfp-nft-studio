import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin, map, Observable, take } from 'rxjs';
import {
  generateModelQueue,
  resetGeneratingQueue,
} from 'src/app/store/actions/model.action';
import { Collection } from 'src/app/store/models/collection';
import { Trait, TraitVariantListDictionary } from 'src/app/store/models/trait';
import { State as AppState } from 'src/app/store/reducers';
import { GeneratedModelQueue } from 'src/app/store/reducers/model.reducer';
import { selectCurrentCollection } from 'src/app/store/selectors/collection.selector';
import { selectGeneratedModelQueue } from 'src/app/store/selectors/model.selector';
import { selectTraitVariantListDictioniary } from 'src/app/store/selectors/trait-variant.selector';
import { selectTraits } from 'src/app/store/selectors/trait.selector';
import { GENERATOR_CANVAS } from 'src/app/store/services/model.service';
import { ConfirmClearModelDialogComponent } from '../../components/models/confirm-clear-model-dialog.component';
import { ConfirmGenerateModelDialogComponent } from '../../components/models/confirm-generate-model-dialog.component';
import { ConfirmRegenerateModelDialogComponent } from '../../components/models/confirm-regenerate-model-dialog.component';
import { ConfirmReshuffleModelDialogComponent } from '../../components/models/confirm-reshuffle-model-dialog.component';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
})
export class CollectionModelsViewComponent implements OnInit {
  collection$!: Observable<Collection | undefined>;
  traits$!: Observable<Trait[] | undefined>;
  traitVariantListDictionary$!: Observable<
    TraitVariantListDictionary | undefined
  >;
  queues$!: Observable<Record<number, GeneratedModelQueue> | undefined>;

  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageSize = this.pageSizeOptions[2];
  pageIndex = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.collection$ = this.store.select(selectCurrentCollection);
    this.traits$ = this.store.select(selectTraits);
    this.traitVariantListDictionary$ = this.store.select(
      selectTraitVariantListDictioniary
    );
    this.queues$ = this.store.select(selectGeneratedModelQueue);

    if (!this.document.getElementById(GENERATOR_CANVAS)) {
      const canvas = this.document.createElement('canvas');
      canvas.id = GENERATOR_CANVAS;
      canvas.style.position = 'absolute';
      canvas.style.left = '100000px';
      canvas.style.top = '-100000px';
      this.document.body.appendChild(canvas);
    }
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

  get length(): Observable<number> {
    return this.currentQueue$.pipe(
      map((queue) => (queue ? queue.models.length : 0))
    );
  }

  confirmGenerateModels(): void {
    forkJoin([
      this.collection$.pipe(take(1)),
      this.traits$.pipe(take(1)),
      this.traitVariantListDictionary$.pipe(take(1)),
    ]).subscribe(([collection, traits, traitVariantListDictionary]) => {
      let totalPossibleCombinations = 1;

      if (traits && traitVariantListDictionary) {
        for (let trait of traits) {
          if (trait.id)
            totalPossibleCombinations *=
              traitVariantListDictionary[trait.id].length +
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

  onPageChange({ pageIndex, pageSize }: any): void {
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
  }

  regenerate(): void {
    const dialogRef = this.dialog.open(ConfirmRegenerateModelDialogComponent, {
      width: '500px',
      panelClass: 'custom-mat-dialog-container',
    });

    dialogRef.afterClosed().subscribe(() => {
      // TO-DO
    });
  }

  reshuffle(): void {
    const dialogRef = this.dialog.open(ConfirmReshuffleModelDialogComponent, {
      width: '500px',
      panelClass: 'custom-mat-dialog-container',
    });

    dialogRef.afterClosed().subscribe(() => {
      // TO-DO
    });
  }

  reset(): void {
    const dialogRef = this.dialog.open(ConfirmClearModelDialogComponent, {
      width: '500px',
      panelClass: 'custom-mat-dialog-container',
    });

    dialogRef.afterClosed().subscribe(() => {
      // TO-DO
    });
  }

  openFilterForm(): void {
    // TO-DO
  }
}
