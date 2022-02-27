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

  on(CollectionsActions.loadCollections, (state, { collections }) => {
    return {
      ...state,
      collections,
    };
  })
);
