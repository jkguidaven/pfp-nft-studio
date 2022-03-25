import { createSelector } from '@ngrx/store';
import { TraitVariantDictionary } from '../models/trait';
import { State } from '../reducers';
import { TraitVariantState } from '../reducers/trait-variant.reducer';

export const selectTraitVariantState = (state: State) =>
  state['traits-variant'];
export const selectTraitDictioniary = createSelector(
  selectTraitVariantState,
  (state: TraitVariantState) => state.traitDictionary
);
