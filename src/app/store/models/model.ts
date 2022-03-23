import { TraitVariant } from './trait';

export interface Model {
  id?: number;
  image?: string;
  layers: ModelLayer[];
}

export interface ModelLayer {
  variant: TraitVariant;
  overrides: {
    top?: number;
    left?: number;
    scaleX?: number;
    scaleY?: number;
  };
}
