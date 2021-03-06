import { createReducer, on } from '@ngrx/store';
import { Collection } from '../models/collection';
import * as CollectionActions from '../actions/collection.action';

export const collectionFeatureKey = 'collection';

export interface CollectionState {
  list?: Collection[];
  current?: number;
  error?: string;
}

export const initialState: CollectionState = {
  list: undefined,
  error: undefined,
  current: undefined,
};

export const reducer = createReducer(
  initialState,

  on(CollectionActions.loadCollections, (state, { collections }) => {
    return {
      ...state,
      list: collections,
    };
  }),

  on(CollectionActions.addCollection, (state, { collection }) => {
    return {
      ...state,
      list: state.list ? [...state.list, collection] : [collection],
    };
  }),

  on(CollectionActions.removeCollection, (state, { id }) => {
    return {
      ...state,
      list: state.list
        ? state.list.filter((collection) => collection.id !== id)
        : [],
    };
  }),

  on(CollectionActions.setCurrentCollection, (state, { id }) => {
    return {
      ...state,
      current: id,
    };
  })
);
