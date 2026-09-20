/**
 * ONTOLOGIA CANÔNICA DA FORNOLOGIA — V1.4.1
 * Workshop Inteligência Artificial Aplicada: do Problema ao Protótipo
 * 
 * Regra fundamental:
 * JORNADA (1) -> ENCONTROS (4) -> ATIVIDADES (31) -> PROMPTS (17 opcionais) -> FAMÍLIAS DE ARTEFATOS (14 opcionais)
 * Além de: ESTADOS, EVIDÊNCIAS, OUTPUTS TRANSITÓRIOS e HANDOFFS.
 * 
 * Unidade fundamental do produto: ATIVIDADE (não prompt, não artefato).
 */

// ==========================================
// VERSIONAMENTO CANÔNICO UNIFICADO
// ==========================================

export const CANONICAL_VERSIONS = {
  WORKSHOP: '1.4.1',
  EMENTA: '1.4.1',
  MATRIZ: '1.4.1',
  BIBLIOTECA_PROMPTS: '1.4.1',
  WEBAPP: '1.4.1',
} as const;

export type CanonicalVersion = typeof CANONICAL_VERSIONS[keyof typeof CANONICAL_VERSIONS];

// ==========================================
// IDENTIFICADORES CANÔNICOS ESTÁVEIS DE DOMÍNIO
// ==========================================

export type EncounterId = 1 | 2 | 3 | 4;

export type ActivityId =
  | 'A01' | 'A02' | 'A03' | 'A04' | 'A05' | 'A06'
  | 'A07' | 'A08' | 'A09' | 'A10' | 'A11' | 'A12';

export type PromptId =
  | 'P01' | 'P02' | 'P03' | 'P04' | 'P05' | 'P06'
  | 'P07' | 'P08' | 'P09' | 'P10' | 'P11' | 'P12';

export type ArtifactFamilyId =
  | 'AF01' // Diagnóstico do Problema
  | 'AF02' // Mapa de Recursos
  | 'AF03' // Propósito e Direção
  | 'AF04' // Briefing (V0 e V1)
  | 'AF05' // PRD
  | 'AF06' // MVP
  | 'AF07' // Plano de Realização
  | 'AF08' // Protótipo (V0 e V1)
  | 'AF09' // Plano de Teste
  | 'AF10' // Síntese de Evidências
  | 'AF11' // Modelo de Sustentabilidade
  | 'AF12' // Roadmap
  | 'AF13' // Roteiro do Pitch
  | 'AF14'; // Apresentação do Pitch

// ==========================================
// MECANISMOS DE CONDUÇÃO
// ==========================================

export type ConductionMechanism =
  | 'HUMANA'
  | 'IA_HUMANA'
  | 'SISTEMA'
  | 'MUNDO_REAL';

export interface ConductionInfo {
  type: ConductionMechanism;
  label: string;
  description: string;
  badgeColor: string;
}

// ==========================================
// EVIDÊNCIA COMO CLASSE PRÓPRIA (Mundo Real)
// ==========================================

export type EvidenceClassification =
  | 'metodologia'
  | 'prompt'
  | 'conteudo'
  | 'ux'
  | 'tecnologia'
  | 'facilitacao'
  | 'solucao';

export interface CanonicalEvidenceRecord {
  id: string;
  activityId: ActivityId;
  createdAt: string;
  testerProfile: string; // sem dados pessoais
  attemptedAction: string; // o que tentou fazer
  whatHappened: string; // o que aconteceu
  observation: string; // observação direta
  quote?: string; // fala importante
  difficulty?: string; // dificuldade percebida
  suggestion?: string; // sugestão dada
  teamInterpretation: string; // interpretação da equipe (não confundir com fato)
  classification?: EvidenceClassification;
  isSimulation?: boolean; // Se não houve teste real, deve registrar explicitamente
}

// ==========================================
// OUTPUT TRANSITÓRIO (Não é artefato permanente)
// ==========================================

export interface TransientOutput {
  id: string;
  activityId: ActivityId;
  promptId: PromptId;
  title: string;
  content: string;
  createdAt: string;
  meta?: Record<string, unknown>;
}

// ==========================================
// HANDOFF CANÔNICO DA ATIVIDADE
// ==========================================

export interface CanonicalHandoff {
  youConcluded: string; // Você concluiu [nome da atividade]
  whatChanged: string; // O que mudou [1 frase]
  weProduced?: string; // Produzimos [artefato, evidência ou estado]
  stillOpen?: string[]; // Ainda está em aberto [até 3 itens]
  nextStep: string; // Agora [próxima ação/atividade]
  nextActivityId?: ActivityId;
}

// ==========================================
// ATIVIDADE CANÔNICA (Unidade Fundamental)
// ==========================================

export interface CanonicalActivityDefinition {
  id: ActivityId;
  code: ActivityId;
  order: number;
  encounterId: EncounterId;
  title: string;
  durationMinutes: number;
  conduction: ConductionMechanism[];
  category: string;
  objective: string;
  
