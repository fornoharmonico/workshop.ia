import React, { useState } from 'react';
import { 
  Sparkles, Copy, Check, Terminal, Search, ChevronDown, ChevronUp, 
  Layers, Bot, Sliders, CheckCircle2, Info, ArrowRight, Lightbulb, FileText, Filter
} from 'lucide-react';
import { OFFICIAL_PROMPTS, OfficialPrompt } from '../../data/officialPrompts';
import { useApp } from '../../context/AppContext';

export const PromptSynthesizerTab: React.FC = () => {
  const { state, updateProjectData, setActiveWebappTab, setCurrentPilotActivityId } = useApp();
  const projectData = state.projectData || {};

  // Local state for context variables and overrides
  const [localContext, setLocalContext] = useState<Record<string, string>>({
    CONTEXTO_DA_EQUIPE: projectData.teamName || '',
    NOME_DO_PROJETO: projectData.projectName || '',
    PROBLEMA: projectData.collectiveChallenge || projectData.solutionProblemSummary || '',
    PUBLICO_ALVO: projectData.solutionTargetAudience || projectData.bmcCustomerSegments || '',
    MAPA_DE_PROBLEMAS: projectData.individualChallengesNote || '',
    PHD: projectData.phdProblems 
      ? `PROBLEMAS:\n${projectData.phdProblems}\n\nHIPÓTESES:\n${projectData.phdHypotheses || ''}\n\nDÚVIDAS:\n${projectData.phdDoubts || ''}` 
      : '',
    CINCO_PORQUES: projectData.rootCause ? `Causa-Raiz Prioritária: ${projectData.rootCause}` : '',
    GOLDEN_CIRCLE: projectData.goldenCircleWhy 
      ? `POR QUÊ: ${projectData.goldenCircleWhy}\nCOMO: ${projectData.goldenCircleHow || ''}\nO QUÊ: ${projectData.goldenCircleWhat || ''}` 
      : '',
    BRIEFING: projectData.briefingWhatWeAreTryingToDo 
      ? `O que estamos tentando fazer: ${projectData.briefingWhatWeAreTryingToDo}\nContexto: ${projectData.briefingContext || ''}` 
      : '',
    PRD: projectData.prdHowItShouldWork 
      ? `Funcionamento: ${projectData.prdHowItShouldWork}\nRequisitos: ${projectData.prdRequirements || ''}` 
      : '',
    MVP: projectData.mvpSmallestTestableVersion 
      ? `MVP: ${projectData.mvpSmallestTestableVersion}\nRecursos: ${projectData.mvpCoreFeatures || ''}` 
      : '',
    PROTOTIPO_V0: projectData.prototypeLinkOrDescription || '',
    FEEDBACKS: projectData.prototypeUserFeedback || projectData.bugsAndFixes || '',
    BMC: projectData.bmcValueProposition 
      ? `Proposta de Valor: ${projectData.bmcValueProposition}\nSustentabilidade: ${projectData.bmcSustainability || ''}` 
      : '',
    ROADMAP: projectData.roadmapNow 
      ? `AGORA: ${projectData.roadmapNow}\nDEPOIS: ${projectData.roadmapNext || ''}\nFUTURAMENTE: ${projectData.roadmapFuture || ''}` 
      : '',
    PROTOTIPO_V1: projectData.prototypeLinkOrDescription || '',
    ROTEIRO_DO_PITCH: projectData.pitchScriptText || ''
  });

  // UI States
  const [selectedEncounterFilter, setSelectedEncounterFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [useInterpolatedValues, setUseInterpolatedValues] = useState(true);
  const [showContextManager, setShowContextManager] = useState(false);
  const [activeContextTab, setActiveContextTab] = useState<'global' | 'enc1' | 'enc2' | 'enc3' | 'enc4'>('global');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedPromptIds, setExpandedPromptIds] = useState<Record<string, boolean>>({});

  const handleContextChange = (key: string, value: string) => {
    setLocalContext(prev => ({ ...prev, [key]: value }));
    
    // Sync back to projectData where applicable
    if (key === 'NOME_DO_PROJETO') updateProjectData({ projectName: value });
    if (key === 'CONTEXTO_DA_EQUIPE') updateProjectData({ teamName: value });
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

  const handleCopy = (promptId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(promptId);
    setTimeout(() => setCopiedId(null), 2500);
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
      p.templateText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEncounter && matchesSearch;
  });

  // Calculate filled stats
  const globalVarsFilledCount = ['CONTEXTO_DA_EQUIPE', 'NOME_DO_PROJETO', 'PROBLEMA', 'PUBLICO_ALVO']
    .filter(k => !!localContext[k]?.trim()).length;
  
  const artifactsFilledCount = [
    'MAPA_DE_PROBLEMAS', 'PHD', 'CINCO_PORQUES', 'GOLDEN_CIRCLE',
    'BRIEFING', 'PRD', 'MVP', 'PROTOTIPO_V0', 'FEEDBACKS', 'BMC',
    'ROADMAP', 'PROTOTIPO_V1', 'ROTEIRO_DO_PITCH'
  ].filter(k => !!localContext[k]?.trim()).length;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/20 text-slate-950 font-black text-xs">
            <Sparkles className="w-4 h-4" />
            <span>BIBLIOTECA DE PROMPTS - O FORNO</span>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-950 text-amber-400">
            17 Prompts Oficiais • 4 Encontros
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Gerador de Comandos Estruturados para IAs Generativas
          </h2>
          <p className="text-slate-950/85 text-sm sm:text-base font-semibold max-w-4xl">
            Guia metodológico para conduzir a IA como parceira de reflexão, investigação, prototipação e comunicação do seu projeto.
          </p>
        </div>

        {/* Pedagogical Principle */}
        <div className="bg-slate-950/15 border border-slate-950/20 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3 text-slate-950">
          <Lightbulb className="w-5 h-5 text-amber-950 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <strong className="font-extrabold uppercase tracking-wide block mb-0.5">Princípio Pedagógico:</strong>
            <em>"Antes de pensar na solução, precisamos compreender melhor o problema."</em>
          </div>
        </div>
      </div>

      {/* Context & Artifacts Manager Panel (Always Visible) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Painel de Contexto & Artefatos da Jornada</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {globalVarsFilledCount}/4 variáveis globais • {artifactsFilledCount}/13 artefatos acumulados
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

        <div className="p-6 sm:p-8 border-t border-slate-200 dark:border-slate-800 space-y-6 bg-slate-50/50 dark:bg-slate-900/50">
            {/* Context Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <button
                onClick={() => setActiveContextTab('global')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  activeContextTab === 'global'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>🌍 Variáveis Globais (4)</span>
                {globalVarsFilledCount === 4 && <Check className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setActiveContextTab('enc1')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  activeContextTab === 'enc1'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>Encontro 1: Diagnóstico (4)</span>
              </button>

              <button
                onClick={() => setActiveContextTab('enc2')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  activeContextTab === 'enc2'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>Encontro 2: Definição & MVP (4)</span>
              </button>

              <button
                onClick={() => setActiveContextTab('enc3')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  activeContextTab === 'enc3'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>Encontro 3: Validação & BMC (3)</span>
              </button>

              <button
                onClick={() => setActiveContextTab('enc4')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  activeContextTab === 'enc4'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>Encontro 4: Pitch (2)</span>
              </button>
            </div>

            {/* Global Fields Tab */}
            {activeContextTab === 'global' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Nome do Projeto {'{NOME_DO_PROJETO}'}</span>
                  </label>
                  <input
                    type="text"
                    value={localContext.NOME_DO_PROJETO}
                    onChange={(e) => handleContextChange('NOME_DO_PROJETO', e.target.value)}
                    placeholder="Ex: EcoGuia, HortaInteligente, StudyAI"
                    className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    <span>Contexto da Equipe {'{CONTEXTO_DA_EQUIPE}'}</span>
                  </label>
                  <input
                    type="text"
                    value={localContext.CONTEXTO_DA_EQUIPE}
                    onChange={(e) => handleContextChange('CONTEXTO_DA_EQUIPE', e.target.value)}
                    placeholder="Ex: Equipe de 4 estudantes do 1º ano do Ensino Médio"
                    className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    <span>Problema Central {'{PROBLEMA}'}</span>
                  </label>
                  <input
                    type="text"
                    value={localContext.PROBLEMA}
                    onChange={(e) => handleContextChange('PROBLEMA', e.target.value)}
                    placeholder="Ex: Falta de descarte adequado para lixo eletrônico no bairro"
                    className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    <span>Público-Alvo {'{PUBLICO_ALVO}'}</span>
                  </label>
                  <input
                    type="text"
                    value={localContext.PUBLICO_ALVO}
                    onChange={(e) => handleContextChange('PUBLICO_ALVO', e.target.value)}
                    placeholder="Ex: Moradores do entorno da escola e comércio local"
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
                    Mapa de Problemas {'{MAPA_DE_PROBLEMAS}'}
                  </label>
                  <textarea
                    rows={3}
                    value={localContext.MAPA_DE_PROBLEMAS}
                    onChange={(e) => handleContextChange('MAPA_DE_PROBLEMAS', e.target.value)}
                    placeholder="Síntese dos problemas mapeados no Encontro 1..."
                    className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Diagnóstico PHD {'{PHD}'}
                  </label>
                  <textarea
                    rows={3}
                    value={localContext.PHD}
                    onChange={(e) => handleContextChange('PHD', e.target.value)}
                    placeholder="Problemas, Hipóteses e Dúvidas consolidadas..."
                    className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Cinco Porquês / Causa-Raiz {'{CINCO_PORQUES}'}
                  </label>
                  <textarea
                    rows={3}
                    value={localContext.CINCO_PORQUES}
                    onChange={(e) => handleContextChange('CINCO_PORQUES', e.target.value)}
                    placeholder="Cadeia investigativa dos Cinco Porquês..."
                    className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Golden Circle {'{GOLDEN_CIRCLE}'}
                  </label>
                  <textarea
                    rows={3}
                    value={localContext.GOLDEN_CIRCLE}
                    onChange={(e) => handleContextChange('GOLDEN_CIRCLE', e.target.value)}
                    placeholder="Por quê? Como? O quê? e propósito do projeto..."
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
                    Briefing V0 / V1 {'{BRIEFING}'}
                  </label>
                  <textarea
                    rows={3}
                    value={localContext.BRIEFING}
                    onChange={(e) => handleContextChange('BRIEFING', e.target.value)}
                    placeholder="Briefing do projeto..."
                    className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    PRD V0 {'{PRD}'}
                  </label>
                  <textarea
                    rows={3}
                    value={localContext.PRD}
                    onChange={(e) => handleContextChange('PRD', e.target.value)}
                    placeholder="Especificação do PRD V0..."
                    className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    MVP {'{MVP}'}
                  </label>
                  <textarea
                    rows={3}
                    value={localContext.MVP}
                    onChange={(e) => handleContextChange('MVP', e.target.value)}
                    placeholder="Definição do Produto Mínimo Viável..."
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
                    placeholder="Descrição ou link do Protótipo V0..."
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
                    Feedbacks Coletados {'{FEEDBACKS}'}
                  </label>
                  <textarea
                    rows={3}
                    value={localContext.FEEDBACKS}
                    onChange={(e) => handleContextChange('FEEDBACKS', e.target.value)}
                    placeholder="Anotações e comentários dos testes de usuários..."
                    className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Business Model Canvas {'{BMC}'}
                  </label>
                  <textarea
                    rows={3}
                    value={localContext.BMC}
                    onChange={(e) => handleContextChange('BMC', e.target.value)}
                    placeholder="Sustentabilidade, recursos e parcerias..."
                    className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
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
              </div>
            )}

            {/* Encontro 4 Artifacts */}
            {activeContextTab === 'enc4' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Protótipo V1 {'{PROTOTIPO_V1}'}
                  </label>
                  <textarea
                    rows={3}
                    value={localContext.PROTOTIPO_V1}
                    onChange={(e) => handleContextChange('PROTOTIPO_V1', e.target.value)}
                    placeholder="Aprimoramentos da V0 para a V1..."
                    className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Roteiro do Pitch {'{ROTEIRO_DO_PITCH}'}
                  </label>
                  <textarea
                    rows={3}
                    value={localContext.ROTEIRO_DO_PITCH}
                    onChange={(e) => handleContextChange('ROTEIRO_DO_PITCH', e.target.value)}
                    placeholder="Roteiro oral de 3 minutos do Pitch..."
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
              Todos (17)
            </button>

            <button
              onClick={() => setSelectedEncounterFilter(1)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedEncounterFilter === 1
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Encontro 1 (1-4)
            </button>

            <button
              onClick={() => setSelectedEncounterFilter(2)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedEncounterFilter === 2
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Encontro 2 (5-10)
            </button>

            <button
              onClick={() => setSelectedEncounterFilter(3)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedEncounterFilter === 3
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Encontro 3 (11-14)
            </button>

            <button
              onClick={() => setSelectedEncounterFilter(4)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedEncounterFilter === 4
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Encontro 4 (15-17)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative shrink-0 w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por palavra-chave..."
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
              <span>Interpolar dados preenchidos nos prompts</span>
            </label>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-500 dark:text-slate-400">
              {useInterpolatedValues ? 'Substitui {VAR} pelos valores do seu projeto' : 'Exibe modelo original com chaves {VAR}'}
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
            const interpolatedText = getInterpolatedText(prompt.templateText);
            const isCopied = copiedId === prompt.id;
            const isExpanded = !!expandedPromptIds[prompt.id];

            return (
              <div
                key={prompt.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 transition-all hover:border-amber-500/40"
              >
                {/* Prompt Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-950 text-amber-400 text-[10px] font-black tracking-wider">
                        PROMPT {prompt.number.toString().padStart(2, '0')}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider">
                        {prompt.encounterTitle}
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

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                      <span className="text-slate-400 font-semibold">Ferramenta:</span>
                      <strong className="text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        {prompt.recommendedTool}
                      </strong>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="shrink-0 flex flex-wrap items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => {
                        if (prompt.activityId) {
                          setCurrentPilotActivityId(prompt.activityId);
                        }
                        setActiveWebappTab('jornada');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2.5 rounded-2xl font-black text-xs flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-xs active:scale-95"
                      title="Ver esta atividade na seção 1. Jornada"
                    >
                      <span>Ir para 1. Jornada</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleCopy(prompt.id, interpolatedText)}
                      className={`px-4 py-2.5 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all shadow-xs ${
                        isCopied
                          ? 'bg-emerald-500 text-slate-950 scale-105'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Prompt Dependencies / Context Badge Row */}
                <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span className="text-slate-400">Variáveis usadas:</span>
                  {prompt.globalVarsUsed.map(v => (
                    <span 
                      key={v} 
                      className={`px-2 py-0.5 rounded ${
                        localContext[v]?.trim() 
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {`{${v}}`} {localContext[v]?.trim() ? '✓' : ''}
                    </span>
                  ))}
                  {prompt.artifactsUsed.map(a => (
                    <span 
                      key={a} 
                      className={`px-2 py-0.5 rounded ${
                        localContext[a]?.trim() 
                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {`{${a}}`} {localContext[a]?.trim() ? '✓' : ''}
                    </span>
                  ))}
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
