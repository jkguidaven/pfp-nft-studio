import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import * as traitActions from '../actions/trait.action';
import { Collection } from '../models/collection';
import { Trait } from '../models/trait';
import { State as AppState } from '../reducers';
import { selectCurrentCollection } from '../selectors/collection.selector';
import { selectTraits } from '../selectors/trait.selector';
import { CollectionService } from '../services/collection.service';
import { TraitService } from '../services/trait.service';

@Injectable()
export class TraitEffects {
  constructor(
    private actions$: Actions,
    private collectionService: CollectionService,
    private traitService: TraitService,
    private store: Store<AppState>
  ) {}

  loadTraits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(traitActions.triggerLoadTraits),
      mergeMap(
        ({ collectionId }: { collectionId: number }) =>
          this.collectionService.get(collectionId).pipe(
            mergeMap((collection: Collection | undefined) => {
              return this.traitService.getAll(collection?.id ?? 0).pipe(
                map((traits: Trait[]) => {
                  const orderedTraits: Trait[] = collection
                    ? collection?.traitsOrdering.reduce((ordered, id) => {
                        const found = traits.find(
                          (trait: Trait) => trait.id === id
                        );

                        if (found) ordered.push(found);

                        return ordered;
                      }, [] as Trait[])
                    : [];

                  return traitActions.loadTraits({
                    traits: orderedTraits,
                  });
                })
              );
            }),
            catchError(() => EMPTY)
          )
        // this.traitService.getAll(collection.id).pipe(
        //   map((traits: Trait[]) => {
        //     const sortedTraits = collection.traitsOrdering.map((id: number) =>
        //       traits.find((trait: Trait) => trait.id === id)
        //     );
        //     return traitActions.loadTraits({ traits: sortedTraits });
        //   }),
        //   catchError(() => EMPTY)
        // )
      )
    )
  );

  addTrait$ = createEffect(() =>
    this.actions$.pipe(
      ofType(traitActions.triggerAddTrait),
      withLatestFrom(this.store.select(selectCurrentCollection)),
      mergeMap(([{ trait }, collection]: any[]) =>
        this.traitService.add({ ...trait, collectionId: collection.id }).pipe(
          map((traitWithID: Trait) => {
            return traitActions.addTrait({ trait: traitWithID });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  removeTrait$ = createEffect(() =>
    this.actions$.pipe(
      ofType(traitActions.triggerRemoveTrait),
      mergeMap(({ id }: { id: number }) =>
        this.traitService.remove(id).pipe(
          map(() => {
            return traitActions.removeTrait({ id });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateTrait$ = createEffect(() =>
    this.actions$.pipe(
      ofType(traitActions.triggerUpdateTrait),
      mergeMap(({ trait }: { trait: Trait }) =>
        this.traitService.update(trait).pipe(
          map(() => {
            return traitActions.updateTrait({ trait });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  moveTrait$ = createEffect(() =>
    this.actions$.pipe(
      ofType(traitActions.triggerMoveTrait),
      map(({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) =>
        traitActions.moveTrait({ fromIndex, toIndex })
      )
    )
  );

  changeTrait$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ...[
          traitActions.addTrait,
          traitActions.removeTrait,
          traitActions.moveTrait,
        ]
      ),
      concatLatestFrom(() => [
        this.store.select(selectCurrentCollection),
        this.store.select(selectTraits),
      ]),
      mergeMap(([, collection, traits]: any[]) =>
        this.collectionService
          .update({
            ...collection,
            traitsOrdering: traits.map(({ id }: Trait) => id),
          })
          .pipe(
            map(
              () => ({
                type: 'noAction',
              }),
              catchError(() => EMPTY)
            )
          )
      )
    )
  );

  // persistTrait$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(traitActions.persistTraits),
  //     concatLatestFrom(() => [
  //       this.store.select(selectCurrentCollection),
  //       this.store.select(selectTraits),
  //     ]),
  //     mergeMap(([, collection, traits]: any[]) => {
  //       return this.traitService.update(collection.id, traits).pipe(
  //         map(() => ({
  //           type: 'noAction',
  //         })),
  //         catchError((err) => {
  //           console.log(err);
  //           return EMPTY;
  //         })
  //       );
  //     })
  //   )
  // );
}
