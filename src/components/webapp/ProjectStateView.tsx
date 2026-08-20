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
  Save
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
  PitchCriticalSynthesisData
} from '../../types/workshop';
import { SolutionCategorySelector } from './SolutionCategorySelector';
import { 
  formatSolutionCategories, 
  getContextualSolutionLabels, 
  isHybridSolution 
} from '../../utils/solutionCategories';

interface V3ArtifactDef {
  id: string;
  fieldKey: string;
  legacyFallbackKeys?: string[];
  title: string;
  category: '1. INVESTIGAR' | '2. DEFINIR E MATERIALIZAR' | '3. VALIDAR E EVOLUIR' | '4. COMUNICAR E REFLETIR';
  encounter: string;
  shortDescription: string;
  placeholder: string;
  suggestedPrompt: string;
  isActivityStatusOnly?: boolean;
  hasStructuredSubfields?: 'diagnosisReview' | 'mvpSummary' | 'rawEvidence' | 'evidenceSynthesis' | 'roadmap' | 'evolutionRecord' | 'prototypeV1' | 'pitchCriticalSynthesis';
}

const V3_ARTIFACTS_CONFIG: V3ArtifactDef[] = [
  // -------------------------------------------------------------
  // 1. INVESTIGAR
  // -------------------------------------------------------------
  {
    id: 'diagnostico-problema',
    fieldKey: 'v3ProblemDiagnosis',
    legacyFallbackKeys: ['phdProblems', 'rootCause', 'collectiveChallenge'],
    title: 'Diagnóstico do Problema',
    category: '1. INVESTIGAR',
    encounter: '1. Investigar • Encontro 1 — Atividade E1-A01',
    shortDescription: 'Enquadramento, separação entre fatos, hipóteses e dúvidas (PHD) e aprofundamento causal dos Cinco Porquês com critério de parada e validação humana.',
    suggestedPrompt: 'Prompt 01: Diagnóstico do Problema',
    hasStructuredSubfields: 'diagnosisReview',
    placeholder: `PROBLEMA ESCOLHIDO:\n[1 frase]\n\nCONTEXTO:\n[breve descrição]\n\nQUEM É AFETADO:\n[...]\n\nOBSERVAÇÕES / EVIDÊNCIAS:\n- ...\n\nHIPÓTESES:\n- ...\n\nDÚVIDAS:\n- ...\n\nPOSSÍVEIS CAUSAS:\n- ...\n\nHIPÓTESES OU CAUSAS QUE PRECISAM SER VERIFICADAS:\n- ...\n\nCAUSAS SOBRE AS QUAIS A EQUIPE PODERIA AGIR:\n- ...\n\nO QUE AINDA PRECISAMOS INVESTIGAR:\n- ...\n\nSÍNTESE DO DIAGNÓSTICO:\n[até 3 frases]`
  },
  {
    id: 'golden-circle',
    fieldKey: 'v3GoldenCircle',
    legacyFallbackKeys: ['goldenCircleWhy', 'goldenCircleHow', 'goldenCircleWhat'],
    title: 'Círculo Dourado (Golden Circle) — Por quê? Como? O quê?',
    category: '1. INVESTIGAR',
    encounter: '1. Investigar • Encontro 1 — Atividade E1-A02',
    shortDescription: 'Ponte cognitiva entre problema e solução nas três camadas: Por Quê (transformação), Como (princípios) e O Quê (possibilidades de solução).',
    suggestedPrompt: 'Prompt 02: Círculo Dourado',
    placeholder: `GOLDEN CIRCLE\n\nPOR QUÊ:\n[1 frase com a transformação desejada]\n\nCOMO:\n[até 3 princípios ou estratégias orientadoras]\n\nO QUÊ:\n[1 ou 2 frases com o tipo de solução]\n\nPROPÓSITO DO PROJETO:\n[1 frase curta]`
  },

  // -------------------------------------------------------------
  // 2. DEFINIR E MATERIALIZAR
  // -------------------------------------------------------------
  {
    id: 'briefing-v0',
    fieldKey: 'v3BriefingV0',
    legacyFallbackKeys: ['briefingWhatWeAreTryingToDo', 'briefingContext'],
    title: 'Briefing V0',
    category: '2. DEFINIR E MATERIALIZAR',
    encounter: '2. Definir e Materializar • Encontro 1 — Atividade E1-A03',
    shortDescription: 'Consolidação estruturada da investigação e da direção de solução em tópicos sem invenção de dados.',
    suggestedPrompt: 'Prompt 03: Construção do Briefing V0',
    placeholder: `BRIEFING V0\n\n1. NOME DO PROJETO:\n2. PROBLEMA:\n3. CONTEXTO:\n4. PÚBLICO-ALVO:\n5. PRINCIPAIS OBSERVAÇÕES / EVIDÊNCIAS:\n6. HIPÓTESES IMPORTANTES:\n7. DÚVIDAS OU PONTOS A VALIDAR:\n8. POSSÍVEIS CAUSAS RELEVANTES:\n9. PROPÓSITO / GOLDEN CIRCLE:\n10. PROPOSTA INICIAL DE SOLUÇÃO:\n11. RESULTADOS ESPERADOS:\n12. PRINCIPAIS PONTOS QUE AINDA PRECISAMOS VALIDAR:`
  },
  {
    id: 'briefing-v1',
    fieldKey: 'v3BriefingV1',
    legacyFallbackKeys: ['v3BriefingReview', 'briefingScope'],
    title: 'Revisão Crítica e Briefing V1',
    category: '2. DEFINIR E MATERIALIZAR',
    encounter: '2. Definir e Materializar • Encontro 2 — Atividade E2-A01',
    shortDescription: 'Versão lapidada e validada pela equipe humana após revisão crítica e apontamento de inconsistências, acompanhada da lista do que mudou da V0 para a V1.',
    suggestedPrompt: 'Prompt 04: Revisão Crítica e Briefing V1',
    placeholder: `BRIEFING V1 (CONSOLIDADO)\n\n[Texto consolidado do Briefing após incorporar as decisões da equipe]\n\nO QUE MUDOU DO V0 PARA O V1:\n1. ...\n2. ...\n3. ...`
  },
  {
    id: 'prd-v0',
    fieldKey: 'v3PrdV0',
    legacyFallbackKeys: ['prdHowItShouldWork', 'prdRequirements', 'prdConstraints'],
    title: 'PRD V0 — Como a Solução Precisa Funcionar',
    category: '2. DEFINIR E MATERIALIZAR',
    encounter: '2. Definir e Materializar • Encontro 2 — Atividade E2-A02',
    shortDescription: 'Especificação simplificada de requisitos essenciais (Must Have) e desejáveis (Nice to Have) para qualquer formato de solução.',
    suggestedPrompt: 'Prompt 05: PRD V0',
    placeholder: `PRD V0\n\nOBJETIVO DA SOLUÇÃO:\n[...]\n\nUSUÁRIO / PÚBLICO PRINCIPAL:\n[...]\n\nCOMO A SOLUÇÃO FUNCIONA:\n[fluxo resumido em etapas]\n\nMUST HAVE — ESSENCIAL:\n1. ...\n2. ...\n3. ...\n\nNICE TO HAVE — DESEJÁVEL:\n1. ...\n2. ...\n3. ...\n\nREQUISITOS IMPORTANTES:\n- ...\n\nLIMITAÇÕES / RESTRIÇÕES:\n- ...\n\nCRITÉRIOS BÁSICOS DE FUNCIONAMENTO:\n- ...\n\nDÚVIDAS EM ABERTO:\n- ...`
  },
  {
    id: 'mvp',
    fieldKey: 'v3Mvp',
    legacyFallbackKeys: ['mvpSmallestTestableVersion', 'mvpCoreFeatures', 'mvpTestHypothesis'],
    title: 'Definição do MVP',
    category: '2. DEFINIR E MATERIALIZAR',
    encounter: '2. Definir e Materializar • Encontro 2 — Atividade E2-A03',
    shortDescription: 'Recorte da menor versão capaz de testar a hipótese central com simplicidade e capacidade de aprendizado.',
    suggestedPrompt: 'Prompt 06: Definição do MVP',
    hasStructuredSubfields: 'mvpSummary',
    placeholder: `MVP\n\nDESCRIÇÃO EM UMA FRASE:\n[...]\n\nHIPÓTESE PRINCIPAL A TESTAR:\n[...]\n\nOBJETIVO DO TESTE:\n[...]\n\nINCLUI:\n- ...\n- ...\n\nNÃO INCLUI:\n- ...\n\nCOMO PODERÁ SER TESTADO:\n[...]\n\nCOM QUEM:\n[...]\n\nSINAL DE QUE ESTAMOS NO CAMINHO CERTO:\n[...]\n\nO QUE PRECISAMOS APRENDER:\n[...]`
  },
  {
    id: 'prototipo-v0',
    fieldKey: 'v3PrototypeV0',
    legacyFallbackKeys: ['prototypeLinkOrDescription', 'prototypeType'],
    title: 'Protótipo V0',
    category: '2. DEFINIR E MATERIALIZAR',
    encounter: '2. Definir e Materializar • Encontro 2 — Atividade E2-A04',
    shortDescription: 'Construção da versão V0 testável no formato mais adequado (digital, físico, serviço, campanha, experiência ou híbrido).',
    suggestedPrompt: 'Prompt 07: Do MVP ao Protótipo V0',
    placeholder: `PROTÓTIPO V0\n\nFORMATO ESCOLHIDO:\n[Ex: telas interativas, roteiro de serviço, maquete física, cartilha experimental]\n\nRESUMO DA CONSTRUÇÃO:\n[...]\n\nO QUE ESTAMOS TESTANDO:\n[...]\n\nCOMO USAR / EXPERIMENTAR:\n[...]\n\nO QUE DEVEMOS OBSERVAR:\n[...]\n\nO QUE AINDA É SIMULAÇÃO:\n[...]\n\nLINK OU LOCALIZAÇÃO DO PROTÓTIPO (SE HOUVER):\n[...]`
  },

  // -------------------------------------------------------------
  // 3. VALIDAR E EVOLUIR
  // -------------------------------------------------------------
  {
    id: 'plano-teste',
    fieldKey: 'v3TestPlan',
    legacyFallbackKeys: [],
    title: 'Plano de Teste e Coleta de Evidências',
    category: '3. VALIDAR E EVOLUIR',
    encounter: '3. Validar e Evoluir • Encontro 3 — Atividade E3-A01',
    shortDescription: 'Roteiro neutro e não indutivo para os testes com usuários reais (tarefas, perguntas abertas, pontos de observação e folha de registro).',
    suggestedPrompt: 'Prompt 08: Planejamento do Teste e Coleta de Evidências',
    placeholder: `PLANO DE TESTE\n\n1. APRESENTAÇÃO DO PROTÓTIPO (Neutra, max 2 frases):\n[...]\n\n2. TAREFA PRINCIPAL DO USUÁRIO:\n[...]\n\n3. PERGUNTAS ABERTAS PARA O TESTADOR:\n- O que você entendeu?\n- O que tentou fazer primeiro?\n- O que foi mais fácil?\n- O que ficou confuso?\n- O que você mudaria?\n\n4. PONTOS CRÍTICOS A OBSERVAR DURANTE O TESTE:\n- ...\n- ...\n\n5. FOLHA DE REGISTRO DO TESTE:\n[Perfil, o que aconteceu, o que funcionou, falas marcantes, sugestões]`
  },
  {
    id: 'feedbacks-brutos',
    fieldKey: 'v3RawEvidence',
    legacyFallbackKeys: ['v3RawFeedbacks', 'prototypeUserFeedback', 'bugsAndFixes'],
    title: 'Evidências Brutas de Teste',
    category: '3. VALIDAR E EVOLUIR',
    encounter: '3. Validar e Evoluir • Encontro 3 — Atividade E3-A01',
    shortDescription: 'Registros concretos das experiências, dificuldades e comentários colhidos nos testes com usuários reais.',
    suggestedPrompt: 'Insumo de campo para o Prompt 09',
    hasStructuredSubfields: 'rawEvidence',
    placeholder: `REGISTROS BRUTOS DOS TESTES COM USUÁRIOS\n\nTESTE #1:\n- Quem testou: [perfil sem dados pessoais]\n- O que tentou fazer:\n- O que aconteceu:\n- Funcionou sem ajuda?: [Sim / Não]\n- Onde hesitou?:\n- Onde precisou de ajuda?:\n- Comentário ou fala marcante:\n- Sugestão recebida:\n- Outro aprendizado:\n\nTESTE #2:\n- ...`
  },
  {
    id: 'sintese-feedbacks',
    fieldKey: 'v3EvidenceSummary',
    legacyFallbackKeys: ['v3FeedbackSynthesis', 'prototypeUserFeedback'],
    title: 'Síntese de Evidências',
    category: '3. VALIDAR E EVOLUIR',
    encounter: '3. Validar e Evoluir • Encontro 3 — Atividade E3-A02',
    shortDescription: 'Padrões recorrentes, dificuldades, divergências, hipóteses fortalecidas/enfraquecidas e o que ainda não sabemos.',
    suggestedPrompt: 'Prompt 09: Síntese de Evidências',
    hasStructuredSubfields: 'evidenceSynthesis',
    placeholder: `SÍNTESE DE EVIDÊNCIAS\n\nSTATUS DO TESTE:\n[Ex: Realizado com X pessoas / Nenhum teste realizado nesta rodada]\n\nO QUE FUNCIONOU SEM AJUDA:\n- ...\n\nHESITAÇÕES E NECESSIDADE DE AJUDA:\n- ...\n\nPADRÕES VS OCORRÊNCIAS ISOLADAS:\n- ...\n\nFEEDBACKS E NECESSIDADES:\n- ...\n\nBUGS E FALHAS:\n- ...\n\nHIPÓTESES FORTALECIDAS / ENFRAQUECIDAS / INCONCLUSIVAS:\n- Fortalecidas: ...\n- Enfraquecidas: ...\n- Inconclusivas: ...\n\nNOVAS HIPÓTESES:\n- ...\n\nO QUE AINDA NÃO SABEMOS:\n- ...\n\nCONCLUSÃO DA RODADA:\n[...]`
  },
  {
    id: 'bmc',
    fieldKey: 'v3Bmc',
    legacyFallbackKeys: ['bmcValueProposition', 'bmcSustainability'],
    title: 'Modelo de Sustentabilidade — Business Model Canvas (BMC)',
    category: '3. VALIDAR E EVOLUIR',
    encounter: '3. Validar e Evoluir • Encontro 3 — Atividade E3-A03',
    shortDescription: 'Os 9 blocos de sustentabilidade adaptados a projetos sociais, comunitários ou comerciais, com sinalização de hipóteses não testadas.',
    suggestedPrompt: 'Prompt 10: Modelo de Sustentabilidade (BMC)',
    placeholder: `BUSINESS MODEL CANVAS\n\n1. SEGMENTOS ATENDIDOS: ...\n2. PROPOSTA DE VALOR: ...\n3. CANAIS: ...\n4. RELACIONAMENTO: ...\n5. ATIVIDADES PRINCIPAIS: ...\n6. RECURSOS PRINCIPAIS: ...\n7. PARCERIAS PRINCIPAIS: ...\n8. CUSTOS PRINCIPAIS: ...\n9. FONTES DE SUSTENTAÇÃO / RECEITA: ...\n\n3 HIPÓTESES DE SUSTENTABILIDADE QUE MAIS PRECISAM SER TESTADAS:\n1. ...\n2. ...\n3. ...`
  },
  {
    id: 'roadmap',
    fieldKey: 'v3Roadmap',
    legacyFallbackKeys: ['roadmapNow', 'roadmapNext', 'roadmapFuture'],
    title: 'Roadmap — Agora, Depois e Futuramente',
    category: '3. VALIDAR E EVOLUIR',
    encounter: '3. Validar e Evoluir • Encontro 3 — Atividade E3-A04',
    shortDescription: 'Priorização de evolução em horizontes (Agora, Depois, Futuramente e Não faremos agora), com 3 prioridades justificadas.',
    suggestedPrompt: 'Prompt 11: Roadmap',
    hasStructuredSubfields: 'roadmap',
    placeholder: `ROADMAP\n\nAGORA (Para o Protótipo V1):\n- ...\n\nDEPOIS (Próximos passos e melhorias):\n- ...\n\nFUTURAMENTE (Possibilidades de evolução):\n- ...\n\nNÃO FAREMOS AGORA:\n- ...\n\n3 PRIORIDADES CENTRAIS:\n1. ...\n2. ...\n3. ...\n\nSÍNTESE DO ROADMAP:\n[...]`
  },
  {
    id: 'registro-evolucao',
    fieldKey: 'v3EvolutionRecord',
    legacyFallbackKeys: [],
    title: 'Registro de Evolução V0 → V1',
    category: '3. VALIDAR E EVOLUIR',
    encounter: '3. Validar e Evoluir • Encontro 3 — Atividade E3-A05',
    shortDescription: 'Matriz detalhada de mudanças entre V0 e V1 com origem (evidência de teste, execução, feedback, decisão estratégica, hipótese de design).',
    suggestedPrompt: 'Prompt 12: Evolução do Protótipo (Matriz de Mudanças)',
    hasStructuredSubfields: 'evolutionRecord',
    placeholder: `REGISTRO DE EVOLUÇÃO V0 → V1\n\nMATRIZ DE MUDANÇAS:\n- Elemento: ...\n- Decisão: [Manter / Alterar / Remover / Adicionar]\n- O que muda: ...\n- Por quê: ...\n- Origem: [evidência de teste / evidência de execução / feedback / decisão estratégica / hipótese de design]\n- Confiança: [Alta / Média / Baixa]\n- Precisa testar?: [Sim / Não]`
  },
  {
    id: 'prototipo-v1',
    fieldKey: 'v3PrototypeV1',
    legacyFallbackKeys: [],
    title: 'Protótipo V1',
    category: '3. VALIDAR E EVOLUIR',
    encounter: '3. Validar e Evoluir • Encontro 3 — Atividade E3-A05',
    shortDescription: 'Especificação do protótipo V1 aprimorado com base nas decisões aprovadas e aprendizado dos testes.',
    suggestedPrompt: 'Prompt 12: Evolução do Protótipo — V0 → V1',
    hasStructuredSubfields: 'prototypeV1',
    placeholder: `PROTÓTIPO V1\n\nTIPO / FORMATO:\n[...]\n\nRESUMO DA ESPECIFICAÇÃO:\n[...]\n\nO QUE MUDOU:\n- ...\n\nO QUE FOI MANTIDO:\n- ...\n\nJUSTIFICATIVAS DAS MUDANÇAS:\n- ...\n\nO QUE AINDA NÃO FOI RESOLVIDO:\n- ...\n\nHIPÓTESES AINDA ABERTAS:\n- ...\n\nPRÓXIMO TESTE RECOMENDADO:\n[...]`
  },

  // -------------------------------------------------------------
  // 4. COMUNICAR E REFLETIR
  // -------------------------------------------------------------
  {
    id: 'pitch-estrutura',
    fieldKey: 'v3PitchStructure',
    legacyFallbackKeys: [],
    title: 'Estrutura do Pitch',
    category: '4. COMUNICAR E REFLETIR',
    encounter: '4. Comunicar e Refletir • Encontro 4 — Atividade E4-A01',
    shortDescription: 'Arco narrativo estruturado em 4 a 5 blocos (Problema, Solução, Protótipo e Testes, Evolução e Próximos Passos).',
    suggestedPrompt: 'Prompt 13: Construção do Pitch (Parte 1)',
    placeholder: `ESTRUTURA PROPOSTA DO PITCH\n\nBLOCO 1: Problema e Oportunidade\nBLOCO 2: Propósito e Solução Proposta\nBLOCO 3: Protótipo e Aprendizados dos Testes\nBLOCO 4: Evolução para V1 e Próximos Passos`
  },
  {
    id: 'pitch-integral',
    fieldKey: 'v3PitchScript',
    legacyFallbackKeys: ['pitchScriptText', 'pitchProblem', 'pitchSolution'],
    title: 'Pitch Integral',
    category: '4. COMUNICAR E REFLETIR',
    encounter: '4. Comunicar e Refletir • Encontro 4 — Atividade E4-A01',
    shortDescription: 'Texto integral da fala oral do pitch em primeira pessoa, mantendo o tom autêntico e direto da equipe.',
    suggestedPrompt: 'Prompt 13: Construção do Pitch (Parte 2)',
    placeholder: `TEXTO INTEGRAL DA FALA DO PITCH\n\n(Escreva exatamente como a equipe irá falar diante do público, com frases curtas e linguagem natural...)`
  },
  {
    id: 'pitch-sintese',
    fieldKey: 'v3PitchSummary',
    legacyFallbackKeys: [],
    title: 'Síntese do Pitch',
    category: '4. COMUNICAR E REFLETIR',
    encounter: '4. Comunicar e Refletir • Encontro 4 — Atividade E4-A01',
    shortDescription: 'Resumo conciso do pitch em parágrafo único para rápida memorização e apresentação executiva.',
    suggestedPrompt: 'Prompt 13: Construção do Pitch (Parte 3)',
    placeholder: `SÍNTESE DO PITCH:\n[Parágrafo único sintetizando o problema, a solução, o aprendizado gerado e o próximo passo do projeto]`
  },
  {
    id: 'apresentacao-pitch',
    fieldKey: 'v3PitchPresentation',
    legacyFallbackKeys: [],
    title: 'Roteiro Visual da Apresentação',
    category: '4. COMUNICAR E REFLETIR',
    encounter: '4. Comunicar e Refletir • Encontro 4 — Atividade E4-A02',
    shortDescription: 'Roteiro visual de 6 a 8 slides sintéticos que apoiam o apresentador com foco em uma ideia principal por slide.',
    suggestedPrompt: 'Prompt 14: Roteiro Visual da Apresentação',
    placeholder: `ROTEIRO VISUAL DA APRESENTAÇÃO\n\nSLIDE 1\nFUNÇÃO NARRATIVA: Abertura\nTÍTULO: ...\nTEXTO NA TELA: ...\nVISUAL SUGERIDO: ...\nO QUE O APRESENTADOR FALA: ...\nTRANSIÇÃO: ...\n\nSLIDE 2\n...\n\nSLIDE 3\n...`
  },
  {
    id: 'pitch-revisado',
    fieldKey: 'v3PitchRevised',
    legacyFallbackKeys: ['v3RehearsalNotes'],
    title: 'Pitch Revisado',
    category: '4. COMUNICAR E REFLETIR',
    encounter: '4. Comunicar e Refletir • Encontro 4 — Atividade E4-A03',
    shortDescription: 'Versão definitiva do discurso de fala refinada após o treinamento com a banca simulada.',
    suggestedPrompt: 'Prompt 15: Ensaio e Refinamento do Pitch (Parte 1)',
    placeholder: `PITCH REVISADO (VERSÃO FINAL):\n\n[Texto integral da fala ajustado com pausas, ênfases e correções apontadas no ensaio]`
  },
  {
    id: 'pitch-critica',
    fieldKey: 'v3PitchCriticalSynthesis',
    legacyFallbackKeys: ['v3RehearsalNotes'],
    title: 'Síntese Crítica do Pitch',
    category: '4. COMUNICAR E REFLETIR',
    encounter: '4. Comunicar e Refletir • Encontro 4 — Atividade E4-A03',
    shortDescription: 'Pontos fortes, pontos de atenção, Cartão de Banca (respostas na ponta da língua) e o que não devemos afirmar ainda.',
    suggestedPrompt: 'Prompt 15: Ensaio e Refinamento do Pitch (Parte 2)',
    hasStructuredSubfields: 'pitchCriticalSynthesis',
    placeholder: `SÍNTESE CRÍTICA DO PITCH\n\nPONTOS FORTES / DE DESTAQUE:\n1. ...\n2. ...\n\nPONTOS DE ATENÇÃO / FRAGILIDADES:\n1. ...\n2. ...\n\nCARTÃO DE BANCA (RESPOSTAS NA PONTA DA LÍNGUA):\n- P1: ... -> Resposta: ...\n- P2: ... -> Resposta: ...\n\nO QUE NÃO DEVEMOS AFIRMAR AINDA:\n- ...`
  }
];

