export interface Collection {
  id: number;
  name: string;
  description: string;
  width: number;
  height: number;
  editions: number;
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
