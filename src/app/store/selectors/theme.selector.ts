import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { ThemeState } from '../reducers/theme.reducer';

export const selectTheme = (state: State) => state.theme;

export const selectThemeDarkMode = createSelector(
  selectTheme,
  (state: ThemeState) => state.darkMode
);
