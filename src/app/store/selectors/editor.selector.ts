import { createSelector } from '@ngrx/store';
import { TraitVariant, TraitVariantListDictionary } from '../models/trait';
import { State } from '../reducers';
import { EditorState } from '../reducers/editor.reducer';

export const selectEditorState = (state: State) => state.editor;
export const selectEditorAndTraitVariants = (state: State) => ({
  editor: state.editor,
  dictionary: state['traits-variant'].traitVariantListDictionary,
});

export const selectEditorCollapsed = createSelector(
  selectEditorState,
  (state: EditorState) => state.collapsed
);

export const selectEditorSelected = createSelector(
  selectEditorState,
  (state: EditorState) => state.selected
);

export const selectActiveTraitVariants = createSelector(
  selectEditorAndTraitVariants,
  ({
    editor,
    dictionary,
  }: {
    editor: EditorState;
    dictionary: TraitVariantListDictionary;
  }) => {
    const selected: TraitVariant[] = Object.keys(editor.selected).reduce(
      (list, key) => {
        const traitId = Number(key);
        const variantId = editor.selected[traitId];

        const variant = dictionary[traitId]
          ? dictionary[traitId].find((data) => data.id === variantId)
          : null;

        if (variant) {
          list.push(variant);
        }

        return list;
      },
      [] as TraitVariant[]
    );

    return selected;
  }
);
