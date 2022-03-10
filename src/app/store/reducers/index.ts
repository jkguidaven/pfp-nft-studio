import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTheme from './theme.reducer';
import * as fromCollection from './collection.reducer';
import * as fromTrait from './trait.reducer';
import * as fromTraitVariant from './trait-variant.reducer';
import { TraitVariantDictionary } from '../models/trait';

export interface State {
  [fromTheme.themeFeatureKey]: fromTheme.ThemeState;
  [fromCollection.collectionFeatureKey]: fromCollection.CollectionState;
  [fromTrait.traitFeatureKey]: fromTrait.TraitState;
  [fromTraitVariant.traitVariantFeatureKey]: TraitVariantDictionary;
}

export const reducers: ActionReducerMap<State> = {
  [fromTheme.themeFeatureKey]: fromTheme.reducer,
  [fromCollection.collectionFeatureKey]: fromCollection.reducer,
  [fromTrait.traitFeatureKey]: fromTrait.reducer,
  [fromTraitVariant.traitVariantFeatureKey]: fromTraitVariant.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
