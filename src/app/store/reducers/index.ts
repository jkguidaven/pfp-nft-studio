import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTheme from './theme.reducer';
import * as fromCollection from './collection.reducer';
import * as fromTrait from './trait.reducer';
import * as fromTraitVariant from './trait-variant.reducer';
import * as fromEditor from './editor.reducer';
import * as fromModels from './model.reducer';
import { TraitVariantDictionary } from '../models/trait';

export interface State {
  [fromTheme.themeFeatureKey]: fromTheme.ThemeState;
  [fromCollection.collectionFeatureKey]: fromCollection.CollectionState;
  [fromTrait.traitFeatureKey]: fromTrait.TraitState;
  [fromEditor.editorFeatureKey]: fromEditor.EditorState;
  [fromTraitVariant.traitVariantFeatureKey]: TraitVariantDictionary;
  [fromModels.modelsFeatureKey]: fromModels.ModelsState;
}

export const reducers: ActionReducerMap<State> = {
  [fromTheme.themeFeatureKey]: fromTheme.reducer,
  [fromCollection.collectionFeatureKey]: fromCollection.reducer,
  [fromTrait.traitFeatureKey]: fromTrait.reducer,
  [fromEditor.editorFeatureKey]: fromEditor.reducer,
  [fromTraitVariant.traitVariantFeatureKey]: fromTraitVariant.reducer,
  [fromModels.modelsFeatureKey]: fromModels.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
