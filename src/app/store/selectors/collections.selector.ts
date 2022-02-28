import { createSelector } from '@ngrx/store';
import { UNKNOWN_COLLECTION } from '../models/collection';
import { State } from '../reducers';
import { CollectionsState } from '../reducers/collections.reducer';

export const selectCollections = (state: State) => state.collections;
export const selectCollectionsList = createSelector(
  selectCollections,
  (state: CollectionsState) => state.collections
);

export const selectCurrentCollection = createSelector(
  selectCollections,
  (state: CollectionsState) => {
    if (!state.currentCollectionId || !state.collections) {
      return undefined;
    }

    const match = state.collections?.find(
      (collection) => collection.id === state.currentCollectionId
    );

    return match ?? UNKNOWN_COLLECTION;
  }
);
