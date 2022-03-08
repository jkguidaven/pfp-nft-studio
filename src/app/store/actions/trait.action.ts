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

export const removeTrait = createAction(
  '[Traits] remove trait.',
  props<{ index: number }>()
);

export const updateTrait = createAction(
  '[Traits] update trait.',
  props<{ index: number; trait: Trait }>()
);

export const moveTrait = createAction(
  '[Traits] update trait.',
  props<{ fromIndex: number; toIndex: number }>()
);

export const persistTraits = createAction('[Traits] persist traits.');
