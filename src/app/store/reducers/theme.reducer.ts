import { createReducer, on } from '@ngrx/store';
import * as ThemeActions from '../actions/theme.action';

export const themeFeatureKey = 'theme';

export interface ThemeState {
  darkMode: boolean;
}

export const initialState: ThemeState = {
  darkMode: false,
};

export const reducer = createReducer(
  initialState,
  on(ThemeActions.setDarkMode, (state, { mode }) => ({
    ...state,
    darkMode: mode,
  }))
);
