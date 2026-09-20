import { ToolItem } from '../types/tools';
import { TOOLS_PART_1 } from './toolsPart1';
import { TOOLS_PART_2 } from './toolsPart2';

export const OFFICIAL_TOOLS: ToolItem[] = [
  ...TOOLS_PART_1,
  ...TOOLS_PART_2
];

export const TOOL_CATEGORIES = [
  'Assistentes gerais, pesquisa e agregadores de IA',
  'Conhecimento, produtividade, organização e tomada de decisão',
  'Reuniões, transcrição e captura de conhecimento',
  'Voz, clonagem, fala sintética e agentes de voz',
  'Imagem, design, branding e recursos visuais',
  'Vídeo, animação, avatares e edição',
  'Música e áudio criativo',
  'Desenvolvimento, vibecoding, no-code e criação de apps',
  'Backend, bancos de dados, APIs, scraping e infraestrutura',
  'Agentes, automação e orquestração',
  'Marketing, redes sociais, CRM, vendas e outreach',
  'SEO, pesquisa de mercado, dados e inteligência competitiva',
  'OSINT, investigação e reconhecimento técnico',
  'Prompts, GPTs, bibliotecas e ferramentas auxiliares',
  'Sites, comunidades, memberships e utilidades de publicação'
] as const;

export type ToolCategoryName = typeof TOOL_CATEGORIES[number];

/**
 * Normalizes text for search by lowercasing and stripping diacritics / accents.
 */
export function normalizeSearch(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}
