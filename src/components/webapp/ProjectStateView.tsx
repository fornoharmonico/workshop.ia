import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  History, 
  FileText, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Edit3, 
  Search, 
  Sparkles, 
  FolderArchive,
  Lightbulb,
  ArrowRight,
  Target,
  FlaskConical,
  Compass,
  FileCheck,
  Megaphone,
  HelpCircle,
  Clock,
  Play,
  Plus,
  Trash2,
  Table,
  Sliders,
  Sparkle,
  Info,
  Box,
  Eye,
  Save,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Tag,
  ArrowUpRight,
  SplitSquareVertical
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  ArtifactVersion, 
  EpistemologicalStatus,
  DiagnosisReviewSummaryData,
  MvpSummaryData,
  RawEvidenceItem,
  EvidenceSynthesisData,
  RoadmapStructuredData,
  EvolutionRecordItem,
  PrototypeV1Data,
  PitchCriticalSynthesisData,
  TestExecutionStatus
} from '../../types/workshop';
import { SolutionCategorySelector } from './SolutionCategorySelector';
import { 
  formatSolutionCategories, 
  getContextualSolutionLabels, 
  isHybridSolution 
} from '../../utils/solutionCategories';
import { getCanonicalActivityById, getNextActivityById } from '../../data/canonicalJourney';

export type LightweightArtifactStatus = 
  | 'rascunho'
  | 'validado'
  | 'versao'
  | 'ausencia_de_evidencia'
  | 'concluido';

export interface CanonicalArtifactDef {
  id: string; // e.g. 'af01', 'af02'
  familyId: 'AF01' | 'AF02' | 'AF03' | 'AF04' | 'AF05' | 'AF06' | 'AF07' | 'AF08' | 'AF09' | 'AF10' | 'AF11' | 'AF12';
  title: string;
  fieldKey: string;
  legacyFallbackKeys?: string[];
  category: '1. INVESTIGAR' | '2. DEFINIR E MATERIALIZAR' | '3. VALIDAR E EVOLUIR' | '4. COMUNICAR E CELEBRAR';
  encounter: string;
  producedInActivity: string; // e.g. 'A01', 'A02'
  shortDescription: string;
  placeholder: string;
  suggestedPrompt: string;
  authorityNote?: string;
  isAuthoritative?: boolean;
  hasVersions?: boolean;
  versionSecondaryKey?: string;
  hasStructuredSubfields?: 'diagnosisReview' | 'mvpSummary' | 'rawEvidence' | 'evidenceSynthesis' | 'roadmap' | 'evolutionRecord' | 'prototypeV1' | 'pitchCriticalSynthesis';
}

