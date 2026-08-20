import { ArtifactVersion, ContextPackConfig, ProjectStateV2 } from '../types/workshop';

export interface BuiltContextPack {
  formattedText: string;
  snapshotsIncluded: { key: string; label: string; value: string; status: string }[];
  artifactsIncluded: { artifactId: string; versionName: string; versionId: string; isRequired: boolean }[];
  authorityInstruction?: string;
  hasMissingRequiredArtifacts: boolean;
  missingArtifactIds: string[];
}

export interface PromptDependencyV3 {
  promptNumber: number;
  promptId: string;
  title: string;
  encounterId: 1 | 2 | 3 | 4;
  encounterTitle: string;
  movement?: string;
  inputPrincipalDescription: string;
  requiredArtifacts: string[];
  optionalArtifacts: string[];
  globalVariables: string[];
  outputArtifact: string;
}

// Canonical V3.2 Prompt Dependency Matrix (Contexto Mínimo Suficiente)
export const V3_PROMPT_DEPENDENCIES: Record<number, PromptDependencyV3> = {
  1: {
    promptNumber: 1,
    promptId: 'prompt-01',
    title: 'Diagnóstico do Problema',
    encounterId: 1,
    encounterTitle: 'Encontro 1 — INVESTIGAR',
    movement: 'INVESTIGAR',
    inputPrincipalDescription: 'Problema escolhido humanamente pela equipe no Brainstorm inicial ({PROBLEMA})',
    requiredArtifacts: [],
    optionalArtifacts: ['BANCO_DE_IDEIAS'],
    globalVariables: ['PROBLEMA', 'NOME_DO_PROJETO', 'PUBLICO_ALVO'],
    outputArtifact: 'DIAGNOSTICO_DO_PROBLEMA',
  },
  2: {
    promptNumber: 2,
    promptId: 'prompt-02',
    title: 'Círculo Dourado (Golden Circle) — Por quê? Como? O quê?',
    encounterId: 1,
    encounterTitle: 'Encontro 1 — INVESTIGAR',
    movement: 'INVESTIGAR → DIREÇÃO DE SOLUÇÃO',
    inputPrincipalDescription: 'Diagnóstico do Problema ({DIAGNOSTICO_DO_PROBLEMA})',
    requiredArtifacts: ['DIAGNOSTICO_DO_PROBLEMA'],
    optionalArtifacts: ['BANCO_DE_IDEIAS'],
    globalVariables: ['NOME_DO_PROJETO'],
    outputArtifact: 'GOLDEN_CIRCLE',
  },
  3: {
    promptNumber: 3,
    promptId: 'prompt-03',
    title: 'Construção do Briefing V0',
    encounterId: 2,
    encounterTitle: 'Encontro 2 — DEFINIR E MATERIALIZAR',
    movement: 'DEFINIR E MATERIALIZAR',
    inputPrincipalDescription: 'Diagnóstico do Problema + Círculo Dourado',
    requiredArtifacts: ['DIAGNOSTICO_DO_PROBLEMA', 'GOLDEN_CIRCLE'],
    optionalArtifacts: [],
    globalVariables: [],
    outputArtifact: 'BRIEFING_V0',
  },
  4: {
    promptNumber: 4,
    promptId: 'prompt-04',
    title: 'Revisão Crítica e Briefing V1',
    encounterId: 2,
    encounterTitle: 'Encontro 2 — DEFINIR E MATERIALIZAR',
    movement: 'DEFINIR E MATERIALIZAR',
    inputPrincipalDescription: 'Briefing V0 ({BRIEFING_V0})',
    requiredArtifacts: ['BRIEFING_V0'],
    optionalArtifacts: [],
    globalVariables: [],
    outputArtifact: 'BRIEFING_V1',
  },
  5: {
    promptNumber: 5,
    promptId: 'prompt-05',
    title: 'PRD V0 — Como a Solução Precisa Funcionar',
    encounterId: 2,
    encounterTitle: 'Encontro 2 — DEFINIR E MATERIALIZAR',
    movement: 'DEFINIR E MATERIALIZAR',
    inputPrincipalDescription: 'Briefing V1 ({BRIEFING_V1})',
    requiredArtifacts: ['BRIEFING_V1'],
    optionalArtifacts: [],
    globalVariables: [],
    outputArtifact: 'PRD_V0',
  },
  6: {
    promptNumber: 6,
    promptId: 'prompt-06',
    title: 'Definição do MVP',
    encounterId: 2,
    encounterTitle: 'Encontro 2 — DEFINIR E MATERIALIZAR',
    movement: 'DEFINIR E MATERIALIZAR',
    inputPrincipalDescription: 'Briefing V1 + PRD V0',
    requiredArtifacts: ['BRIEFING_V1', 'PRD_V0'],
    optionalArtifacts: [],
    globalVariables: [],
    outputArtifact: 'MVP',
  },
  7: {
    promptNumber: 7,
    promptId: 'prompt-07',
    title: 'Do MVP ao Protótipo V0',
    encounterId: 2,
    encounterTitle: 'Encontro 2 — DEFINIR E MATERIALIZAR',
    movement: 'DEFINIR E MATERIALIZAR',
    inputPrincipalDescription: 'MVP + PRD V0',
    requiredArtifacts: ['MVP', 'PRD_V0'],
    optionalArtifacts: [],
    globalVariables: [],
    outputArtifact: 'PROTOTIPO_V0',
  },
  8: {
    promptNumber: 8,
    promptId: 'prompt-08',
    title: 'Planejamento do Teste e Coleta de Evidências',
    encounterId: 2,
    encounterTitle: 'Encontro 2 — DEFINIR E MATERIALIZAR',
    movement: 'DEFINIR E MATERIALIZAR → VALIDAR',
    inputPrincipalDescription: 'MVP + Protótipo V0',
    requiredArtifacts: ['MVP', 'PROTOTIPO_V0'],
    optionalArtifacts: [],
    globalVariables: [],
    outputArtifact: 'PLANO_DE_TESTE',
  },
  9: {
    promptNumber: 9,
    promptId: 'prompt-09',
    title: 'Síntese de Evidências',
    encounterId: 3,
    encounterTitle: 'Encontro 3 — VALIDAR E EVOLUIR',
    movement: 'VALIDAR E EVOLUIR',
    inputPrincipalDescription: 'Protótipo V0 + Plano de Teste + Evidências Brutas',
    requiredArtifacts: ['PROTOTIPO_V0', 'PLANO_DE_TESTE', 'EVIDENCIAS_BRUTAS'],
    optionalArtifacts: [],
    globalVariables: [],
    outputArtifact: 'SINTESE_DE_EVIDENCIAS',
  },
  10: {
    promptNumber: 10,
    promptId: 'prompt-10',
    title: 'Modelo de Sustentabilidade — Business Model Canvas (BMC)',
    encounterId: 3,
    encounterTitle: 'Encontro 3 — VALIDAR E EVOLUIR',
    movement: 'VALIDAR E EVOLUIR',
    inputPrincipalDescription: 'Briefing V1 + MVP',
    requiredArtifacts: ['BRIEFING_V1', 'MVP'],
    optionalArtifacts: ['SINTESE_DE_EVIDENCIAS'],
    globalVariables: [],
    outputArtifact: 'BMC',
  },
  11: {
    promptNumber: 11,
    promptId: 'prompt-11',
    title: 'Roadmap: Agora, Depois e Futuramente',
    encounterId: 3,
    encounterTitle: 'Encontro 3 — VALIDAR E EVOLUIR',
    movement: 'VALIDAR E EVOLUIR',
    inputPrincipalDescription: 'MVP + Protótipo V0 + BMC',
    requiredArtifacts: ['MVP', 'PROTOTIPO_V0', 'BMC'],
    optionalArtifacts: ['SINTESE_DE_EVIDENCIAS'],
    globalVariables: [],
    outputArtifact: 'ROADMAP',
  },
  12: {
    promptNumber: 12,
    promptId: 'prompt-12',
    title: 'Evolução do Protótipo: V0 → V1',
    encounterId: 3,
    encounterTitle: 'Encontro 3 — VALIDAR E EVOLUIR',
    movement: 'VALIDAR E EVOLUIR',
    inputPrincipalDescription: 'MVP + Protótipo V0 + Roadmap',
    requiredArtifacts: ['MVP', 'PROTOTIPO_V0', 'ROADMAP'],
    optionalArtifacts: ['SINTESE_DE_EVIDENCIAS'],
    globalVariables: [],
    outputArtifact: 'PROTOTIPO_V1',
  },
  13: {
    promptNumber: 13,
    promptId: 'prompt-13',
    title: 'Construção do Pitch',
    encounterId: 4,
    encounterTitle: 'Encontro 4 — COMUNICAR E REFLETIR',
    movement: 'COMUNICAR E REFLETIR',
    inputPrincipalDescription: 'Briefing V1 + MVP + Protótipo V1 + Roadmap',
    requiredArtifacts: ['BRIEFING_V1', 'MVP', 'PROTOTIPO_V1', 'ROADMAP'],
    optionalArtifacts: ['SINTESE_DE_EVIDENCIAS', 'BMC'],
    globalVariables: [],
    outputArtifact: 'ESTRUTURA_DO_PITCH',
  },
  14: {
    promptNumber: 14,
    promptId: 'prompt-14',
    title: 'Roteiro Visual da Apresentação',
    encounterId: 4,
    encounterTitle: 'Encontro 4 — COMUNICAR E REFLETIR',
    movement: 'COMUNICAR E REFLETIR',
    inputPrincipalDescription: 'Pitch Integral + Estrutura do Pitch',
    requiredArtifacts: ['PITCH_INTEGRAL', 'ESTRUTURA_DO_PITCH'],
    optionalArtifacts: ['PROTOTIPO_V1'],
    globalVariables: [],
    outputArtifact: 'ROTEIRO_VISUAL',
  },
  15: {
    promptNumber: 15,
    promptId: 'prompt-15',
    title: 'Ensaio e Refinamento do Pitch',
    encounterId: 4,
    encounterTitle: 'Encontro 4 — COMUNICAR E REFLETIR',
    movement: 'COMUNICAR E REFLETIR',
    inputPrincipalDescription: 'Pitch Integral + Síntese do Pitch',
    requiredArtifacts: ['PITCH_INTEGRAL', 'SINTESE_DO_PITCH'],
    optionalArtifacts: ['ROTEIRO_VISUAL'],
    globalVariables: [],
    outputArtifact: 'PITCH_REVISADO',
  },
};

