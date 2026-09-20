/**
 * CANONICAL ARTIFACTS REGISTRY V2 — FORNOLOGIA V2.2
 * 12 Artefatos Canônicos (AF01 a AF12) correspondendo estritamente às 12 Atividades (A01 a A12) e 12 Prompts (P01 a P12).
 * Nota de autoridade: AF06 substitui AF05 como versão autoritativa.
 */

import { CanonicalArtifactDefinitionV2, ArtifactId } from '../types/canonicalV2';

export const CANONICAL_ARTIFACTS_V2: Record<ArtifactId, CanonicalArtifactDefinitionV2> = {
  AF01: {
    id: 'AF01',
    title: 'Ponto de Partida: Sonho + Problema',
    shortName: 'Ponto de Partida',
    kind: 'document',
    origin: 'ai_supported',
    authority: 'authoritative',
    producedByActivityId: 'A01',
    macroMovement: 'investigar_direcionar',
    description: 'Tensão inicial entre sonho/realidade desejada e problema/distância da realidade atual, contexto e motivação humana.',
  },
  AF02: {
    id: 'AF02',
    title: 'Diagnóstico da Tensão de Projeto',
    shortName: 'Diagnóstico da Tensão',
    kind: 'document',
    origin: 'ai_supported',
    authority: 'authoritative',
    producedByActivityId: 'A02',
    macroMovement: 'investigar_direcionar',
    description: 'Compreensão aprofundada da distância entre a realidade atual e a desejada, separando rigorosamente observações, hipóteses e dúvidas, com critério de parada causal.',
  },
  AF03: {
    id: 'AF03',
    title: 'Mapa de Recursos',
    shortName: 'Mapa de Recursos',
    kind: 'document',
    origin: 'ai_supported',
    authority: 'authoritative',
    producedByActivityId: 'A03',
    macroMovement: 'investigar_direcionar',
    description: 'Mapeamento autoral comparando recursos disponíveis, necessários, mobilizáveis e lacunas nas dimensões cultural, social, ambiental e financeira.',
  },
  AF04: {
    id: 'AF04',
    title: 'Propósito e Direção',
    shortName: 'Propósito e Direção',
    kind: 'document',
    origin: 'ai_supported',
    authority: 'authoritative',
    producedByActivityId: 'A04',
    macroMovement: 'investigar_direcionar',
    description: 'Transformação pretendida, princípios inegociáveis de ação e direção pactuada para a solução.',
  },
  AF05: {
    id: 'AF05',
    title: 'Briefing V0',
    shortName: 'Briefing V0',
    kind: 'document',
    origin: 'ai_supported',
    authority: 'draft',
    producedByActivityId: 'A05',
    macroMovement: 'definir_materializar',
    description: 'Primeira amarração estruturada de problema, recursos, público e direção do projeto.',
  },
  AF06: {
    id: 'AF06',
    title: 'Briefing V1',
    shortName: 'Briefing V1',
    kind: 'document',
    origin: 'ai_supported',
    authority: 'authoritative',
    producedByActivityId: 'A06',
    macroMovement: 'definir_materializar',
    replacesArtifactId: 'AF05',
    description: 'Versão autoritativa consolidada após revisão crítica socrática e deliberação soberana da equipe.',
  },
  AF07: {
    id: 'AF07',
    title: 'Especificação de Funcionamento / PRD',
    shortName: 'Especificação / PRD',
    kind: 'document',
    origin: 'ai_supported',
    authority: 'authoritative',
    producedByActivityId: 'A07',
    macroMovement: 'definir_materializar',
    description: 'Jornada do usuário, requisitos essenciais (agora) vs. desejáveis (depois) e critérios de qualidade.',
  },
  AF08: {
    id: 'AF08',
    title: 'MVP + Protótipo V0',
    shortName: 'MVP + Protótipo V0',
    kind: 'prototype',
    origin: 'ai_supported',
    authority: 'authoritative',
    producedByActivityId: 'A08',
    macroMovement: 'definir_materializar',
    description: 'Hipótese central do MVP, formato de protótipo adequado ao projeto e Plano de Realização completo.',
  },
  AF09: {
    id: 'AF09',
    title: 'Testes, Aprendizados e Plano de Evolução V0→V1',
    shortName: 'Testes e Evolução',
    kind: 'evidence',
    origin: 'world_real',
    authority: 'authoritative',
    producedByActivityId: 'A09',
    macroMovement: 'validar_evoluir',
    description: 'Planejamento do teste, acolhimento honesto de evidências de campo, análise crítica e plano V0→V1.',
  },
  AF10: {
    id: 'AF10',
    title: 'Modelo de Sustentabilidade',
    shortName: 'Modelo de Sustentabilidade',
    kind: 'document',
    origin: 'ai_supported',
    authority: 'authoritative',
    producedByActivityId: 'A10',
    macroMovement: 'validar_evoluir',
    description: 'Estruturação autoral de sustentabilidade plural, valor gerado e continuidade da solução.',
  },
  AF11: {
    id: 'AF11',
    title: 'Roadmap + Linha do Tempo em 7 Etapas',
    shortName: 'Roadmap + Linha do Tempo',
    kind: 'document',
    origin: 'ai_supported',
    authority: 'authoritative',
    producedByActivityId: 'A11',
    macroMovement: 'validar_evoluir',
    description: 'Prioridades temporais (Agora, Depois, Futuramente, Não faremos agora) e 7 etapas coordenadas.',
  },
  AF12: {
    id: 'AF12',
    title: 'Pitch V1 + Roteiro Visual + Roteiro de Ensaio/Simulação',
    shortName: 'Kit de Comunicação Final',
    kind: 'presentation',
    origin: 'ai_supported',
    authority: 'authoritative',
    producedByActivityId: 'A12',
    macroMovement: 'comunicar_celebrar',
    description: 'Pitch oral de 3 minutos, roteiro visual de apoio (até 6 telas) e simulação com perguntas de banca.',
  }
};

export const CANONICAL_ARTIFACT_LIST_V2: CanonicalArtifactDefinitionV2[] = Object.values(CANONICAL_ARTIFACTS_V2);

export function getArtifactDefinitionById(id: ArtifactId | string): CanonicalArtifactDefinitionV2 {
  if (!id) return CANONICAL_ARTIFACTS_V2.AF01;
  const artifact = CANONICAL_ARTIFACTS_V2[id as ArtifactId];
  if (artifact) return artifact;
  return {
    id: (id as ArtifactId) || 'AF01',
    title: `Artefato ${id}`,
    shortName: `Artefato ${id}`,
    kind: 'document',
    origin: 'ai_supported',
    authority: 'authoritative',
    producedByActivityId: 'A01',
    macroMovement: 'investigar_direcionar',
    description: `Artefato ${id}`
  };
}
