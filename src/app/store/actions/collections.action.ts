import { createAction, props } from '@ngrx/store';
import { Collection } from '../models/collection';

export const triggerLoadCollections = createAction(
  '[Collections] trigger load collections.',
  props<{ delay: number | undefined }>()
);
export const loadCollections = createAction(
  '[Collections] load collections.',
  props<{ collections: Collection[] }>()
);

export const addCollection = createAction(
  '[Collections] add collection.',
  props<{ collection: Collection }>()
);

export const removeCollection = createAction(
  '[Collections] remove collection.',
  props<{ id: number }>()
);

export const updateCollection = createAction(
  '[Collections] update collection.',
  props<{ collection: Collection }>()
);
