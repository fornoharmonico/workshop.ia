import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ENCOUNTERS } from '../../data/syllabus';
import { Clock, CheckCircle2, Sparkles, ArrowRight, Layers, Target, Compass, FileCheck } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const { setCurrentView, setActiveWebappTab, setSelectedEncounterId } = useApp();
  const [activeEncounterId, setActiveEncounterId] = useState<number>(1);

  const activeEncounter = ENCOUNTERS.find((e) => e.id === activeEncounterId) || ENCOUNTERS[0];

  const handleOpenEncounterInWebapp = (id: number) => {
    setSelectedEncounterId(id);
    setCurrentView('webapp');
    setActiveWebappTab('jornada');
  };

  const encounterIcons = [Compass, Layers, Target, FileCheck];

  return (
    <section 
      id="jornada" 
      aria-labelledby="jornada-title" 
      className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest px-3 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-full border border-amber-300 dark:border-amber-800">
            A JORNADA METODOLÓGICA (12 HORAS)
          </span>
          <h2 id="jornada-title" className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            A Jornada dos 4 Encontros Práticos
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Uma progressão pedagógica estruturada: do diagnóstico de problemas reais e causas-raiz até a entrega de um protótipo testado e apresentação em pitch.
          </p>
        </div>

        {/* 4 Encounter Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {ENCOUNTERS.map((enc, idx) => {
            const IconComp = encounterIcons[idx] || Compass;
            const isSelected = enc.id === activeEncounterId;
            return (
              <button
                key={enc.id}
                onClick={() => setActiveEncounterId(enc.id)}
                className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-amber-500 dark:border-amber-400 shadow-lg ring-2 ring-amber-500/20'
                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-300 dark:border-slate-800 hover:border-amber-300 hover:bg-white dark:hover:bg-slate-900'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
                    isSelected 
                      ? 'bg-amber-600 text-white shadow-xs' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {enc.id}
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    3h (180m)
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    ENCONTRO {enc.id}
                  </span>
                  <h3 className="text-base font-black text-slate-950 dark:text-white mt-0.5 leading-snug">
                    {enc.title.split('—')[1]?.trim() || enc.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold line-clamp-1">
                    {enc.deliverable}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Encounter Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-300 dark:border-slate-800 shadow-md space-y-8">
          
          {/* Encounter Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-black text-xs border border-amber-300 dark:border-amber-800">
                  ENCONTRO {activeEncounter.id} DE 4
                </span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> 
                  180 minutos totais ({activeEncounter.activities.length} blocos práticos)
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                {activeEncounter.title}
              </h3>
            </div>

            {/* Direct Webapp Action */}
            <button
              onClick={() => handleOpenEncounterInWebapp(activeEncounter.id)}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 transition-all flex items-center gap-2 self-start lg:self-center shrink-0 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Abrir no Webapp da Turma</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Objective & Expected Deliverables Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            
            <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-2">
              <span className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Objetivo Pedagógico do Encontro
              </span>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {activeEncounter.objective}
              </p>
            </div>

            <div className="bg-amber-50/70 dark:bg-amber-950/40 p-5 rounded-2xl border border-amber-300 dark:border-amber-900/60 space-y-2">
              <span className="text-xs font-black text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Entrega / Artefato Consolidado
              </span>
              <p className="text-amber-950 dark:text-amber-100 font-bold leading-relaxed">
                {activeEncounter.deliverable}
              </p>
            </div>

          </div>

          {/* Activity Breakdown List */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Roteiro de Atividades Práticas ({activeEncounter.activities.length} Atividades)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeEncounter.activities.map((act, i) => (
                <div
                  key={act.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-start gap-3.5"
                >
                  <div className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-black text-xs shrink-0 border border-amber-300 dark:border-amber-800">
                    {act.durationMinutes} min
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-slate-900 dark:text-white">
                      {act.title}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
