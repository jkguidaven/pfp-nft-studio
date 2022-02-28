import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import * as collectionsActions from '../actions/collections.action';
import { Collection } from '../models/collection';
import { CollectionsService } from '../services/collections.service';

@Injectable()
export class CollectionsEffect {
  constructor(
    private action$: Actions,
    private collectionsService: CollectionsService
  ) {}

  loadCollections$ = createEffect(() =>
    this.action$.pipe(
      ofType(collectionsActions.triggerLoadCollections),
      mergeMap(() =>
        this.collectionsService.getAll(1000).pipe(
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
          this.collectionsService.add(collection).pipe(
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
        this.collectionsService.remove(id).pipe(
          map(() => {
            return collectionsActions.removeCollection({ id });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
