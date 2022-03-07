import { createReducer, on } from '@ngrx/store';
import { Trait } from '../models/trait';
import * as TraitActions from '../actions/trait.action';

export const traitFeatureKey = 'traits';

export interface TraitState {
  traits?: Trait[];
  error?: string;
}

export const initialState: TraitState = {
  traits: undefined,
};

export const reducer = createReducer(
  initialState,

  on(TraitActions.loadTraits, (state, { traits }) => ({
    ...state,
    traits,
  })),

  on(TraitActions.addTrait, (state, { trait }) => ({
    ...state,
    traits: state.traits ? [trait, ...state.traits] : [trait],
  })),

  on(TraitActions.removeTrait, (state, { index }) => ({
    ...state,
    traits: state.traits
      ? state.traits.filter((_, position) => position !== index)
      : [],
  })),

  on(TraitActions.updateTrait, (state, { index, trait }) => ({
    ...state,
    traits: state.traits
      ? state.traits.map((value, position) =>
          position === index ? trait : value
        )
      : [],
  })),

  on(TraitActions.moveTrait, (state, { fromIndex, toIndex }) => {
    if (state.traits && fromIndex !== toIndex) {
      const traits: Trait[] = [];
      let i: number = 0;

      while (i < state.traits.length) {
        if (fromIndex < toIndex) {
          if (fromIndex !== i) {
            traits.push(state.traits[i]);
          }

          if (toIndex === i) {
            traits.push(state.traits[fromIndex]);
          }
        } else {
          if (toIndex === i) {
            traits.push(state.traits[fromIndex]);
          }

          if (fromIndex !== i) {
            traits.push(state.traits[i]);
          }
        }

        i++;
      }

      return {
        ...state,
        traits,
      };
    } else {
      return state;
    }
  })
);
