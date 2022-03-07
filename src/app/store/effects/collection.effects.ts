import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import * as collectionsActions from '../actions/collection.action';
import { Collection } from '../models/collection';
import { CollectionService } from '../services/collection.service';

@Injectable()
export class CollectionEffects {
  constructor(
    private action$: Actions,
    private collectionService: CollectionService
  ) {}

  loadCollections$ = createEffect(() =>
    this.action$.pipe(
      ofType(collectionsActions.triggerLoadCollections),
      mergeMap(() =>
        this.collectionService.getAll(1000).pipe(
          map((collections: Collection[]) =>
            collectionsActions.loadCollections({ collections })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addCollection$ = createEffect(() =>
    this.action$.pipe(
      ofType(collectionsActions.triggerAddCollection),
      mergeMap(
        ({
          collection,
          successCallback,
        }: {
          collection: Collection;
          successCallback?: (collection: Collection) => void;
        }) =>
          this.collectionService.add(collection).pipe(
            map((collectionWithID: Collection) => {
              if (successCallback) {
                successCallback(collectionWithID);
              }

              return collectionsActions.addCollection({
                collection: collectionWithID,
              });
            }),
            catchError(() => EMPTY)
          )
      )
    )
  );

  removeCollection$ = createEffect(() =>
    this.action$.pipe(
      ofType(collectionsActions.triggerRemoveCollection),
      mergeMap(({ id }: { id: number }) =>
        this.collectionService.remove(id).pipe(
          map(() => {
            return collectionsActions.removeCollection({ id });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
