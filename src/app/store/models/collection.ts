export interface Collection {
  id?: number;
  name: string;
  description: string;
  width: number;
  height: number;
  supply?: number;
  coverPhoto?: string;
  website?: string;
  twitter?: string;
  discord?: string;
  mintPrice?: Partial<{
    presale: number;
    public: number;
  }>;
  maxMint?: Partial<{
    presale: number;
    public: number;
  }>;
  schedule?: Partial<{
    presale: Date;
    public: Date;
  }>;
  royalty?: number;
}

export const UNKNOWN_COLLECTION: Collection = {
  id: undefined,
  name: 'unknown',
  description: 'unknown',
  width: 0,
  height: 0,
};
