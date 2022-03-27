import { createAction, props } from '@ngrx/store';

export const setDarkMode = createAction(
  '[Preference] Set dark mode.',
  props<{ mode: boolean }>()
);

export const setCollectionHeaderLayoutMode = createAction(
  '[Preference] Set collection header layout mode.',
  props<{ expand: boolean }>()
);

export const loadPreference = createAction('[Preference] Load preference');

export const loadThemeColorMode = createAction(
  '[Preference] Load color theme mode'
);

export const loadCollectionHeaderLayoutMode = createAction(
  '[Preference] collection header layout mode'
);