const ARTIFACT_DISPLAY_NAMES: Record<string, string> = {
  DIAGNOSTICO_DO_PROBLEMA: 'Diagnóstico do Problema',
  diagnostico: 'Diagnóstico do Problema',
  GOLDEN_CIRCLE: 'Círculo Dourado (Golden Circle)',
  'golden-circle': 'Círculo Dourado (Golden Circle)',
  BANCO_DE_IDEIAS: 'Banco de Ideias',
  BRIEFING_V0: 'Briefing V0',
  briefing: 'Briefing do Projeto',
  REVISAO_DO_BRIEFING: 'Revisão Crítica do Briefing',
  BRIEFING_V1: 'Briefing V1',
  PRD_V0: 'PRD V0 (Requisitos da Solução)',
  prd: 'PRD V0 (Requisitos da Solução)',
  MVP: 'Definição do MVP',
  SINTESE_DO_MVP: 'Síntese do MVP',
  mvp: 'Definição do MVP',
  PROTOTIPO_V0: 'Protótipo V0',
  prototipo: 'Protótipo Atual',
  PLANO_DE_TESTE: 'Plano de Teste e Coleta de Evidências',
  'user-tests': 'Plano de Teste e Coleta de Evidências',
  EVIDENCIAS_BRUTAS: 'Evidências Brutas de Teste',
  FEEDBACKS_BRUTOS: 'Evidências Brutas de Teste',
  SINTESE_DE_EVIDENCIAS: 'Síntese de Evidências',
  SINTESE_DOS_FEEDBACKS: 'Síntese de Evidências',
  'evidence-summary': 'Síntese de Evidências',
  BMC: 'Modelo de Sustentabilidade (BMC)',
  bmc: 'Modelo de Sustentabilidade (BMC)',
  ROADMAP: 'Roadmap de Evolução',
  roadmap: 'Roadmap de Evolução',
  REGISTRO_DE_EVOLUCAO: 'Registro de Evolução V0 → V1',
  PROTOTIPO_V1: 'Protótipo V1',
  ESTRUTURA_DO_PITCH: 'Estrutura do Pitch',
  PITCH_INTEGRAL: 'Pitch Integral',
  SINTESE_DO_PITCH: 'Síntese do Pitch',
  ROTEIRO_DO_PITCH: 'Pitch Integral',
  pitch: 'Pitch Integral',
  ROTEIRO_VISUAL: 'Roteiro Visual da Apresentação',
  APRESENTACAO_DO_PITCH: 'Roteiro Visual da Apresentação',
  presentation: 'Roteiro Visual da Apresentação',
  PITCH_REVISADO: 'Pitch Revisado',
  SINTESE_CRITICA_DO_PITCH: 'Síntese Crítica do Pitch',
  PREPARACAO_FINAL_DO_PITCH: 'Pitch Revisado + Síntese Crítica'
};

