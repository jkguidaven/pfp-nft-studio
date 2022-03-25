import { createReducer, on } from '@ngrx/store';
import { TraitVariantListDictionary } from '../models/trait';
import * as TraitVariantActions from '../actions/trait-variant.action';

export const traitVariantFeatureKey = 'traits-variant';

export interface TraitVariantState {
  traitVariantListDictionary: TraitVariantListDictionary;
}

export const initialState: TraitVariantState = {
  traitVariantListDictionary: {},
};

export const reducer = createReducer(
  initialState,

  on(
    TraitVariantActions.loadTraitVariants,
    (state, { traitVariantListDictionary }) => ({
      ...state,
      traitVariantListDictionary,
    })
  ),

  on(TraitVariantActions.addTraitVariants, (state, { variants }) => {
    const traitVariantListDictionary: TraitVariantListDictionary = {};

    for (let variant of variants) {
      if (variant.traitId) {
        if (!traitVariantListDictionary[variant.traitId]) {
          traitVariantListDictionary[variant.traitId] = state
            .traitVariantListDictionary[variant.traitId]
            ? [...state.traitVariantListDictionary[variant.traitId]]
            : [];
        }

        traitVariantListDictionary[variant.traitId].unshift(variant);
      }
    }

    return {
      ...state,
      traitVariantListDictionary: {
        ...state.traitVariantListDictionary,
        ...traitVariantListDictionary,
      },
    };
  }),

  on(TraitVariantActions.removeTraitVariant, (state, { variant }) => {
    if (variant.traitId) {
      return {
        ...state,
        traitVariantListDictionary: {
          ...state.traitVariantListDictionary,
          [variant.traitId]: state.traitVariantListDictionary[
            variant.traitId
          ].filter(({ id }) => id !== variant.id),
        },
      };
    } else {
      return state;
    }
  }),

  on(TraitVariantActions.updateTraitVariant, (state, { variant }) => {
    if (variant.traitId) {
      return {
        ...state,
        traitVariantListDictionary: {
          ...state.traitVariantListDictionary,
          [variant.traitId]: state.traitVariantListDictionary[
            variant.traitId
          ].map((old) => (old.id === variant.id ? variant : old)),
        },
      };
    } else {
      return state;
    }
  })
);
