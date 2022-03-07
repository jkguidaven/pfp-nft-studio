import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTheme from './theme.reducer';
import * as fromCollection from './collection.reducer';
import * as fromTrait from './trait.reducer';

export interface State {
  [fromTheme.themeFeatureKey]: fromTheme.ThemeState;
  [fromCollection.collectionFeatureKey]: fromCollection.CollectionState;
  [fromTrait.traitFeatureKey]: fromTrait.TraitState;
}

export const reducers: ActionReducerMap<State> = {
  [fromTheme.themeFeatureKey]: fromTheme.reducer,
  [fromCollection.collectionFeatureKey]: fromCollection.reducer,
  [fromTrait.traitFeatureKey]: fromTrait.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