const FIELD_LABELS: Record<string, string> = {
  problem: 'PROBLEMA',
  audience: 'PÚBLICO-ALVO / USUÁRIOS',
  purpose: 'PROPÓSITO / OBJETIVO CENTRAL',
  solution: 'CONCEITO DA SOLUÇÃO',
  centralHypothesis: 'HIPÓTESE CENTRAL A TESTAR',
  requirements: 'REQUISITOS ESSENCIAIS',
  mvp: 'DEFINIÇÃO DE MVP',
  currentPrototype: 'PROTÓTIPO ATUAL',
  evidenceSummary: 'SÍNTESE DE EVIDÊNCIAS',
  sustainabilityModel: 'MODELO DE SUSTENTABILIDADE',
  roadmap: 'PRIORIDADES DO ROADMAP',
  pitch: 'NARRATIVA DO PITCH',
  diagnosisReviewSummary: 'RESUMO PARA REVISÃO DO DIAGNÓSTICO',
  mvpSummary: 'SÍNTESE DO MVP',
  rawEvidence: 'EVIDÊNCIAS BRUTAS DE TESTE',
  evolutionRecord: 'REGISTRO DE EVOLUÇÃO V0 → V1',
  pitchStructure: 'ESTRUTURA DO PITCH',
  pitchSummary: 'SÍNTESE DO PITCH',
  pitchRevised: 'PITCH REVISADO',
  pitchCriticalSynthesis: 'SÍNTESE CRÍTICA DO PITCH',
};

