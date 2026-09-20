/**
 * CONTEXT PACK BUILDER V2.3
 * Workshop Inteligência Artificial Aplicada: do Problema ao Protótipo
 *
 * Contrato arquitetural V2.3:
 * - Leitura dinâmica da Fonte Única de Verdade (`CANONICAL_ACTIVITIES_V2`).
 * - Interpolação autoritativa estrita com extração estruturada do AF01 (V2.3 e legado V2.2).
 * - Suporte completo a todas as variáveis canônicas ({AF01_CONSOLIDADO}, {PROBLEMA_ESCOLHIDO_AF01}, {JUSTIFICATIVA_AF01}, {PESSOAS_AFETADAS_AF01}, etc.).
 * - Validador de prompts contra placeholders residuais não resolvidos.
 * - Gating cognitivo amigável: alerta em caso de falha de interpolação sem perda de dados.
 */

import { ActivityId, ArtifactId, DependencyLevel, ProjectStateV2 } from '../types/canonicalV2';
import { getCanonicalActivityById } from '../data/canonicalJourney';
import { getCanonicalPromptById } from '../data/canonicalPrompts';
import { getArtifactDefinitionById } from '../data/canonicalArtifacts';
import { resolveEffectiveBriefing } from './artifactStore';
import { parseAF01Text } from './af01Parser';

export interface ContextPackDependencyStatus {
  artifactId: ArtifactId;
  effectiveArtifactId: ArtifactId;
  title: string;
  level: DependencyLevel;
  description?: string;
  isAvailable: boolean;
  contentSnippet: string;
  isSupersededByNewerVersion?: boolean;
}

export interface PromptValidationResult {
  isValid: boolean;
  isReady: boolean;
  unresolvedPlaceholders: string[];
  missingRequiredArtifacts: string[];
  errorMessage?: string;
}

export interface ContextPackV2 {
  activityId: ActivityId;
  activityTitle: string;
  promptId?: string;
  promptTitle?: string;
  rawPromptTemplate?: string;
  interpolatedPrompt?: string;
  dependencies: ContextPackDependencyStatus[];
  hasMissingRequired: boolean;
  hasMissingRecommended: boolean;
  missingRequiredList: ContextPackDependencyStatus[];
  missingRecommendedList: ContextPackDependencyStatus[];
  assembledContextBlock: string;
  validation: PromptValidationResult;
  isPromptReady: boolean;
}

/**
 * Constrói o Context Pack para uma atividade com base no ProjectStateV2 ou store de artefatos.
 */
