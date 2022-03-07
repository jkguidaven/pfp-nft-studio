import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTheme from './theme.reducer';
import * as fromCollection from './collection.reducer';
import * as fromTraits from './traits.reducer';

export interface State {
  [fromTheme.themeFeatureKey]: fromTheme.ThemeState;
  [fromCollection.collectionFeatureKey]: fromCollection.CollectionState;
  [fromTraits.traitsFeatureKey]: fromTraits.TraitsState;
}

export const reducers: ActionReducerMap<State> = {
  [fromTheme.themeFeatureKey]: fromTheme.reducer,
  [fromCollection.collectionFeatureKey]: fromCollection.reducer,
  [fromTraits.traitsFeatureKey]: fromTraits.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
