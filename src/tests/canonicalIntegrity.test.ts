import { describe, it, expect } from 'vitest';
import {
  CANONICAL_ACTIVITIES_V2,
  CANONICAL_ACTIVITY_LIST_V2,
  getCanonicalActivityById,
  getNextActivityById,
  getPreviousActivityById
} from '../data/canonicalJourney';
import {
  CANONICAL_PROMPTS_V2,
  CANONICAL_PROMPT_LIST_V2,
  getCanonicalPromptById
} from '../data/canonicalPrompts';
import {
  CANONICAL_ARTIFACTS_V2,
  CANONICAL_ARTIFACT_LIST_V2,
  getArtifactDefinitionById
} from '../data/canonicalArtifacts';
import { PILOT_CHAIN_V2, getPilotActivityV2ById } from '../data/pilotChainV2';
import { buildContextPackV2 } from '../utils/contextPackBuilderV2';
import { generateMasterDocumentMarkdown } from '../utils/exportMasterDocument';
import { createDefaultCanonicalProjectState } from '../utils/migrationV1_4_1';
import { ProjectStateV2, ActivityId } from '../types/canonicalV2';
import { AppState } from '../types/workshop';

describe('Auditoria Final V2.2 — Integridade Ontológica e Imunidade a Índices', () => {
  // -------------------------------------------------------------------------
  // 1. AUDITORIA ONTOLÓGICA DAS 12 TRÍADES CANÔNICAS
  // -------------------------------------------------------------------------
  it('deve possuir exatamente 12 atividades canônicas na jornada principal (A01 a A12)', () => {
    expect(CANONICAL_ACTIVITY_LIST_V2.length).toBe(12);
    const ids = CANONICAL_ACTIVITY_LIST_V2.map((a) => a.id);
    for (let i = 1; i <= 12; i++) {
      const expectedId = `A${i.toString().padStart(2, '0')}`;
      expect(ids).toContain(expectedId);
    }
  });

  it('deve possuir exatamente 12 prompts canônicos (P01 a P12)', () => {
    expect(CANONICAL_PROMPT_LIST_V2.length).toBe(12);
    const ids = CANONICAL_PROMPT_LIST_V2.map((p) => p.id);
    for (let i = 1; i <= 12; i++) {
      const expectedId = `P${i.toString().padStart(2, '0')}`;
      expect(ids).toContain(expectedId);
    }
  });

  it('deve possuir os 12 artefatos canônicos fundamentais (AF01 a AF12)', () => {
    for (let i = 1; i <= 12; i++) {
      const expectedId = `AF${i.toString().padStart(2, '0')}`;
      const artifact = getArtifactDefinitionById(expectedId);
      expect(artifact).toBeDefined();
      expect(artifact.id).toBe(expectedId);
    }
  });

  it('deve distribuir as 12 atividades rigorosamente pelos 4 macro-movimentos canônicos', () => {
    const mov1 = CANONICAL_ACTIVITY_LIST_V2.filter((a) => a.macroMovement === 'investigar_direcionar');
    const mov2 = CANONICAL_ACTIVITY_LIST_V2.filter((a) => a.macroMovement === 'definir_materializar');
    const mov3 = CANONICAL_ACTIVITY_LIST_V2.filter((a) => a.macroMovement === 'validar_evoluir');
    const mov4 = CANONICAL_ACTIVITY_LIST_V2.filter((a) => a.macroMovement === 'comunicar_celebrar');

    expect(mov1.map((a) => a.id)).toEqual(['A01', 'A02', 'A03', 'A04']);
    expect(mov2.map((a) => a.id)).toEqual(['A05', 'A06', 'A07', 'A08']);
    expect(mov3.map((a) => a.id)).toEqual(['A09', 'A10', 'A11']);
    expect(mov4.map((a) => a.id)).toEqual(['A12']);
  });

  // -------------------------------------------------------------------------
  // 2. SINCRONIZAÇÃO A ↔ P ↔ AF (RELAÇÃO BIUNÍVOCA E ESTRITA)
  // -------------------------------------------------------------------------
  it('deve manter correspondência biunívoca estrita entre Atividade, Prompt e Artefato de Saída', () => {
    for (let i = 1; i <= 12; i++) {
      const num = i.toString().padStart(2, '0');
      const actId = `A${num}` as ActivityId;
      const promptId = `P${num}`;
      const artId = `AF${num}`;

      const activity = CANONICAL_ACTIVITIES_V2[actId];
      expect(activity).toBeDefined();
      expect(activity.promptId).toBe(promptId);
      expect(activity.outputArtifactId).toBe(artId);

      const prompt = getCanonicalPromptById(promptId);
      expect(prompt).toBeDefined();
      expect(prompt.id).toBe(promptId);
      expect(prompt.activityId).toBe(actId);
      expect(prompt.outputArtifactId).toBe(artId);

      const artifact = getArtifactDefinitionById(artId);
      expect(artifact).toBeDefined();
      expect(artifact.id).toBe(artId);
      expect(artifact.producedByActivityId).toBe(actId);
    }
  });

  // -------------------------------------------------------------------------
  // 3. IMUNIDADE A REORDENAÇÃO DE ARRAYS E AUSÊNCIA DE INDEXAÇÃO POSICIONAL
  // -------------------------------------------------------------------------
  it('deve garantir que lookup por ID é imune a reversão ou reordenação de arrays', () => {
    // Array invertido
    const reversedActivities = [...CANONICAL_ACTIVITY_LIST_V2].reverse();
    const reversedPrompts = [...CANONICAL_PROMPT_LIST_V2].reverse();

    // Verificação de A03 (Mapa de Recursos)
    const a03 = reversedActivities.find((a) => a.id === 'A03')!;
    expect(a03.promptId).toBe('P03');
    const p03FromMap = CANONICAL_PROMPTS_V2[a03.promptId!];
    expect(p03FromMap.id).toBe('P03');
    expect(p03FromMap.title).toContain('Mapear Recursos');

    // Verificação de A04 (Propósito e Direção)
    const a04 = reversedActivities.find((a) => a.id === 'A04')!;
    expect(a04.promptId).toBe('P04');
    const p04FromMap = CANONICAL_PROMPTS_V2[a04.promptId!];
    expect(p04FromMap.id).toBe('P04');
    expect(p04FromMap.title).toContain('Propósito e Direção');

    // Em hipótese alguma A03 deve receber P02 ou P04 por ordem de índice
    expect(p03FromMap.id).not.toBe('P02');
    expect(p03FromMap.id).not.toBe('P04');
  });

  it('pilotChainV2 deve derivar corretamente cada atividade associando prompt e artefato por ID', () => {
    expect(PILOT_CHAIN_V2.length).toBe(12);

    for (let i = 1; i <= 12; i++) {
      const actId = `A${i.toString().padStart(2, '0')}` as ActivityId;
      const pilotAct = getPilotActivityV2ById(actId);
      expect(pilotAct.id).toBe(actId);
      expect(pilotAct.promptDetails).toBeDefined();
      expect(pilotAct.artifactDetails).toBeDefined();
      expect(pilotAct.outputArtifactId).toBe(`AF${i.toString().padStart(2, '0')}`);
    }
  });

  // -------------------------------------------------------------------------
  // 4. TAXONOMIA E ESPECIFICIDADES METODOLÓGICAS DE ARTEFATOS
  // -------------------------------------------------------------------------
  it('AF09 deve possuir origin world_real e kind evidence', () => {
    const af09 = getArtifactDefinitionById('AF09');
    expect(af09.origin).toBe('world_real');
    expect(af09.kind).toBe('evidence');
    expect(af09.producedByActivityId).toBe('A09');
  });

  it('AF08 deve possuir kind prototype e authority authoritative', () => {
    const af08 = getArtifactDefinitionById('AF08');
    expect(af08.kind).toBe('prototype');
    expect(af08.authority).toBe('authoritative');
  });

  it('AF06 deve possuir autoridade que substitui o rascunho AF05', () => {
    const af05 = getArtifactDefinitionById('AF05');
    const af06 = getArtifactDefinitionById('AF06');
    expect(af05.authority).toBe('draft');
    expect(af06.authority).toBe('authoritative');
    expect(af06.replacesArtifactId).toBe('AF05');
  });

  // -------------------------------------------------------------------------
  // 5. DIRETRIZES DE PROMPTS E FORTALECIMENTOS METODOLÓGICOS
  // -------------------------------------------------------------------------
  it('Prompt P08 (A08) deve conter o Plano de Realização completo', () => {
    const p08 = getCanonicalPromptById('P08');
    expect(p08.templatePrompt).toContain('PLANO DE REALIZAÇÃO');
    expect(p08.templatePrompt).toContain('PROTÓTIPO V0');
  });

  it('Prompt P09 (A09) deve exigir acolhimento de evidências reais e marcação de validação honesta', () => {
    const p09 = getCanonicalPromptById('P09');
    expect(p09.templatePrompt).toContain('STATUS: SEM EVIDÊNCIA EXTERNA / NÃO VALIDADO');
    expect(p09.templatePrompt).toContain('MUNDO REAL');
  });

  it('Prompt P12 (A12) deve cobrir Pitch V1 (3 minutos), Roteiro Visual (até 6 telas) e Simulação para a Banca', () => {
    const p12 = getCanonicalPromptById('P12');
    expect(p12.templatePrompt).toContain('3 MINUTOS');
    expect(p12.templatePrompt).toContain('6 TELAS');
    expect(p12.templatePrompt).toContain('Banca Examinadora');
  });

  it('todos os 12 prompts devem possuir chave de validação soberana da equipe', () => {
    for (const prompt of CANONICAL_PROMPT_LIST_V2) {
      expect(prompt.validationQuestion).toBeDefined();
      expect(prompt.validationQuestion.trim().length).toBeGreaterThan(10);
      expect(prompt.templatePrompt.trim().length).toBeGreaterThan(100);
    }
  });

  // -------------------------------------------------------------------------
  // 6. SOFT GATES & CONTEXT PACK BUILDER V2
  // -------------------------------------------------------------------------
  it('Soft Gates: contextPackBuilderV2 deve reportar ausências sem lançar exceções nem bloquear execução', () => {
    const dummyProjectState: ProjectStateV2 = {
      schemaVersion: 2,
      projectId: 'test-project',
      projectName: 'Projeto Teste',
      currentActivityId: 'A06',
      projectContext: {
        teamName: 'Equipe Teste',
        problemSummary: 'Problema teste',
        targetAudience: 'Jovens',
        territory: 'Comunidade',
        selectedCause: 'Causa'
      },
      artifacts: {}, // Nenhum artefato preenchido
      activityStatus: {}
    };

    const contextPackA06 = buildContextPackV2('A06', dummyProjectState);

    // A06 requer AF05 (Briefing V0) como required_input
    expect(contextPackA06.hasMissingRequired).toBe(true);
    expect(contextPackA06.missingRequiredList.some((d) => d.artifactId === 'AF05')).toBe(true);

    // Deve permitir interpolação e não lançar exceção
    expect(contextPackA06.interpolatedPrompt).toBeDefined();
    expect(contextPackA06.interpolatedPrompt).toContain('revisor crítico socrático');
  });

  // -------------------------------------------------------------------------
  // 7. DOCUMENTO MESTRE EXECUTIVO
  // -------------------------------------------------------------------------
  it('generateMasterDocumentMarkdown deve compilar o Documento Mestre nos 4 movimentos sem erros', () => {
    const dummyAppState: AppState = {
      selectedEncounterId: 1,
      currentActivityId: 'A01',
      projectData: {
        projectName: 'Solução Comunitária',
        teamName: 'Equipe Inovadora',
        problemTitle: 'Desperdício de Alimentos',
        targetAudience: 'Estudantes da Escola'
      },
      projectStateV1_4_1: {
        schemaVersion: 2,
        projectId: 'proj-1',
        projectName: 'Solução Comunitária',
        teamName: 'Equipe Inovadora',
        currentActivityId: 'A01',
        artifacts: {
          AF01: {
            id: 'AF01',
            version: '1.0',
            status: 'CONSOLIDADO',
            content: 'Desafio central de desperdício na cantina da escola.'
          }
        }
      } as any
    } as any;

    const md = generateMasterDocumentMarkdown(dummyAppState);
    expect(md).toContain('# DOCUMENTO MESTRE DO PROJETO');
    expect(md).toContain('MOVIMENTO 1: INVESTIGAR E DIRECIONAR');
    expect(md).toContain('MOVIMENTO 2: DEFINIR E MATERIALIZAR');
    expect(md).toContain('MOVIMENTO 3: VALIDAR E EVOLUIR');
    expect(md).toContain('MOVIMENTO 4: COMUNICAR E CELEBRAR');
    expect(md).toContain('Solução Comunitária');
    expect(md).toContain('Equipe Inovadora');
  });

  // -------------------------------------------------------------------------
  // 8. NAVEGAÇÃO SEQUENCIAL DIRETA POR ID (SEM USO DE ÍNDICES)
  // -------------------------------------------------------------------------
  it('getNextActivityById e getPreviousActivityById devem navegar com segurança entre A01 e A12', () => {
    const a01Next = getNextActivityById('A01');
    expect(a01Next?.id).toBe('A02');

    const a02Prev = getPreviousActivityById('A02');
    expect(a02Prev?.id).toBe('A01');

    const a11Next = getNextActivityById('A11');
    expect(a11Next?.id).toBe('A12');

    const a12Next = getNextActivityById('A12');
    expect(a12Next).toBeNull();
  });

  // -------------------------------------------------------------------------
  // 9. RESET DO ESTADO E DO DOCUMENTO MESTRE
  // -------------------------------------------------------------------------
  it('o estado resetado deve zerar todos os artefatos canônicos e limpar o Documento Mestre', () => {
    const cleanCanonical = createDefaultCanonicalProjectState();
    expect(cleanCanonical.problemSelected).toBe('');
    expect(cleanCanonical.targetAudience).toBe('');
    expect(cleanCanonical.purpose).toBe('');
    expect(cleanCanonical.artifacts.AF01?.content).toBe('');
    expect(cleanCanonical.artifacts.AF04?.v0Content).toBe('');
    expect(cleanCanonical.artifacts.AF08?.v0Content).toBe('');
    expect(cleanCanonical.evidences).toEqual([]);

    const cleanAppState: AppState = {
      projectData: {
        projectName: '',
        teamName: '',
        collectiveChallenge: '',
        phdProblems: '',
        solutionTargetAudience: '',
        solutionPurpose: '',
      } as any,
      projectStateV1_4_1: cleanCanonical,
    } as any;

    const md = generateMasterDocumentMarkdown(cleanAppState);
    expect(md).toContain('# DOCUMENTO MESTRE DO PROJETO');
    expect(md).toContain('Projeto sem Título');
    expect(md).toContain('Equipe sem Nome');
    expect(md).toContain('**Problema / Desafio Central (AF01):** Não definido');
    expect(md).toContain('**Público Beneficiário / Alvo:** Não definido');
  });
});