export function buildContextPackV2(
  activityId: ActivityId,
  projectState: ProjectStateV2
): ContextPackV2 {
  const activity = getCanonicalActivityById(activityId);
  const prompt = activity.promptId ? getCanonicalPromptById(activity.promptId) : undefined;
  const rawArtifacts = projectState.artifacts || {};

  // Avaliação com respeito à autoridade de versões
  const depStatuses: ContextPackDependencyStatus[] = activity.dependencies.map((dep) => {
    let effectiveId: ArtifactId = dep.artifactId;
    let isSuperseded = false;

    // Regra de autoridade do Briefing: se requer Briefing V0 (AF05), verifica se V1 (AF06) já existe
    if (dep.artifactId === 'AF05') {
      const briefing = resolveEffectiveBriefing(rawArtifacts as any);
      if (briefing.isAuthoritative && briefing.hasAuditedV1) {
        effectiveId = 'AF06';
        isSuperseded = true;
      }
    }

    const artifactDef = getArtifactDefinitionById(effectiveId);
    const state = rawArtifacts[effectiveId];
    const hasContent = Boolean(state && state.content && state.content.trim().length > 10);
    const rawContent = state?.content || '';

    return {
      artifactId: dep.artifactId,
      effectiveArtifactId: effectiveId,
      title: artifactDef?.title || effectiveId,
      level: dep.level,
      description: dep.description,
      isAvailable: hasContent,
      contentSnippet: hasContent ? rawContent.slice(0, 160) + (rawContent.length > 160 ? '...' : '') : '',
      isSupersededByNewerVersion: isSuperseded
    };
  });

  const missingRequired = depStatuses.filter((d) => d.level === 'required_input' && !d.isAvailable);
  const missingRecommended = depStatuses.filter((d) => d.level === 'recommended_context' && !d.isAvailable);

  // Montagem do bloco estruturado de contexto do projeto
  const contextLines: string[] = [];
  contextLines.push(`## CONTEXTO DO PROJETO`);
  contextLines.push(`PROJETO: ${projectState.projectName || 'Projeto da Equipe'}`);
  contextLines.push(`EQUIPE: ${projectState.projectContext.teamName || 'Equipe'}`);
  contextLines.push(`PROBLEMA INICIAL: ${projectState.projectContext.problemSummary || 'A definir'}`);
  contextLines.push(`PÚBLICO: ${projectState.projectContext.targetAudience || 'A definir'}`);
  if (projectState.projectContext.territory) {
    contextLines.push(`TERRITÓRIO/LOCAL: ${projectState.projectContext.territory}`);
  }

  // Anexa artefatos disponíveis de forma estruturada e autoritativa
  depStatuses.forEach((dep) => {
    if (dep.isAvailable) {
      const state = rawArtifacts[dep.effectiveArtifactId];
      const originNotice = state?.origin === 'world_real' ? ' [EVIDÊNCIA COLETADA NO MUNDO REAL]' : '';
      const authorityNotice = dep.isSupersededByNewerVersion ? ' [VERSÃO V1 AUDITADA E AUTORITATIVA]' : '';
      contextLines.push(`\n### ${dep.title} (${dep.effectiveArtifactId})${originNotice}${authorityNotice}`);
      contextLines.push(state?.content || '');
    }
  });

  const assembledContextBlock = contextLines.join('\n');

  // Interpolação de variáveis no template do prompt oficial
  let interpolated = prompt?.templatePrompt || '';
  if (prompt) {
    // Variáveis universais de contexto
    const teamContextStr = `Equipe: ${projectState.projectContext.teamName || 'Equipe de Jovens'} | Público-alvo: ${projectState.projectContext.targetAudience || 'Não especificado'} | Território: ${projectState.projectContext.territory || 'Escola / Comunidade'}`;
    interpolated = interpolated.replace(/{CONTEXTO_DA_TURMA}/g, teamContextStr);
    interpolated = interpolated.replace(/{CONTEXTO_DA_EQUIPE}/g, teamContextStr);
    interpolated = interpolated.replace(/{DESAFIOS_OBSERVADOS}/g, projectState.projectContext.problemSummary || 'Desafios observados no cotidiano da escola e comunidade.');
    interpolated = interpolated.replace(/{PROBLEMA}/g, projectState.projectContext.problemSummary || 'Problema da equipe');

    // Helper seguro para recuperação de artefato
    const getArt = (id: ArtifactId) => rawArtifacts[id]?.content || '';

    // Extração estruturada do AF01
    const af01Raw = getArt('AF01');
    const af01Parsed = parseAF01Text(af01Raw);
    const af01HasContent = Boolean(af01Raw && af01Raw.trim().length > 10);

    // Substituição das variáveis relacionadas a AF01
    const af01ConsolidadoText = af01HasContent
      ? af01Raw
      : '[O ponto de partida (AF01) ainda não foi consolidado no webapp]';

    interpolated = interpolated.replace(/{AF01_CONSOLIDADO}/g, af01ConsolidadoText);
    interpolated = interpolated.replace(/{AF01}/g, af01ConsolidadoText);
    interpolated = interpolated.replace(/{MAPA_PROBLEMAS}/g, af01ConsolidadoText);
    interpolated = interpolated.replace(/{PROBLEMA_ESCOLHIDO}/g, af01Parsed.currentGapOrProblem || af01Parsed.whatMovesUs || af01ConsolidadoText);
    interpolated = interpolated.replace(/{PROBLEMA_AF01}/g, af01Parsed.currentGapOrProblem || af01Parsed.whatMovesUs || af01ConsolidadoText);
    interpolated = interpolated.replace(/{PROBLEMA_ESCOLHIDO_AF01}/g, af01Parsed.currentGapOrProblem || af01Parsed.whatMovesUs || af01ConsolidadoText);
    interpolated = interpolated.replace(/{JUSTIFICATIVA_AF01}/g, af01Parsed.humanMotivation || 'Motivação da equipe pelo impacto positivo');
    interpolated = interpolated.replace(/{PESSOAS_AFETADAS_AF01}/g, af01Parsed.peopleInvolvedOrAffected || af01Parsed.scaleAndContext || 'Pessoas da comunidade escolar e local');
    interpolated = interpolated.replace(/{SONHO_AF01}/g, af01Parsed.desiredState || 'Realidade desejada pela equipe');

    // AF02
    const af02Text = getArt('AF02') || (missingRequired.some(d => d.artifactId === 'AF02') ? '[Diagnóstico AF02 ainda não preenchido]' : '[Diagnóstico a consolidar]');
    interpolated = interpolated.replace(/{DIAGNOSTICO_DO_PROBLEMA}/g, af02Text);
    interpolated = interpolated.replace(/{DIAGNOSTICO_AF02}/g, af02Text);

    // AF03
    const af03Text = getArt('AF03') || '[Mapa de recursos AF03 a consolidar]';
    interpolated = interpolated.replace(/{MAPA_RECURSOS}/g, af03Text);
    interpolated = interpolated.replace(/{RECURSOS_AF03}/g, af03Text);

    // AF04
    const af04Text = getArt('AF04') || '[Propósito e direção AF04 a consolidar]';
    interpolated = interpolated.replace(/{PROPOSITO_E_DIRECAO}/g, af04Text);
    interpolated = interpolated.replace(/{PROPOSITO_AF04}/g, af04Text);

    // AF05 e AF06 (Briefing)
    const briefing = resolveEffectiveBriefing(rawArtifacts as any);
    const effectiveBriefingText = briefing.content || '[Briefing ainda não registrado no projeto]';
    const af05Text = getArt('AF05') || effectiveBriefingText;
    const af06Text = getArt('AF06') || effectiveBriefingText;

    interpolated = interpolated.replace(/{BRIEFING_V0}/g, af05Text);
    interpolated = interpolated.replace(/{BRIEFING_V0_AF05}/g, af05Text);
    interpolated = interpolated.replace(/{BRIEFING_V1}/g, af06Text);
    interpolated = interpolated.replace(/{BRIEFING_V1_AF06}/g, af06Text);
    interpolated = interpolated.replace(/{BRIEFING}/g, effectiveBriefingText);

    // AF07
    const af07Text = getArt('AF07') || '[Especificação / PRD AF07 a consolidar]';
    interpolated = interpolated.replace(/{PRD}/g, af07Text);
    interpolated = interpolated.replace(/{ESPECIFICACAO_FUNCIONAMENTO}/g, af07Text);
    interpolated = interpolated.replace(/{ESPECIFICACAO_AF07}/g, af07Text);

    // AF08
    const af08Text = getArt('AF08') || '[Protótipo V0 AF08 a consolidar]';
    interpolated = interpolated.replace(/{MVP_PROTOTIPO_V0}/g, af08Text);
    interpolated = interpolated.replace(/{PLANO_REALIZACAO}/g, af08Text);
    interpolated = interpolated.replace(/{PROTOTIPO_AF08}/g, af08Text);

    // AF09
    const af09Text = getArt('AF09') || '[Evidências dos testes AF09 a consolidar]';
    interpolated = interpolated.replace(/{TESTES_E_EVOLUCAO}/g, af09Text);
    interpolated = interpolated.replace(/{EVIDENCIAS_DOS_TESTES}/g, af09Text);
    interpolated = interpolated.replace(/{APRENDIZADOS_AF09}/g, af09Text);
    interpolated = interpolated.replace(/{EVOLUCAO_AF09}/g, af09Text);

    // AF10
    const af10Text = getArt('AF10') || '[Modelo de sustentabilidade AF10 a consolidar]';
    interpolated = interpolated.replace(/{MODELO_DE_SUSTENTABILIDADE}/g, af10Text);
    interpolated = interpolated.replace(/{SUSTENTABILIDADE_AF10}/g, af10Text);

    // AF11
    const af11Text = getArt('AF11') || '[Roadmap e linha do tempo AF11 a consolidar]';
    interpolated = interpolated.replace(/{ROADMAP}/g, af11Text);
    interpolated = interpolated.replace(/{LINHA_DO_TEMPO_7_ETAPAS}/g, af11Text);

    // AF12
    const af12Text = getArt('AF12') || '[Pitch e comunicação AF12 a consolidar]';
    interpolated = interpolated.replace(/{PITCH_V1}/g, af12Text);
    interpolated = interpolated.replace(/{KIT_COMUNICACAO_FINAL}/g, af12Text);
    interpolated = interpolated.replace(/{ROTEIRO_VISUAL}/g, af12Text);

    // Contexto acumulado
    interpolated = interpolated.replace(/{CONTEXTO_ANTERIOR}/g, assembledContextBlock);
    interpolated = interpolated.replace(/{CONTEXTO_ATUAL_DO_PROJETO}/g, assembledContextBlock);
    interpolated = interpolated.replace(/{CONTEXTO_COMPLETO_PROJETO}/g, assembledContextBlock);
  }

  // Validador de Integridade de Prompt
  const unresolvedMatches = Array.from(new Set(interpolated.match(/\{[A-Z0-9_]+\}/g) || []));
  const hasMissingReq = missingRequired.length > 0;

  let validationErrorMessage: string | undefined = undefined;
  if (hasMissingReq) {
    const missingNames = missingRequired.map((d) => d.title).join(', ');
    validationErrorMessage = `O contexto da etapa anterior (${missingNames}) não foi consolidado no projeto. Seu trabalho não foi apagado. Volte à etapa anterior, confirme a consolidação e gere o prompt novamente.`;
  } else if (unresolvedMatches.length > 0) {
    validationErrorMessage = `Não foi possível preparar este prompt: variáveis de contexto não resolvidas (${unresolvedMatches.join(', ')}).`;
  }

  const isReady = !hasMissingReq && unresolvedMatches.length === 0;

  const validation: PromptValidationResult = {
    isValid: unresolvedMatches.length === 0,
    isReady,
    unresolvedPlaceholders: unresolvedMatches,
    missingRequiredArtifacts: missingRequired.map((d) => d.artifactId),
    errorMessage: validationErrorMessage
  };

  return {
    activityId,
    activityTitle: activity.title,
    promptId: prompt?.id,
    promptTitle: prompt?.title,
    rawPromptTemplate: prompt?.templatePrompt,
    interpolatedPrompt: interpolated,
    dependencies: depStatuses,
    hasMissingRequired: hasMissingReq,
    hasMissingRecommended: missingRecommended.length > 0,
    missingRequiredList: missingRequired,
    missingRecommendedList: missingRecommended,
    assembledContextBlock,
    validation,
    isPromptReady: isReady
  };
}