export const CANONICAL_12_ARTIFACTS: CanonicalArtifactDef[] = [
  // -------------------------------------------------------------
  // 1. INVESTIGAR
  // -------------------------------------------------------------
  {
    id: 'af01-mapa-problemas',
    familyId: 'AF01',
    title: 'Mapa de Problemas & Escolha do Desafio',
    fieldKey: 'v3ChosenProblem',
    legacyFallbackKeys: ['chosenProblem', 'collectiveChallenge', 'phdProblems', 'problemSelected'],
    category: '1. INVESTIGAR',
    encounter: 'Encontro 1 — Investigar & Direcionar',
    producedInActivity: 'A01',
    shortDescription: 'Inventário de desafios percebidos, enquadramento e justificativa humana da escolha do problema pelo grupo.',
    suggestedPrompt: 'Investigação e Escolha do Problema',
    placeholder: `PROBLEMA ESCOLHIDO:\n[1 frase clara e objetiva com o desafio central]\n\nJUSTIFICATIVA DA ESCOLHA PELA TURMA:\n[Por que escolhemos este problema e quem é mais afetado por ele]\n\nDESAFIOS OBSERVADOS NO TERRITÓRIO:\n- ...\n\nSÍNTESE DO ENQUADRAMENTO:\n[...]`
  },
  {
    id: 'af02-diagnostico',
    familyId: 'AF02',
    title: 'Diagnóstico Causal do Problema (Fatos, Hipóteses e 5 Porquês)',
    fieldKey: 'v3ProblemDiagnosis',
    legacyFallbackKeys: ['phdProblems', 'rootCause', 'phdHypotheses', 'phdDoubts'],
    category: '1. INVESTIGAR',
    encounter: 'Encontro 1 — Investigar & Direcionar',
    producedInActivity: 'A02',
    shortDescription: 'Separação rigorosa entre Problemas/Fatos (P), Hipóteses (H) e Dúvidas (D), com investigação causal e critério de parada.',
    suggestedPrompt: 'Diagnóstico Causal do Problema',
    hasStructuredSubfields: 'diagnosisReview',
    placeholder: `DIAGNÓSTICO DO PROBLEMA\n\n1. FATOS & OBSERVAÇÕES:\n- ...\n\n2. HIPÓTESES CAUSAIS:\n- ...\n\n3. DÚVIDAS A INVESTIGAR:\n- ...\n\n4. OS 5 PORQUÊS:\n1. ...\n2. ...\n3. ...\n4. ...\n5. ...\n\n5. CAUSA RAIZ IDENTIFICADA (Critério de Parada):\n[...]`
  },
  {
    id: 'af03-mapa-recursos',
    familyId: 'AF03',
    title: 'Mapa de Recursos',
    fieldKey: 'v3MapaRecursos',
    legacyFallbackKeys: ['v3Mapa4d', 'phdFacts', 'goldenCircleHow'],
    category: '1. INVESTIGAR',
    encounter: 'Encontro 1 — Investigar & Direcionar',
    producedInActivity: 'A03',
    shortDescription: 'Mapeamento de saberes comunitários, redes de apoio, espaços, ferramentas e ativos disponíveis nas 4 dimensões (cultural, social, ambiental e financeira).',
    suggestedPrompt: 'Mapeamento de Recursos e Potências',
    placeholder: `MAPA DE RECURSOS\n\n1. SABERES & HABILIDADES LOCAIS:\n- ...\n\n2. REDES DE APOIO, PARCERIAS & LIDERANÇAS:\n- ...\n\n3. ESPAÇOS FÍSICOS & FERRAMENTAS DISPONÍVEIS:\n- ...\n\n4. RECURSOS CIRCULANTES & POTENCIAIS DE TROCA:\n- ...\n\nSÍNTESE DOS PRINCIPAIS ATIVOS REUNIDOS:\n[...]`
  },
  {
    id: 'af04-proposito',
    familyId: 'AF04',
    title: 'Propósito e Direção',
    fieldKey: 'v3Proposito',
    legacyFallbackKeys: ['v3GoldenCircle', 'goldenCircleWhy', 'goldenCircleHow', 'goldenCircleWhat'],
    category: '1. INVESTIGAR',
    encounter: 'Encontro 1 — Investigar & Direcionar',
    producedInActivity: 'A04',
    shortDescription: 'Ponte entre problema e solução: Por Quê (transformação desejada), Como (princípios de ação) e O Quê (possibilidades).',
    suggestedPrompt: 'Propósito e Direção Pactuada',
    placeholder: `PROPÓSITO E DIREÇÃO\n\nPOR QUÊ (Transformação Desejada):\n[1 frase com a causa nobre e o impacto almejado]\n\nCOMO (Princípios Inegociáveis de Ação):\n1. ...\n2. ...\n3. ...\n\nO QUÊ (Formato da Solução):\n[Possibilidades e recorte da solução pactuada]\n\nPROPÓSITO CENTRAL DO PROJETO:\n[1 frase curta e memorável]`
  },

  // -------------------------------------------------------------
  // 2. DEFINIR E MATERIALIZAR
  // -------------------------------------------------------------
  {
    id: 'af05-briefing-v0',
    familyId: 'AF05',
    title: 'Briefing da Solução (Primeiro Rascunho)',
    fieldKey: 'v3BriefingV0',
    legacyFallbackKeys: ['briefingWhatWeAreTryingToDo'],
    category: '2. DEFINIR E MATERIALIZAR',
    encounter: 'Encontro 2 — Definir & Materializar',
    producedInActivity: 'A05',
    shortDescription: 'Primeira amarração estruturada de problema, recursos, público e proposta de solução. Rascunho inicial que será revisado.',
    suggestedPrompt: 'Síntese do Briefing Inicial',
    authorityNote: 'Primeiro rascunho (revisado na etapa seguinte)',
    isAuthoritative: false,
    placeholder: `BRIEFING DO PROJETO (PRIMEIRO RASCUNHO)\n\n1. NOME PROVISÓRIO:\n2. PROBLEMA CENTRAL:\n3. PÚBLICO-ALVO:\n4. RECURSOS MOBILIZADOS:\n5. PROPOSTA DE SOLUÇÃO INICIAL:\n6. PRINCIPAIS HIPÓTESES A REVISAR:\n- ...`
  },
  {
    id: 'af06-briefing-v1',
    familyId: 'AF06',
    title: 'Briefing da Solução (Versão Revisada e Atual)',
    fieldKey: 'v3BriefingV1',
    legacyFallbackKeys: ['v3BriefingV0'],
    category: '2. DEFINIR E MATERIALIZAR',
    encounter: 'Encontro 2 — Definir & Materializar',
    producedInActivity: 'A06',
    shortDescription: 'Versão revisada e consolidada após o diálogo crítico da equipe. É a referência atual para a especificação e o protótipo.',
    suggestedPrompt: 'Revisão Crítica do Briefing',
    authorityNote: 'Versão atual da equipe',
    isAuthoritative: true,
    placeholder: `BRIEFING REVISADO (VERSÃO ATUAL)\n\n1. O QUE MUDOU DO RASCUNHO PARA A VERSÃO ATUAL (E POR QUÊ):\n- ...\n\n2. NOME DO PROJETO:\n[...]\n\n3. PROBLEMA E PÚBLICO DEFINITIVOS:\n[...]\n\n4. PROPOSTA DE SOLUÇÃO CONSOLIDADA:\n[...]\n\n5. CONDICIONANTES & LIMITES REAIS:\n[...]\n\n6. DIRETRIZES PARA O PROTÓTIPO:\n[...]`
  },
  {
    id: 'af07-prd',
    familyId: 'AF07',
    title: 'Especificação de Funcionamento da Solução',
    fieldKey: 'v3PrdV0',
    legacyFallbackKeys: ['prdHowItShouldWork', 'prdRequirements', 'prdConstraints'],
    category: '2. DEFINIR E MATERIALIZAR',
    encounter: 'Encontro 2 — Definir & Materializar',
    producedInActivity: 'A07',
    shortDescription: 'Jornada da pessoa usuária passo a passo, requisitos essenciais vs secundários e critérios de qualidade.',
    suggestedPrompt: 'Especificação de Funcionamento da Solução',
    placeholder: `ESPECIFICAÇÃO DE FUNCIONAMENTO\n\nOBJETIVO DA SOLUÇÃO:\n[...]\n\nJORNADA DO USUÁRIO (PASSO A PASSO):\n1. Descoberta / Entrada: ...\n2. Interação Principal: ...\n3. Entrega do Valor / Conclusão: ...\n\nO QUE NÃO PODE FALTAR NO TESTE:\n1. ...\n2. ...\n\nO QUE PODE FICAR PARA DEPOIS:\n1. ...\n2. ...\n\nLIMITAÇÕES & CRITÉRIOS DE QUALIDADE:\n- ...`
  },
  {
    id: 'af08-mvp-prototipo',
    familyId: 'AF08',
    title: 'Menor Versão Testável (MVP) & Protótipo',
    fieldKey: 'v3Mvp',
    legacyFallbackKeys: ['v3PrototypeV0', 'v3MapaTevep', 'mvpSmallestTestableVersion'],
    category: '2. DEFINIR E MATERIALIZAR',
    encounter: 'Encontro 2 — Definir & Materializar',
    producedInActivity: 'A08',
    shortDescription: 'Menor versão testável e materialização prática com planejamento de Tempo, Evento, Espaço e Pessoas.',
    suggestedPrompt: 'Definição do Teste & Protótipo',
    hasStructuredSubfields: 'mvpSummary',
    placeholder: `MENOR VERSÃO TESTÁVEL & PROTÓTIPO\n\nHIPÓTESE CENTRAL A TESTAR:\n[...]\n\nFORMATO DO PROTÓTIPO ESCOLHIDO:\n[Ex: telas de papel, encenação, cartilha piloto, formulário]\n\nRECORTE ESSENCIAL (O que está no teste):\n- ...\n\nPLANEJAMENTO DO TESTE:\n- Tempo: ...\n- Evento: ...\n- Espaço: ...\n- Pessoas: ...`
  },

  // -------------------------------------------------------------
  // 3. VALIDAR E EVOLUIR
  // -------------------------------------------------------------
  {
    id: 'af09-testes-evidencias',
    familyId: 'AF09',
    title: 'Testes com Pessoas Reais & Aprendizados',
    fieldKey: 'v3EvidenceSummary',
    legacyFallbackKeys: ['v3RawFeedbacks', 'v3RawEvidence', 'prototypeUserFeedback', 'v3FeedbackSynthesis'],
    category: '3. VALIDAR E EVOLUIR',
    encounter: 'Encontro 3 — Validar & Evoluir',
    producedInActivity: 'A09',
    shortDescription: 'Registro honesto de falas de pessoas reais durante o teste, o que se confirmou, o que caiu por terra e plano de evolução.',
    suggestedPrompt: 'Síntese de Evidências & Aprendizados de Campo',
    hasStructuredSubfields: 'evidenceSynthesis',
    authorityNote: 'Pesquisa com pessoas reais',
    placeholder: `TESTES NO MUNDO REAL & PLANO DE EVOLUÇÃO\n\n1. EVIDÊNCIAS DE CAMPO & FALAS LITERAIS:\n- Participante 1: ...\n- Participante 2: ...\n- Participante 3: ...\n\n2. O QUE O MUNDO REAL CONFIRMOU:\n- ...\n\n3. O QUE O MUNDO REAL DERRUBOU:\n- ...\n\n4. PLANO DE AJUSTES:\n- Manter: ...\n- Ajustar: ...\n- Descartar: ...\n- Acrescentar: ...`
  },
  {
    id: 'af10-sustentabilidade',
    familyId: 'AF10',
    title: 'Modelo de Sustentabilidade da Solução',
    fieldKey: 'v3Sustentabilidade',
    legacyFallbackKeys: ['v3Bmc', 'bmcValueProposition', 'bmcSustainability'],
    category: '3. VALIDAR E EVOLUIR',
    encounter: 'Encontro 3 — Validar & Evoluir',
    producedInActivity: 'A10',
    shortDescription: 'Estruturação dos 9 componentes de sustentabilidade prática (público, proposta de valor, parcerias, fontes de sustentação).',
    suggestedPrompt: 'Modelo de Sustentabilidade da Solução',
    placeholder: `MODELO DE SUSTENTABILIDADE (9 COMPONENTES)\n\n1. PÚBLICO ATENDIDO: ...\n2. PROPOSTA DE VALOR REAL: ...\n3. CANAIS DE ACESSO: ...\n4. FORMAS DE RELACIONAMENTO: ...\n5. ATIVIDADES-CHAVE: ...\n6. RECURSOS ESSENCIAIS: ...\n7. PARCERIAS ESTRATÉGICAS: ...\n8. CUSTOS E LIMITAÇÕES: ...\n9. FONTES DE SUSTENTAÇÃO / VIABILIZAÇÃO:\n- ...\n\nHIPÓTESES CRÍTICAS AINDA NÃO TESTADAS:\n1. ...\n2. ...`
  },
  {
    id: 'af11-roadmap',
    familyId: 'AF11',
    title: 'Plano de Ação e Linha do Tempo',
    fieldKey: 'v3Roadmap',
    legacyFallbackKeys: ['roadmapNow', 'roadmapNext', 'roadmapFuture'],
    category: '3. VALIDAR E EVOLUIR',
    encounter: 'Encontro 3 — Validar & Evoluir',
    producedInActivity: 'A11',
    shortDescription: 'Horizontes de tempo (Agora, Próximos Passos, Futuro e O que não faremos agora) e passos coordenados da equipe.',
    suggestedPrompt: 'Plano de Ação e Linha do Tempo',
    hasStructuredSubfields: 'roadmap',
    placeholder: `PLANO DE AÇÃO E LINHA DO TEMPO\n\nAGORA (Próxima versão imediata):\n- ...\n\nDEPOIS (Próximas semanas):\n- ...\n\nFUTURAMENTE (Longo prazo / expansão):\n- ...\n\nNÃO FAREMOS AGORA (Corte deliberado de escopo):\n- ...\n\nLINHA DO TEMPO EM ETAPAS:\n1. ...\n2. ...\n3. ...\n4. ...\n5. ...\n6. ...\n7. ...`
  },

  // -------------------------------------------------------------
  // 4. COMUNICAR E CELEBRAR
  // -------------------------------------------------------------
  {
    id: 'af12-kit-comunicacao',
    familyId: 'AF12',
    title: 'Apresentação Final (Pitch, Roteiro e Simulação)',
    fieldKey: 'v3PitchScript',
    legacyFallbackKeys: ['v3PitchRevised', 'v3PitchPresentation', 'pitchScriptText'],
    category: '4. COMUNICAR E CELEBRAR',
    encounter: 'Encontro 4 — Comunicar & Celebrar',
    producedInActivity: 'A12',
    shortDescription: 'Apresentação oral de 3 minutos, roteiro visual de apoio e simulação de perguntas difíceis.',
    suggestedPrompt: 'Kit Completo de Apresentação e Pitch',
    placeholder: `APRESENTAÇÃO FINAL\n\nROTEIRO DA APRESENTAÇÃO (3 MINUTOS):\n- Gancho Inicial (30s): ...\n- Problema e Contexto Real (45s): ...\n- A Solução & Testes de Campo (60s): ...\n- Sustentabilidade & Próximos Passos (30s): ...\n- Chamada para Ação / Convite (15s): ...\n\nROTEIRO VISUAL:\nTela 1: ...\nTela 2: ...\nTela 3: ...\nTela 4: ...\nTela 5: ...\nTela 6: ...\n\nPREPARAÇÃO PARA PERGUNTAS:\n- Pergunta difícil esperada 1:\n- Resposta planejada:\n- Pergunta difícil esperada 2:\n- Resposta planejada:`
  }
];

