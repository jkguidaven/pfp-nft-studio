import { createReducer, on } from '@ngrx/store';
import { Collection } from '../models/collection';
import * as CollectionsActions from '../actions/collections.action';

export const collectionsFeatureKey = 'collections';

export interface CollectionsState {
  collections?: Collection[];
  error?: string;
}

export const initialState: CollectionsState = {
  collections: undefined,
  error: undefined,
};

export const reducer = createReducer(
  initialState,

  on(CollectionsActions.addCollection, (state, { collection }) => {
    if (state.collections) state.collections = [];

    state.collections?.push(collection);
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
        ? state.collections.filter((collection) => collection.id != id)
        : [],
    };
  }),

  on(CollectionsActions.updateCollection, (state, { collection }) => {
    return {
      ...state,
      collections: state.collections
        ? state.collections.map((toUpdate) =>
            toUpdate.id === collection.id ? collection : toUpdate
          )
        : [collection],
    };
  })
);
