/**
 * GRAFO CANÔNICO DE CONTEXTO, DEPENDÊNCIAS, ESTADOS E HANDOFFS — FORNOLOGIA V2.2
 * Workshop Inteligência Artificial Aplicada: do Problema ao Protótipo
 * 
 * PRINCÍPIOS FUNDAMENTAIS V2.2:
 * 1. Contexto disponível → use.
 * 2. Contexto ausente → pergunte socrática e progressivamente.
 * 3. Primazia da Pergunta: O participante não deve reconstruir o que o sistema já sabe.
 * 4. Agência Humana Absoluta: A IA não toma decisões de projeto silenciosamente.
 * 5. Hierarquia Epistemológica de Autoridade:
 *    - 1º: Decisão humana explícita mais recente da equipe.
 *    - 2º: Artefatos canônicos consolidados (AF01 a AF12).
 *    - 3º: Evidências reais observadas diretamente em testes de campo.
 *    - 4º: Hipóteses em aberto (nunca promova hipótese a fato sem teste).
 *    - 5º: Recomendações e provocações da IA.
 * 
 * MATRIZ DE DEPENDÊNCIAS DOS 12 PROMPTS CANÔNICOS (P01 A P12):
 * P01 (A01 ↔ AF01): Problema e Desafios.
 * P02 (A02 ↔ AF02): AF01 (Problema Escolhido).
 * P03 (A03 ↔ AF03): AF01, AF02.
 * P04 (A04 ↔ AF04): AF01, AF02, AF03.
 * P05 (A05 ↔ AF05): AF01, AF02, AF03, AF04.
 * P06 (A06 ↔ AF06): AF05 (Briefing V0).
 * P07 (A07 ↔ AF07): AF06 (Briefing V1).
 * P08 (A08 ↔ AF08): AF06 (Briefing V1), AF07 (Especificação / PRD).
 * P09 (A09 ↔ AF09): AF08 (MVP + Protótipo V0 + Plano de Realização).
 * P10 (A10 ↔ AF10): AF06, AF08, AF09.
 * P11 (A11 ↔ AF11): AF06, AF09, AF10.
 * P12 (A12 ↔ AF12): AF01 a AF11 (Contexto Integral do Projeto).
 */

import { PromptId, ActivityId } from '../types/canonicalV2';
import { EncounterId } from '../types/canonical';
import { ArtifactVersion, ContextPackConfig, ProjectStateV2 } from '../types/workshop';

export interface CanonicalPromptDependency {
  promptId: PromptId;
  order: number;
  title: string;
  activityId: ActivityId;
  encounterId: EncounterId;
  movement: string;
  requiredArtifacts: string[];
  optionalArtifacts: string[];
  globalVariables: string[];
  outputArtifact: string;
  requiresRealEvidence?: boolean;
}