/**
 * Cleanly formats the separation between PROMPT and CONTEXTO DO PROJETO.
 */
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

/**
 * Builds the deterministic context text for any of the 15 V3.2 Prompts
 * using strictly the Contexto Mínimo Suficiente per the V3.2 Matrix.
 * 
 * Rules:
 * 1. Inject ONLY the inputs required by the V3.2 Matrix.
 * 2. Optional inputs are added ONLY if they exist and are non-empty.
 * 3. Never repeat previous artifacts already consolidated inside a newer artifact.
 * 4. Never inject drafts or superseded versions.
 * 5. If an input is absent, do not hallucinate; mark clearly as absent/pending so the IA asks for only what is missing.
 * 6. Never include intimate challenge mapping.
 */
export function buildV3PromptContext(
  promptNumber: number,
  localContext: Record<string, string>
): { formattedContext: string; includedArtifacts: string[]; missingArtifacts: string[] } {
  const dep = V3_PROMPT_DEPENDENCIES[promptNumber];
  if (!dep) {
    return { formattedContext: '', includedArtifacts: [], missingArtifacts: [] };
  }

  const sections: string[] = [];
  const includedArtifacts: string[] = [];
  const missingArtifacts: string[] = [];

  // 1. Global Project Variables (ONLY if explicitly in globalVariables for this prompt, e.g., P01, P02)
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

  // 2. Required Artifacts (Minimal inputs required by V3.2)
  if (dep.requiredArtifacts && dep.requiredArtifacts.length > 0) {
    const reqLines: string[] = [];
    dep.requiredArtifacts.forEach((artKey) => {
      let val = localContext[artKey]?.trim();
      // Legacy compatibility fallbacks
      if (!val && artKey === 'SINTESE_DE_EVIDENCIAS') {
        val = localContext['SINTESE_DOS_FEEDBACKS']?.trim();
      }
      if (!val && artKey === 'EVIDENCIAS_BRUTAS') {
        val = localContext['FEEDBACKS_BRUTOS']?.trim();
      }
      if (!val && artKey === 'PITCH_INTEGRAL') {
        val = localContext['ROTEIRO_DO_PITCH']?.trim();
      }
      if (!val && artKey === 'ROTEIRO_VISUAL') {
        val = localContext['APRESENTACAO_DO_PITCH']?.trim();
      }

      const displayName = ARTIFACT_DISPLAY_NAMES[artKey] || artKey;
      if (val) {
        reqLines.push(`[ARTEFATO CONSOLIDADO: ${displayName.toUpperCase()}]\n${val}\n`);
        includedArtifacts.push(displayName);
      } else {
        missingArtifacts.push(displayName);
        reqLines.push(`[ARTEFATO OBRIGATÓRIO: ${displayName.toUpperCase()}]\n(Não informado / Pendente de consolidação pela equipe. Solicite este insumo ou prossiga com perguntas focadas apenas nesta lacuna.)\n`);
      }
    });
    sections.push('--- ARTEFATOS DE ENTRADA OBRIGATÓRIOS (V3.2) ---\n' + reqLines.join('\n'));
  }

  // 3. Optional Artifacts (Included ONLY if present and explicitly useful according to V3.2)
  if (dep.optionalArtifacts && dep.optionalArtifacts.length > 0) {
    const optLines: string[] = [];
    dep.optionalArtifacts.forEach((artKey) => {
      let val = localContext[artKey]?.trim();
      if (!val && artKey === 'SINTESE_DE_EVIDENCIAS') {
        val = localContext['SINTESE_DOS_FEEDBACKS']?.trim();
      }
      const displayName = ARTIFACT_DISPLAY_NAMES[artKey] || artKey;
      if (val) {
        optLines.push(`[ARTEFATO COMPLEMENTAR: ${displayName.toUpperCase()}]\n${val}\n`);
        includedArtifacts.push(displayName);
      }
    });
    if (optLines.length > 0) {
      sections.push('--- ARTEFATOS COMPLEMENTARES ---\n' + optLines.join('\n'));
    }
  }

  // 4. Compact Authority Guardrail (Prevents hallucination without token bloat)
  sections.push(
    '--- REGRAS DE AUTORIDADE DO CONTEXTO (V3.2) ---\n' +
    '1. As informações acima foram decididas e consolidadas humanamente pela equipe.\n' +
    '2. Não invente evidências, usuários, números, testes ou resultados adicionais.\n' +
    '3. Respeite as fronteiras entre o que foi observado/decidido e o que ainda é hipótese em aberto.'
  );

  return {
    formattedContext: sections.join('\n\n'),
    includedArtifacts,
    missingArtifacts,
  };
}

