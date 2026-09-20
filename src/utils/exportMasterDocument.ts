/**
 * EXPORT MASTER DOCUMENT (DOCUMENTO MESTRE DERIVADO) — V2.2
 * Workshop Inteligência Artificial Aplicada: do Problema ao Protótipo
 *
 * Contrato arquitetural W1:
 * - O Documento Mestre é DERIVADO diretamente do Artifact Store Canônico (AF01 a AF12).
 * - Estruturação fiel aos 4 Macro Movimentos:
 *   1. Investigar e Direcionar (AF01 a AF04)
 *   2. Definir e Materializar (AF05 a AF08)
 *   3. Validar e Evoluir (AF09 a AF11)
 *   4. Comunicar e Celebrar (AF12)
 * - Tratamento explícito de Autoridade de Versões (AF06 Briefing V1 autoritativo sobre AF05 Briefing V0).
 * - Eliminação de terminologia metodológica externa (sem Fluxonomia 4D, Golden Circle, TEvEP ou BMC).
 * - Exclusão de prompts transitórios brutos ou logs intermediários.
 */

import { AppState } from '../types/workshop';
import {
  ArtifactStoreV2,
  populateArtifactStoreFromLegacy,
  resolveEffectiveBriefing,
  getArtifactState
} from './artifactStore';
import { getArtifactDefinitionById } from '../data/canonicalArtifacts';

/**
 * Deriva o Documento Mestre executivo em formato Markdown limpo e auditável.
 */
export function generateMasterDocumentMarkdown(state: AppState): string {
  const p = state.projectData || ({} as any);
  const rawCanonical = state.projectStateV1_4_1 || ({} as any);
  const store: ArtifactStoreV2 = populateArtifactStoreFromLegacy(p, rawCanonical.artifacts);

  const projectName = (p.projectName || rawCanonical.projectName || 'Projeto sem Título').trim();
  const teamName = (p.teamName || rawCanonical.teamName || 'Equipe sem Nome').trim();
  const dateStr = new Date().toLocaleDateString('pt-BR');

  const briefing = resolveEffectiveBriefing(store);

  let md = `# DOCUMENTO MESTRE DO PROJETO
**Projeto:** ${projectName}  
**Equipe:** ${teamName}  
**Matriz Metodológica:** V2.3 Candidata (O Forno — IA Aplicada)  
**Data de Consolidação:** ${dateStr}  
**Facilitação:** Pedro Lago  

---

## 1. VISÃO GERAL & DIRETRIZES ESTRATÉGICAS

- **Ponto de Partida (Sonho + Problema) / Desafio Central (AF01):** ${store.AF01.content.trim() ? store.AF01.content.slice(0, 280) + (store.AF01.content.length > 280 ? '...' : '') : 'Não definido'}
- **Problema / Desafio Central (AF01):** ${store.AF01.content.trim() ? store.AF01.content.slice(0, 280) + (store.AF01.content.length > 280 ? '...' : '') : 'Não definido'}
- **Público Beneficiário / Alvo:** ${p.targetAudience || p.solutionTargetAudience || 'Não definido'}
- **Território de Atuação:** ${p.territory || 'Escola / Comunidade'}
- **Status do Briefing:** ${briefing.versionLabel}
- **Status de Validação em Campo (AF09):** ${store.AF09.content.trim() ? '✅ Validado com Evidências de Usuários Reais' : '⏳ Em validação / Teste pendente'}
- **Status do Protótipo (AF08):** ${store.AF08.content.trim() ? 'Protótipo V0 Concluído com Plano de Realização' : 'Em desenvolvimento'}

---

## 2. MOVIMENTO 1: INVESTIGAR E DIRECIONAR

### 2.1. Ponto de Partida: Sonho + Problema (AF01)
${store.AF01.content.trim() || '_Pendente de preenchimento pela equipe._'}

### 2.2. Diagnóstico da Tensão de Projeto — Observações, Hipóteses e Dúvidas (AF02)
${store.AF02.content.trim() || '_Diagnóstico da tensão não preenchido._'}

### 2.3. Mapeamento de Recursos Disponíveis e Necessários (AF03)
${store.AF03.content.trim() || '_Mapeamento de recursos não preenchido._'}

### 2.4. Propósito e Direção da Transformação (AF04)
${store.AF04.content.trim() || '_Propósito e direção não preenchidos._'}

---

## 3. MOVIMENTO 2: DEFINIR E MATERIALIZAR

### 3.1. Briefing da Solução — Versão Autoritativa V1 (AF06)
${briefing.hasAuditedV1 ? store.AF06.content.trim() : (briefing.hasDraftV0 ? `> *Nota: Versão V1 em auditoria pela equipe. Exibindo minuta V0 provisória:*\n\n${store.AF05.content.trim()}` : '_Briefing ainda não consolidado._')}

${briefing.hasDraftV0 && briefing.hasAuditedV1 ? `
<details>
<summary>Histórico: Minuta Inicial V0 (AF05)</summary>

${store.AF05.content.trim()}
</details>
` : ''}

### 3.2. Especificação de Funcionamento / PRD (AF07)
${store.AF07.content.trim() || '_Especificação de funcionamento não preenchida._'}

### 3.3. Recorte do MVP + Protótipo V0 + Plano de Realização (AF08)
${store.AF08.content.trim() || '_Definição de MVP e protótipo não preenchida._'}

---

## 4. MOVIMENTO 3: VALIDAR E EVOLUIR

### 4.1. Testes no Mundo Real, Registro de Evidências e Plano de Evolução V0→V1 (AF09)
${store.AF09.content.trim() || '_Testes de campo e plano de evolução não preenchidos._'}

### 4.2. Modelo de Sustentabilidade — Viabilidade e Autonomia (AF10)
${store.AF10.content.trim() || '_Modelo de sustentabilidade não preenchido._'}

### 4.3. Roadmap de Evolução e Linha do Tempo em 7 Etapas (AF11)
${store.AF11.content.trim() || '_Roadmap não preenchido._'}

---

## 5. MOVIMENTO 4: COMUNICAR E CELEBRAR

### 5.1. Kit de Comunicação Final — Pitch V1, Roteiro Visual e Simulação de Banca (AF12)
${store.AF12.content.trim() || '_Kit de comunicação final não preenchido._'}

---
*Documento Mestre derivado automaticamente do repositório canônico V2.2 — O Forno.*
`;

  return md;
}

