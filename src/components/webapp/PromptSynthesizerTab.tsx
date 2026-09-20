import React, { useState } from 'react';
import { 
  Sparkles, Copy, Check, Search, ChevronDown, ChevronUp, 
  Bot, Sliders, CheckCircle2, Lightbulb, ArrowRight, Layers, FileText
} from 'lucide-react';
import { OFFICIAL_PROMPTS_V3 as OFFICIAL_PROMPTS, OfficialPromptV3 as OfficialPrompt } from '../../data/officialPrompts';
import { useApp } from '../../context/AppContext';
import { 
  V3_PROMPT_DEPENDENCIES, 
  buildV3PromptContext, 
  formatPromptWithSeparation 
} from '../../utils/contextPackBuilder';

export const PromptSynthesizerTab: React.FC = () => {
  const { state, updateProjectData, setActiveWebappTab } = useApp();
  const projectData = state.projectData || {};

  // Local state for context variables and artifacts V2.2
  const [localContext, setLocalContext] = useState<Record<string, string>>({
    // Variáveis Globais
    NOME_DO_PROJETO: projectData.projectName || '',
    PROBLEMA: projectData.collectiveChallenge || projectData.solutionProblemSummary || '',
    PUBLICO_ALVO: projectData.solutionTargetAudience || projectData.bmcCustomerSegments || '',
    BANCO_DE_IDEIAS: projectData.collectiveBrainstormNotes || projectData.parkingLotNotes || '',
    CONTEXTO_DA_TURMA: '',

    // Artefatos Canônicos AF01 a AF12 (V2.2)
    AF01: projectData.collectiveChallenge || projectData.solutionProblemSummary || '',
    AF02: projectData.v3ProblemDiagnosis || '',
    AF03: projectData.v3Mapa4D || '',
    AF04: projectData.v3GoldenCircle || '',
    AF05: projectData.v3BriefingV0 || '',
    AF06: projectData.v3BriefingV1 || '',
    AF07: projectData.v3PrdV0 || '',
    AF08: projectData.v3Mvp || projectData.v3PrototypeV0 || '',
    AF09: projectData.v3EvidenceSummary || projectData.v3RawFeedbacks || '',
    AF10: projectData.v3Bmc || '',
    AF11: projectData.v3Roadmap || '',
    AF12: projectData.v3PitchScript || '',

    // Aliases para preenchimento legado/amigável
    DIAGNOSTICO_DO_PROBLEMA: projectData.v3ProblemDiagnosis || '',
    MAPA_4D: projectData.v3Mapa4D || '',
    GOLDEN_CIRCLE: projectData.v3GoldenCircle || '',
    BRIEFING_V0: projectData.v3BriefingV0 || '',
    BRIEFING_V1: projectData.v3BriefingV1 || '',
    PRD_V0: projectData.v3PrdV0 || '',
    MVP: projectData.v3Mvp || '',
    PROTOTIPO_V0: projectData.v3PrototypeV0 || '',
    PLANO_DE_TESTE: projectData.v3TestPlan || '',
    EVIDENCIAS_BRUTAS: projectData.v3RawFeedbacks || '',
    SINTESE_DE_EVIDENCIAS: projectData.v3EvidenceSummary || '',
    BMC: projectData.v3Bmc || '',
    ROADMAP: projectData.v3Roadmap || '',
    PROTOTIPO_V1: projectData.v3PrototypeV1 || '',
    PITCH_INTEGRAL: projectData.v3PitchScript || '',
    ROTEIRO_VISUAL: projectData.v3PitchPresentation || '',
  });

  // UI States
  const [selectedEncounterFilter, setSelectedEncounterFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [useInterpolatedValues, setUseInterpolatedValues] = useState(true);
  const [activeContextTab, setActiveContextTab] = useState<'global' | 'enc1' | 'enc2' | 'enc3' | 'enc4'>('global');
  const [isContextPanelExpanded, setIsContextPanelExpanded] = useState(false);
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
    'AF01', 'AF02', 'AF03', 'AF04', 'AF05', 'AF06',
    'AF07', 'AF08', 'AF09', 'AF10', 'AF11', 'AF12'
  ].filter(k => !!localContext[k]?.trim()).length;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header / Hero Banner */}
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
          {/* Column 1: Title and Canonical Metadata */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>BIBLIOTECA DE PROMPTS V2.2 CANÔNICA</span>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                12 Prompts Canônicos (P01 a P12) • 4 Encontros
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Gerador de Comandos Estruturados para IAs Generativas
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Comandos projetados para orientar sua equipe com rigor pedagógico. Conduza cada etapa da esteira do método Fornologia com suporte socrático e determinístico.
            </p>

            {/* Stepper visual compacto */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-400">
              <span className="text-amber-400 font-bold">Esteira:</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300">Problema</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300">Investigação</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300">Briefing & PRD</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300">MVP & Protótipo</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300">Validação</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300">Pitch</span>
            </div>
          </div>

          {/* Column 2: Minimal Sufficient Context Guide */}
          <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 sm:p-5 space-y-3 text-slate-200">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Princípio do Contexto Mínimo Suficiente</span>
            </div>

            <div className="space-y-2 text-xs leading-relaxed text-slate-300">
              <p>
                <strong className="text-white font-bold">1. Copiar Prompt:</strong> Copia apenas as instruções e regras para colar em qualquer IA.
              </p>
              <p>
                <strong className="text-amber-300 font-bold">2. Copiar Prompt + Contexto:</strong> Injeta de forma cirúrgica os artefatos preenchidos pela sua equipe para gerar respostas altamente personalizadas.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <span>🔒</span>
                <span>Armazenamento local seguro. Sem envio a servidores externos.</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Context & Artifacts Manager Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
        <div 
          onClick={() => setIsContextPanelExpanded(prev => !prev)}
          className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  Painel de Contexto & Artefatos V2.2
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  {globalVarsFilledCount}/4 variáveis • {artifactsFilledCount}/12 artefatos
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {isContextPanelExpanded 
                  ? 'Clique para recolher os campos de edição e focar na biblioteca de prompts.' 
                  : 'Clique para visualizar ou editar os dados sincronizados do projeto que alimentam os comandos.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-center">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sincronizado</span>
            </div>

            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isContextPanelExpanded ? 'Recolher' : 'Editar Dados'}</span>
              {isContextPanelExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation & Editor shown only when expanded */}
        {isContextPanelExpanded && (
          <div className="border-t border-slate-100 dark:border-slate-800">
            {/* Tab Navigation for Context Fields */}
            <div className="flex overflow-x-auto bg-slate-50/50 dark:bg-slate-900/50 p-1.5 gap-1.5 text-xs font-extrabold scrollbar-none">
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
                  AF01 — Mapa de Problemas + Problema Escolhido {'{AF01}'}
                </label>
                <textarea
                  rows={4}
                  value={localContext.AF01}
                  onChange={(e) => handleContextChange('AF01', e.target.value)}
                  placeholder="Problema escolhido com dores observadas, relevância local e recorte nítido..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  AF02 — Diagnóstico do Problema {'{AF02}'}
                </label>
                <textarea
                  rows={4}
                  value={localContext.AF02}
                  onChange={(e) => handleContextChange('AF02', e.target.value)}
                  placeholder="Observações factuais, hipóteses em validação, dúvidas críticas e causas raízes..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  AF03 — Mapa de Recursos {'{AF03}'}
                </label>
                <textarea
                  rows={4}
                  value={localContext.AF03}
                  onChange={(e) => handleContextChange('AF03', e.target.value)}
                  placeholder="Dimensões Cultural, Social, Ambiental e Financeira..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  AF04 — Propósito e Direção {'{AF04}'}
                </label>
                <textarea
                  rows={4}
                  value={localContext.AF04}
                  onChange={(e) => handleContextChange('AF04', e.target.value)}
                  placeholder="Transformação pretendida, motivação essencial, princípios inegociáveis e direção..."
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
                  AF05 — Briefing V0 {'{AF05}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.AF05}
                  onChange={(e) => handleContextChange('AF05', e.target.value)}
                  placeholder="Briefing inicial consolidado da solução..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  AF06 — Briefing V1 (Versão Autoritativa) {'{AF06}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.AF06}
                  onChange={(e) => handleContextChange('AF06', e.target.value)}
                  placeholder="Briefing revisado criticamente com decisões explícitas da equipe..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  AF07 — Especificação de Funcionamento (PRD) {'{AF07}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.AF07}
                  onChange={(e) => handleContextChange('AF07', e.target.value)}
                  placeholder="Jornada do usuário, o que a solução faz/não faz, essencial vs. desejável..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  AF08 — MVP e Protótipo V0 com Plano de Realização {'{AF08}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.AF08}
                  onChange={(e) => handleContextChange('AF08', e.target.value)}
                  placeholder="Menor versão testável, formato do protótipo e plano (quando, o que acontece, onde, quem)..."
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
                  AF09 — Testes, Aprendizados e Evolução V0→V1 {'{AF09}'}
                </label>
                <textarea
                  rows={4}
                  value={localContext.AF09}
                  onChange={(e) => handleContextChange('AF09', e.target.value)}
                  placeholder="Status de validação empírica, evidências reais observadas, hesitações e 3 a 5 prioridades de evolução..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  AF10 — Modelo de Sustentabilidade {'{AF10}'}
                </label>
                <textarea
                  rows={4}
                  value={localContext.AF10}
                  onChange={(e) => handleContextChange('AF10', e.target.value)}
                  placeholder="Os 9 blocos autorais de sustentabilidade e 3 hipóteses críticas testáveis..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  AF11 — Roadmap de Prioridades e Linha do Tempo {'{AF11}'}
                </label>
                <textarea
                  rows={3}
                  value={localContext.AF11}
                  onChange={(e) => handleContextChange('AF11', e.target.value)}
                  placeholder="Matriz Agora / Depois / Futuramente e Linha do Tempo em 7 Etapas com responsáveis..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Encontro 4 Artifacts */}
          {activeContextTab === 'enc4' && (
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  AF12 — Kit de Comunicação Final {'{AF12}'}
                </label>
                <textarea
                  rows={5}
                  value={localContext.AF12}
                  onChange={(e) => handleContextChange('AF12', e.target.value)}
                  placeholder="Pitch V1 oral (3 min), Roteiro Visual de até 6 telas e Simulação de Banca com 5 perguntas desafiadoras..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>
          </div>
        )}
      </div>

      {/* Controls Bar: Filters, Search & Mode Toggle */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          
          {/* Encounter Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider mr-1 hidden xl:inline">
              Filtro:
            </span>

            <button
              onClick={() => setSelectedEncounterFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                selectedEncounterFilter === 'all'
                  ? 'bg-slate-950 text-amber-400 dark:bg-amber-500 dark:text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Todos (12)
            </button>

            <button
              onClick={() => setSelectedEncounterFilter(1)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                selectedEncounterFilter === 1
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Encontro 1 (4)
            </button>

            <button
              onClick={() => setSelectedEncounterFilter(2)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                selectedEncounterFilter === 2
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Encontro 2 (4)
            </button>

            <button
              onClick={() => setSelectedEncounterFilter(3)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                selectedEncounterFilter === 3
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Encontro 3 (3)
            </button>

            <button
              onClick={() => setSelectedEncounterFilter(4)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                selectedEncounterFilter === 4
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Encontro 4 (1)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative shrink-0 w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar comando por palavra..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Mode Toggle Option & Counter */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 dark:text-slate-300 select-none">
            <input
              type="checkbox"
              checked={useInterpolatedValues}
              onChange={(e) => setUseInterpolatedValues(e.target.checked)}
              className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500"
            />
            <span>Interpolar variáveis do projeto nos comandos</span>
            <span className="text-slate-400 font-normal hidden sm:inline">
              ({useInterpolatedValues ? 'substitui {VAR} pelos dados atuais' : 'exibe chaves canônicas {VAR}'})
            </span>
          </label>

          <div className="text-slate-500 dark:text-slate-400 font-semibold">
            Mostrando <strong>{filteredPrompts.length}</strong> de {OFFICIAL_PROMPTS.length} comandos
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
                  <div className="space-y-2 flex-1 min-w-0">
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

                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                      {prompt.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 max-w-3xl">
                      {prompt.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold">Ferramentas: </span>
                        <strong className="text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-bold">
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
                  <div className="shrink-0 flex flex-wrap sm:flex-nowrap items-center gap-2 self-start lg:self-center">
                    {/* Action 1: Copiar Prompt */}
                    <button
                      onClick={() => handleCopyPromptOnly(prompt)}
                      className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs border cursor-pointer ${
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
                      className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                        isPromptContextCopied
                          ? 'bg-emerald-500 text-slate-950 scale-105'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95'
                      }`}
                      title="Combina o prompt atual com os insumos mínimos necessários segundo a matriz canônica V2.2"
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
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                      <Layers className="w-3.5 h-3.5 text-amber-500" />
                      <span>Contexto Mínimo Suficiente (V2.2):</span>
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
