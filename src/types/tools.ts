export type ToolPricing = 'Grátis' | 'Freemium' | 'Paga' | 'A verificar';

export type ToolOpenness = 
  | 'Open source'
  | 'Open weights'
  | 'Source-available'
  | 'Híbrida'
  | 'Proprietária'
  | 'A verificar';

export type ToolSource = 'official-library' | 'user-added';

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: ToolPricing;
  openness: ToolOpenness;
  url: string;
  source: ToolSource;
  createdAt?: string;
}

export type PricingFilterOption = 'all' | 'Grátis' | 'Freemium' | 'Paga' | 'A verificar';

export type OpennessFilterOption = 'all' | ToolOpenness;