/**
 * Gera a versão em Texto Puro (.txt) formatada do Documento Mestre.
 */
export function generateMasterDocumentPlainText(state: AppState): string {
  const md = generateMasterDocumentMarkdown(state);
  return md
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/^---$/gm, '============================================================');
}

/**
 * Dispara o download no navegador com nome de arquivo, conteúdo e mime type especificados.
 */
export function downloadFile(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Sanitiza um texto para compor com segurança nomes de arquivos em qualquer SO
 * (Windows, macOS, Linux, Android, iOS), removendo diacríticos e caracteres especiais.
 */
export function sanitizeFilenamePart(text: string | undefined | null, fallback: string): string {
  if (!text || typeof text !== 'string') return fallback;
  const clean = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return clean || fallback;
}

/**
 * Obtém carimbos padronizados de data e hora para nomes de arquivos exportados.
 * Exemplo: dateStamp="2026-09-13", timeStamp="12h05", fullStamp="2026-09-13_12h05"
 */
export function getExportDateTimeStamp(date = new Date()): {
  dateStamp: string;
  timeStamp: string;
  fullStamp: string;
} {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const dateStamp = `${year}-${month}-${day}`;
  const timeStamp = `${hours}h${minutes}`;
  const fullStamp = `${year}-${month}-${day}_${hours}h${minutes}`;
  return { dateStamp, timeStamp, fullStamp };
}

/**
 * Constrói o nome canônico e padronizado do arquivo exportado, contendo
 * obrigatoriamente os dados do projeto (nome do projeto e seu nome ou nome da equipe),
 * com a data e hora exatas da exportação.
 *
 * Formato gerado:
 * [prefix]_[nome-projeto]_[seu-nome-ou-equipe]_[AAAA-MM-DD_HHhMM].[ext]
 *
 * Exemplo:
 * backup_horta-comunitaria_pedro-lago_2026-09-13_12h05.json
 */
export function buildExportFileName(
  prefix: string,
  projectName: string | undefined | null,
  teamName: string | undefined | null,
  extension: string,
  date = new Date()
): string {
  const safeProject = sanitizeFilenamePart(projectName, 'projeto');
  const safeTeam = sanitizeFilenamePart(teamName, 'equipe');
  const { fullStamp } = getExportDateTimeStamp(date);
  const cleanExt = extension.startsWith('.') ? extension.slice(1) : extension;
  const prefixPart = prefix ? `${prefix}_` : '';
  return `${prefixPart}${safeProject}_${safeTeam}_${fullStamp}.${cleanExt}`;
}

/**
 * Valida o requisito mandatório de identificação:
 * - Nome do Projeto (não vazio)
 * - Seu Nome ou Nome da Equipe (não vazio)
 */
export function validateProjectIdentification(
  projectName?: string | null,
  teamName?: string | null
): { isValid: boolean; missingFields: string[]; missingSummary: string } {
  const p = (projectName || '').trim();
  const t = (teamName || '').trim();
  const missingFields: string[] = [];
  if (!p) missingFields.push('Nome do Projeto');
  if (!t) missingFields.push('Seu Nome ou Nome da Equipe');
  return {
    isValid: missingFields.length === 0,
    missingFields,
    missingSummary: missingFields.join(' e ')
  };
}

/**
 * Copia o Documento Mestre em Markdown diretamente para a área de transferência.
 */
export async function copyMasterDocumentToClipboard(state: AppState): Promise<boolean> {
  const md = generateMasterDocumentMarkdown(state);
  try {
    await navigator.clipboard.writeText(md);
    return true;
  } catch {
    return false;
  }
}
