export interface Trait {
  id?: number;
  collectionId?: number;
  name: string;
  guarantee: number;
  expand?: boolean;
  hidden?: boolean;
  variants: TraitVariant[];
}

export interface TraitVariant {
  name: string;
  src?: string;
  selected?: boolean;
}