export const ProjectStateView: React.FC = () => {
  const { state, updateProjectData, setActiveWebappTab, triggerManualSave, saveStatus, hasUnsavedChanges } = useApp();
  const projectData = (state.projectData || {}) as Record<string, any>;
  const artifactVersions = state.artifactVersions || [];

  // Navigation & Filtering
  const [activeMainTab, setActiveMainTab] = useState<'artefatos' | 'historico' | 'legado'>('artefatos');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('TODAS');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Expanded Artifact Cards
  const [expandedArtifactIds, setExpandedArtifactIds] = useState<Record<string, boolean>>({
    'diagnostico-problema': true,
    'golden-circle': true
  });

  // Active sub-tab inside card ('texto' vs 'estruturado')
  const [cardActiveTab, setCardActiveTab] = useState<Record<string, 'texto' | 'estruturado'>>({});

  // Copied feedback states
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Local draft changes with saving status
  const [saveIndicator, setSaveIndicator] = useState<string | null>(null);

  // Toggle card expansion
  const toggleExpand = (id: string) => {
    setExpandedArtifactIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    V3_ARTIFACTS_CONFIG.forEach(a => { all[a.id] = true; });
    setExpandedArtifactIds(all);
  };

  const collapseAll = () => {
    setExpandedArtifactIds({});
  };

  // Helper to resolve current value with fallback
  const getArtifactValue = (config: V3ArtifactDef): string => {
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

  // Copy artifact content
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Status calculation
  const getArtifactStatus = (config: V3ArtifactDef): { label: string; bg: string; color: string; isFilled: boolean } => {
    const val = getArtifactValue(config);
    if (!val || val.trim() === '') {
      return { 
        label: 'NÃO INICIADO', 
        bg: 'bg-slate-100 dark:bg-slate-800', 
        color: 'text-slate-500 dark:text-slate-400',
        isFilled: false 
      };
    }
    if (val.length > 150) {
      return { 
        label: 'CONSOLIDADO', 
        bg: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30', 
        color: 'text-emerald-700 dark:text-emerald-400',
        isFilled: true 
      };
    }
    return { 
      label: 'EM CONSTRUÇÃO', 
      bg: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30', 
      color: 'text-amber-700 dark:text-amber-400',
      isFilled: true 
    };
  };

  // Check if legacy data exists
  const hasLegacyData = useMemo(() => {
    return Boolean(
      (projectData.phdProblems && projectData.phdProblems.trim()) ||
      (projectData.phdHypotheses && projectData.phdHypotheses.trim()) ||
      (projectData.phdDoubts && projectData.phdDoubts.trim()) ||
      (projectData.fiveWhysProblem && projectData.fiveWhysProblem.trim()) ||
      (projectData.individualChallengesNote && projectData.individualChallengesNote.trim()) ||
      (projectData.rootCause && projectData.rootCause.trim())
    );
  }, [projectData]);

  // Filtered list of artifacts
  const filteredArtifacts = useMemo(() => {
    return V3_ARTIFACTS_CONFIG.filter(art => {
      const matchesCategory = selectedCategoryFilter === 'TODAS' || art.category === selectedCategoryFilter;
      const matchesSearch = searchQuery === '' || 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategoryFilter, searchQuery]);

  // Statistics
  const filledCount = useMemo(() => {
    return V3_ARTIFACTS_CONFIG.filter(a => getArtifactValue(a).trim() !== '').length;
  }, [projectData]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 px-4 sm:px-6">
      
      {/* Top Banner / Project Info */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/20 text-slate-950 font-black text-xs">
            <Layers className="w-4 h-4" />
            <span>MEU PROJETO • ARTEFATOS DA JORNADA V3.2</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 text-amber-400 px-3.5 py-1 rounded-full text-xs font-black">
            <span>{filledCount} de {V3_ARTIFACTS_CONFIG.length} Artefatos Preenchidos</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="bg-slate-950/15 backdrop-blur-xs p-4 rounded-2xl border border-slate-950/20">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-950/80 block mb-1">
              Nome do Projeto:
            </label>
            <input
              type="text"
              value={projectData.projectName || ''}
              onChange={(e) => updateProjectData({ projectName: e.target.value })}
              placeholder="Digite o nome do projeto da equipe..."
              className="w-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white px-3 py-1.5 rounded-xl font-black text-sm border-0 focus:ring-2 focus:ring-slate-950 focus:outline-none"
            />
          </div>

          <div className="bg-slate-950/15 backdrop-blur-xs p-4 rounded-2xl border border-slate-950/20">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-950/80 block mb-1">
              Nome da Equipe:
            </label>
            <input
              type="text"
              value={projectData.teamName || ''}
              onChange={(e) => updateProjectData({ teamName: e.target.value })}
              placeholder="Ex: Equipe Alfa..."
              className="w-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white px-3 py-1.5 rounded-xl font-black text-sm border-0 focus:ring-2 focus:ring-slate-950 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main View Tabs (Artefatos V3.2 / Histórico de Versões / Dados Legados) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveMainTab('artefatos')}
              className={`px-4 py-2 text-xs font-black rounded-xl transition flex items-center gap-2 cursor-pointer ${
                activeMainTab === 'artefatos'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Artefatos Oficiais V3.2 ({V3_ARTIFACTS_CONFIG.length})</span>
            </button>

            <button
              onClick={() => setActiveMainTab('historico')}
              className={`px-4 py-2 text-xs font-black rounded-xl transition flex items-center gap-2 cursor-pointer ${
                activeMainTab === 'historico'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Histórico & Versões ({artifactVersions.length})</span>
            </button>

            {hasLegacyData && (
              <button
                onClick={() => setActiveMainTab('legado')}
                className={`px-4 py-2 text-xs font-black rounded-xl transition flex items-center gap-2 cursor-pointer ${
                  activeMainTab === 'legado'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <FolderArchive className="w-4 h-4 text-amber-600" />
                <span>Dados de Rascunho Prévio</span>
              </button>
            )}
          </div>

          {activeMainTab === 'artefatos' && (
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
                title="Salvar alterações manualmente"
              >
                {saveStatus === 'just_saved' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span>{saveStatus === 'just_saved' ? 'Salvo!' : 'Salvar Alterações'}</span>
              </button>

              <button
                onClick={expandAll}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl transition cursor-pointer"
              >
                Expandir Todos
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl transition cursor-pointer"
              >
                Recolher Todos
              </button>
            </div>
          )}
        </div>

        {/* Filter by Journey Stage */}
        {activeMainTab === 'artefatos' && (
          <div className="space-y-3 pt-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'TODAS', label: 'Todos os 4 Movimentos' },
                  { id: '1. INVESTIGAR', label: '1. Investigar' },
                  { id: '2. DEFINIR E MATERIALIZAR', label: '2. Definir e Materializar' },
                  { id: '3. VALIDAR E EVOLUIR', label: '3. Validar e Evoluir' },
                  { id: '4. COMUNICAR E REFLETIR', label: '4. Comunicar e Refletir' },
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

              {/* Search Box */}
              <div className="relative w-full md:w-64 shrink-0">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar artefato..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TEST EXECUTION STATUS & PEDAGOGICAL MOVEMENT CARD             */}
      {/* ------------------------------------------------------------- */}
      {activeMainTab === 'artefatos' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-500/30 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h3 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Status da Execução de Testes com Usuários Reais
              </h3>
            </div>
            <span className="text-2xs font-bold text-slate-500 dark:text-slate-400">
              Regra de Ouro: O teste não é obrigatório e nunca bloqueia a equipe
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'NAO_REALIZADO',
                label: 'Não Realizado',
                desc: 'Nenhum teste com usuário foi executado nesta rodada.',
                badge: 'Hipóteses Abertas'
              },
              {
                id: 'PARCIALMENTE_REALIZADO',
                label: 'Parcialmente Realizado',
                desc: 'Testado internamente ou com número reduzido de pessoas.',
                badge: 'Validação Preliminar'
              },
              {
                id: 'REALIZADO',
                label: 'Realizado com Sucesso',
                desc: 'Testado com usuários de campo reais e evidências registradas.',
                badge: 'Evidências de Campo'
              }
            ].map((st) => {
              const isSelected = (projectData.testExecutionStatus || 'NAO_REALIZADO') === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => handleArtifactChange('testExecutionStatus', st.id)}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 text-slate-950 dark:text-amber-200 ring-2 ring-amber-400/30'
                      : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black">{st.label}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {st.badge}
                    </span>
                  </div>
                  <p className="text-2xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Transparent guidance banner if Not Executed */}
          {(projectData.testExecutionStatus || 'NAO_REALIZADO') === 'NAO_REALIZADO' && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl flex items-start gap-2.5 text-2xs text-amber-900 dark:text-amber-200">
              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Como prosseguir sem testes realizados:</strong>
                <p className="mt-0.5 text-amber-800 dark:text-amber-300/90 leading-relaxed">
                  Não é necessário inventar dados ou simular feedbacks falsos. A metodologia V3.2 permite que a equipe continue para o Modelo de Negócios (BMC), Roadmap e Pitch, tratando as premissas do MVP como <strong>hipóteses abertas para validação futura</strong>.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SOLUTION NATURE & CATEGORIES CARD (RODADA 5)                  */}
      {/* ------------------------------------------------------------- */}
      {activeMainTab === 'artefatos' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
          <SolutionCategorySelector
            selectedCategories={projectData.solutionCategories || []}
            otherText={projectData.solutionOtherCategory || ''}
            onChange={(cats, other) => {
              updateProjectData({
                solutionCategories: cats,
                solutionOtherCategory: other
              });
            }}
          />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: ARTEFATOS OFICIAIS V3.2                                */}
      {/* ------------------------------------------------------------- */}
      {activeMainTab === 'artefatos' && (
        <div className="space-y-5">
          {filteredArtifacts.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
              <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                Nenhum artefato encontrado com esse filtro
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Tente selecionar outra etapa ou limpar os termos de busca.
              </p>
            </div>
          ) : (
            filteredArtifacts.map((artifact) => {
              const val = getArtifactValue(artifact);
              const status = getArtifactStatus(artifact);
              const isExpanded = !!expandedArtifactIds[artifact.id];
              const isCopied = copiedId === artifact.id;
              const isSavingThis = saveIndicator === artifact.fieldKey;
              const currentCardTab = cardActiveTab[artifact.id] || 'texto';

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
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider">
                          {artifact.category}
                        </span>
                        <span className="text-slate-400 text-xs font-semibold">
                          {artifact.encounter}
                        </span>
                        {isSavingThis && (
                          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-pulse">
                            <Check className="w-3 h-3" /> Salvo!
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{artifact.title}</span>
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {artifact.shortDescription}
                      </p>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
                      <span className={`px-3 py-1 rounded-xl text-xs font-extrabold ${status.bg}`}>
                        {status.label}
                      </span>

                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Body / Editor */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 space-y-4">
                      
                      {/* Interactive Controls Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-slate-400 font-semibold">Comando associado:</span>
                          <span className="font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                            {artifact.suggestedPrompt}
                          </span>

                          {/* Contextual Category Pill for PRD, MVP & Prototypes */}
                          {['prd-v0', 'mvp', 'prototipo-v0', 'prototipo-v1', 'registro-evolucao'].includes(artifact.id) && projectData.solutionCategories && projectData.solutionCategories.length > 0 && (
                            <span className="text-2xs font-extrabold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
                              <Box className="w-3 h-3" />
                              <span>{formatSolutionCategories(projectData.solutionCategories, projectData.solutionOtherCategory)}</span>
                            </span>
                          )}

                          {artifact.hasStructuredSubfields && (
                            <div className="flex items-center gap-1 ml-2 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCardActiveTab(prev => ({ ...prev, [artifact.id]: 'texto' }));
                                }}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition cursor-pointer ${
                                  currentCardTab === 'texto'
                                    ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                }`}
                              >
                                Texto Completo
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCardActiveTab(prev => ({ ...prev, [artifact.id]: 'estruturado' }));
                                }}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                                  currentCardTab === 'estruturado'
                                    ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                }`}
                              >
                                <Sliders className="w-3 h-3" />
                                <span>Campos V3.2</span>
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(artifact.id, val || artifact.placeholder)}
                            disabled={!val}
                            className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                              isCopied
                                ? 'bg-emerald-500 text-slate-950'
                                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed'
                            }`}
                            title="Copiar texto do artefato"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copiar Conteúdo</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              setActiveWebappTab('prompts');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-3 py-1.5 rounded-xl font-extrabold text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center gap-1 transition-all cursor-pointer"
                            title="Consultar prompt na biblioteca"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Ver na Biblioteca</span>
                          </button>
                        </div>
                      </div>

                      {/* Special Prototype V0 Preservation Notice */}
                      {artifact.id === 'prototipo-v0' && (
                        <div className="p-3 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-start gap-2.5 text-2xs text-slate-700 dark:text-slate-300">
                          <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-900 dark:text-slate-100">Linha de Base Original V0 Preservada:</strong>
                            <p className="mt-0.5 text-slate-600 dark:text-slate-400 leading-relaxed">
                              O Protótipo V0 permanece sempre disponível nesta tela para consulta e comparação histórica, mesmo após a evolução e consolidação do Protótipo V1 no Encontro 3.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Special Prototype V1 Evolution Context Banner */}
                      {artifact.id === 'prototipo-v1' && (
                        <div className="p-3 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-2xl space-y-2 text-2xs">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                              <strong className="text-amber-950 dark:text-amber-200">Evolução V0 → V1 Rastreada</strong>
                            </div>
                            <span className="text-3xs font-black uppercase text-amber-700 dark:text-amber-400">
                              Origem das Mudanças Vinculada
                            </span>
                          </div>
                          <p className="text-amber-900/90 dark:text-amber-300/90 leading-relaxed">
                            Esta versão incorpora os aprendizados do teste (ou hipóteses refinadas) sem sobrescrever o Protótipo V0. Consulte o artefato <strong>Registro de Evolução V0 → V1</strong> para inspecionar cada decisão tomada.
                          </p>
                        </div>
                      )}

                      {/* View 1: Main Text Editor */}
                      {currentCardTab === 'texto' && (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <label className="font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                              <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                              <span>Conteúdo do Artefato (Edição da Equipe):</span>
                            </label>
                            <span className="text-[11px] text-slate-400 font-semibold">
                              {val ? `${val.length} caracteres` : 'Vazio (use o modelo abaixo como base)'}
                            </span>
                          </div>

                          <textarea
                            rows={8}
                            value={val}
                            onChange={(e) => handleArtifactChange(artifact.fieldKey, e.target.value)}
                            placeholder={artifact.placeholder}
                            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed transition-all"
                          />
                        </div>
                      )}

                      {/* View 2: Structured Fields (V3.2 Composite Areas) */}
                      {currentCardTab === 'estruturado' && artifact.hasStructuredSubfields && (
                        <div className="bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                          
                          {/* A. Diagnóstico: Resumo para Revisão */}
                          {artifact.hasStructuredSubfields === 'diagnosisReview' && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400">
                                <Sparkle className="w-4 h-4" />
                                <span>RESUMO PARA REVISÃO DO DIAGNÓSTICO</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Problema — Síntese</label>
                                  <input
                                    type="text"
                                    value={projectData.v3DiagnosisReviewProblem || ''}
                                    onChange={(e) => handleArtifactChange('v3DiagnosisReviewProblem', e.target.value)}
                                    placeholder="Ex: Alunos não conseguem manter a frequência no laboratório..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Observações / Fatos Concretos</label>
                                  <input
                                    type="text"
                                    value={projectData.v3DiagnosisReviewFacts || ''}
                                    onChange={(e) => handleArtifactChange('v3DiagnosisReviewFacts', e.target.value)}
                                    placeholder="Ex: Queda de 40% na presença às terças e quintas..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Hipóteses Causais</label>
                                  <input
                                    type="text"
                                    value={projectData.v3DiagnosisReviewHypotheses || ''}
                                    onChange={(e) => handleArtifactChange('v3DiagnosisReviewHypotheses', e.target.value)}
                                    placeholder="Ex: Conflito de horários com transporte escolar..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Possíveis Causas / 5 Porquês</label>
                                  <input
                                    type="text"
                                    value={projectData.v3DiagnosisReviewCauses || ''}
                                    onChange={(e) => handleArtifactChange('v3DiagnosisReviewCauses', e.target.value)}
                                    placeholder="Ex: Falta de comunicação prévia sobre horários estendidos..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Dúvidas Críticas a Checar</label>
                                  <input
                                    type="text"
                                    value={projectData.v3DiagnosisReviewDoubts || ''}
                                    onChange={(e) => handleArtifactChange('v3DiagnosisReviewDoubts', e.target.value)}
                                    placeholder="Ex: Quantos alunos dependem exclusivamente da linha de ônibus das 17h?"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* B. MVP: Síntese do MVP */}
                          {artifact.hasStructuredSubfields === 'mvpSummary' && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400">
                                <Target className="w-4 h-4" />
                                <span>SÍNTESE ESTATUTÁRIA DO MVP</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                                <div className="md:col-span-2">
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Hipótese Principal a Testar</label>
                                  <input
                                    type="text"
                                    value={projectData.v3MvpMainHypothesis || ''}
                                    onChange={(e) => handleArtifactChange('v3MvpMainHypothesis', e.target.value)}
                                    placeholder="Ex: Notificações por WhatsApp com 30m de antecedência aumentam a presença..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Objetivo do Teste</label>
                                  <input
                                    type="text"
                                    value={projectData.v3MvpTestObjective || ''}
                                    onChange={(e) => handleArtifactChange('v3MvpTestObjective', e.target.value)}
                                    placeholder="Ex: Verificar adesão sem criar app complexo..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-emerald-600 dark:text-emerald-400 mb-1">O Que Inclui (Essencial)</label>
                                  <input
                                    type="text"
                                    value={projectData.v3MvpIncluded || ''}
                                    onChange={(e) => handleArtifactChange('v3MvpIncluded', e.target.value)}
                                    placeholder="Ex: Grupo de transmissão e formulário simples..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-rose-600 dark:text-rose-400 mb-1">O Que NÃO Inclui (Cortado)</label>
                                  <input
                                    type="text"
                                    value={projectData.v3MvpExcluded || ''}
                                    onChange={(e) => handleArtifactChange('v3MvpExcluded', e.target.value)}
                                    placeholder="Ex: Aplicativo dedicado, login com senha, gamificação..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Principal Corte de Escopo</label>
                                  <input
                                    type="text"
                                    value={projectData.v3MvpScopeCut || ''}
                                    onChange={(e) => handleArtifactChange('v3MvpScopeCut', e.target.value)}
                                    placeholder="Ex: Automação completa de chatbot..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Como Poderá Ser Testado</label>
                                  <input
                                    type="text"
                                    value={projectData.v3MvpTestMethod || ''}
                                    onChange={(e) => handleArtifactChange('v3MvpTestMethod', e.target.value)}
                                    placeholder="Ex: Simulação manual com 10 participantes por 3 dias..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Com Quem (Público do Teste)</label>
                                  <input
                                    type="text"
                                    value={projectData.v3MvpTargetTesters || ''}
                                    onChange={(e) => handleArtifactChange('v3MvpTargetTesters', e.target.value)}
                                    placeholder="Ex: 5 alunos do 2º ano e 5 do 3º ano..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Sinal de Caminho Certo</label>
                                  <input
                                    type="text"
                                    value={projectData.v3MvpSuccessSignal || ''}
                                    onChange={(e) => handleArtifactChange('v3MvpSuccessSignal', e.target.value)}
                                    placeholder="Ex: Mais de 70% dos avisados chegam no horário..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* C. Evidências Brutas: Registro Estruturado */}
                          {artifact.hasStructuredSubfields === 'rawEvidence' && (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400">
                                  <FlaskConical className="w-4 h-4" />
                                  <span>REGISTROS EVIDENCIAIS DE TESTE COM USUÁRIOS</span>
                                </div>
                              </div>
                              <p className="text-2xs text-slate-500">
                                Cada registro deve registrar fielmente a interação real sem suposições.
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Perfil Geral de Quem Testou</label>
                                  <input
                                    type="text"
                                    value={projectData.v3RawEvidenceProfile || ''}
                                    onChange={(e) => handleArtifactChange('v3RawEvidenceProfile', e.target.value)}
                                    placeholder="Ex: Aluna do 2º ano do Ensino Médio, usuária diária de celular"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">O Que Tentou Fazer</label>
                                  <input
                                    type="text"
                                    value={projectData.v3RawEvidenceAttemptedAction || ''}
                                    onChange={(e) => handleArtifactChange('v3RawEvidenceAttemptedAction', e.target.value)}
                                    placeholder="Ex: Confirmar presença na oficina pelo link da mensagem"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">O Que Aconteceu (Fato Concreto)</label>
                                  <input
                                    type="text"
                                    value={projectData.v3RawEvidenceWhatHappened || ''}
                                    onChange={(e) => handleArtifactChange('v3RawEvidenceWhatHappened', e.target.value)}
                                    placeholder="Ex: Clicou no link, mas ficou na dúvida sobre se a resposta gravou"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Funcionou Sem Ajuda?</label>
                                  <select
                                    value={projectData.v3RawEvidenceWorkedWithoutHelp || 'SIM'}
                                    onChange={(e) => handleArtifactChange('v3RawEvidenceWorkedWithoutHelp', e.target.value)}
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold"
                                  >
                                    <option value="SIM">Sim, funcionou autonomamente</option>
                                    <option value="PARCIAL">Com hesitação mas sem intervenção direta</option>
                                    <option value="NAO">Não, precisou de ajuda do facilitador</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Onde Hesitou ou Precisou de Ajuda?</label>
                                  <input
                                    type="text"
                                    value={projectData.v3RawEvidenceHesitation || ''}
                                    onChange={(e) => handleArtifactChange('v3RawEvidenceHesitation', e.target.value)}
                                    placeholder="Ex: No botão de confirmação que não mudava de cor"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Fala / Comentário Marcante do Testador</label>
                                  <input
                                    type="text"
                                    value={projectData.v3RawEvidenceQuote || ''}
                                    onChange={(e) => handleArtifactChange('v3RawEvidenceQuote', e.target.value)}
                                    placeholder='Ex: "Achei que ia receber um comprovante na hora"'
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 italic"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* D. Síntese de Evidências: Estrutura V3.2 */}
                          {artifact.hasStructuredSubfields === 'evidenceSynthesis' && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400">
                                <Sparkles className="w-4 h-4" />
                                <span>QUADRO DE SÍNTESE E APRENDIZADOS DE TESTE</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Status Geral do Teste</label>
                                  <input
                                    type="text"
                                    value={projectData.v3SynthesisTestStatus || ''}
                                    onChange={(e) => handleArtifactChange('v3SynthesisTestStatus', e.target.value)}
                                    placeholder="Ex: 8 testes realizados no intervalo de aulas"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-emerald-600 dark:text-emerald-400 mb-1">O Que Funcionou Sem Ajuda</label>
                                  <input
                                    type="text"
                                    value={projectData.v3SynthesisWorkedWell || ''}
                                    onChange={(e) => handleArtifactChange('v3SynthesisWorkedWell', e.target.value)}
                                    placeholder="Ex: Leitura da mensagem e clique inicial no link"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-amber-600 dark:text-amber-400 mb-1">Padrões Recorrentes vs Ocorrências Isoladas</label>
                                  <input
                                    type="text"
                                    value={projectData.v3SynthesisPatterns || ''}
                                    onChange={(e) => handleArtifactChange('v3SynthesisPatterns', e.target.value)}
                                    placeholder="Ex: Padrão: 6 de 8 esperavam feedback visual imediato"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-rose-600 dark:text-rose-400 mb-1">Bugs / Falhas / Hesitações</label>
                                  <input
                                    type="text"
                                    value={projectData.v3SynthesisBugs || ''}
                                    onChange={(e) => handleArtifactChange('v3SynthesisBugs', e.target.value)}
                                    placeholder="Ex: Formulário travou no iOS no teste #3"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Hipóteses Fortalecidas</label>
                                  <input
                                    type="text"
                                    value={projectData.v3SynthesisStrengthenedHypotheses || ''}
                                    onChange={(e) => handleArtifactChange('v3SynthesisStrengthenedHypotheses', e.target.value)}
                                    placeholder="Ex: Mensagens diretas atraem mais atenção que murais físicos"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">O Que Ainda NÃO Sabemos / Conclusão</label>
                                  <input
                                    type="text"
                                    value={projectData.v3SynthesisStillUnknown || ''}
                                    onChange={(e) => handleArtifactChange('v3SynthesisStillUnknown', e.target.value)}
                                    placeholder="Ex: Se a adesão continuará alta após a terceira semana"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* E. Roadmap: Horizontes e Prioridades */}
                          {artifact.hasStructuredSubfields === 'roadmap' && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400">
                                <Compass className="w-4 h-4" />
                                <span>HORIZONTES E PRIORIZAÇÃO DO ROADMAP</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-amber-600 dark:text-amber-400 mb-1">AGORA (Protótipo V1)</label>
                                  <textarea
                                    rows={2}
                                    value={projectData.v3RoadmapNow || ''}
                                    onChange={(e) => handleArtifactChange('v3RoadmapNow', e.target.value)}
                                    placeholder="Ex: Incluir mensagem automática de confirmação e tela de sucesso clara"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-blue-600 dark:text-blue-400 mb-1">DEPOIS (Próximos Testes)</label>
                                  <textarea
                                    rows={2}
                                    value={projectData.v3RoadmapNext || ''}
                                    onChange={(e) => handleArtifactChange('v3RoadmapNext', e.target.value)}
                                    placeholder="Ex: Lembrete recorrente no dia anterior da aula"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-purple-600 dark:text-purple-400 mb-1">FUTURAMENTE (Visão a Longo Prazo)</label>
                                  <textarea
                                    rows={2}
                                    value={projectData.v3RoadmapFuture || ''}
                                    onChange={(e) => handleArtifactChange('v3RoadmapFuture', e.target.value)}
                                    placeholder="Ex: Painel web integrado com a secretaria da escola"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-rose-600 dark:text-rose-400 mb-1">NÃO FAREMOS AGORA (Corte Explícito)</label>
                                  <textarea
                                    rows={2}
                                    value={projectData.v3RoadmapWontDoNow || ''}
                                    onChange={(e) => handleArtifactChange('v3RoadmapWontDoNow', e.target.value)}
                                    placeholder="Ex: Desenvolvimento de aplicativo nativo Android/iOS"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">3 Prioridades Centrais Justificadas</label>
                                  <input
                                    type="text"
                                    value={projectData.v3RoadmapThreePriorities || ''}
                                    onChange={(e) => handleArtifactChange('v3RoadmapThreePriorities', e.target.value)}
                                    placeholder="1. Confirmação instantânea | 2. Encurtar texto do formulário | 3. Suporte a áudio curto"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* F. Registro de Evolução V0 -> V1 */}
                          {artifact.hasStructuredSubfields === 'evolutionRecord' && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400">
                                <Table className="w-4 h-4" />
                                <span>MATRIZ DE MUDANÇAS (REGISTRO V0 → V1)</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Elemento Alterado</label>
                                  <input
                                    type="text"
                                    value={projectData.v3EvolElement || ''}
                                    onChange={(e) => handleArtifactChange('v3EvolElement', e.target.value)}
                                    placeholder="Ex: Tela de Confirmação de Presença"
                                    className="w-full p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Decisão</label>
                                  <select
                                    value={projectData.v3EvolDecision || 'ALTERAR'}
                                    onChange={(e) => handleArtifactChange('v3EvolDecision', e.target.value)}
                                    className="w-full p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold"
                                  >
                                    <option value="MANTER">MANTER</option>
                                    <option value="ALTERAR">ALTERAR</option>
                                    <option value="REMOVER">REMOVER</option>
                                    <option value="ADICIONAR">ADICIONAR</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Origem da Mudança</label>
                                  <select
                                    value={projectData.v3EvolOrigin || 'evidência de teste'}
                                    onChange={(e) => handleArtifactChange('v3EvolOrigin', e.target.value)}
                                    className="w-full p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold"
                                  >
                                    <option value="evidência de teste">Evidência de teste com usuário</option>
                                    <option value="evidência de execução">Evidência de execução/viabilidade</option>
                                    <option value="feedback">Feedback externo</option>
                                    <option value="decisão estratégica">Decisão estratégica da equipe</option>
                                    <option value="hipótese de design">Hipótese de design não testada</option>
                                  </select>
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">O Que Muda e Por Quê</label>
                                  <input
                                    type="text"
                                    value={projectData.v3EvolWhy || ''}
                                    onChange={(e) => handleArtifactChange('v3EvolWhy', e.target.value)}
                                    placeholder="Ex: Adicionado banner verde 'Presença Confirmada' porque usuários ficavam em dúvida"
                                    className="w-full p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Precisa Testar?</label>
                                  <select
                                    value={projectData.v3EvolNeedsTest || 'SIM'}
                                    onChange={(e) => handleArtifactChange('v3EvolNeedsTest', e.target.value)}
                                    className="w-full p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold"
                                  >
                                    <option value="SIM">Sim, testar na próxima rodada</option>
                                    <option value="NAO">Não, mudança trivial</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* G. Protótipo V1 */}
                          {artifact.hasStructuredSubfields === 'prototypeV1' && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400">
                                <Layers className="w-4 h-4" />
                                <span>ESPECIFICAÇÕES DO PROTÓTIPO V1</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Tipo / Formato de Materialização</label>
                                  <input
                                    type="text"
                                    value={projectData.v3PrototypeV1Type || ''}
                                    onChange={(e) => handleArtifactChange('v3PrototypeV1Type', e.target.value)}
                                    placeholder="Ex: Protótipo interativo no Figma com formulário web"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Próximo Teste Recomendado</label>
                                  <input
                                    type="text"
                                    value={projectData.v3PrototypeV1NextTest || ''}
                                    onChange={(e) => handleArtifactChange('v3PrototypeV1NextTest', e.target.value)}
                                    placeholder="Ex: Teste em turma cheia durante 1 semana consecutiva"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-emerald-600 dark:text-emerald-400 mb-1">O Que Mudou</label>
                                  <input
                                    type="text"
                                    value={projectData.v3PrototypeV1Changed || ''}
                                    onChange={(e) => handleArtifactChange('v3PrototypeV1Changed', e.target.value)}
                                    placeholder="Ex: Feedback visual imediato e resumo semanal"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">O Que Foi Mantido</label>
                                  <input
                                    type="text"
                                    value={projectData.v3PrototypeV1Kept || ''}
                                    onChange={(e) => handleArtifactChange('v3PrototypeV1Kept', e.target.value)}
                                    placeholder="Ex: Envio de lembrete pelo WhatsApp sem login"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">Hipóteses Ainda Abertas</label>
                                  <input
                                    type="text"
                                    value={projectData.v3PrototypeV1OpenHypotheses || ''}
                                    onChange={(e) => handleArtifactChange('v3PrototypeV1OpenHypotheses', e.target.value)}
                                    placeholder="Ex: Usuários com planos de dados limitados conseguirão carregar a página?"
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* H. Síntese Crítica do Pitch */}
                          {artifact.hasStructuredSubfields === 'pitchCriticalSynthesis' && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400">
                                <Megaphone className="w-4 h-4" />
                                <span>SÍNTESE CRÍTICA E CARTÃO DE BANCA</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-emerald-600 dark:text-emerald-400 mb-1">Pontos Fortes da Narrativa</label>
                                  <textarea
                                    rows={2}
                                    value={projectData.v3PitchStrongPoints || ''}
                                    onChange={(e) => handleArtifactChange('v3PitchStrongPoints', e.target.value)}
                                    placeholder="Ex: Problema muito bem contextualizado com dados reais de evasão..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-rose-600 dark:text-rose-400 mb-1">Pontos de Atenção / Fragilidades</label>
                                  <textarea
                                    rows={2}
                                    value={projectData.v3PitchAttentionPoints || ''}
                                    onChange={(e) => handleArtifactChange('v3PitchAttentionPoints', e.target.value)}
                                    placeholder="Ex: Cuidado para não afirmar que o custo é zero sem considerar manutenção..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-amber-600 dark:text-amber-400 mb-1">Cartão de Banca (Respostas na Ponta da Língua)</label>
                                  <textarea
                                    rows={3}
                                    value={projectData.v3PitchBancaCard || ''}
                                    onChange={(e) => handleArtifactChange('v3PitchBancaCard', e.target.value)}
                                    placeholder="P: Como pretendem manter o projeto sem recursos? -> R: Usaremos voluntários e infraestrutura pública já existente..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                                <div>
                                  <label className="block text-2xs font-extrabold uppercase text-slate-500 mb-1">O Que NÃO Devemos Afirmar Ainda</label>
                                  <textarea
                                    rows={3}
                                    value={projectData.v3PitchWhatNotToClaimYet || ''}
                                    onChange={(e) => handleArtifactChange('v3PitchWhatNotToClaimYet', e.target.value)}
                                    placeholder="Ex: Não dizer que o problema foi 100% resolvido, mas sim que a hipótese foi validada no piloto inicial..."
                                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: HISTÓRICO & VERSÕES (PROVENIÊNCIA V2 PRESERVADA)        */}
      {/* ------------------------------------------------------------- */}
      {activeMainTab === 'historico' && (
        <div className="space-y-4">
          {artifactVersions.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center space-y-3">
              <History className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                Nenhuma versão arquivada ainda
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Conforme a equipe executa as atividades e consolida checkpoints na jornada, os snapshots com proveniência e cadeia de dependências aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {artifactVersions
                .slice()
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((ver) => (
                  <div
                    key={ver.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-amber-500" />
                        <div>
                          <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                            {ver.versionName}
                          </div>
                          <div className="text-xs text-slate-400">
                            Atividade {ver.activityId} • {new Date(ver.createdAt).toLocaleString('pt-BR')}
                          </div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                        {ver.status}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto">
                      {ver.content}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: DADOS LEGADOS / RASCUNHOS PRÉVIOS                      */}
      {/* ------------------------------------------------------------- */}
      {activeMainTab === 'legado' && hasLegacyData && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 border-b border-slate-100 dark:border-slate-800 pb-3">
            <FolderArchive className="w-5 h-5" />
            <h3 className="text-sm font-black">Dados Preservados de Versões Anteriores</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Estes campos foram preservados das rodadas anteriores para garantir que nenhuma anotação ou formulação prévia da equipe seja perdida.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {projectData.phdProblems && (
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1">
                <span className="font-bold text-slate-500 uppercase text-[10px]">PHD: Problemas Registrados</span>
                <p className="text-slate-800 dark:text-slate-200">{projectData.phdProblems}</p>
              </div>
            )}
            {projectData.phdHypotheses && (
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1">
                <span className="font-bold text-slate-500 uppercase text-[10px]">PHD: Hipóteses Registradas</span>
                <p className="text-slate-800 dark:text-slate-200">{projectData.phdHypotheses}</p>
              </div>
            )}
            {projectData.phdDoubts && (
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1">
                <span className="font-bold text-slate-500 uppercase text-[10px]">PHD: Dúvidas Registradas</span>
                <p className="text-slate-800 dark:text-slate-200">{projectData.phdDoubts}</p>
              </div>
            )}
            {projectData.rootCause && (
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1">
                <span className="font-bold text-slate-500 uppercase text-[10px]">Causa Raiz Identificada</span>
                <p className="text-slate-800 dark:text-slate-200">{projectData.rootCause}</p>
              </div>
            )}
            {projectData.collectiveChallenge && (
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1">
                <span className="font-bold text-slate-500 uppercase text-[10px]">Desafio Coletivo</span>
                <p className="text-slate-800 dark:text-slate-200">{projectData.collectiveChallenge}</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
