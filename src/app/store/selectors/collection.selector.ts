import { createSelector } from '@ngrx/store';
import { Collection } from '../models/collection';
import { State } from '../reducers';
import { CollectionState } from '../reducers/collection.reducer';

export const selectCollectionState = (state: State) => state.collection;
export const selectCollectionsList = createSelector(
  selectCollectionState,
  (state: CollectionState) => state.list
);

export const selectCurrentCollection = createSelector(
  selectCollectionState,
  (state: CollectionState) =>
    state.current && state.list
      ? state.list.find(({ id }: Collection) => id === state.current)
      : undefined
);

export const selectCurrentCollectionTraitOrdering = createSelector(
  selectCollectionState,
  (state: CollectionState) =>
    state.current && state.list
      ? state.list.find(({ id }: Collection) => id === state.current)
          ?.traitsOrdering
      : undefined
);
