import { createAction, props } from '@ngrx/store';
import { Model } from '../models/model';

export const setGeneratingQueue = createAction(
  '[Model] set generating queue',
  props<{ collectionId: number; models: Model[] }>()
);

export const resetGeneratingQueue = createAction(
  '[Model] reset generating queue',
  props<{ collectionId: number }>()
);

export const generateModelQueue = createAction(
  '[Model] generate model queue',
  props<{ collectionId: number }>()
);
