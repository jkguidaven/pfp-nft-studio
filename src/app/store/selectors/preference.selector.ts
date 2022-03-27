import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { PreferenceState } from '../reducers/preference.reducer';

export const selectPreferenceState = (state: State) => state.preference;

export const selectThemeIsDarkMode = createSelector(
  selectPreferenceState,
  (state: PreferenceState) => state.darkMode
);

export const selectCollectionHeaderIsExpandedMode = createSelector(
  selectPreferenceState,
  (state: PreferenceState) => state.collectionHeaderExpanded
);
