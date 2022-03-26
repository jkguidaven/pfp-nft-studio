import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromPreference from './preference.reducer';
import * as fromCollection from './collection.reducer';
import * as fromTrait from './trait.reducer';
import * as fromTraitVariant from './trait-variant.reducer';
import * as fromEditor from './editor.reducer';
import * as fromModels from './model.reducer';

export interface State {
  [fromPreference.PreferenceFeatureKey]: fromPreference.PreferenceState;
  [fromCollection.collectionFeatureKey]: fromCollection.CollectionState;
  [fromTrait.traitFeatureKey]: fromTrait.TraitState;
  [fromEditor.editorFeatureKey]: fromEditor.EditorState;
  [fromTraitVariant.traitVariantFeatureKey]: fromTraitVariant.TraitVariantState;
  [fromModels.modelsFeatureKey]: fromModels.ModelsState;
}

export const reducers: ActionReducerMap<State> = {
  [fromPreference.PreferenceFeatureKey]: fromPreference.reducer,
  [fromCollection.collectionFeatureKey]: fromCollection.reducer,
  [fromTrait.traitFeatureKey]: fromTrait.reducer,
  [fromEditor.editorFeatureKey]: fromEditor.reducer,
  [fromTraitVariant.traitVariantFeatureKey]: fromTraitVariant.reducer,
  [fromModels.modelsFeatureKey]: fromModels.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
