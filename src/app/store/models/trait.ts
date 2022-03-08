export interface Trait {
  name: string;
  guarantee: number;
  expand?: boolean;
  hidden?: boolean;
  selectedVariant?: number;
  variants: TraitVariant[];
}

export interface TraitVariant {
  name: string;
  src?: string;
}
