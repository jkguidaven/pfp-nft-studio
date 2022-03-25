import { createAction, props } from '@ngrx/store';
import { TraitVariant, TraitVariantDictionary } from '../models/trait';

export const loadTraitVariants = createAction(
  '[Trait Variants] load trait variants.',
  props<{ dictionary: TraitVariantDictionary }>()
);

export const triggerLoadTraitVariants = createAction(
  '[Trait Variants] trigger load trait variants.'
);

export const addTraitVariants = createAction(
  '[Trait Variants] add trait variants.',
  props<{ variants: TraitVariant[] }>()
);

export const triggerAddTraitVariants = createAction(
  '[Trait Variants] trigger add trait variants.',
  props<{ variants: TraitVariant[] }>()
);

export const removeTraitVariant = createAction(
  '[Trait Variants] remove trait variant .',
  props<{ variant: TraitVariant }>()
);

export const triggerRemoveTraitVariant = createAction(
  '[Trait Variants] trigger remove trait variant .',
  props<{ variant: TraitVariant }>()
);

export const updateTraitVariant = createAction(
  '[Trait Variants] update trait variant.',
  props<{ variant: TraitVariant }>()
);

export const removeAllTraitVariantByTraitIds = createAction(
  '[Trait Variants] remove all trait variant by trait ids.',
  props<{ ids: any[] }>()
);