export const CANONICAL_DEPENDENCY_MATRIX: Record<PromptId, CanonicalPromptDependency> = {
  P01: {
    promptId: 'P01',
    order: 1,
    title: 'Mapear e Escolher o Problema',
    activityId: 'A01',
    encounterId: 1,
    movement: 'INVESTIGAR E DIRECIONAR',
    requiredArtifacts: [],
    optionalArtifacts: ['BANCO_DE_IDEIAS'],
    globalVariables: ['PROBLEMA', 'NOME_DO_PROJETO', 'CONTEXTO_DA_TURMA'],
    outputArtifact: 'AF01',
  },
  P02: {
    promptId: 'P02',
    order: 2,
    title: 'Diagnosticar o Problema',
    activityId: 'A02',
    encounterId: 1,
    movement: 'INVESTIGAR E DIRECIONAR',
    requiredArtifacts: ['AF01'],
    optionalArtifacts: ['BANCO_DE_IDEIAS'],
    globalVariables: ['NOME_DO_PROJETO'],
    outputArtifact: 'AF02',
  },
  P03: {
    promptId: 'P03',
    order: 3,
    title: 'Mapear Recursos Disponíveis e Necessários',
    activityId: 'A03',
    encounterId: 1,
    movement: 'INVESTIGAR E DIRECIONAR',
    requiredArtifacts: ['AF01', 'AF02'],
    optionalArtifacts: ['BANCO_DE_IDEIAS'],
    globalVariables: ['NOME_DO_PROJETO'],
    outputArtifact: 'AF03',
  },
  P04: {
    promptId: 'P04',
    order: 4,
    title: 'Definir Propósito e Direção',
    activityId: 'A04',
    encounterId: 1,
    movement: 'INVESTIGAR E DIRECIONAR',
    requiredArtifacts: ['AF01', 'AF02', 'AF03'],
    optionalArtifacts: [],
    globalVariables: ['NOME_DO_PROJETO'],
    outputArtifact: 'AF04',
  },
  P05: {
    promptId: 'P05',
    order: 5,
    title: 'Construir Briefing V0',
    activityId: 'A05',
    encounterId: 2,
    movement: 'DEFINIR E MATERIALIZAR',
    requiredArtifacts: ['AF01', 'AF02', 'AF03', 'AF04'],
    optionalArtifacts: [],
    globalVariables: ['NOME_DO_PROJETO'],
    outputArtifact: 'AF05',
  },
  P06: {
    promptId: 'P06',
    order: 6,
    title: 'Revisar Criticamente (Briefing V1)',
    activityId: 'A06',
    encounterId: 2,
    movement: 'DEFINIR E MATERIALIZAR',
    requiredArtifacts: ['AF05'],
    optionalArtifacts: [],
    globalVariables: [],
    outputArtifact: 'AF06',
  },
  P07: {
    promptId: 'P07',
    order: 7,
    title: 'Definir Como a Solução Precisa Funcionar (Especificação / PRD)',
    activityId: 'A07',
    encounterId: 2,
    movement: 'DEFINIR E MATERIALIZAR',
    requiredArtifacts: ['AF06'],
    optionalArtifacts: [],
    globalVariables: [],
    outputArtifact: 'AF07',
  },
  P08: {
    promptId: 'P08',
    order: 8,
    title: 'Projetar e Materializar o MVP (MVP + Protótipo V0)',
    activityId: 'A08',
    encounterId: 2,
    movement: 'DEFINIR E MATERIALIZAR',
    requiredArtifacts: ['AF06', 'AF07'],
    optionalArtifacts: [],
    globalVariables: [],
    outputArtifact: 'AF08',
  },
  P09: {
    promptId: 'P09',
    order: 9,
    title: 'Testar, Aprender e Definir Evolução V0→V1',
    activityId: 'A09',
    encounterId: 3,
    movement: 'VALIDAR E EVOLUIR',
    requiredArtifacts: ['AF08'],
    optionalArtifacts: [],
    globalVariables: [],
    outputArtifact: 'AF09',
    requiresRealEvidence: true,
  },
  P10: {
    promptId: 'P10',
    order: 10,
    title: 'Modelar Sustentabilidade',
    activityId: 'A10',
    encounterId: 3,
    movement: 'VALIDAR E EVOLUIR',
    requiredArtifacts: ['AF06', 'AF08', 'AF09'],
    optionalArtifacts: [],
    globalVariables: [],
    outputArtifact: 'AF10',
  },
  P11: {
    promptId: 'P11',
    order: 11,
    title: 'Planejar Evolução (Roadmap + Linha do Tempo em 7 Etapas)',
    activityId: 'A11',
    encounterId: 3,
    movement: 'VALIDAR E EVOLUIR',
    requiredArtifacts: ['AF06', 'AF09', 'AF10'],
    optionalArtifacts: [],
    globalVariables: [],
    outputArtifact: 'AF11',
  },
  P12: {
    promptId: 'P12',
    order: 12,
    title: 'Comunicação Final (Pitch V1 + Roteiro Visual + Roteiro de Ensaio/Simulação)',
    activityId: 'A12',
    encounterId: 4,
    movement: 'COMUNICAR E CELEBRAR',
    requiredArtifacts: ['AF01', 'AF02', 'AF03', 'AF04', 'AF06', 'AF07', 'AF08', 'AF09', 'AF10', 'AF11'],
    optionalArtifacts: [],
    globalVariables: ['NOME_DO_PROJETO'],
    outputArtifact: 'AF12',
  },
};

