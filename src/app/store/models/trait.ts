export interface Trait {
  id?: number;
  collectionId?: number;
  name: string;
  guarantee: number;
  hidden?: boolean;
}

export interface TraitVariant {
  id?: number;
  traitId?: number;
  name: string;
  src?: string;
}

export type TraitVariantDictionary = Record<string, TraitVariant[]>;
