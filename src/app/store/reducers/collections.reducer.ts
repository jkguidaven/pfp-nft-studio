import { createReducer, on } from '@ngrx/store';
import { Collection } from '../models/collection';
import * as CollectionsActions from '../actions/collections.action';

export const collectionsFeatureKey = 'collections';

export interface CollectionsState {
  collections?: Collection[];
  currentCollectionId?: number;
  error?: string;
}

export const initialState: CollectionsState = {
  collections: undefined,
  currentCollectionId: undefined,
  error: undefined,
};

export const reducer = createReducer(
  initialState,

  on(CollectionsActions.loadCollections, (state, { collections }) => {
    return {
      ...state,
      collections,
    };
  }),

  on(CollectionsActions.addCollection, (state, { collection }) => {
    return {
      ...state,
      collections: state.collections
        ? [...state.collections, collection]
        : [collection],
    };
  }),

  on(CollectionsActions.removeCollection, (state, { id }) => {
    return {
      ...state,
      collections: state.collections
        ? state.collections.filter((collection) => collection.id !== id)
        : [],
    };
  }),

  on(CollectionsActions.setCurrentCollection, (state, { id }) => {
    return {
      ...state,
      currentCollectionId: id,
    };
  })
);
