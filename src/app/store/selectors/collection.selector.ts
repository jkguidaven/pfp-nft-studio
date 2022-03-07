import { createSelector } from '@ngrx/store';
import { Collection } from '../models/collection';
import { State } from '../reducers';
import { CollectionState } from '../reducers/collection.reducer';

export const selectCollections = (state: State) => state.collection;
export const selectCollectionsList = createSelector(
  selectCollections,
  (state: CollectionState) => state.list
);

export const selectCurrentCollection = createSelector(
  selectCollections,
  (state: CollectionState) =>
    state.current && state.list
      ? state.list.find(({ id }: Collection) => id === state.current)
      : undefined
);
