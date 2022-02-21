import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTheme from './theme.reducer';

export interface State {
  [fromTheme.themeFeatureKey]: fromTheme.ThemeState;
}

export const reducers: ActionReducerMap<State> = {
  [fromTheme.themeFeatureKey]: fromTheme.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
