import { createReducer, on } from '@ngrx/store';
import { Trait } from '../models/trait';
import * as TraitsActions from '../actions/traits.action';

export const traitsFeatureKey = 'traits';

export interface TraitsState {
  traits?: Trait[];
  error?: string;
}

export const initialState: TraitsState = {
  traits: undefined,
};

export const reducer = createReducer(
  initialState,

  on(TraitsActions.loadTraits, (state, { traits }) => ({
    ...state,
    traits,
  }))
);
