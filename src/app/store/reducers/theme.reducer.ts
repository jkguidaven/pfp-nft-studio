import { createReducer, on } from '@ngrx/store';
import * as ThemeActions from '../actions/theme.action';

const LOCAL_STORAGE_DARK_MODE_KEY = 'dark_mode_theme_enabled';

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
