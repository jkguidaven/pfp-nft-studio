import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { TraitState } from '../reducers/trait.reducer';

export const selectTraitState = (state: State) => state.traits;
export const selectTraits = createSelector(
  selectTraitState,
  (state: TraitState) => state.traits
);
