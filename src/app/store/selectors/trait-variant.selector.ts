import { createSelector } from '@ngrx/store';
import { TraitVariantDictionary } from '../models/trait';
import { State } from '../reducers';

export const selectTraitVariantState = (state: State) =>
  state['traits-variant'];
export const selectTraitVariants = createSelector(
  selectTraitVariantState,
  (state: TraitVariantDictionary) => state
);
