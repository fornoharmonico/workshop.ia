import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Clock, 
  Presentation, 
  MessageSquarePlus, 
  CheckSquare, 
  Users, 
  FileText, 
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Maximize2,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PILOT_CHAIN_ACTIVITIES, getPilotActivityById } from '../../data/pilotChain';
import { ObservationCategory } from '../../types/workshop';
import { TeamsTab } from './TeamsTab';

export const FacilitatorView: React.FC = () => {
  const { 
    state, 
    timer, 
    startTimer, 
    pauseTimer, 
    resumeTimer, 
    resetTimer, 
    addMinutesToTimer, 
    toggleTimerFullscreen,
    addFacilitatorObservation,
    toggleFacilitatorChecklist,
    setFacilitatorNotes,
    setCurrentPilotActivityId,
    setActiveWebappTab
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'conducao' | 'equipes' | 'observacoes'>('conducao');
  const [showObsModal, setShowObsModal] = useState(false);

  // Observation form state
  const [obsCategory, setObsCategory] = useState<ObservationCategory>('METODOLOGIA');
  const [obsWhatHappened, setObsWhatHappened] = useState('');
  const [obsIntensity, setObsIntensity] = useState<'BAIXA' | 'MEDIA' | 'ALTA'>('MEDIA');
  const [obsNeededIntervention, setObsNeededIntervention] = useState(false);
  const [obsInterpretation, setObsInterpretation] = useState('');

  const currentActivity = getPilotActivityById(state.currentPilotActivityId || 'E1-A01');

  // Find next activity in sequence
  const currentIdx = PILOT_CHAIN_ACTIVITIES.findIndex((a) => a.id === currentActivity.id);
  const nextActivity = currentIdx < PILOT_CHAIN_ACTIVITIES.length - 1 ? PILOT_CHAIN_ACTIVITIES[currentIdx + 1] : null;

  const handleSaveObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!obsWhatHappened.trim()) return;

    addFacilitatorObservation({
      activityId: currentActivity.id,
      category: obsCategory,
      whatHappened: obsWhatHappened,
      intensity: obsIntensity,
      neededIntervention: obsNeededIntervention,
      interpretation: obsInterpretation || undefined,
    });

    setObsWhatHappened('');
    setObsInterpretation('');
    setShowObsModal(false);
  };

  const observations = state.facilitatorObservations || [];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 px-4 sm:px-6">
      
      {/* Facilitator Header Badge */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-3xl shadow-lg space-y-2 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-amber-200" />
            <h1 className="text-xl sm:text-2xl font-black">
              Painel de Condução do Facilitador
            </h1>
          </div>
          <button
            onClick={() => setShowObsModal(true)}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-amber-300 font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-md cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            + Registrar Observação
          </button>
        </div>
        <p className="text-xs text-amber-100 max-w-2xl">
          Controle o ritmo do workshop, acompanhe os artefatos esperados, ative o cronômetro presencial e registre observações metodológicas.
        </p>
      </div>

      {/* Subtab Navigation for Facilitator */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('conducao')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            activeSubTab === 'conducao'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          <Presentation className="w-4 h-4" />
          <span>Visão Geral & Cronômetro</span>
        </button>

        <button
          onClick={() => setActiveSubTab('equipes')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            activeSubTab === 'equipes'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Gestão de Equipes ({state.teams?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('observacoes')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            activeSubTab === 'observacoes'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Observações da Turma ({observations.length})</span>
        </button>
      </div>

      {/* SUBTAB 1: CONDUÇÃO E CRONÔMETRO */}
      {activeSubTab === 'conducao' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column: AGORA & A SEGUIR */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* AGORA Section */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-2xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  AGORA EM EXECUÇÃO
                </span>
                <span className="text-2xs text-slate-400 font-bold">
                  {currentActivity.youAreHere.encounterTitle}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-black text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                    {currentActivity.id}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">
                    {currentActivity.title}
                  </h2>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {currentActivity.whyItMatters}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-2xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-1">
                  <span className="text-slate-400 font-bold block">TEMPO SUGERIDO</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold text-sm">{currentActivity.durationMinutes} minutos</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-1">
                  <span className="text-slate-400 font-bold block">ARTEFATO ESPERADO</span>
                  <span className="text-amber-600 dark:text-amber-400 font-extrabold text-sm truncate block">{currentActivity.expectedVersionName}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveWebappTab('atividade')}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>ABRIR WORKSPACE DESTA ATIVIDADE</span>
                </button>
              </div>
            </div>

            {/* A SEGUIR Section */}
            {nextActivity && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-3">
                <span className="text-2xs font-extrabold text-slate-400 uppercase tracking-wider block">
                  PRÓXIMA ATIVIDADE (A SEGUIR)
                </span>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        {nextActivity.id}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                        {nextActivity.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {nextActivity.whyItMatters}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentPilotActivityId(nextActivity.id);
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold text-xs shrink-0 transition"
                  >
                    Mudar para Esta
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: CRONÔMETRO PRESENCIAL */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-lg border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-2xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  CRONÔMETRO PRESENCIAL
                </span>
                <button
                  onClick={toggleTimerFullscreen}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
                  title="Modo Projeção em Tela Cheia"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Timer Digital Display */}
              <div className="text-center space-y-1">
                <div className="text-5xl font-mono font-black tracking-tight text-white">
                  {String(timer.minutes).padStart(2, '0')}:{String(timer.seconds).padStart(2, '0')}
                </div>
                <p className="text-2xs text-slate-400 font-medium">
                  {timer.activityTitle || currentActivity.title}
                </p>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-2">
                {timer.isRunning ? (
                  <button
                    onClick={pauseTimer}
                    className="py-2.5 bg-amber-500 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-amber-400 transition"
                  >
                    <Pause className="w-4 h-4" /> Pausar
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (timer.remainingSeconds === 0) {
                        startTimer(currentActivity.durationMinutes, currentActivity.title);
                      } else {
                        resumeTimer();
                      }
                    }}
                    className="py-2.5 bg-emerald-500 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-emerald-400 transition"
                  >
                    <Play className="w-4 h-4 fill-slate-950" /> Iniciar
                  </button>
                )}

                <button
                  onClick={resetTimer}
                  className="py-2.5 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-700 transition"
                >
                  <RotateCcw className="w-4 h-4" /> Reiniciar
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1 pt-2 border-t border-slate-800">
                <button
                  onClick={() => addMinutesToTimer(-1)}
                  className="py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 text-3xs font-extrabold rounded-lg transition"
                  title="Reduzir 1 minuto"
                >
                  -1 min
                </button>
                <button
                  onClick={() => addMinutesToTimer(2)}
                  className="py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-3xs font-extrabold rounded-lg transition"
                  title="Adicionar 2 minutos"
                >
                  +2 min
                </button>
                <button
                  onClick={() => addMinutesToTimer(5)}
                  className="py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-3xs font-extrabold rounded-lg transition"
                  title="Adicionar 5 minutos"
                >
                  +5 min
                </button>
                <button
                  onClick={() => startTimer(currentActivity.durationMinutes, currentActivity.title)}
                  className="py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-3xs font-extrabold rounded-lg transition truncate px-1"
                  title={`Carregar tempo sugerido da ementa (${currentActivity.durationMinutes} minutos)`}
                >
                  {currentActivity.durationMinutes}m
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SUBTAB 2: EQUIPES */}
      {activeSubTab === 'equipes' && (
        <TeamsTab />
      )}

      {/* SUBTAB 3: OBSERVAÇÕES */}
      {activeSubTab === 'observacoes' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <MessageSquarePlus className="w-5 h-5 text-amber-500" />
              Observações Registradas do Facilitador ({observations.length})
            </h2>
            <button
              onClick={() => setShowObsModal(true)}
              className="px-3 py-1.5 bg-amber-500 text-slate-950 rounded-xl text-xs font-extrabold hover:bg-amber-400 transition"
            >
              + Nova Observação
            </button>
          </div>

          {observations.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 py-8 text-center">
              Nenhuma observação registrada ainda para a turma.
            </p>
          ) : (
            <div className="space-y-3">
              {observations.map((obs) => (
                <div key={obs.id} className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-2xs">
                    <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-md">
                      {obs.category} • Atividade {obs.activityId}
                    </span>
                    <span className="text-slate-400">
                      {new Date(obs.timestamp).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                    {obs.whatHappened}
                  </p>
                  {obs.interpretation && (
                    <p className="text-2xs italic text-slate-500 dark:text-slate-400 border-t border-slate-200/40 dark:border-slate-800 pt-1">
                      Interpretação: {obs.interpretation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* REGISTRAR OBSERVAÇÃO MODAL */}
      {showObsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <MessageSquarePlus className="w-5 h-5 text-amber-500" />
              Registrar Observação do Facilitador
            </h3>

            <form onSubmit={handleSaveObservation} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Categoria
                </label>
                <select
                  value={obsCategory}
                  onChange={(e) => setObsCategory(e.target.value as ObservationCategory)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-medium"
                >
                  <option value="METODOLOGIA">METODOLOGIA</option>
                  <option value="PROMPT">PROMPT</option>
                  <option value="CONTEUDO">CONTEÚDO</option>
                  <option value="UX">UX / INTERFACE</option>
                  <option value="TECNOLOGIA">TECNOLOGIA</option>
                  <option value="FACILITACAO">FACILITAÇÃO</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  O que aconteceu?
                </label>
                <textarea
                  value={obsWhatHappened}
                  onChange={(e) => setObsWhatHappened(e.target.value)}
                  placeholder="Descreva brevemente a dúvida, engajamento ou comportamento da turma..."
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 font-medium min-h-[80px]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Interpretação / Diagnóstico (Opcional)
                </label>
                <input
                  type="text"
                  value={obsInterpretation}
                  onChange={(e) => setObsInterpretation(e.target.value)}
                  placeholder="Ex: O grupo teve dificuldade em diferenciar fato de hipótese..."
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowObsModal(false)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 text-slate-950 rounded-xl font-black cursor-pointer hover:bg-amber-400"
                >
                  Salvar Observação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
