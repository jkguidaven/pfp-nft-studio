import { createAction, props } from '@ngrx/store';

export const toggleCollapse = createAction(
  '[Editor] toggle trait panel collapse',
  props<{ traitId: number }>()
);

export const setSelectedTraitVariant = createAction(
  '[Editor] set selected trait variant',
  props<{ traitId: number; variantId: number }>()
);