export const ARTIFACT_CANONICAL_NAMES: Record<string, string> = {
  PROBLEMA: 'Problema Inicial Definido',
  NOME_DO_PROJETO: 'Nome do Projeto',
  PUBLICO_ALVO: 'Público-Alvo / Pessoas Afetadas',
  BANCO_DE_IDEIAS: 'Banco de Ideias',
  AF01: 'AF01 — Mapa de Problemas + Problema Escolhido',
  AF02: 'AF02 — Diagnóstico do Problema',
  AF03: 'AF03 — Mapa de Recursos',
  AF04: 'AF04 — Propósito e Direção',
  AF05: 'AF05 — Briefing V0',
  AF06: 'AF06 — Briefing V1',
  AF07: 'AF07 — Especificação de Funcionamento / PRD',
  AF08: 'AF08 — MVP + Protótipo V0',
  AF09: 'AF09 — Testes, Aprendizados e Plano de Evolução V0→V1',
  AF10: 'AF10 — Modelo de Sustentabilidade',
  AF11: 'AF11 — Roadmap + Linha do Tempo em 7 Etapas',
  AF12: 'AF12 — Pitch V1 + Roteiro Visual + Roteiro de Ensaio/Simulação',
  // Aliases transitórios para robustez
  DIAGNOSTICO_DO_PROBLEMA: 'AF02 — Diagnóstico do Problema',
  MAPA_RECURSOS: 'AF03 — Mapa de Recursos',
  PROPOSITO_DIRECAO: 'AF04 — Propósito e Direção',
  BRIEFING_V0: 'AF05 — Briefing V0',
  BRIEFING_V1: 'AF06 — Briefing V1',
  PRD_V0: 'AF07 — Especificação de Funcionamento / PRD',
  MVP: 'AF08 — MVP + Protótipo V0',
  PLANO_REALIZACAO: 'AF08 — Plano de Realização',
  TESTES_EVIDENCIAS: 'AF09 — Testes e Aprendizados',
  SUSTENTABILIDADE: 'AF10 — Modelo de Sustentabilidade',
  ROADMAP: 'AF11 — Roadmap + Linha do Tempo em 7 Etapas',
  PITCH_FINAL: 'AF12 — Pitch V1 + Kit de Comunicação',
};

export function formatPromptWithSeparation(promptText: string, contextPackText: string): string {
  const cleanPrompt = promptText.trim();
  const cleanContext = contextPackText.trim();

  if (!cleanContext || cleanContext === 'Nenhum contexto prévio necessário para esta atividade.') {
    return cleanPrompt;
  }

  return `=== PROMPT ===

${cleanPrompt}

=== CONTEXTO DO PROJETO ===

${cleanContext}`;
}

