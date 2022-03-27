import { createReducer, on } from '@ngrx/store';
import * as PreferenceActions from '../actions/preference.action';

export const PreferenceFeatureKey = 'preference';

export interface PreferenceState {
  darkMode: boolean;
  collectionHeaderExpanded: boolean;
}

export const initialState: PreferenceState = {
  darkMode: false,
  collectionHeaderExpanded: true,
};

export const reducer = createReducer(
  initialState,
  on(PreferenceActions.setDarkMode, (state, { mode }) => ({
    ...state,
    darkMode: mode,
  })),

  on(PreferenceActions.setCollectionHeaderLayoutMode, (state, { expand }) => ({
    ...state,
    collectionHeaderExpanded: expand,
  }))
);
