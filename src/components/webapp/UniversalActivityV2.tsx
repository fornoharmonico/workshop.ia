import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Copy,
  Save,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Clock,
  HelpCircle,
  Play,
  Pause,
  RotateCcw,
  Compass,
  Check,
  Info,
  ShieldCheck,
  Users,
  Globe,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Edit3,
  Scale,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  getCanonicalActivityById, 
  getNextActivityById, 
  getPreviousActivityById 
} from '../../data/canonicalJourney';
import { getArtifactDefinitionById } from '../../data/canonicalArtifacts';
import { getCanonicalPromptById } from '../../data/canonicalPrompts';
import { buildContextPackV2 } from '../../utils/contextPackBuilderV2';
import { 
  populateArtifactStoreFromLegacy, 
  resolveEffectiveBriefing 
} from '../../utils/artifactStore';
import { ActivityId, ArtifactId, ProjectStateV2 } from '../../types/canonicalV2';
import { SocraticMetabolizer } from './SocraticMetabolizer';
import { RealWorldTestSupport } from './RealWorldTestSupport';

interface UniversalActivityV2Props {
  activityId: ActivityId;
  onNavigateToActivity?: (activityId: ActivityId) => void;
}

export const UniversalActivityV2: React.FC<UniversalActivityV2Props> = ({
  activityId,
  onNavigateToActivity
}) => {
  const {
    state,
    updateProjectData,
    setCurrentPilotActivityId,
    setActiveWebappTab,
    triggerManualSave,
    toggleActivityCompleted
  } = useApp();

  const activity = getCanonicalActivityById(activityId);
  const prompt = activity.promptId ? getCanonicalPromptById(activity.promptId) : undefined;
  const artifactDef = activity.outputArtifactId ? getArtifactDefinitionById(activity.outputArtifactId) : undefined;

  // Adapt project state for context pack builder using canonical store populator
  const projectData = (state.projectData || {}) as Record<string, any>;
  const rawArtifacts = (state.projectStateV1_4_1?.artifacts || {}) as Record<string, any>;
  const canonicalStore = populateArtifactStoreFromLegacy(projectData, rawArtifacts);
  const effectiveBriefing = resolveEffectiveBriefing(canonicalStore);

  // Build ProjectStateV2 projection from canonical store
  const projectStateV2: ProjectStateV2 = {
    schemaVersion: 2,
    projectId: 'oforno-project-v2',
    projectName: projectData.projectName || 'Projeto da Turma',
    currentActivityId: activityId,
    projectContext: {
      teamName: projectData.teamName || 'Equipe de Jovens',
      problemSummary: canonicalStore.AF01?.content || projectData.collectiveChallenge || '',
      targetAudience: projectData.solutionTargetAudience || '',
      territory: projectData.briefingContext || '',
      selectedCause: projectData.rootCause || ''
    },
    artifacts: canonicalStore,
    activityStatus: {}
  };

  const contextPack = buildContextPackV2(activityId, projectStateV2);

  // Draft editing state
  const currentOutputContent = activity.outputArtifactId ? canonicalStore[activity.outputArtifactId]?.content || '' : '';
  const [draftContent, setDraftContent] = useState<string>(currentOutputContent);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isSavedRecently, setIsSavedRecently] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Progressive Disclosure sections state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    context: true,
    inputs: true,
    steps: true,
    prompt: true,
    metabolization: true,
    a09Lab: true,
    output: true,
    criteria: true
  });

  // Inline Soft Gate fast-fill drawer state
  const [inlineQuickFillId, setInlineQuickFillId] = useState<ArtifactId | null>(null);
  const [inlineQuickFillText, setInlineQuickFillText] = useState<string>('');

  // A09 Lab Transition State
  const [a09ActiveTab, setA09ActiveTab] = useState<'roteiro' | 'campo' | 'lab'>('campo');

  // Timer for rehearsal (A12/A16)
  const [timerSeconds, setTimerSeconds] = useState(180); // 3 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Sync draft when activity changes
  useEffect(() => {
    setDraftContent(currentOutputContent);
    setCopiedPrompt(false);
    setInlineQuickFillId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activityId, currentOutputContent]);

  const isDraftUnconsolidated = draftContent.trim() !== currentOutputContent.trim();

  const handleApplyAF01Template = (mode: 'dream' | 'problem' | 'exploratory') => {
    let templateText = '';
    if (mode === 'dream') {
      templateText = `# AF01 — PONTO DE PARTIDA: SONHO + PROBLEMA

1. O QUE NOS MOVE
Um sonho compartilhado pela equipe de transformar uma realidade e criar algo que traga beleza, conexão ou valor humano.

2. SONHO / REALIDADE DESEJADA
[Descreva aqui o sonho da equipe ou a realidade que gostariam de ver existir]

3. PROBLEMA / DISTÂNCIA DA REALIDADE ATUAL
[O que impede ou distancia hoje as pessoas dessa realidade desejada?]

4. ESCALA E CONTEXTO
[Onde essa situação acontece: nossa escola, bairro, comunidade ou grupo?]

5. PESSOAS ENVOLVIDAS OU AFETADAS
[Quem são as pessoas que sentem essa distância ou que se beneficiariam do sonho?]

6. POR QUE ISSO NOS MOVE
[Por que a nossa equipe escolheu se dedicar a isso de forma autêntica e soberana?]`;
    } else if (mode === 'problem') {
      templateText = `# AF01 — PONTO DE PARTIDA: SONHO + PROBLEMA

1. O QUE NOS MOVE
Um incômodo real ou dificuldade concreta vivenciada no dia a dia da nossa comunidade ou escola.

2. SONHO / REALIDADE DESEJADA
[Como seria esse cenário se essa situação fosse superada ou profundamente transformada?]

3. PROBLEMA / DISTÂNCIA DA REALIDADE ATUAL
[Qual é a dor, gargalo ou incômodo concreto que a equipe observou?]

4. ESCALA E CONTEXTO
[Onde e quando isso acontece no nosso território?]

5. PESSOAS ENVOLVIDAS OU AFETADAS
[Quem vive esse problema diretamente no cotidiano?]

6. POR QUE ISSO NOS MOVE
[Por que a equipe decidiu assumir a titularidade desse desafio agora?]`;
    } else {
      templateText = `# AF01 — PONTO DE PARTIDA: SONHO + PROBLEMA

1. O QUE NOS MOVE
A curiosidade investigativa e a vontade de explorar uma área relevante para nossa comunidade.

2. SONHO / REALIDADE DESEJADA
[O que esperamos descobrir, desenvolver ou viabilizar juntos?]

3. PROBLEMA / DISTÂNCIA DA REALIDADE ATUAL
[Quais incertezas ou limitações da realidade atual estamos explorando?]

4. ESCALA E CONTEXTO
[Contexto de aplicação e território prioritário]

5. PESSOAS ENVOLVIDAS OU AFETADAS
[Público-alvo, participantes e pessoas da comunidade envolvidas]

6. POR QUE ISSO NOS MOVE
[A relevância humana e o compromisso da equipe com essa investigação]`;
    }

    setDraftContent(templateText);
  };

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(s => s - 1), 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const toggleSection = (sec: string) => {
    setExpandedSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  const toggleExpandAll = () => {
    const areAllExpanded = Object.values(expandedSections).every(Boolean);
    const newVal = !areAllExpanded;
    setExpandedSections({
      context: newVal,
      inputs: newVal,
      steps: newVal,
      prompt: newVal,
      metabolization: newVal,
      a09Lab: newVal,
      output: newVal,
      criteria: newVal
    });
  };

  const handleCopyPrompt = async () => {
    if (!contextPack.interpolatedPrompt) return;
    try {
      await navigator.clipboard.writeText(contextPack.interpolatedPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 3000);
    } catch {
      // Fallback
    }
  };

  const handleSaveOutput = (markAsValidated = false) => {
    if (!activity.outputArtifactId) return;

    const keyMap: Record<ArtifactId, string> = {
      AF01: 'v3ChosenProblem',
      AF02: 'v3ProblemDiagnosis',
      AF03: 'v3MapaRecursos',
      AF04: 'v3Proposito',
      AF05: 'v3BriefingV0',
      AF06: 'v3BriefingV1',
      AF07: 'v3PrdV0',
      AF08: 'v3Mvp',
      AF09: 'v3EvidenceSummary',
      AF10: 'v3Sustentabilidade',
      AF11: 'v3Roadmap',
      AF12: 'v3PitchScript'
    };

    const targetKey = keyMap[activity.outputArtifactId];
    if (targetKey) {
      updateProjectData({ 
        [targetKey]: draftContent,
        [`artifactStatus_${activity.outputArtifactId}`]: markAsValidated ? 'validado' : 'rascunho'
      });
    }

    if (markAsValidated) {
      toggleActivityCompleted(activity.id);
    }

    setIsSavedRecently(true);
    setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    triggerManualSave();
    setTimeout(() => setIsSavedRecently(false), 3000);
  };

  const handleSaveQuickFill = (targetArtId: ArtifactId) => {
    const keyMap: Record<ArtifactId, string> = {
      AF01: 'v3ChosenProblem',
      AF02: 'v3ProblemDiagnosis',
      AF03: 'v3MapaRecursos',
      AF04: 'v3Proposito',
      AF05: 'v3BriefingV0',
      AF06: 'v3BriefingV1',
      AF07: 'v3PrdV0',
      AF08: 'v3Mvp',
      AF09: 'v3EvidenceSummary',
      AF10: 'v3Sustentabilidade',
      AF11: 'v3Roadmap',
      AF12: 'v3PitchScript'
    };
    const key = keyMap[targetArtId];
    if (key && inlineQuickFillText.trim()) {
      updateProjectData({ [key]: inlineQuickFillText });
      setInlineQuickFillId(null);
      setInlineQuickFillText('');
      triggerManualSave();
    }
  };

  const handleAppendSocraticNotes = (notesText: string) => {
    setDraftContent(prev => prev + notesText);
  };

  const prevActivity = getPreviousActivityById(activityId);
  const nextActivity = getNextActivityById(activityId);

  const navigateTo = (targetId: ActivityId) => {
    if (onNavigateToActivity) {
      onNavigateToActivity(targetId);
    } else {
      setCurrentPilotActivityId(targetId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 px-4 sm:px-6">
      
      {/* 1. VOCÊ ESTÁ AQUI (Header & Breadcrumb) */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>ETAPA {activity.order} DE 12</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Encontro {activity.recommendedEncounter}</span>
            <button
              onClick={toggleExpandAll}
              className="ml-2 inline-flex items-center gap-1 text-2xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition cursor-pointer"
            >
              {Object.values(expandedSections).every(Boolean) ? (
                <>
                  <Minimize2 className="w-3 h-3" />
                  <span>Modo Focado</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3" />
                  <span>Expandir Tudo</span>
                </>
              )}
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {activity.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          {activity.objective}
        </p>

        {/* Top Navigation Pointers */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs sm:text-sm">
          {prevActivity ? (
            <button
              onClick={() => navigateTo(prevActivity.id)}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-1.5 min-h-[44px] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar: {prevActivity.shortTitle}</span>
            </button>
          ) : <div />}

          {nextActivity ? (
            <button
              onClick={() => navigateTo(nextActivity.id)}
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors py-1.5 min-h-[44px] cursor-pointer"
            >
              <span>Próxima etapa: {nextActivity.shortTitle}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : <div />}
        </div>
      </div>

      {/* 2. ONDE ESTAMOS (Progressive Disclosure) */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 sm:p-6 text-slate-800 dark:text-slate-200 space-y-3">
        <div 
          onClick={() => toggleSection('context')}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-amber-500 shrink-0" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Onde estamos: por que fazer esta etapa?
            </h3>
          </div>
          <button className="text-amber-600 dark:text-amber-400 p-1">
            {expandedSections.context ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {expandedSections.context && (
          <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 pt-1">
            {activity.whyWeDoThis}
          </p>
        )}
      </div>

      {/* 3. O QUE JÁ SABEMOS (Insumos da Atividade) */}
      {activity.dependencies.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div 
            onClick={() => toggleSection('inputs')}
            className="flex items-center justify-between cursor-pointer select-none border-b border-slate-100 dark:border-slate-800 pb-3"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                O que já sabemos ({activity.dependencies.length})
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {contextPack.hasMissingRequired && (
                <span className="text-2xs font-extrabold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  Sugestão de apoio
                </span>
              )}
              <button className="text-slate-500 p-1">
                {expandedSections.inputs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {expandedSections.inputs && (
            <div className="space-y-4 pt-1">
              <div className="space-y-3">
                {contextPack.dependencies.map(dep => {
                  const isBriefingV1Replaced = dep.artifactId === 'AF05' && effectiveBriefing.isAuthoritative;
                  const isA09Evidence = dep.artifactId === 'AF09';

                  return (
                    <div
                      key={dep.artifactId}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                        dep.isAvailable
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300/60 dark:border-emerald-800/50'
                          : dep.level === 'required_input'
                          ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/60'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {dep.title.replace(/^AF\d+\s*[—–-]\s*/i, '')}
                          </span>
                          <span className={`text-2xs px-2 py-0.5 rounded-full font-semibold ${
                            dep.level === 'required_input'
                              ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}>
                            {dep.level === 'required_input' ? 'Base para esta etapa' : 'Apoio complementar'}
                          </span>
                          {isBriefingV1Replaced && (
                            <span className="text-2xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
                              Briefing atualizado
                            </span>
                          )}
                          {isA09Evidence && (
                            <span className="text-2xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                              Conversa com pessoas reais
                            </span>
                          )}
                        </div>

                        {dep.description && (
                          <p className="text-xs text-slate-600 dark:text-slate-400">{dep.description}</p>
                        )}
                        {dep.isAvailable && dep.contentSnippet && (
                          <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400 line-clamp-1 italic mt-1">
                            "{dep.contentSnippet}"
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                        {dep.isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Já registrado</span>
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setInlineQuickFillId(dep.artifactId);
                                setInlineQuickFillText('');
                              }}
                              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 hover:bg-amber-200 transition cursor-pointer"
                            >
                              Anotar rápido
                            </button>
                            <span className="inline-flex items-center gap-1 text-2xs font-bold text-amber-700 dark:text-amber-400">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>Pendente</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Inline Quick Fill Drawer */}
              {inlineQuickFillId && (() => {
                const targetDep = contextPack.dependencies.find(d => d.artifactId === inlineQuickFillId);
                const targetTitle = targetDep ? targetDep.title.replace(/^AF\d+\s*[—–-]\s*/i, '') : 'esta etapa';

                return (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-amber-600" />
                        <span>Anotações rápidas da equipe para: {targetTitle}</span>
                      </span>
                      <button
                        onClick={() => setInlineQuickFillId(null)}
                        className="text-xs text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>

                    <p className="text-2xs text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
                      Registre brevemente o que a turma já conversou ou decidiu. O preenchimento rápido serve para organizar as ideias reais da equipe, sem inventar decisões no lugar de vocês.
                    </p>

                    <textarea
                      value={inlineQuickFillText}
                      onChange={(e) => setInlineQuickFillText(e.target.value)}
                      rows={3}
                      placeholder={`Escreva em poucas palavras o que a equipe já sabe ou decidiu sobre ${targetTitle.toLowerCase()}...`}
                      className="w-full rounded-xl border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 p-3 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSaveQuickFill(inlineQuickFillId)}
                        className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs cursor-pointer"
                      >
                        Salvar anotações no projeto
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Soft Gate Notice (Pedagogical, non-blocking) */}
              {contextPack.hasMissingRequired && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm space-y-2">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Informações das etapas anteriores não encontradas</span>
                  </p>
                  <p className="leading-relaxed text-xs">
                    Esta etapa aproveita o que foi produzido antes. Vocês podem continuar livremente sem nenhum bloqueio:
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-2xs font-bold text-amber-800 dark:text-amber-300">Caminhos possíveis:</span>
                    <span className="text-2xs px-2 py-0.5 rounded bg-amber-200/60 dark:bg-amber-900/60">1. Continuar rascunhando normalmente</span>
                    <span className="text-2xs px-2 py-0.5 rounded bg-amber-200/60 dark:bg-amber-900/60">2. Fazer anotação rápida acima</span>
                    {prevActivity && (
                      <button
                        onClick={() => navigateTo(prevActivity.id)}
                        className="text-2xs font-bold underline hover:text-amber-950 dark:hover:text-white cursor-pointer"
                      >
                        3. Voltar para a etapa anterior
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. VAMOS CONSTRUIR (Passo a Passo) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div 
          onClick={() => toggleSection('steps')}
          className="flex items-center justify-between cursor-pointer select-none border-b border-slate-100 dark:border-slate-800 pb-3"
        >
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Vamos construir: passo a passo
          </h3>
          <button className="text-slate-500 p-1">
            {expandedSections.steps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {expandedSections.steps && (
          <div className="space-y-3 pt-1">
            {activity.instructions.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. CASO ESPECIAL: A09 (TESTES NO MUNDO REAL & RETOMADA AO LAB) */}
      {activity.id === 'A09' && (
        <div className="bg-emerald-950 text-emerald-100 rounded-3xl p-5 sm:p-7 shadow-xl border border-emerald-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 uppercase tracking-wider font-mono">
                    PESQUISA COM PESSOAS REAIS
                  </span>
                  <span className="text-2xs text-emerald-300/70 font-medium">A voz da comunidade</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                  Testes com Pessoas Reais & O que aprendemos no retorno
                </h2>
              </div>
            </div>

            {/* Sub-tabs for A09 */}
            <div className="flex items-center gap-1 bg-emerald-900/60 p-1 rounded-xl shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setA09ActiveTab('campo')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  a09ActiveTab === 'campo' ? 'bg-emerald-500 text-slate-950 shadow-xs' : 'text-emerald-200 hover:text-white'
                }`}
              >
                1. Escuta na comunidade
              </button>
              <button
                onClick={() => setA09ActiveTab('lab')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  a09ActiveTab === 'lab' ? 'bg-emerald-500 text-slate-950 shadow-xs' : 'text-emerald-200 hover:text-white'
                }`}
              >
                2. Conversa no retorno
              </button>
            </div>
          </div>

          {a09ActiveTab === 'campo' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                Aqui a equipe sai da frente da tela para ouvir pessoas de verdade. Registrem o que realmente aconteceu, as falas literais de quem testou e onde as pessoas tiveram facilidade ou dúvida.
              </p>
              
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-emerald-800 text-slate-100">
                <RealWorldTestSupport 
                  onSyncEvidenceText={(combined) => {
                    setDraftContent(combined);
                  }}
                />
              </div>
            </div>
          )}

          {a09ActiveTab === 'lab' && (
            <div className="space-y-4 bg-emerald-900/40 p-5 rounded-2xl border border-emerald-700/60">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-amber-400" />
                <span>Conversa no retorno — O que aprendemos na prática?</span>
              </h4>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Reunidos de volta após os testes com pessoas reais, conversem sobre os resultados:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 space-y-1">
                  <span className="font-bold text-emerald-300">O que as pessoas confirmaram?</span>
                  <p className="text-slate-300">O que funcionou bem e gerou interesse genuíno?</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 space-y-1">
                  <span className="font-bold text-amber-300">O que não funcionou como esperado?</span>
                  <p className="text-slate-300">Onde as pessoas travaram, tiveram dúvidas ou discordaram?</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 space-y-1">
                  <span className="font-bold text-indigo-300">O que manter e ajustar no protótipo?</span>
                  <p className="text-slate-300">Quais melhorias pontuais a equipe quer fazer para a próxima versão?</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 space-y-1">
                  <span className="font-bold text-rose-300">O que descartar para simplificar?</span>
                  <p className="text-slate-300">O que parecia bom na teoria mas ninguém usou ou achou necessário?</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CASO ESPECIAL: A10 BANNER DE RETOMADA DE A09 */}
      {activity.id === 'A10' && canonicalStore.AF09?.content && (
        <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 text-emerald-100 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            <span>Aprendizados práticos conectados</span>
          </div>
          <p className="text-xs text-emerald-200 leading-relaxed">
            O plano de sustentabilidade desta etapa é alimentado diretamente pelas respostas e aprendizados coletados na escuta com as pessoas.
          </p>
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-900 text-2xs font-mono text-emerald-300 line-clamp-2">
            "{canonicalStore.AF09.content.slice(0, 200)}..."
          </div>
        </div>
      )}

      {/* 6. PENSAR COM A IA (Quando houver promptId) */}
      {prompt && (
        <div className="bg-slate-950 text-slate-100 rounded-3xl p-5 sm:p-8 shadow-xl border border-slate-800 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold font-mono text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>PENSAR COM A IA</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyPrompt}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs transition-all shadow-md active:scale-95 min-h-[44px] cursor-pointer ${
                  !contextPack.isPromptReady
                    ? 'bg-amber-600/80 hover:bg-amber-500 text-slate-950'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                }`}
              >
                {copiedPrompt ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPrompt ? 'Texto copiado!' : contextPack.isPromptReady ? 'Copiar texto para a IA' : 'Copiar texto para a IA (atenção)'}</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">{prompt.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{prompt.shortDescription}</p>
          </div>

          {/* Validador de Integridade do Prompt V2.3 */}
          {!contextPack.isPromptReady && contextPack.validation.errorMessage && (
            <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/50 text-amber-200 text-xs sm:text-sm space-y-2">
              <div className="flex items-start gap-2 font-bold text-amber-300">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Aviso de prontidão do prompt</span>
              </div>
              <p className="text-xs leading-relaxed text-amber-100">
                {contextPack.validation.errorMessage}
              </p>
              {prevActivity && contextPack.hasMissingRequired && (
                <div className="pt-1">
                  <button
                    onClick={() => navigateTo(prevActivity.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white underline cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Voltar para {prevActivity.shortTitle} para consolidar o artefato</span>
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 font-mono text-xs text-slate-300 max-h-72 overflow-y-auto leading-relaxed whitespace-pre-wrap">
            {contextPack.interpolatedPrompt}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
            <span>Cole este texto no Gemini ou na ferramenta de IA da turma. Ele já reúne as respostas do seu projeto.</span>
            <button
              onClick={handleCopyPrompt}
              className="text-amber-400 hover:underline font-semibold self-start sm:self-auto cursor-pointer"
            >
              Copiar novamente
            </button>
          </div>
        </div>
      )}

      {/* 7. REVISE ANTES DE DECIDIR (Obrigatória em todas as etapas com IA) */}
      {prompt && (
        <SocraticMetabolizer
          activityId={activity.id}
          activityTitle={activity.title}
          outputArtifactId={activity.outputArtifactId}
          onApplyDebriefingToOutput={handleAppendSocraticNotes}
        />
      )}

      {/* 8. CASO ESPECIAL: A12 / ENSAIO CRONOMETRADO */}
      {activity.id === 'A12' && (
        <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Ensaio Cronometrado da Apresentação (3 Minutos)</span>
            </span>
            <span className="text-xs text-slate-400">Meta: 180 segundos</span>
          </div>

          <div className="text-center py-2">
            <div className={`text-6xl font-black font-mono tracking-tight ${
              timerSeconds <= 30 ? 'text-red-400 animate-pulse' : 'text-amber-400'
            }`}>
              {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {timerSeconds === 0 ? 'Tempo esgotado!' : isTimerRunning ? 'Ensaio em andamento...' : 'Pronto para ensaiar'}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm inline-flex items-center gap-2 shadow-lg transition-all min-h-[44px] cursor-pointer"
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isTimerRunning ? 'Pausar' : 'Iniciar Ensaio'}</span>
            </button>
            <button
              onClick={() => { setIsTimerRunning(false); setTimerSeconds(180); }}
              className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm inline-flex items-center gap-2 transition-all min-h-[44px] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>
      )}

      {/* 9. REVISÃO & REGISTRO DO QUE CONSTRUÍMOS */}
      {activity.outputArtifactId && artifactDef && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300">
                  REGISTRO DESTA ETAPA
                </span>

                {isDraftUnconsolidated ? (
                  <span className="text-2xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                    Minuta em edição (não consolidada)
                  </span>
                ) : currentOutputContent.trim().length > 10 ? (
                  <span className="text-2xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Consolidado no projeto</span>
                  </span>
                ) : null}

                {artifactDef.id === 'AF05' && (
                  <span className="text-2xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Primeiro rascunho
                  </span>
                )}
                {artifactDef.id === 'AF06' && (
                  <span className="text-2xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300">
                    Versão revisada
                  </span>
                )}
                {artifactDef.origin === 'world_real' && (
                  <span className="text-2xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    Baseado em testes reais
                  </span>
                )}
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {artifactDef.title.replace(/^AF\d+\s*[—–-]\s*/i, '')}
              </h3>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => handleSaveOutput(false)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all min-h-[44px] shadow-sm cursor-pointer ${
                  isSavedRecently
                    ? 'bg-emerald-600 text-white'
                    : isDraftUnconsolidated
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'
                }`}
              >
                {isSavedRecently ? <Check className="w-4 h-4 stroke-[3]" /> : <Save className="w-4 h-4" />}
                <span>{isSavedRecently ? 'Consolidado!' : isDraftUnconsolidated ? 'Consolidar no projeto' : 'Salvar no projeto'}</span>
              </button>
            </div>
          </div>

          {/* Portas de Entrada V2.3 para AF01 */}
          {activity.id === 'A01' && (
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-950 border border-amber-200/80 dark:border-amber-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950 dark:text-amber-300 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>Portas de Entrada V2.3 — Escolha o que move a equipe:</span>
                </span>
                <span className="text-2xs text-slate-500 dark:text-slate-400">Preenchimento guiado opcional</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => handleApplyAF01Template('dream')}
                  className="p-3 rounded-xl border border-amber-300/80 dark:border-amber-800/80 bg-white dark:bg-slate-900 hover:bg-amber-100/50 dark:hover:bg-amber-950/40 text-left transition cursor-pointer"
                >
                  <div className="text-xs font-bold text-amber-900 dark:text-amber-300">🌟 Porta 1: Sonho / Desejo</div>
                  <div className="text-2xs text-slate-600 dark:text-slate-400 mt-1">
                    Partir do que queremos criar ou ver existir no mundo.
                  </div>
                </button>
                <button
                  onClick={() => handleApplyAF01Template('problem')}
                  className="p-3 rounded-xl border border-amber-300/80 dark:border-amber-800/80 bg-white dark:bg-slate-900 hover:bg-amber-100/50 dark:hover:bg-amber-950/40 text-left transition cursor-pointer"
                >
                  <div className="text-xs font-bold text-amber-900 dark:text-amber-300">🔍 Porta 2: Problema / Incômodo</div>
                  <div className="text-2xs text-slate-600 dark:text-slate-400 mt-1">
                    Partir de uma dor ou dificuldade concreta observada.
                  </div>
                </button>
                <button
                  onClick={() => handleApplyAF01Template('exploratory')}
                  className="p-3 rounded-xl border border-amber-300/80 dark:border-amber-800/80 bg-white dark:bg-slate-900 hover:bg-amber-100/50 dark:hover:bg-amber-950/40 text-left transition cursor-pointer"
                >
                  <div className="text-xs font-bold text-amber-900 dark:text-amber-300">🧭 Porta 3: Exploratória</div>
                  <div className="text-2xs text-slate-600 dark:text-slate-400 mt-1">
                    Investigar um tema ou contexto aberto com a comunidade.
                  </div>
                </button>
              </div>
            </div>
          )}

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cole e refine o texto final deliberado e aprovado pela equipe:
          </p>

          <textarea
            value={draftContent}
            onChange={(e) => setDraftContent(e.target.value)}
            rows={10}
            placeholder={`Cole e refine aqui o registro final desta etapa...`}
            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <div className="flex items-center gap-3">
              <span>{draftContent.length} caracteres</span>
              {lastSavedTime && <span>• Último salvamento: {lastSavedTime}</span>}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSaveOutput(true)}
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold flex items-center gap-1 min-h-[44px] cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Marcar etapa como concluída pela equipe</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. ANTES DE SEGUIR PARA A PRÓXIMA ETAPA */}
      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-3xl p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Antes de seguir para a próxima etapa
          </h4>
          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
            {activity.completionCriteria.map((crit, idx) => (
              <li key={idx}>{crit}</li>
            ))}
          </ul>
          {isDraftUnconsolidated && (
            <p className="text-2xs font-semibold text-amber-700 dark:text-amber-400 pt-1">
              💡 Lembrete: Há alterações no rascunho desta etapa. Clique em "Consolidar no projeto" acima para que a próxima etapa e a IA recebam o texto mais recente.
            </p>
          )}
        </div>

        {nextActivity && (
          <button
            onClick={() => navigateTo(nextActivity.id)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 shrink-0 min-h-[48px] cursor-pointer"
          >
            <span>Avançar para: {nextActivity.shortTitle}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        )}
      </div>

    </div>
  );
};