export function buildCanonicalPromptContext(
  promptId: PromptId,
  localContext: Record<string, string>
): {
  formattedContext: string;
  includedArtifacts: string[];
  missingArtifacts: string[];
} {
  const dep = CANONICAL_DEPENDENCY_MATRIX[promptId];
  if (!dep) {
    return { formattedContext: '', includedArtifacts: [], missingArtifacts: [] };
  }

  const sections: string[] = [];
  const includedArtifacts: string[] = [];
  const missingArtifacts: string[] = [];

  // 1. Variáveis Globais
  if (dep.globalVariables && dep.globalVariables.length > 0) {
    const globalLines: string[] = [];
    dep.globalVariables.forEach((gKey) => {
      const val = localContext[gKey]?.trim();
      if (val) {
        globalLines.push(`• ${gKey}: ${val}`);
      }
    });

    if (globalLines.length > 0) {
      sections.push('--- DADOS BÁSICOS DO PROJETO ---\n' + globalLines.join('\n'));
    }
  }

  // 2. Artefatos de Entrada Obrigatórios
  if (dep.requiredArtifacts && dep.requiredArtifacts.length > 0) {
    const reqLines: string[] = [];
    dep.requiredArtifacts.forEach((artKey) => {
      let val = localContext[artKey]?.trim();

      // Mapeamentos de fallback para chaves com ou sem prefixo
      if (!val) {
        if (artKey === 'AF01') val = localContext['PROBLEMA_ESCOLHIDO']?.trim() || localContext['PROBLEMA']?.trim();
        if (artKey === 'AF02') val = localContext['DIAGNOSTICO_DO_PROBLEMA']?.trim() || localContext['DIAGNOSTICO']?.trim();
        if (artKey === 'AF03') val = localContext['MAPA_RECURSOS']?.trim() || localContext['MAPA_4D']?.trim();
        if (artKey === 'AF04') val = localContext['PROPOSITO']?.trim() || localContext['GOLDEN_CIRCLE']?.trim();
        if (artKey === 'AF05') val = localContext['BRIEFING_V0']?.trim();
        if (artKey === 'AF06') val = localContext['BRIEFING_V1']?.trim();
        if (artKey === 'AF07') val = localContext['PRD']?.trim() || localContext['PRD_V0']?.trim();
        if (artKey === 'AF08') val = localContext['MVP']?.trim() || localContext['PROTOTIPO_V0']?.trim();
        if (artKey === 'AF09') val = localContext['SINTESE_DE_EVIDENCIAS']?.trim() || localContext['APRENDIZADOS']?.trim();
        if (artKey === 'AF10') val = localContext['BMC']?.trim() || localContext['SUSTENTABILIDADE']?.trim();
        if (artKey === 'AF11') val = localContext['ROADMAP']?.trim();
      }

      const displayName = ARTIFACT_CANONICAL_NAMES[artKey] || artKey;
      if (val) {
        reqLines.push(`[ARTEFATO CONSOLIDADO: ${displayName.toUpperCase()}]\n${val}\n`);
        includedArtifacts.push(displayName);
      } else {
        missingArtifacts.push(displayName);
        reqLines.push(
          `[ARTEFATO DE ENTRADA: ${displayName.toUpperCase()}]\n(Pendente de consolidação. Prossiga solicitando apenas o contexto mínimo ausente sem preencher decisões pela equipe.)\n`
        );
      }
    });
    sections.push('--- ARTEFATOS DE ENTRADA OBRIGATÓRIOS (V2.2) ---\n' + reqLines.join('\n'));
  }

  // 3. Cláusula de Autoridade e Agência Humana (V2.2)
  sections.push(
    '--- HIERARQUIA EPISTEMOLÓGICA E REGRAS DE CONDUTA (V2.2) ---\n' +
    '1. 1º NÍVEL (Máxima Autoridade): Decisão humana explícita mais recente da equipe.\n' +
    '2. 2º NÍVEL: Artefatos canônicos consolidados (AF01 a AF12).\n' +
    '3. 3º NÍVEL: Evidências reais observadas diretamente em testes com pessoas reais.\n' +
    '4. 4º NÍVEL: Hipóteses em aberto (trate como hipótese, nunca como fato comprovado).\n' +
    '5. 5º NÍVEL: Recomendações, sugestões e provocações socráticas da IA.\n' +
    '⚠️ REGRA DE AGÊNCIA: A IA sugere e organiza; a equipe humana decide. É proibido inventar dados ou validações sem evidência externa.'
  );

  return {
    formattedContext: sections.join('\n\n'),
    includedArtifacts,
    missingArtifacts,
  };
}

export function buildV3PromptContext(
  promptNumber: number,
  localContext: Record<string, string>
): { formattedContext: string; includedArtifacts: string[]; missingArtifacts: string[] } {
  const promptId = `P${promptNumber.toString().padStart(2, '0')}` as PromptId;
  return buildCanonicalPromptContext(promptId, localContext);
}

