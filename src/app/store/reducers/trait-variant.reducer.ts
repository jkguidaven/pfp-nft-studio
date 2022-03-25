import { createReducer, on } from '@ngrx/store';
import { TraitVariantDictionary } from '../models/trait';
import * as TraitVariantActions from '../actions/trait-variant.action';

export const traitVariantFeatureKey = 'traits-variant';

export interface TraitVariantState {
  traitDictionary: TraitVariantDictionary;
}

export const initialState: TraitVariantState = {
  traitDictionary: {},
};

export const reducer = createReducer(
  initialState,

  on(TraitVariantActions.loadTraitVariants, (state, { traitDictionary }) => ({
    ...state,
    traitDictionary,
  })),

  on(TraitVariantActions.addTraitVariants, (state, { variants }) => {
    const traitDictionary: TraitVariantDictionary = {};

    for (let variant of variants) {
      if (variant.traitId) {
        if (!traitDictionary[variant.traitId]) {
          traitDictionary[variant.traitId] = state.traitDictionary[
            variant.traitId
          ]
            ? [...state.traitDictionary[variant.traitId]]
            : [];
        }

        traitDictionary[variant.traitId].unshift(variant);
      }
    }

    return {
      ...state,
      traitDictionary: {
        ...state.traitDictionary,
        ...traitDictionary,
      },
    };
  }),

  on(TraitVariantActions.removeTraitVariant, (state, { variant }) => {
    if (variant.traitId) {
      return {
        ...state,
        traitDictionary: {
          ...state.traitDictionary,
          [variant.traitId]: state.traitDictionary[variant.traitId].filter(
            ({ id }) => id !== variant.id
          ),
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
        traitDictionary: {
          ...state.traitDictionary,
          [variant.traitId]: state.traitDictionary[variant.traitId].map((old) =>
            old.id === variant.id ? variant : old
          ),
        },
      };
    } else {
      return state;
    }
  })
);
