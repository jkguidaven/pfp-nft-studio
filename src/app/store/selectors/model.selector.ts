import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { ModelsState } from '../reducers/model.reducer';

export const selectModelState = (state: State) => state.models;

export const selectGeneratedModelQueue = createSelector(
  selectModelState,
  (state: ModelsState) => state
);