export const V3_PROMPT_DEPENDENCIES = Object.values(CANONICAL_DEPENDENCY_MATRIX).reduce(
  (acc, dep) => {
    acc[dep.order] = {
      promptNumber: dep.order,
      promptId: dep.promptId,
      title: dep.title,
      encounterId: dep.encounterId as 1 | 2 | 3 | 4,
      encounterTitle: `Encontro ${dep.encounterId}`,
      movement: dep.movement,
      inputPrincipalDescription: dep.requiredArtifacts.join(' + ') || 'Variáveis do projeto',
      requiredArtifacts: dep.requiredArtifacts,
      optionalArtifacts: dep.optionalArtifacts,
      globalVariables: dep.globalVariables,
      outputArtifact: dep.outputArtifact,
    };
    return acc;
  },
  {} as Record<number, any>
);

export interface BuiltContextPack {
  formattedText: string;
  snapshotsIncluded: { key: string; label: string; value: string; status: string }[];
  artifactsIncluded: { artifactId: string; versionName: string; versionId: string; isRequired: boolean }[];
  authorityInstruction?: string;
  hasMissingRequiredArtifacts: boolean;
  missingArtifactIds: string[];
}

export function buildContextPack(
  config: ContextPackConfig | undefined,
  artifactVersions: ArtifactVersion[],
  projectState: ProjectStateV2
): BuiltContextPack {
  if (!config) {
    return {
      formattedText: 'Nenhum contexto prévio necessário para esta atividade.',
      snapshotsIncluded: [],
      artifactsIncluded: [],
      hasMissingRequiredArtifacts: false,
      missingArtifactIds: [],
    };
  }

  const sections: string[] = [];
  const snapshotsIncluded: { key: string; label: string; value: string; status: string }[] = [];
  const artifactsIncluded: { artifactId: string; versionName: string; versionId: string; isRequired: boolean }[] = [];
  const missingArtifactIds: string[] = [];

  const findLatestConsolidatedArtifact = (artId: string): ArtifactVersion | undefined => {
    return artifactVersions
      .filter((v) => (v.artifactId === artId || v.id === artId) && v.status === 'CONSOLIDADO')
      .sort((a, b) => b.versionNumber - a.versionNumber)[0];
  };

  if (config.requiredArtifacts && config.requiredArtifacts.length > 0) {
    const reqLines: string[] = [];
    reqLines.push('--- ARTEFATOS OBRIGATÓRIOS CONSOLIDADOS (V2.2) ---');
    for (const artId of config.requiredArtifacts) {
      const version = findLatestConsolidatedArtifact(artId);
      const displayName = ARTIFACT_CANONICAL_NAMES[artId] || artId;
      if (version) {
        reqLines.push(`[ARTEFATO: ${version.versionName.toUpperCase()}]`);
        reqLines.push(version.content);
        reqLines.push('');
        artifactsIncluded.push({
          artifactId: artId,
          versionName: version.versionName,
          versionId: version.id,
          isRequired: true,
        });
      } else {
        missingArtifactIds.push(artId);
        reqLines.push(`[ATENÇÃO: Artefato obrigatório "${displayName}" pendente de consolidação pela equipe. Prossiga sem inventar dados.]`);
      }
    }
    sections.push(reqLines.join('\n'));
  }

  sections.push(
    '--- REGRAS DE AUTORIDADE E CONFIANÇA DO CONTEXTO (V2.2) ---\n' +
    '1. 1º Nível: Decisão humana explícita mais recente.\n' +
    '2. 2º Nível: Versões consolidadas dos artefatos canônicos.\n' +
    '3. 3º Nível: Evidências reais observadas em campo.\n' +
    '4. 4º Nível: Hipóteses em validação (nunca promova hipótese a fato).\n' +
    '5. Regra anti-alucinação: Não invente feedbacks ou validações externas.'
  );

  return {
    formattedText: sections.join('\n\n'),
    snapshotsIncluded,
    artifactsIncluded,
    authorityInstruction: config.authorityInstructions,
    hasMissingRequiredArtifacts: missingArtifactIds.length > 0,
    missingArtifactIds,
  };
}
