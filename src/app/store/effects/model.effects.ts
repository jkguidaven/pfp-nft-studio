import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { TraitVariantDictionary } from '../models/trait';
import { ModelService } from '../services/model.service';
import * as modelActions from '../actions/model.action';
import { mergeMap, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { State as AppState } from '../reducers';
import { selectCurrentCollection } from '../selectors/collection.selector';
import { selectTraits } from '../selectors/trait.selector';
import { selectTraitVariants } from '../selectors/trait-variant.selector';

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
        const maxSupply = collection?.supply ?? 0;
        const models =
          traits && variantDictionary
            ? this.modelService.generateModelCombinations(
                traits,
                variantDictionary,
                maxSupply
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
}
