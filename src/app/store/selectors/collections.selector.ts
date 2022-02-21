import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { CollectionsState } from '../reducers/collections.reducer';

export const selectCollections = (state: State) => state.collections;
export const selectCollectionsList = createSelector(
  selectCollections,
  (state: CollectionsState) => state.collections
);
