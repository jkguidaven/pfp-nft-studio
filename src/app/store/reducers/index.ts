import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTheme from './theme.reducer';
import * as fromCollections from './collections.reducer';
import * as fromTraits from './traits.reducer';

export interface State {
  [fromTheme.themeFeatureKey]: fromTheme.ThemeState;
  [fromCollections.collectionsFeatureKey]: fromCollections.CollectionsState;
  [fromTraits.traitsFeatureKey]: fromTraits.TraitsState;
}

export const reducers: ActionReducerMap<State> = {
  [fromTheme.themeFeatureKey]: fromTheme.reducer,
  [fromCollections.collectionsFeatureKey]: fromCollections.reducer,
  [fromTraits.traitsFeatureKey]: fromTraits.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
