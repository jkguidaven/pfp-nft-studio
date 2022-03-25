import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { ModelService } from '../services/model.service';
import * as modelActions from '../actions/model.action';
import * as collectionActions from '../actions/collection.action';
import { delay, from, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { State as AppState } from '../reducers';
import { selectCurrentCollection } from '../selectors/collection.selector';
import { selectTraits } from '../selectors/trait.selector';
import { selectTraitVariants } from '../selectors/trait-variant.selector';
import { selectGeneratedModelQueue } from '../selectors/model.selector';
import { ModelsState } from '../reducers/model.reducer';

@Injectable()
export class ModelEffects {
  constructor(
    private actions$: Actions,
    private modelService: ModelService,
    private store: Store<AppState>
  ) {}

  createModelQueue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(collectionActions.addCollection),
      mergeMap(({ collection }) => {
        if (collection.id) {
          return this.modelService
            .addModelQueue(collection.id)
            .pipe(map(() => ({ type: 'noAcrtion' })));
        } else {
          return of({ type: 'noAction' });
        }
      })
    )
  );

  removeModelQueue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(collectionActions.removeCollection),
      mergeMap(({ id }) => {
        return this.modelService
          .removeModelQueue(id)
          .pipe(map(() => ({ type: 'noAcrtion' })));
      })
    )
  );

  generateModelQueue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(modelActions.generateModelQueue),
      concatLatestFrom(() => [
        this.store.select(selectCurrentCollection),
        this.store.select(selectTraits),
        this.store.select(selectTraitVariants),
      ]),
      mergeMap(([{ collectionId }, collection, traits, variantDictionary]) => {
        const models =
          collection && traits && variantDictionary
            ? this.modelService.generateModelCombinations(
                collection,
                traits,
                variantDictionary
              )
            : [];
        return of(
          modelActions.setGeneratingQueue({
            collectionId,
            models,
          })
        );
      })
    )
  );

  processCurrentModel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...[modelActions.setGeneratingQueue, modelActions.setNextModel]),
      withLatestFrom(this.store.select(selectGeneratedModelQueue)),
      mergeMap(([{ collectionId }, queues]: [any, ModelsState]) => {
        const queue = queues[collectionId];
        const hasNext = queue.models[queue.currentIndex];

        if (hasNext) {
          const model = queue.models[queue.currentIndex];
          return from(this.modelService.getModelImage(600, 600, model)).pipe(
            map((image) =>
              modelActions.setModelImage({
                collectionId,
                image,
                index: queue.currentIndex,
              })
            )
          );
        } else {
          return of({ type: 'noAction' });
        }
      })
    )
  );

  moveToNextModel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(modelActions.setModelImage),
      map(({ collectionId }) => modelActions.setNextModel({ collectionId }))
    )
  );
}
