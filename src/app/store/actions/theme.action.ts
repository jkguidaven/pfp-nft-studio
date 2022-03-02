import { createAction, props } from '@ngrx/store';

export const setDarkMode = createAction(
  '[Theme] Set dark mode.',
  props<{ mode: boolean }>()
);

export const loadThemeMode = createAction('[Theme] Load theme mode');