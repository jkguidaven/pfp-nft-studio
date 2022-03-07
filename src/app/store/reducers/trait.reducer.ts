import { createReducer, on } from '@ngrx/store';
import { Trait } from '../models/trait';
import * as TraitActions from '../actions/trait.action';

export const traitFeatureKey = 'traits';

export interface TraitState {
  traits?: Trait[];
  error?: string;
}

export const initialState: TraitState = {
  traits: undefined,
};

export const reducer = createReducer(
  initialState,

  on(TraitActions.loadTraits, (state, { traits }) => ({
    ...state,
    traits,
  }))
);
