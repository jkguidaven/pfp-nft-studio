export interface Layer {
  name: string;
  guarantee: number;
  expand?: boolean;
  hidden?: boolean;
  variants: LayerVariant[];
}

export interface LayerVariant {
  name: string;
  src?: string;
}
