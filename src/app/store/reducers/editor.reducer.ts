import { createReducer, on } from '@ngrx/store';
import * as editorActions from '../actions/editor.action';

export const editorFeatureKey = 'editor';

export interface EditorState {
  selected: Record<number, number>;
  collapsed: Record<number, boolean>;
}

export const initialState: EditorState = {
  selected: {},
  collapsed: {},
};

export const reducer = createReducer(
  initialState,

  on(editorActions.toggleCollapse, (state, { traitId }) => {
    return {
      ...state,
      collapsed: {
        ...state.collapsed,
        [traitId]: !state.collapsed[traitId],
      },
    };
  }),

  on(editorActions.setSelectedTraitVariant, (state, { traitId, variantId }) => {
    return {
      ...state,
      selected: {
        ...state.selected,
        [traitId]: variantId,
      },
    };
  })
);
