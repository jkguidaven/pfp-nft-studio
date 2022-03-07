import { createAction, props } from '@ngrx/store';
import { Collection } from '../models/collection';

export const triggerLoadCollections = createAction(
  '[Collection] trigger load collections.'
);

export const loadCollections = createAction(
  '[Collection] load collections.',
  props<{ collections: Collection[] }>()
);

export const triggerAddCollection = createAction(
  '[Collection] trigger add collection.',
  props<{
    collection: Collection;
    successCallback?: (collection: Collection) => void;
  }>()
);

export const addCollection = createAction(
  '[Collection] add collection.',
  props<{
    collection: Collection;
    successCallback?: (collection: Collection) => void;
  }>()
);

export const triggerRemoveCollection = createAction(
  '[Collection] trigger remove collection.',
  props<{ id: number }>()
);

export const removeCollection = createAction(
  '[Collection] remove collection.',
  props<{ id: number }>()
);

export const updateCollection = createAction(
  '[Collection] update collection.',
  props<{ collection: Collection }>()
);

export const setCurrentCollection = createAction(
  '[Collection] set current collection.',
  props<{ id: number }>()
);