  // Relações opcionais (desacoplamento 31 > 17 > 14)
  promptId?: PromptId;
  artifactFamilyId?: ArtifactFamilyId;
  artifactVersionName?: 'V0' | 'V1' | 'Única';
  
  // Indicadores de natureza da atividade
  producesEvidence?: boolean;
  isPrivateToParticipant?: boolean; // ex: A03 Mapeamento individual
  isCollectiveClassActivity?: boolean; // ex: A01, A02, A04, A31
  updatesProjectStateFields?: string[]; // ex: ['problemSelected', 'purpose']
  
  guide: {
    whatToDo: string[];
    facilitationTips?: string[];
    privacyNotice?: string;
  };
  
  completionRule: string;
  handoff: CanonicalHandoff;
}

// ==========================================
// PROMPT CANÔNICO (17 Prompts Oficiais)
// ==========================================

export interface CanonicalPromptDefinition {
  id: PromptId;
  activityId: ActivityId;
  encounterId: EncounterId;
  name: string;
  role: string;
  function: string;
  primaryInput: string;
  inputs: string[];
  output: string;
  resultingArtifactFamilyId?: ArtifactFamilyId;
  isTransientOutput?: boolean; // ex: P17 Ensaio / Banca Simulada
  promptTemplate: string;
  handoff: CanonicalHandoff;
}

// ==========================================
// FAMÍLIA DE ARTEFATO CANÔNICO (14 Famílias)
// ==========================================

export interface CanonicalArtifactFamilyDefinition {
  id: ArtifactFamilyId;
  name: string;
  shortName: string;
  producedInActivityId: ActivityId;
  producedByPromptId?: PromptId;
  updatedByPromptId?: PromptId;
  hasVersions: boolean; // AF04 (V0/V1) e AF08 (V0/V1)
  description: string;
  exportableToMasterDoc: boolean;
}

// ==========================================
// ESTADO DO PROJETO CANÔNICO (V1.4.1)
// ==========================================

export type TestProgressStatus = 'nao_realizado' | 'parcial' | 'realizado';

export interface CanonicalProjectState {
  version: '1.4.1';
  teamName: string;
  projectName: string;
  currentActivityId: ActivityId;
  
  // Variáveis Globais de Contexto
  problemSelected: string;
  targetAudience: string;
  purpose: string;
  
  // Status de Testes e Evidências Reais
  testStatus: TestProgressStatus;
  hasExternalEvidence: boolean;
  prototypeVersion: 'nenhum' | 'V0' | 'V1';
  nextAction: string;
  
  // Banco de Ideias (recurso auxiliar, sem prompt próprio)
  ideaBank: Array<{ id: string; idea: string; createdAt: string }>;
  
  // Progresso das 31 Atividades
  activityProgress: Record<ActivityId, 'not_started' | 'in_progress' | 'completed'>;
  
  // As 14 Famílias de Artefatos Oficiais
  artifacts: {
    AF01?: { content: string; status: 'draft' | 'validated'; updatedAt: string }; // Diagnóstico do Problema
    AF02?: { content: string; status: 'draft' | 'validated'; updatedAt: string }; // Mapa de Recursos
    AF03?: { content: string; status: 'draft' | 'validated'; updatedAt: string }; // Propósito e Direção
    AF04?: { 
      v0Content?: string; 
      v1Content?: string; 
      activeVersion: 'V0' | 'V1'; 
      status: 'draft' | 'validated'; 
      updatedAt: string; 
    }; // Briefing V0/V1
    AF05?: { content: string; status: 'draft' | 'validated'; updatedAt: string }; // PRD
    AF06?: { content: string; status: 'draft' | 'validated'; updatedAt: string }; // MVP
    AF07?: { content: string; status: 'draft' | 'validated'; updatedAt: string }; // Plano de Realização
    AF08?: { 
      v0Content?: string; 
      v1Content?: string; 
      activeVersion: 'V0' | 'V1'; 
      status: 'draft' | 'validated'; 
      updatedAt: string; 
    }; // Protótipo V0/V1
    AF09?: { content: string; status: 'draft' | 'validated'; updatedAt: string }; // Plano de Teste
    AF10?: { content: string; status: 'draft' | 'validated'; updatedAt: string }; // Síntese de Evidências
    AF11?: { content: string; status: 'draft' | 'validated'; updatedAt: string }; // Modelo de Sustentabilidade
    AF12?: { content: string; status: 'draft' | 'validated'; updatedAt: string }; // Roadmap
    AF13?: { content: string; status: 'draft' | 'validated'; updatedAt: string }; // Roteiro Pitch
    AF14?: { content: string; status: 'draft' | 'validated'; updatedAt: string }; // Apresentação Pitch
  };
  
  // Evidências Reais Coletadas
  evidences: CanonicalEvidenceRecord[];
  
  // Outputs Transitórios Gravados
  transientOutputs: Record<string, string>;
}
