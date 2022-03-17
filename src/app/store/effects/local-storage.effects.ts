import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, mergeMap, of } from 'rxjs';
import * as ThemeActions from '../actions/theme.action';

const LOCAL_STORAGE_DARK_MODE_KEY = 'dark_mode_theme_enabled';

@Injectable()
export class LocalStorageEffects {
  constructor(private actions$: Actions) {}

  loadThemeMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThemeActions.loadThemeMode),
      mergeMap(() => {
        let darkMode =
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (localStorage.getItem(LOCAL_STORAGE_DARK_MODE_KEY)) {
          darkMode =
            localStorage.getItem(LOCAL_STORAGE_DARK_MODE_KEY) === 'true';
        }

        return of<any>(
          ThemeActions.setDarkMode({
            mode: darkMode,
          })
        );
      })
    )
  );

  updateThemeMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThemeActions.setDarkMode),
      mergeMap(({ mode }: any) => {
        if (mode) {
          localStorage.setItem(LOCAL_STORAGE_DARK_MODE_KEY, 'true');
        } else {
          localStorage.setItem(LOCAL_STORAGE_DARK_MODE_KEY, 'false');
        }

        // We do not need to do anything at this point
        return of<any>({ type: 'noAction' });
      })
    )
  );
}