/**
 * Builds the workshop activity context pack (deterministic mapping from ArtifactVersion[] and ProjectStateV2).
 * Follows Contexto Mínimo Suficiente (no duplicate representations, no obsolete versions, no bloated snapshots).
 */
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

  // Helper to find latest consolidated artifact version by artifactId
  const findLatestConsolidatedArtifact = (artId: string): ArtifactVersion | undefined => {
    return artifactVersions
      .filter((v) => (v.artifactId === artId || v.id === artId) && v.status === 'CONSOLIDADO')
      .sort((a, b) => b.versionNumber - a.versionNumber)[0];
  };

  // 1. Required Artifacts (Minimal official inputs)
  if (config.requiredArtifacts && config.requiredArtifacts.length > 0) {
    const reqLines: string[] = [];
    reqLines.push('--- ARTEFATOS OBRIGATÓRIOS CONSOLIDADOS ---');
    for (const artId of config.requiredArtifacts) {
      const version = findLatestConsolidatedArtifact(artId);
      const displayName = ARTIFACT_DISPLAY_NAMES[artId] || artId;
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
        reqLines.push(`[ATENÇÃO: Artefato obrigatório "${displayName}" ainda não foi consolidado pela equipe. Prossiga solicitando apenas o contexto mínimo ausente sem inventar dados.]`);
      }
    }
    sections.push(reqLines.join('\n'));
  }

  // 2. Optional Artifacts (Only if existing and non-redundant)
  if (config.optionalArtifacts && config.optionalArtifacts.length > 0) {
    const optLines: string[] = [];
    for (const artId of config.optionalArtifacts) {
      const version = findLatestConsolidatedArtifact(artId);
      if (version) {
        optLines.push(`[ARTEFATO COMPLEMENTAR: ${version.versionName.toUpperCase()}]`);
        optLines.push(version.content);
        optLines.push('');
        artifactsIncluded.push({
          artifactId: artId,
          versionName: version.versionName,
          versionId: version.id,
          isRequired: false,
        });
      }
    }
    if (optLines.length > 0) {
      sections.push('--- ARTEFATOS COMPLEMENTARES ---\n' + optLines.join('\n'));
    }
  }

  // 3. Compact Snapshot (Only included if no required artifacts are present or explicitly requested for early activities)
  const hasArtifacts = artifactsIncluded.length > 0;
  if (config.snapshotFields && config.snapshotFields.length > 0 && (!hasArtifacts || config.snapshotFields.length <= 3)) {
    const snapshotLines: string[] = [];

    for (const fieldKey of config.snapshotFields) {
      const claim = (projectState as Record<string, any>)[fieldKey];
      const label = FIELD_LABELS[fieldKey] || fieldKey.toUpperCase();

      if (claim && claim.value && claim.value.trim() !== '') {
        const statusTag = claim.epistemologicalStatus ? `[${claim.epistemologicalStatus}]` : '[REGISTRADO]';
        snapshotLines.push(`• ${label} ${statusTag}: ${claim.value.trim()}`);

        snapshotsIncluded.push({
          key: fieldKey,
          label,
          value: claim.value.trim(),
          status: claim.epistemologicalStatus || 'REGISTRADO',
        });
      }
    }

    if (snapshotLines.length > 0) {
      sections.push('--- ESTADO PONTUAL DO PROJETO ---\n' + snapshotLines.join('\n'));
    }
  }

  // 4. Epistemological Authority Hierarchy Instructions (V3.2 Compact)
  sections.push(
    '--- REGRAS DE AUTORIDADE E CONFIANÇA DO CONTEXTO (V3.2) ---\n' +
    '1. MAIOR AUTORIDADE: Artefatos explicitamente consolidados pela equipe.\n' +
    '2. REGRA DE PREVALÊNCIA: Versões consolidadas mais recentes prevalecem sobre resumos antigos.\n' +
    '3. REGRA ANTI-ALUCINAÇÃO: Não invente dados, números ou feedbacks. Não promova hipóteses a fatos sem validação humana.'
  );

  if (config.authorityInstructions) {
    sections.push(config.authorityInstructions);
  }

  return {
    formattedText: sections.join('\n\n'),
    snapshotsIncluded,
    artifactsIncluded,
    authorityInstruction: config.authorityInstructions,
    hasMissingRequiredArtifacts: missingArtifactIds.length > 0,
    missingArtifactIds,
  };
}
