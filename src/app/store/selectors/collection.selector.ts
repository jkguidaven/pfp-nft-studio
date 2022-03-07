import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { CollectionState } from '../reducers/collection.reducer';

export const selectCollections = (state: State) => state.collection;
export const selectCollectionsList = createSelector(
  selectCollections,
  (state: CollectionState) => state.list
);
