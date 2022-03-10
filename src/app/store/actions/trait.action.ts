import { createAction, props } from '@ngrx/store';
import { Trait, TraitVariant } from '../models/trait';

export const loadTraits = createAction(
  '[Traits] load traits.',
  props<{ traits: Trait[] | undefined }>()
);

export const triggerLoadTraits = createAction(
  '[Traits] trigger load traits.',
  props<{ collectionId: number }>()
);

export const addTrait = createAction(
  '[Traits] add trait.',
  props<{ trait: Trait }>()
);

export const triggerAddTrait = createAction(
  '[Traits] trigger add trait.',
  props<{ trait: Trait }>()
);

export const removeTrait = createAction(
  '[Traits] remove trait.',
  props<{ id: number }>()
);

export const triggerRemoveTrait = createAction(
  '[Traits] trigger remove trait.',
  props<{ id: number }>()
);

export const updateTrait = createAction(
  '[Traits] update trait.',
  props<{ trait: Trait }>()
);

export const triggerUpdateTrait = createAction(
  '[Traits] trigger update trait.',
  props<{ trait: Trait }>()
);

export const moveTrait = createAction(
  '[Traits] move trait.',
  props<{ fromIndex: number; toIndex: number }>()
);

export const triggerMoveTrait = createAction(
  '[Traits] trigger move trait.',
  props<{ fromIndex: number; toIndex: number }>()
);

export const removeTraitVariant = createAction(
  '[Traits] remove trait variant .',
  props<{ traitIndex: number; variantIndex: number }>()
);

export const selectTraitVariant = createAction(
  '[Traits] select trait variant .',
  props<{ traitIndex: number; variantIndex: number }>()
);

export const updateTraitVariant = createAction(
  '[Traits] update trait variant.',
  props<{ traitIndex: number; variantIndex: number; variant: TraitVariant }>()
);
