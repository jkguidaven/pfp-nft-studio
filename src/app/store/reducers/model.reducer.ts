import { createReducer, on } from '@ngrx/store';
import { Model } from '../models/model';
import * as modelsActions from '../actions/model.action';

export const modelsFeatureKey = 'models';

export type ModelsState = Record<
  number, // collection Id
  GeneratedModelQueue
>;

export interface GeneratedModelQueue {
  currentIndex: number;
  models: Model[];
}

export const initialState: ModelsState = {};

export const reducer = createReducer(
  initialState,
  on(modelsActions.resetGeneratingQueue, (state, { collectionId }) => {
    return {
      ...state,
      [collectionId]: {
        currentIndex: -1,
        models: [],
      },
    };
  }),

  on(modelsActions.setGeneratingQueue, (state, { collectionId, models }) => {
    return {
      ...state,
      [collectionId]: {
        ...state[collectionId],
        currentIndex: 0,
        models,
      },
    };
  }),

  on(modelsActions.setNextModel, (state, { collectionId }) => {
    return {
      ...state,
      [collectionId]: {
        ...state[collectionId],
        currentIndex: state[collectionId].currentIndex + 1,
      },
    };
  }),

  on(modelsActions.setModelImage, (state, { collectionId, image, index }) => {
    return {
      ...state,
      [collectionId]: {
        ...state[collectionId],
        models: state[collectionId].models.map((model, target) => {
          return index === target ? { ...model, image } : model;
        }),
      },
    };
  })
);
