import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { TraitVariantDictionary } from '../models/trait';
import { ModelService } from '../services/model.service';
import * as modelActions from '../actions/model.action';
import { delay, mergeMap, of, queue, withLatestFrom } from 'rxjs';
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
        const hasNext = queue.currentIndex < queue.models.length;

        return hasNext
          ? of(modelActions.setNextModel({ collectionId })).pipe(delay(1000))
          : of({ type: 'noAction' });
      })
    )
  );
}