export const CANONICAL_14_ARTIFACTS = CANONICAL_12_ARTIFACTS;
export const CANONICAL_15_ARTIFACTS = CANONICAL_12_ARTIFACTS;

export const ProjectStateView: React.FC = () => {
  const { 
    state, 
    updateProjectData, 
    setActiveWebappTab, 
    setCurrentPilotActivityId,
    triggerManualSave, 
    saveStatus, 
    hasUnsavedChanges 
  } = useApp();

  const projectData = (state.projectData || {}) as Record<string, any>;
  const artifactVersions = state.artifactVersions || [];

  // Main Tabs inside "Meu Projeto"
  const [activeMainTab, setActiveMainTab] = useState<'memoria' | 'artefatos' | 'evidencias' | 'hipoteses' | 'historico'>('memoria');
  
  // Artifact Category Filter
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('TODAS');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Expanded Artifact Cards
  const [expandedArtifactIds, setExpandedArtifactIds] = useState<Record<string, boolean>>({
    'af01-diagnostico': true,
    'af04-briefing': true
  });

  // Active sub-tab inside card ('leitura' vs 'editor' vs 'estruturado')
  const [cardActiveMode, setCardActiveMode] = useState<Record<string, 'leitura' | 'editor' | 'estruturado'>>({});
  
  // Version toggle for AF04 & AF08 (V0 vs V1)
  const [activeVersionSelector, setActiveVersionSelector] = useState<Record<string, 'V0' | 'V1'>>({
    'af04-briefing': 'V0',
    'af08-prototipo': 'V0'
  });

  // Copied feedback states
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Edit Vital State Modal / Form Toggle
  const [isEditingVitalState, setIsEditingVitalState] = useState(false);

  // Local draft changes saving indicator
  const [saveIndicator, setSaveIndicator] = useState<string | null>(null);

  // Current & Next Canonical Activity
  const currentActivity = getCanonicalActivityById(state.currentPilotActivityId || 'A01');
  const nextActivity = getNextActivityById(state.currentPilotActivityId || 'A01');

  // Toggle card expansion
  const toggleExpand = (id: string) => {
    setExpandedArtifactIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    CANONICAL_14_ARTIFACTS.forEach(a => { all[a.id] = true; });
    setExpandedArtifactIds(all);
  };

  const collapseAll = () => {
    setExpandedArtifactIds({});
  };

  // Helper to resolve artifact value with version support
  const getArtifactValue = (config: CanonicalArtifactDef, preferredVersion?: 'V0' | 'V1'): string => {
    const chosenVersion = preferredVersion || activeVersionSelector[config.id] || 'V0';
    
    if (config.hasVersions && chosenVersion === 'V1' && config.versionSecondaryKey) {
      const v1Val = projectData[config.versionSecondaryKey];
      if (typeof v1Val === 'string' && v1Val.trim() !== '') return v1Val;
    }

    const directVal = projectData[config.fieldKey];
    if (typeof directVal === 'string' && directVal.trim() !== '') {
      return directVal;
    }
    
    // Check fallback keys
    if (config.legacyFallbackKeys) {
      for (const key of config.legacyFallbackKeys) {
        const val = projectData[key];
        if (typeof val === 'string' && val.trim() !== '') {
          return val;
        }
      }
    }
    return '';
  };

  // Update field in projectData
  const handleArtifactChange = (fieldKey: string, value: any) => {
    updateProjectData({ [fieldKey]: value });
    setSaveIndicator(fieldKey);
    setTimeout(() => {
      setSaveIndicator(null);
    }, 2000);
  };

  // Lightweight status management (Sem burocracia)
  const getArtifactLightweightStatus = (config: CanonicalArtifactDef): LightweightArtifactStatus => {
    const customStatus = projectData.artifactStatuses?.[config.id];
    if (customStatus) return customStatus;

    const val = getArtifactValue(config);
    if (!val || val.trim() === '') {
      return 'rascunho';
    }

    // Se depende de teste (AF09, AF10, AF12) e não houve teste
    if (['af09-plano-teste', 'af10-sintese-evidencias'].includes(config.id)) {
      if ((projectData.testExecutionStatus || 'nao_realizado') === 'nao_realizado') {
        return 'ausencia_de_evidencia';
      }
    }

    if (val.length > 200) {
      return 'validado';
    }

    return 'rascunho';
  };

  const handleSetArtifactStatus = (artifactId: string, status: LightweightArtifactStatus) => {
    const updated = { ...(projectData.artifactStatuses || {}), [artifactId]: status };
    updateProjectData({ artifactStatuses: updated });
  };

  // Copy artifact content
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filtered list of artifacts
  const filteredArtifacts = useMemo(() => {
    return CANONICAL_14_ARTIFACTS.filter(art => {
      const matchesCategory = selectedCategoryFilter === 'TODAS' || art.category === selectedCategoryFilter;
      const matchesSearch = searchQuery === '' || 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.familyId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategoryFilter, searchQuery]);

  // Statistics
  const filledCount = useMemo(() => {
    return CANONICAL_14_ARTIFACTS.filter(a => getArtifactValue(a).trim() !== '').length;
  }, [projectData, activeVersionSelector]);

  const validatedCount = useMemo(() => {
    return CANONICAL_14_ARTIFACTS.filter(a => {
      const st = getArtifactLightweightStatus(a);
      return st === 'validado' || st === 'concluido';
    }).length;
  }, [projectData]);

  // Evidence list
  const rawEvidences: RawEvidenceItem[] = projectData.v3RawEvidenceItems || [];
  const testExecutionStatus: TestExecutionStatus = projectData.testExecutionStatus || 'nao_realizado';

  // Open Doubts & Hypotheses extraction
  const openHypothesesAndQuestions = useMemo(() => {
    const items: Array<{ category: string; text: string; source: string; status: 'DÚVIDA' | 'HIPÓTESE' | 'AUSÊNCIA DE EVIDÊNCIA' }> = [];

    // From Diagnóstico do Problema
    if (projectData.phdDoubts && projectData.phdDoubts.trim()) {
      items.push({
        category: 'Diagnóstico do Problema',
        text: projectData.phdDoubts,
        source: 'AF02 — Diagnóstico Aprofundado do Problema',
        status: 'DÚVIDA'
      });
    }
    if (projectData.phdHypotheses && projectData.phdHypotheses.trim()) {
      items.push({
        category: 'Diagnóstico do Problema',
        text: projectData.phdHypotheses,
        source: 'AF02 — Diagnóstico Aprofundado do Problema',
        status: 'HIPÓTESE'
      });
    }

    // From MVP
    if (projectData.v3MvpMainHypothesis && projectData.v3MvpMainHypothesis.trim()) {
      items.push({
        category: 'MVP & Teste',
        text: `Hipótese Central: ${projectData.v3MvpMainHypothesis}`,
        source: 'AF06 — Definição do MVP',
        status: 'HIPÓTESE'
      });
    }

    // From Test Status
    if (testExecutionStatus === 'nao_realizado') {
      items.push({
        category: 'Validação de Campo',
        text: 'Nenhum teste de campo foi executado até o momento. As premissas da solução seguem como hipóteses a verificar.',
        source: 'AF09 / AF10 — Campo',
        status: 'AUSÊNCIA DE EVIDÊNCIA'
      });
    }

    // From BMC
    if (projectData.v3Bmc && projectData.v3Bmc.includes('HIPÓTESES DE SUSTENTABILIDADE')) {
      const match = projectData.v3Bmc.split('HIPÓTESES DE SUSTENTABILIDADE')[1];
      if (match && match.trim()) {
        items.push({
          category: 'Sustentabilidade (BMC)',
          text: match.trim().slice(0, 300),
          source: 'AF11 — BMC',
          status: 'HIPÓTESE'
        });
      }
    }

    return items;
  }, [projectData, testExecutionStatus]);

  // Status Badge UI Renderer
  const renderStatusBadge = (status: LightweightArtifactStatus) => {
    switch (status) {
      case 'rascunho':
        return (
          <span className="px-2.5 py-1 rounded-lg text-2xs font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
            📝 Rascunho
          </span>
        );
      case 'validado':
        return (
          <span className="px-2.5 py-1 rounded-lg text-2xs font-extrabold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            ✓ Validado pela Equipe
          </span>
        );
      case 'versao':
        return (
          <span className="px-2.5 py-1 rounded-lg text-2xs font-extrabold bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            🔀 Versão Evolutiva
          </span>
        );
      case 'ausencia_de_evidencia':
        return (
          <span className="px-2.5 py-1 rounded-lg text-2xs font-extrabold bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            ⚠️ Ausência de Evidência
          </span>
        );
      case 'concluido':
        return (
          <span className="px-2.5 py-1 rounded-lg text-2xs font-extrabold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            🏆 Concluído
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 px-4 sm:px-6">
      
      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER: MEMÓRIA EXTERNA DO PROJETO                        */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/20 text-slate-950 font-black text-xs">
            <Layers className="w-4 h-4" />
            <span>MEMÓRIA DO PROJETO • REGISTROS DA EQUIPE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-slate-950 text-amber-400 px-3.5 py-1 rounded-full text-xs font-black">
              {filledCount} de {CANONICAL_14_ARTIFACTS.length} Etapas Registradas
            </span>
            <span className="bg-slate-950/40 text-slate-950 px-3 py-1 rounded-full text-xs font-extrabold">
              {validatedCount} Validadas
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className={`p-4 rounded-2xl border transition-all ${
            (projectData.projectName || '').trim()
              ? 'bg-slate-950/15 border-slate-950/20'
              : 'bg-amber-950/25 border-amber-950/40 ring-2 ring-amber-400/60'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-950 block">
                Nome do Projeto:
              </label>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                (projectData.projectName || '').trim()
                  ? 'bg-emerald-950 text-emerald-300'
                  : 'bg-red-950 text-red-200 animate-pulse'
              }`}>
                {(projectData.projectName || '').trim() ? '✓ Preenchido' : '* Obrigatório para Salvar e Exportar'}
              </span>
            </div>
            <input
              type="text"
              value={projectData.projectName || ''}
              onChange={(e) => updateProjectData({ projectName: e.target.value })}
              placeholder="Digite o nome do projeto..."
              className="w-full bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white px-3.5 py-2 rounded-xl font-black text-sm border-0 focus:ring-2 focus:ring-slate-950 focus:outline-none"
            />
          </div>

          <div className={`p-4 rounded-2xl border transition-all ${
            (projectData.teamName || '').trim()
              ? 'bg-slate-950/15 border-slate-950/20'
              : 'bg-amber-950/25 border-amber-950/40 ring-2 ring-amber-400/60'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-950 block">
                Seu Nome ou Nome da Equipe:
              </label>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                (projectData.teamName || '').trim()
                  ? 'bg-emerald-950 text-emerald-300'
                  : 'bg-red-950 text-red-200 animate-pulse'
              }`}>
                {(projectData.teamName || '').trim() ? '✓ Preenchido' : '* Obrigatório para Salvar e Exportar'}
              </span>
            </div>
            <input
              type="text"
              value={projectData.teamName || ''}
              onChange={(e) => updateProjectData({ teamName: e.target.value })}
              placeholder="Digite seu nome (individual) ou nome da equipe..."
              className="w-full bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white px-3.5 py-2 rounded-xl font-black text-sm border-0 focus:ring-2 focus:ring-slate-950 focus:outline-none"
            />
            <p className="text-[10px] text-slate-950/80 mt-1 font-semibold">
              Válido tanto para o seu próprio nome (trabalho individual) quanto para o nome da equipe.
            </p>
          </div>
        </div>

        <div className="bg-slate-950/10 rounded-xl p-2.5 text-[11px] text-slate-950/90 font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
          <span>
            <strong>Requisito Obrigatório:</strong> O preenchimento destes dois campos é indispensável para salvar ou exportar o projeto. Os arquivos gerados (.json, .md, .txt, .pdf) conterão esses dados no nome do arquivo junto com a data e hora da exportação.
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. ESTADO ATUAL DO PROJETO (PILAR CENTRAL DA MEMÓRIA)         */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-500/40 p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Target className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Resumo Atual do Projeto
              </h2>
              <p className="text-2xs text-slate-500 dark:text-slate-400">
                Os 5 pontos centrais acumulados pela equipe ao longo da oficina
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditingVitalState(!isEditingVitalState)}
            className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingVitalState ? 'Fechar Edição' : 'Ajustar Dados Centrais'}</span>
          </button>
        </div>

        {/* 5 Vital Columns / Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          
          {/* 1. PROBLEMA */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-2">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                1. Problema
              </span>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-3">
                {projectData.problemSelected || projectData.v3ProblemDiagnosis?.split('\n')[0] || projectData.v3DiagnosisReviewProblem || 'Problema em diagnóstico inicial...'}
              </p>
            </div>
            <span className="text-3xs font-semibold text-slate-400">Origem: Encontro 1</span>
          </div>

          {/* 2. PROPÓSITO */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-2">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                2. Propósito & Direção
              </span>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-3">
                {projectData.purpose || projectData.v3GoldenCircle?.split('\n')[0] || projectData.solutionPurpose || 'Definindo propósito transformador...'}
              </p>
            </div>
            <span className="text-3xs font-semibold text-slate-400">Origem: Encontro 1</span>
          </div>

          {/* 3. PÚBLICO */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-2">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <Eye className="w-3 h-3" />
                3. Público-Alvo
              </span>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-3">
                {projectData.targetAudience || projectData.solutionTargetAudience || 'Público em identificação...'}
              </p>
            </div>
            <span className="text-3xs font-semibold text-slate-400">Origem: Encontro 2</span>
          </div>

          {/* 4. POSIÇÃO NA JORNADA */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col justify-between space-y-2">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1">
                <Compass className="w-3 h-3" />
                4. Onde Estamos
              </span>
              <p className="text-xs font-black text-amber-950 dark:text-amber-100">
                Etapa {currentActivity.order}: {currentActivity.title}
              </p>
              <span className="text-2xs text-amber-800 dark:text-amber-300 block">
                Encontro {currentActivity.recommendedEncounter}
              </span>
            </div>
            <button
              onClick={() => setActiveWebappTab('atividade')}
              className="text-2xs font-extrabold text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Ir para esta etapa</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* 5. PRÓXIMA AÇÃO */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col justify-between space-y-2">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                5. Próxima Etapa
              </span>
              <p className="text-xs font-bold text-emerald-950 dark:text-emerald-100 line-clamp-3">
                {nextActivity ? `${nextActivity.title}: ${nextActivity.objective}` : 'Jornada completa! Todos os registros consolidados.'}
              </p>
            </div>
            <span className="text-3xs font-semibold text-emerald-700 dark:text-emerald-400">Passo imediato</span>
          </div>
        </div>

        {/* Inline Editor for Vital State (When expanded) */}
        {isEditingVitalState && (
          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in">
            <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              Edição Rápida das Variáveis Centrais do Projeto
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-2xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Problema Selecionado:
                </label>
                <input
                  type="text"
                  value={projectData.problemSelected || ''}
                  onChange={(e) => updateProjectData({ problemSelected: e.target.value })}
                  placeholder="Ex: Falta de engajamento no contraturno..."
                  className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-2xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Propósito do Projeto (Por Quê):
                </label>
                <input
                  type="text"
                  value={projectData.purpose || ''}
                  onChange={(e) => updateProjectData({ purpose: e.target.value })}
                  placeholder="Ex: Criar experiências autônomas de aprendizagem..."
                  className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-2xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Público-Alvo Principal:
                </label>
                <input
                  type="text"
                  value={projectData.targetAudience || ''}
                  onChange={(e) => updateProjectData({ targetAudience: e.target.value })}
                  placeholder="Ex: Estudantes do ensino médio e educadores..."
                  className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN VIEW TABS: ARTEFATOS / EVIDÊNCIAS / HIPÓTESES / HISTÓRICO*/}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          
          <div className="flex flex-wrap items-center gap-2">
            
            {/* 1. REGISTROS DO PROJETO */}
            <button
              onClick={() => setActiveMainTab('artefatos')}
              className={`px-4 py-2 text-xs font-black rounded-xl transition flex items-center gap-2 cursor-pointer ${
                activeMainTab === 'artefatos'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Registros do Projeto ({CANONICAL_12_ARTIFACTS.length})</span>
            </button>

            {/* 2. EVIDÊNCIAS & CAMPO */}
            <button
              onClick={() => setActiveMainTab('evidencias')}
              className={`px-4 py-2 text-xs font-black rounded-xl transition flex items-center gap-2 cursor-pointer ${
                activeMainTab === 'evidencias'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>Evidências de Campo ({rawEvidences.length})</span>
            </button>

            {/* 3. HIPÓTESES & QUESTÕES ABERTAS */}
            <button
              onClick={() => setActiveMainTab('hipoteses')}
              className={`px-4 py-2 text-xs font-black rounded-xl transition flex items-center gap-2 cursor-pointer ${
                activeMainTab === 'hipoteses'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Hipóteses & Dúvidas ({openHypothesesAndQuestions.length})</span>
            </button>

            {/* 4. HISTÓRICO DE VERSÕES */}
            <button
              onClick={() => setActiveMainTab('historico')}
              className={`px-4 py-2 text-xs font-black rounded-xl transition flex items-center gap-2 cursor-pointer ${
                activeMainTab === 'historico'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Histórico ({artifactVersions.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => triggerManualSave()}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                saveStatus === 'just_saved'
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300'
                  : hasUnsavedChanges
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {saveStatus === 'just_saved' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Save className="w-3.5 h-3.5" />}
              <span>{saveStatus === 'just_saved' ? 'Salvo!' : 'Salvar Alterações'}</span>
            </button>

            {activeMainTab === 'artefatos' && (
              <>
                <button
                  onClick={expandAll}
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 bg-slate-100 dark:bg-slate-800 rounded-xl transition cursor-pointer"
                >
                  Expandir
                </button>
                <button
                  onClick={collapseAll}
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 bg-slate-100 dark:bg-slate-800 rounded-xl transition cursor-pointer"
                >
                  Recolher
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filter bar for artifacts */}
        {activeMainTab === 'artefatos' && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'TODAS', label: `Todos os Registros (${CANONICAL_12_ARTIFACTS.length})` },
                { id: '1. INVESTIGAR', label: '1. Investigar' },
                { id: '2. DEFINIR E MATERIALIZAR', label: '2. Definir e Materializar' },
                { id: '3. VALIDAR E EVOLUIR', label: '3. Validar e Evoluir' },
                { id: '4. COMUNICAR E CELEBRAR', label: '4. Comunicar e Celebrar' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 text-xs font-extrabold rounded-xl transition cursor-pointer ${
                    selectedCategoryFilter === cat.id
                      ? 'bg-slate-950 text-amber-400 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64 shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar registros..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: AS ETAPAS E REGISTROS DO PROJETO                       */}
      {/* ------------------------------------------------------------- */}
      {activeMainTab === 'artefatos' && (
        <div className="space-y-4">
          {filteredArtifacts.map((artifact) => {
            const currentVersion = activeVersionSelector[artifact.id] || 'V0';
            const val = getArtifactValue(artifact, currentVersion);
            const status = getArtifactLightweightStatus(artifact);
            const isExpanded = !!expandedArtifactIds[artifact.id];
            const isCopied = copiedId === artifact.id;
            const isSavingThis = saveIndicator === artifact.fieldKey;
            const currentMode = cardActiveMode[artifact.id] || 'leitura';

            return (
              <div
                key={artifact.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all hover:border-amber-500/40"
              >
                {/* Card Header (Click to toggle) */}
                <div
                  onClick={() => toggleExpand(artifact.id)}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800/80"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider">
                        {artifact.category}
                      </span>
                      {artifact.authorityNote && (
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider flex items-center gap-1 ${
                          artifact.isAuthoritative 
                            ? 'bg-amber-500 text-slate-950 shadow-xs' 
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}>
                          <ShieldCheck className="w-3 h-3" />
                          {artifact.authorityNote}
                        </span>
                      )}
                      {isSavingThis && (
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-pulse">
                          <Check className="w-3 h-3" /> Salvo!
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{artifact.title}</span>
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {artifact.shortDescription}
                    </p>
                  </div>

                  {/* Right Controls: Lightweight Status & Chevron */}
                  <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
                    {renderStatusBadge(status)}

                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Card Body */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 space-y-4">
                    
                    {/* Controls Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        
                        {/* Mode Selector: Leitura vs Editor */}
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl">
                          <button
                            type="button"
                            onClick={() => setCardActiveMode(prev => ({ ...prev, [artifact.id]: 'leitura' }))}
                            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                              currentMode === 'leitura'
                                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                            }`}
                          >
                            Visualizar (Memória)
                          </button>
                          <button
                            type="button"
                            onClick={() => setCardActiveMode(prev => ({ ...prev, [artifact.id]: 'editor' }))}
                            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer flex items-center gap-1 ${
                              currentMode === 'editor'
                                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                            }`}
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Editar</span>
                          </button>
                        </div>

                        {/* Version selector for AF04 and AF08 */}
                        {artifact.hasVersions && (
                          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/50 p-0.5 rounded-xl border border-amber-300 dark:border-amber-800">
                            <span className="text-3xs font-black uppercase text-amber-800 dark:text-amber-300 px-1.5">Versão:</span>
                            {(['V0', 'V1'] as Array<'V0' | 'V1'>).map((v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => setActiveVersionSelector(prev => ({ ...prev, [artifact.id]: v }))}
                                className={`px-2.5 py-0.5 rounded-lg text-2xs font-extrabold transition cursor-pointer ${
                                  currentVersion === v
                                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                                    : 'text-amber-800 dark:text-amber-300 hover:bg-amber-100'
                                }`}
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Lightweight Status Selector (Sem Burocracia) */}
                        <div className="flex items-center gap-1">
                          <label className="text-3xs font-extrabold uppercase text-slate-400">Status:</label>
                          <select
                            value={status}
                            onChange={(e) => handleSetArtifactStatus(artifact.id, e.target.value as LightweightArtifactStatus)}
                            className="text-2xs font-bold py-1 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                          >
                            <option value="rascunho">📝 Rascunho</option>
                            <option value="validado">✓ Validado pela Equipe</option>
                            <option value="versao">🔀 Versão Evolutiva</option>
                            <option value="ausencia_de_evidencia">⚠️ Ausência de Evidência</option>
                            <option value="concluido">🏆 Concluído</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopy(artifact.id, val || artifact.placeholder)}
                          disabled={!val}
                          className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                            isCopied
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 disabled:opacity-40'
                          }`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? 'Copiado!' : 'Copiar'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveWebappTab('prompts');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 rounded-xl font-extrabold text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Ver texto para IA</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setCurrentPilotActivityId(artifact.producedInActivity);
                            setActiveWebappTab('atividade');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 rounded-xl font-extrabold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-all cursor-pointer"
                          title="Ir para esta etapa na Jornada"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                          <span>Ir para esta etapa</span>
                        </button>
                      </div>
                    </div>

                    {/* Mode 1: Leitura Fluida (Memória Externa) */}
                    {currentMode === 'leitura' && (
                      <div className="bg-slate-50 dark:bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                        {val || (
                          <div className="text-slate-400 italic font-sans py-2">
                            Nenhum conteúdo registrado para esta etapa ainda. Clique em "Editar" acima ou avance na etapa correspondente na Jornada.
                          </div>
                        )}
                      </div>
                    )}

                    {/* Mode 2: Editor Direto */}
                    {currentMode === 'editor' && (
                      <div className="space-y-2">
                        <textarea
                          rows={10}
                          value={val}
                          onChange={(e) => {
                            const targetKey = (artifact.hasVersions && currentVersion === 'V1' && artifact.versionSecondaryKey) 
                              ? artifact.versionSecondaryKey 
                              : artifact.fieldKey;
                            handleArtifactChange(targetKey, e.target.value);
                          }}
                          placeholder={artifact.placeholder}
                          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed transition-all"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: EVIDÊNCIAS DE CAMPO & ORIGEM REAL                      */}
      {/* ------------------------------------------------------------- */}
      {activeMainTab === 'evidencias' && (
        <div className="space-y-6">
          
          {/* Status Real da Execução */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-amber-500" />
                  <span>Status da Execução dos Testes</span>
                </h3>
                <p className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Diferença entre o que foi realmente observado na prática e suposições da equipe
                </p>
              </div>

              <span className={`px-3 py-1 rounded-xl text-xs font-black ${
                testExecutionStatus === 'realizado'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : testExecutionStatus === 'parcialmente_realizado'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}>
                {testExecutionStatus === 'realizado' && '✓ Testado na Prática com Pessoas Reais'}
                {testExecutionStatus === 'parcialmente_realizado' && '⚠️ Parcialmente Realizado'}
                {testExecutionStatus === 'nao_realizado' && '✕ Não Realizado (Hipóteses Abertas)'}
              </span>
            </div>

            {testExecutionStatus === 'nao_realizado' && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Ausência de Evidência Não Bloqueia a Equipe:</strong>
                  <p className="mt-1 text-2xs text-amber-800 dark:text-amber-300 leading-relaxed">
                    A metodologia da oficina orienta que premissas não testadas sejam declaradas explicitamente como hipóteses abertas no modelo de sustentabilidade, plano de ação e apresentação. Nunca invente relatos falsos.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Registros de Evidências Individuais */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Registros de Participantes ({rawEvidences.length})
              </h3>
              
              <button
                type="button"
                onClick={() => setActiveWebappTab('atividade')}
                className="text-xs font-bold text-amber-600 hover:text-amber-500 flex items-center gap-1"
              >
                <span>Adicionar na etapa de testes</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {rawEvidences.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <FlaskConical className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nenhum registro individual de teste cadastrado ainda.
                </p>
                <p className="text-2xs text-slate-500 max-w-md mx-auto">
                  Durante o Encontro 3, a equipe colherá evidências e depoimentos de participantes reais no teste do protótipo.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rawEvidences.map((ev, idx) => (
                  <div 
                    key={ev.id || idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-2xs font-black px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 uppercase">
                        Sessão #{idx + 1} • {ev.testerProfile || 'Perfil não informado'}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <strong className="text-2xs font-extrabold uppercase text-slate-400 block">Fato Observado (O que aconteceu):</strong>
                      <p className="text-slate-800 dark:text-slate-200">{ev.whatHappened || 'Não preenchido'}</p>
                    </div>

                    {ev.quoteOrComment && (
                      <div className="space-y-1 text-xs bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                        <strong className="text-2xs font-extrabold uppercase text-amber-800 dark:text-amber-300 block">Fala Literal do Usuário:</strong>
                        <p className="italic text-amber-950 dark:text-amber-100">"{ev.quoteOrComment}"</p>
                      </div>
                    )}

                    {ev.suggestion && (
                      <div className="space-y-1 text-xs">
                        <strong className="text-2xs font-extrabold uppercase text-slate-400 block">Sugestão / Fricção:</strong>
                        <p className="text-slate-700 dark:text-slate-300">{ev.suggestion}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: HIPÓTESES & QUESTÕES ABERTAS                           */}
      {/* ------------------------------------------------------------- */}
      {activeMainTab === 'hipoteses' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-500" />
              <span>Hipóteses & Dúvidas a Investigar</span>
            </h3>
            <p className="text-2xs text-slate-500 dark:text-slate-400">
              Suposições a testar e pontos que a equipe ainda precisa verificar no mundo real.
            </p>
          </div>

          <div className="space-y-3">
            {openHypothesesAndQuestions.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Nenhuma dúvida ou hipótese aberta pendente registrada.
                </p>
              </div>
            ) : (
              openHypothesesAndQuestions.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-3xs font-black uppercase ${
                        item.status === 'DÚVIDA'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : item.status === 'HIPÓTESE'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-2xs font-semibold text-slate-400">{item.category}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {item.text}
                    </p>
                  </div>

                  <span className="text-3xs font-mono text-slate-400 shrink-0 self-start sm:self-center">
                    {item.source}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: HISTÓRICO DE VERSÕES                                   */}
      {/* ------------------------------------------------------------- */}
      {activeMainTab === 'historico' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              Histórico de Versões Salvas ({artifactVersions.length})
            </h3>
          </div>

          {artifactVersions.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs text-slate-500">
              Nenhuma versão arquivada historicamente ainda. Conforme você valida as etapas na Jornada, cópias de segurança são salvas automaticamente.
            </div>
          ) : (
            <div className="space-y-3">
              {artifactVersions.map((ver, idx) => (
                <div 
                  key={ver.id || idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <strong className="font-bold text-slate-900 dark:text-slate-100">{ver.versionName}</strong>
                    <p className="text-2xs text-slate-500">{new Date(ver.createdAt).toLocaleString('pt-BR')}</p>
                  </div>
                  <span className="text-2xs text-slate-400">Versão arquivada</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
