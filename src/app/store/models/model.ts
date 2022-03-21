export interface Model {
  id?: number;
  image?: string;
  layers: ModelLayer[];
}

export interface ModelLayer {
  variantId: number;
  overrides: {
    top?: number;
    left?: number;
    scaleX?: number;
    scaleY?: number;
  };
}
