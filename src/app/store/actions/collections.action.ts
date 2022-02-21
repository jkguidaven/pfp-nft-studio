import { createAction, props } from '@ngrx/store';
import { Collection } from '../models/collection';

export const loadCollection = createAction('[Collections] load collections.');
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
