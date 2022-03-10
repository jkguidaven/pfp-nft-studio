import { createReducer, on } from '@ngrx/store';
import { TraitVariantDictionary } from '../models/trait';
import * as TraitVariantActions from '../actions/trait-variant.action';

export const traitVariantFeatureKey = 'traits-variant';

export const initialState: TraitVariantDictionary = {};

export const reducer = createReducer(
  initialState,

  on(TraitVariantActions.loadTraitVariants, (_, { dictionary }) => ({
    ...dictionary,
  })),

  on(TraitVariantActions.addTraitVariants, (state, { variants }) => {
    const dictionary: TraitVariantDictionary = {};

    for (let variant of variants) {
      if (variant.traitId) {
        if (!dictionary[variant.traitId]) {
          dictionary[variant.traitId] = state[variant.traitId]
            ? [...state[variant.traitId]]
            : [];
        }

        dictionary[variant.traitId].unshift(variant);
      }
    }

    return {
      ...state,
      ...dictionary,
    };
  })
);
