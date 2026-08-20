import React, { useState } from 'react';
import { 
  Sparkles, Copy, Check, Search, ChevronDown, ChevronUp, 
  Bot, Sliders, CheckCircle2, Lightbulb, ArrowRight, Layers, FileText
} from 'lucide-react';
import { OFFICIAL_PROMPTS, OfficialPrompt } from '../../data/officialPrompts';
import { useApp } from '../../context/AppContext';
import { 
  V3_PROMPT_DEPENDENCIES, 
  buildV3PromptContext, 
  formatPromptWithSeparation 
} from '../../utils/contextPackBuilder';

export const PromptSynthesizerTab: React.FC = () => {
  const { state, updateProjectData, setActiveWebappTab } = useApp();
  const projectData = state.projectData || {};

  // Local state for context variables and artifacts V3.2
  const [localContext, setLocalContext] = useState<Record<string, string>>({
    // Variáveis Globais
    NOME_DO_PROJETO: projectData.projectName || '',
    PROBLEMA: projectData.collectiveChallenge || projectData.solutionProblemSummary || '',
    PUBLICO_ALVO: projectData.solutionTargetAudience || projectData.bmcCustomerSegments || '',
    BANCO_DE_IDEIAS: projectData.collectiveBrainstormNotes || projectData.parkingLotNotes || '',

    // Artefatos V3.2 (nunca vinculados ao Mapeamento Íntimo)
    DIAGNOSTICO_DO_PROBLEMA: projectData.v3ProblemDiagnosis || (projectData.phdProblems 
      ? `PROBLEMAS:\n${projectData.phdProblems}\n\nHIPÓTESES:\n${projectData.phdHypotheses || ''}\n\nDÚVIDAS:\n${projectData.phdDoubts || ''}\n\nCAUSA-RAIZ:\n${projectData.rootCause || ''}` 
      : ''),
    GOLDEN_CIRCLE: projectData.v3GoldenCircle || (projectData.goldenCircleWhy 
      ? `POR QUÊ: ${projectData.goldenCircleWhy}\nCOMO: ${projectData.goldenCircleHow || ''}\nO QUÊ: ${projectData.goldenCircleWhat || ''}` 
      : ''),
    BRIEFING_V0: projectData.v3BriefingV0 || (projectData.briefingWhatWeAreTryingToDo 
      ? `O que estamos tentando fazer: ${projectData.briefingWhatWeAreTryingToDo}\nContexto: ${projectData.briefingContext || ''}` 
      : ''),
    REVISAO_DO_BRIEFING: projectData.v3BriefingReview || '',
    BRIEFING_V1: projectData.v3BriefingV1 || (projectData.briefingWhatWeAreTryingToDo 
      ? `Briefing V1 Consolidado:\n${projectData.briefingWhatWeAreTryingToDo}\nContexto: ${projectData.briefingContext || ''}` 
      : ''),
    PRD_V0: projectData.v3PrdV0 || (projectData.prdHowItShouldWork 
      ? `Funcionamento: ${projectData.prdHowItShouldWork}\nRequisitos: ${projectData.prdRequirements || ''}` 
      : ''),
    MVP: projectData.v3Mvp || (projectData.mvpSmallestTestableVersion 
      ? `MVP: ${projectData.mvpSmallestTestableVersion}\nRecursos: ${projectData.mvpCoreFeatures || ''}` 
      : ''),
    SINTESE_DO_MVP: '',
    PROTOTIPO_V0: projectData.v3PrototypeV0 || projectData.prototypeLinkOrDescription || '',
    PLANO_DE_TESTE: projectData.v3TestPlan || '',
    EVIDENCIAS_BRUTAS: projectData.v3RawFeedbacks || projectData.prototypeUserFeedback || projectData.bugsAndFixes || '',
    SINTESE_DE_EVIDENCIAS: projectData.v3EvidenceSummary || projectData.v3FeedbackSynthesis || projectData.prototypeUserFeedback || '',
    BMC: projectData.v3Bmc || (projectData.bmcValueProposition 
      ? `Proposta de Valor: ${projectData.bmcValueProposition}\nSustentabilidade: ${projectData.bmcSustainability || ''}` 
      : ''),
    ROADMAP: projectData.v3Roadmap || (projectData.roadmapNow 
      ? `AGORA: ${projectData.roadmapNow}\nDEPOIS: ${projectData.roadmapNext || ''}\nFUTURAMENTE: ${projectData.roadmapFuture || ''}` 
      : ''),
    REGISTRO_DE_EVOLUCAO: '',
    PROTOTIPO_V1: projectData.v3PrototypeV1 || projectData.prototypeLinkOrDescription || '',
    ESTRUTURA_DO_PITCH: '',
    PITCH_INTEGRAL: projectData.v3PitchScript || projectData.pitchScriptText || '',
    SINTESE_DO_PITCH: '',
    ROTEIRO_VISUAL: projectData.v3PitchPresentation || '',
    PITCH_REVISADO: projectData.v3RehearsalNotes || '',
    SINTESE_CRITICA_DO_PITCH: ''
  });

  // UI States
  const [selectedEncounterFilter, setSelectedEncounterFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [useInterpolatedValues, setUseInterpolatedValues] = useState(true);
  const [activeContextTab, setActiveContextTab] = useState<'global' | 'enc1' | 'enc2' | 'enc3' | 'enc4'>('global');
  const [copiedState, setCopiedState] = useState<{ id: string; type: 'promptOnly' | 'promptContext' } | null>(null);
  const [expandedPromptIds, setExpandedPromptIds] = useState<Record<string, boolean>>({});

  const handleContextChange = (key: string, value: string) => {
    setLocalContext(prev => ({ ...prev, [key]: value }));
    
    // Sync back to projectData where applicable
    if (key === 'NOME_DO_PROJETO') updateProjectData({ projectName: value });
    if (key === 'PROBLEMA') updateProjectData({ collectiveChallenge: value });
    if (key === 'PUBLICO_ALVO') updateProjectData({ solutionTargetAudience: value });
  };

  // Interpolates text replacing placeholders
  const getInterpolatedText = (promptText: string): string => {
    if (!useInterpolatedValues) return promptText;

    let text = promptText;
    Object.keys(localContext).forEach(key => {
      const placeholder = `{${key}}`;
      const val = localContext[key]?.trim();
      if (val) {
        text = text.replaceAll(placeholder, val);
      }
    });
    return text;
  };

  // Copy Action 1: Prompt Only
  const handleCopyPromptOnly = (prompt: OfficialPrompt) => {
    const textToCopy = getInterpolatedText(prompt.promptText);
    navigator.clipboard.writeText(textToCopy);
    setCopiedState({ id: prompt.id, type: 'promptOnly' });
    setTimeout(() => setCopiedState(null), 2500);
  };

  // Copy Action 2: Prompt + Context (Automatic V3.2 Combination)
  const handleCopyPromptWithContext = (prompt: OfficialPrompt) => {
    const promptText = getInterpolatedText(prompt.promptText);
    const { formattedContext } = buildV3PromptContext(prompt.number, localContext);
    const combinedText = formatPromptWithSeparation(promptText, formattedContext);
    
    navigator.clipboard.writeText(combinedText);
    setCopiedState({ id: prompt.id, type: 'promptContext' });
    setTimeout(() => setCopiedState(null), 2500);
  };

  const toggleExpand = (promptId: string) => {
    setExpandedPromptIds(prev => ({ ...prev, [promptId]: !prev[promptId] }));
  };

  // Filtering
  const filteredPrompts = OFFICIAL_PROMPTS.filter(p => {
    const matchesEncounter = selectedEncounterFilter === 'all' || p.encounterId === selectedEncounterFilter;
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.promptText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEncounter && matchesSearch;
  });

  // Calculate filled stats
  const globalVarsFilledCount = ['NOME_DO_PROJETO', 'PROBLEMA', 'PUBLICO_ALVO', 'BANCO_DE_IDEIAS']
    .filter(k => !!localContext[k]?.trim()).length;
  
  const artifactsFilledCount = [
    'DIAGNOSTICO_DO_PROBLEMA', 'GOLDEN_CIRCLE', 'BRIEFING_V0', 'BRIEFING_V1',
    'PRD_V0', 'MVP', 'PROTOTIPO_V0', 'PLANO_DE_TESTE', 'EVIDENCIAS_BRUTAS',
    'SINTESE_DE_EVIDENCIAS', 'BMC', 'ROADMAP', 'PROTOTIPO_V1',
    'PITCH_INTEGRAL', 'ROTEIRO_VISUAL'
  ].filter(k => !!localContext[k]?.trim()).length;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/20 text-slate-950 font-black text-xs">
            <Sparkles className="w-4 h-4" />
            <span>BIBLIOTECA DE PROMPTS V3.2</span>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-950 text-amber-400">
            15 Prompts Oficiais • 4 Movimentos
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Gerador de Comandos Estruturados para IAs Generativas
          </h2>
          <p className="text-slate-950/85 text-sm sm:text-base font-semibold max-w-4xl">
            Acompanha os participantes em uma progressão contínua: Problema → Investigação → Direção de Solução → Definição → MVP → Protótipo → Teste → Evidência → Aprendizado → Evolução → Comunicação → Reflexão.
          </p>
        </div>

        {/* Pedagogical Principle */}
        <div className="bg-slate-950/15 border border-slate-950/20 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-950">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-950 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong className="font-extrabold uppercase tracking-wide block mb-0.5">Contexto Mínimo Suficiente:</strong>
              <span><strong>Copiar Prompt</strong> (apenas o comando puro) ou <strong>Copiar Prompt + Contexto</strong> (injeta determinística e cirurgicamente apenas os insumos necessários para a atividade).</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/20 text-2xs font-bold shrink-0">
            <span>🔒 <strong>Privacidade:</strong> Não inclua dados pessoais ou íntimos ao preencher o contexto.</span>
          </div>
        </div>
      </div>

      {/* Context & Artifacts Manager Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Painel de Contexto & Artefatos V3.2</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {globalVarsFilledCount}/4 variáveis globais • {artifactsFilledCount}/15 artefatos sincronizados
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sincronizado com o Projeto</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation for Context Fields */}
        <div className="flex overflow-x-auto border-t border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-1.5 gap-1.5 text-xs font-extrabold">
          <button
            onClick={() => setActiveContextTab('global')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeContextTab === 'global'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Globais ({globalVarsFilledCount}/4)
          </button>
          <button
            onClick={() => setActiveContextTab('enc1')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeContextTab === 'enc1'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Encontro 1 — Investigar
          </button>
          <button
            onClick={() => setActiveContextTab('enc2')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeContextTab === 'enc2'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Encontro 2 — Definir & Materializar
          </button>
          <button
            onClick={() => setActiveContextTab('enc3')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeContextTab === 'enc3'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Encontro 3 — Validar & Evoluir
          </button>
          <button
            onClick={() => setActiveContextTab('enc4')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeContextTab === 'enc4'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Encontro 4 — Comunicar & Refletir
          </button>
        </div>

        {/* Tab Contents for Context Editing */}
        <div className="p-5 sm:p-6">
          {/* Global Variables */}
          {activeContextTab === 'global' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Nome do Projeto {'{NOME_DO_PROJETO}'}
                </label>
                <input
                  type="text"
                  value={localContext.NOME_DO_PROJETO}
                  onChange={(e) => handleContextChange('NOME_DO_PROJETO', e.target.value)}
                  placeholder="Ex: EcoFiltro Escolar..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Problema Escolhido {'{PROBLEMA}'}
                </label>
                <textarea
                  rows={2}
                  value={localContext.PROBLEMA}
                  onChange={(e) => handleContextChange('PROBLEMA', e.target.value)}
                  placeholder="Ex: Desperdício excessivo de água nos bebedouros da escola..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Público-Alvo {'{PUBLICO_ALVO}'}
                </label>
                <textarea
                  rows={2}
                  value={localContext.PUBLICO_ALVO}
                  onChange={(e) => handleContextChange('PUBLICO_ALVO', e.target.value)}
                  placeholder="Ex: Alunos do ensino fundamental II e equipe de limpeza..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Banco de Ideias {'{BANCO_DE_IDEIAS}'}
                </label>
                <textarea
                  rows={2}
                  value={localContext.BANCO_DE_IDEIAS}
                  onChange={(e) => handleContextChange('BANCO_DE_IDEIAS', e.target.value)}
                  placeholder="Ideias de solução estacionadas pela equipe durante a investigação..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Encontro 1 Artifacts */}
          {activeContextTab === 'enc1' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Diagnóstico do Problema {'{DIAGNOSTICO_DO_PROBLEMA}'}
                </label>
                <textarea
                  rows={4}
                  value={localContext.DIAGNOSTICO_DO_PROBLEMA}
                  onChange={(e) => handleContextChange('DIAGNOSTICO_DO_PROBLEMA', e.target.value)}
                  placeholder="Problema, hipóteses, dúvidas, 5 Porquês e Resumo para Revisão..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Círculo Dourado (Golden Circle) {'{GOLDEN_CIRCLE}'}
                </label>
                <textarea
                  rows={4}
                  value={localContext.GOLDEN_CIRCLE}
                  onChange={(e) => handleContextChange('GOLDEN_CIRCLE', e.target.value)}
                  placeholder="Por quê (transformação), Como (princípios), O quê (solução)..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Encontro 2 Artifacts */}
          {activeContextTab === 'enc2' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Briefing V0 {'{BRIEFING_V0}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.BRIEFING_V0}
                  onChange={(e) => handleContextChange('BRIEFING_V0', e.target.value)}
                  placeholder="Briefing inicial consolidado..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Briefing V1 {'{BRIEFING_V1}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.BRIEFING_V1}
                  onChange={(e) => handleContextChange('BRIEFING_V1', e.target.value)}
                  placeholder="Briefing revisado criticamente pela equipe..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  PRD V0 {'{PRD_V0}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.PRD_V0}
                  onChange={(e) => handleContextChange('PRD_V0', e.target.value)}
                  placeholder="Requisitos funcionais, Must Have, Nice to Have..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Definição do MVP {'{MVP}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.MVP}
                  onChange={(e) => handleContextChange('MVP', e.target.value)}
                  placeholder="Menor versão testável focada na hipótese principal..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Protótipo V0 {'{PROTOTIPO_V0}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.PROTOTIPO_V0}
                  onChange={(e) => handleContextChange('PROTOTIPO_V0', e.target.value)}
                  placeholder="Especificação ou link do Protótipo V0 construído..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Plano de Teste {'{PLANO_DE_TESTE}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.PLANO_DE_TESTE}
                  onChange={(e) => handleContextChange('PLANO_DE_TESTE', e.target.value)}
                  placeholder="Hipótese a testar, roteiro neutro e folha de registro..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Encontro 3 Artifacts */}
          {activeContextTab === 'enc3' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Evidências Brutas {'{EVIDENCIAS_BRUTAS}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.EVIDENCIAS_BRUTAS}
                  onChange={(e) => handleContextChange('EVIDENCIAS_BRUTAS', e.target.value)}
                  placeholder="Anotações diretas e literais dos testes de campo..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Síntese de Evidências {'{SINTESE_DE_EVIDENCIAS}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.SINTESE_DE_EVIDENCIAS}
                  onChange={(e) => handleContextChange('SINTESE_DE_EVIDENCIAS', e.target.value)}
                  placeholder="O que funcionou, hesitações, falhas, hipóteses e conclusões..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Modelo de Sustentabilidade (BMC) {'{BMC}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.BMC}
                  onChange={(e) => handleContextChange('BMC', e.target.value)}
                  placeholder="Os 9 blocos e 3 hipóteses críticas de sustentabilidade..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Roadmap {'{ROADMAP}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.ROADMAP}
                  onChange={(e) => handleContextChange('ROADMAP', e.target.value)}
                  placeholder="Agora, Depois e Futuramente..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Protótipo V1 {'{PROTOTIPO_V1}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.PROTOTIPO_V1}
                  onChange={(e) => handleContextChange('PROTOTIPO_V1', e.target.value)}
                  placeholder="Mudanças implementadas da V0 para a V1 com origem declarada..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Encontro 4 Artifacts */}
          {activeContextTab === 'enc4' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Pitch Integral {'{PITCH_INTEGRAL}'}
                </label>
                <textarea
                  rows={4}
                  value={localContext.PITCH_INTEGRAL}
                  onChange={(e) => handleContextChange('PITCH_INTEGRAL', e.target.value)}
                  placeholder="Discurso de 3 minutos em primeira pessoa..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Roteiro Visual da Apresentação {'{ROTEIRO_VISUAL}'}
                </label>
                <textarea
                  rows={4}
                  value={localContext.ROTEIRO_VISUAL}
                  onChange={(e) => handleContextChange('ROTEIRO_VISUAL', e.target.value)}
                  placeholder="Roteiro visual de 6 a 8 slides de suporte..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls Bar: Filters, Search & Mode Toggle */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Encounter Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">
              Encontros:
            </span>

            <button
              onClick={() => setSelectedEncounterFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedEncounterFilter === 'all'
                  ? 'bg-slate-950 text-amber-400 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Todos (15)
            </button>

            <button
              onClick={() => setSelectedEncounterFilter(1)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedEncounterFilter === 1
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Encontro 1 (01-02)
            </button>

            <button
              onClick={() => setSelectedEncounterFilter(2)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedEncounterFilter === 2
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Encontro 2 (03-08)
            </button>

            <button
              onClick={() => setSelectedEncounterFilter(3)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedEncounterFilter === 3
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Encontro 3 (09-12)
            </button>

            <button
              onClick={() => setSelectedEncounterFilter(4)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedEncounterFilter === 4
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Encontro 4 (13-15)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative shrink-0 w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título ou termo..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Mode Toggle Option */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 dark:text-slate-300 select-none">
              <input
                type="checkbox"
                checked={useInterpolatedValues}
                onChange={(e) => setUseInterpolatedValues(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500"
              />
              <span>Interpolar variáveis do projeto nos comandos</span>
            </label>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-500 dark:text-slate-400">
              {useInterpolatedValues ? 'Substitui {VAR} pelos dados atuais preenchidos' : 'Exibe chaves canônicas {VAR}'}
            </span>
          </div>

          <div className="text-slate-500 dark:text-slate-400 font-semibold">
            Mostrando <strong>{filteredPrompts.length}</strong> de {OFFICIAL_PROMPTS.length} prompts
          </div>
        </div>
      </div>

      {/* Prompts Cards List */}
      <div className="space-y-6">
        {filteredPrompts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
            <Bot className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-200">
              Nenhum prompt encontrado
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Tente alterar os termos da busca ou selecione outro filtro de encontro.
            </p>
          </div>
        ) : (
          filteredPrompts.map((prompt) => {
            const interpolatedText = getInterpolatedText(prompt.promptText);
            const isPromptOnlyCopied = copiedState?.id === prompt.id && copiedState.type === 'promptOnly';
            const isPromptContextCopied = copiedState?.id === prompt.id && copiedState.type === 'promptContext';
            const isExpanded = !!expandedPromptIds[prompt.id];

            // V3.2 dependencies for this prompt
            const v3Dep = V3_PROMPT_DEPENDENCIES[prompt.number];
            const requiredCount = v3Dep?.requiredArtifacts.length || 0;
            const filledRequiredCount = v3Dep?.requiredArtifacts.filter(k => !!localContext[k]?.trim()).length || 0;

            return (
              <div
                key={prompt.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 transition-all hover:border-amber-500/40"
              >
                {/* Prompt Header */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-950 text-amber-400 text-[10px] font-black tracking-wider">
                        PROMPT {prompt.numberFormatted}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider">
                        {prompt.movement || prompt.encounterTitle}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-extrabold">
                        {prompt.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {prompt.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 max-w-3xl">
                      {prompt.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold">Ferramentas: </span>
                        <strong className="text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                          {prompt.recommendedTools}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold">Insumo: </span>
                        <code className="text-amber-700 dark:text-amber-400 font-mono text-[11px] bg-amber-50 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold">
                          {prompt.inputPrincipal}
                        </code>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold">Output: </span>
                        <code className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px] bg-emerald-50 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold">
                          {prompt.outputArtifact}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* 2 Distinct Action Buttons: Copiar Prompt & Copiar Prompt + Contexto */}
                  <div className="shrink-0 flex flex-wrap items-center gap-2 self-start lg:self-auto">
                    {/* Action 1: Copiar Prompt */}
                    <button
                      onClick={() => handleCopyPromptOnly(prompt)}
                      className={`px-3.5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all shadow-xs border ${
                        isPromptOnlyCopied
                          ? 'bg-emerald-500 text-slate-950 border-emerald-500 scale-105'
                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 active:scale-95'
                      }`}
                      title="Copia apenas o prompt de comando"
                    >
                      {isPromptOnlyCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-slate-950" />
                          <span>Prompt Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                          <span>Copiar Prompt</span>
                        </>
                      )}
                    </button>

                    {/* Action 2: Copiar Prompt + Contexto */}
                    <button
                      onClick={() => handleCopyPromptWithContext(prompt)}
                      className={`px-4 py-2.5 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all shadow-xs ${
                        isPromptContextCopied
                          ? 'bg-emerald-500 text-slate-950 scale-105'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95'
                      }`}
                      title="Combina o prompt atual com os insumos mínimos necessários segundo a matriz V3.2"
                    >
                      {isPromptContextCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-slate-950" />
                          <span>Prompt + Contexto Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Layers className="w-3.5 h-3.5 text-slate-950" />
                          <span>Copiar Prompt + Contexto</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Prompt Dependencies & Context Required Matrix */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                      <Layers className="w-3.5 h-3.5 text-amber-500" />
                      <span>Contexto Mínimo Suficiente (V3.2):</span>
                    </div>
                    {requiredCount > 0 ? (
                      <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                        filledRequiredCount === requiredCount 
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                          : 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
                      }`}>
                        {filledRequiredCount}/{requiredCount} artefatos prontos
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-400">
                        Início da jornada (sem artefato anterior obrigatório)
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    {v3Dep && v3Dep.requiredArtifacts.length > 0 ? (
                      v3Dep.requiredArtifacts.map((artKey) => {
                        const isFilled = !!localContext[artKey]?.trim();
                        return (
                          <span
                            key={artKey}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold transition-all ${
                              isFilled
                                ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25'
                                : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            <FileText className="w-3 h-3" />
                            <span>{`{${artKey}}`}</span>
                            <span>{isFilled ? '✓' : '(pendente)'}</span>
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400 italic text-[11px]">
                        Utiliza apenas o problema e contexto básico da equipe.
                      </span>
                    )}
                  </div>
                </div>

                {/* Prompt Code Box Container */}
                <div className="relative group">
                  <div 
                    className={`bg-slate-950 text-amber-300/90 font-mono text-xs sm:text-sm p-5 sm:p-6 rounded-2xl border border-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-amber-500 selection:text-slate-950 transition-all ${
                      !isExpanded ? 'max-h-60 overflow-hidden' : ''
                    }`}
                  >
                    {interpolatedText}
                  </div>

                  {/* Fade Overlay when Collapsed */}
                  {!isExpanded && (
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent rounded-b-2xl pointer-events-none flex items-end justify-center pb-3" />
                  )}
                </div>

                {/* Expand / Collapse Toggle Button */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => toggleExpand(prompt.id)}
                    className="text-xs font-black text-amber-600 dark:text-amber-400 hover:text-amber-500 flex items-center gap-1.5 transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        <span>Recolher Prompt</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>Ver Prompt Completo</span>
                      </>
                    )}
                  </button>

                  <span className="text-[11px] font-semibold text-slate-400">
                    {interpolatedText.length} caracteres
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
