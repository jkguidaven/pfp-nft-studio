import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTheme from './theme.reducer';
import * as fromCollections from './collections.reducer';

export interface State {
  [fromTheme.themeFeatureKey]: fromTheme.ThemeState;
  [fromCollections.collectionsFeatureKey]: fromCollections.CollectionsState;
}

export const reducers: ActionReducerMap<State> = {
  [fromTheme.themeFeatureKey]: fromTheme.reducer,
  [fromCollections.collectionsFeatureKey]: fromCollections.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
