export interface Trait {
  id?: number;
  collectionId?: number;
  name: string;
  guarantee: number;
  expand?: boolean;
  hidden?: boolean;
}

export interface TraitVariant {
  id?: number;
  traitId?: number;
  name: string;
  src?: string;
  selected?: boolean;
}

export type TraitVariantDictionary = Record<string, TraitVariant[]>;
