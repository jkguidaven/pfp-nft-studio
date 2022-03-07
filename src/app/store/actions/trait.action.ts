import { createAction, props } from '@ngrx/store';
import { Trait } from '../models/trait';

export const loadTraits = createAction(
  '[Traits] load traits.',
  props<{ traits: Trait[] }>()
);

export const triggerLoadTraits = createAction(
  '[Traits] trigger load traits.',
  props<{ collectionId: number }>()
);

export const addTrait = createAction(
  '[Traits] add trait.',
  props<{ trait: Trait }>()
);
