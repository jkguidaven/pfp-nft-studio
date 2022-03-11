import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { EditorState } from '../reducers/editor.reducer';

export const selectEditorState = (state: State) => state.editor;

export const selectEditorCollapsed = createSelector(
  selectEditorState,
  (state: EditorState) => state.collapsed
);

export const selectEditorSelected = createSelector(
  selectEditorState,
  (state: EditorState) => state.selected
);
