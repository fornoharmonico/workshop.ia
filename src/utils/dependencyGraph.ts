/**
 * DEPENDENCY GRAPH ENGINE — V2.2
 * Workshop Inteligência Artificial Aplicada: do Problema ao Protótipo
 *
 * Contrato arquitetural W1:
 * - Leitura dinâmica e estrita das dependências a partir de `CANONICAL_ACTIVITIES_V2`.
 * - Sem tabelas paralelas ou divergentes de dependências.
 * - Soft Gates pedagógicos (Zero Hard Gates):
 *   - Dependência requerida ausente -> Alerta forte com alternativas conscientes.
 *   - Dependência recomendada ausente -> Nota informativa leve.
 * - Suporte a Autoridade de Versões e rastreamento de impacto downstream.
 */

import { ActivityId, ArtifactId, DependencyLevel } from '../types/canonicalV2';
import { CANONICAL_ACTIVITIES_V2, CANONICAL_ACTIVITY_LIST_V2, getCanonicalActivityById } from '../data/canonicalJourney';
import { getArtifactDefinitionById } from '../data/canonicalArtifacts';
import { ArtifactStoreV2, getArtifactState, hasArtifactContent, resolveEffectiveBriefing } from './artifactStore';

export interface EvaluatedDependency {
  artifactId: ArtifactId;
  effectiveArtifactId: ArtifactId;
  title: string;
  level: DependencyLevel;
  description?: string;
  isSatisfied: boolean;
  contentSnippet?: string;
  isSupersededByNewerVersion?: boolean;
}

export interface ActivityDependencyReport {
  activityId: ActivityId;
  activityTitle: string;
  isReady: boolean;
  hasMissingRequired: boolean;
  hasMissingRecommended: boolean;
  required: EvaluatedDependency[];
  recommended: EvaluatedDependency[];
  missingRequired: EvaluatedDependency[];
  missingRecommended: EvaluatedDependency[];
  satisfied: EvaluatedDependency[];
}

/**
 * Avalia o status de dependências de uma atividade contra o Artifact Store atual.
 */
export function evaluateActivityDependencies(
  activityId: ActivityId,
  store: ArtifactStoreV2
): ActivityDependencyReport {
  const activity = getCanonicalActivityById(activityId);

  const evaluated: EvaluatedDependency[] = activity.dependencies.map((dep) => {
    let targetArtifactId = dep.artifactId;
    let isSuperseded = false;

    // Regra de autoridade de versões: se a dependência for AF05 (Briefing V0),
    // checa se AF06 (Briefing V1) já está autoritativo
    if (dep.artifactId === 'AF05') {
      const briefing = resolveEffectiveBriefing(store);
      if (briefing.isAuthoritative && briefing.hasAuditedV1) {
        targetArtifactId = 'AF06';
        isSuperseded = true;
      }
    }

    const def = getArtifactDefinitionById(targetArtifactId);
    const state = getArtifactState(store, targetArtifactId);
    const satisfied = hasArtifactContent(store, targetArtifactId);
    const snippet = satisfied ? state.content.slice(0, 160) + (state.content.length > 160 ? '...' : '') : undefined;

    return {
      artifactId: dep.artifactId,
      effectiveArtifactId: targetArtifactId,
      title: def.title,
      level: dep.level,
      description: dep.description,
      isSatisfied: satisfied,
      contentSnippet: snippet,
      isSupersededByNewerVersion: isSuperseded
    };
  });

  const required = evaluated.filter((d) => d.level === 'required_input');
  const recommended = evaluated.filter((d) => d.level === 'recommended_context');

  const missingRequired = required.filter((d) => !d.isSatisfied);
  const missingRecommended = recommended.filter((d) => !d.isSatisfied);
  const satisfied = evaluated.filter((d) => d.isSatisfied);

  return {
    activityId,
    activityTitle: activity.title,
    isReady: missingRequired.length === 0,
    hasMissingRequired: missingRequired.length > 0,
    hasMissingRecommended: missingRecommended.length > 0,
    required,
    recommended,
    missingRequired,
    missingRecommended,
    satisfied
  };
}

/**
 * Rastreia quais atividades downstream dependem diretamente de um determinado artefato.
 */
export function getDownstreamActivitiesForArtifact(artifactId: ArtifactId): Array<{
  activityId: ActivityId;
  title: string;
  level: DependencyLevel;
}> {
  const downstream: Array<{
    activityId: ActivityId;
    title: string;
    level: DependencyLevel;
  }> = [];

  CANONICAL_ACTIVITY_LIST_V2.forEach((act) => {
    const match = act.dependencies.find((d) => d.artifactId === artifactId);
    if (match) {
      downstream.push({
        activityId: act.id,
        title: act.title,
        level: match.level
      });
    }
  });

  return downstream;
}

/**
 * Validação estrutural do grafo de dependências canônico.
 * Garante que todos os artefatos referenciados existem e não há ciclos de dependência.
 */
export function validateCanonicalDependencyGraph(): {
  isValid: boolean;
  totalActivities: number;
  totalDependencies: number;
  errors: string[];
} {
  const errors: string[] = [];
  let totalDependencies = 0;

  CANONICAL_ACTIVITY_LIST_V2.forEach((act) => {
    act.dependencies.forEach((dep) => {
      totalDependencies++;
      // Verifica se o artefato existe
      const def = getArtifactDefinitionById(dep.artifactId);
      if (!def) {
        errors.push(`Atividade ${act.id} faz referência a artefato inexistente: ${dep.artifactId}`);
      }
    });
  });

  return {
    isValid: errors.length === 0,
    totalActivities: CANONICAL_ACTIVITY_LIST_V2.length,
    totalDependencies,
    errors
  };
}
