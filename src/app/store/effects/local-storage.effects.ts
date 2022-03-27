import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, of, switchMap } from 'rxjs';
import * as PreferenceActions from '../actions/preference.action';

const LOCAL_STORAGE_DARK_MODE_KEY = 'dark_mode_theme_enabled';
const LOCAL_STORAGE_COLLECTION_HEADER_EXPAND_KEY =
  'collection_header_expand_mode_enabled';

@Injectable()
export class LocalStorageEffects {
  constructor(private actions$: Actions) {}

  loadPreference$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.loadPreference),
      switchMap(() => [
        PreferenceActions.loadThemeColorMode(),
        PreferenceActions.loadCollectionHeaderLayoutMode(),
      ])
    )
  );

  loadThemeColorMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.loadThemeColorMode),
      mergeMap(() => {
        let darkMode =
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (localStorage.getItem(LOCAL_STORAGE_DARK_MODE_KEY)) {
          darkMode =
            localStorage.getItem(LOCAL_STORAGE_DARK_MODE_KEY) === 'true';
        }

        return of<any>(
          PreferenceActions.setDarkMode({
            mode: darkMode,
          })
        );
      })
    )
  );

  loadCollectionHeaderLayoutMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.loadCollectionHeaderLayoutMode),
      mergeMap(() => {
        let expand = true;

        if (localStorage.getItem(LOCAL_STORAGE_COLLECTION_HEADER_EXPAND_KEY)) {
          expand =
            localStorage.getItem(LOCAL_STORAGE_COLLECTION_HEADER_EXPAND_KEY) ===
            'true';
        }

        return of<any>(
          PreferenceActions.setCollectionHeaderLayoutMode({
            expand,
          })
        );
      })
    )
  );

  updateThemeDarkMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.setDarkMode),
      mergeMap(({ mode }: any) => {
        localStorage.setItem(LOCAL_STORAGE_DARK_MODE_KEY, mode);

        // We do not need to do anything at this point
        return of<any>({ type: 'noAction' });
      })
    )
  );

  updateCollectionHeaderPreference$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PreferenceActions.setCollectionHeaderLayoutMode),
      mergeMap(({ expand }: any) => {
        localStorage.setItem(
          LOCAL_STORAGE_COLLECTION_HEADER_EXPAND_KEY,
          expand
        );

        // We do not need to do anything at this point
        return of<any>({ type: 'noAction' });
      })
    )
  );
}
