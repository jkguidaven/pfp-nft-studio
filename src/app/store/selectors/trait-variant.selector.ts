import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { TraitVariantState } from '../reducers/trait-variant.reducer';

export const selectTraitVariantState = (state: State) =>
  state['traits-variant'];
export const selectTraitVariantListDictioniary = createSelector(
  selectTraitVariantState,
  (state: TraitVariantState) => state.traitVariantListDictionary
);
