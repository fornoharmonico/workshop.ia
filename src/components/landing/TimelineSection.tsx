import React from 'react';
import { useApp } from '../../context/AppContext';
import { ENCOUNTERS } from '../../data/syllabus';
import { Calendar, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const { setCurrentView, setActiveWebappTab, setSelectedEncounterId } = useApp();

  const handleOpenEncounter = (id: number) => {
    setSelectedEncounterId(id);
    setCurrentView('webapp');
    setActiveWebappTab('encontros');
  };

  return (
    <section id="jornada" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            LINHA DO TEMPO
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            A Jornada de 4 Encontros
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Uma progressão estruturada para diagnosticar problemas reais, construir a documentação técnica e apresentar um protótipo viável.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-8">
          {ENCOUNTERS.map((enc) => (
            <div
              key={enc.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                    {enc.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        ENCONTRO {enc.id}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {enc.totalDurationMinutes} min ({enc.activities.length} atividades)
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                      {enc.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenEncounter(enc.id)}
                  className="px-5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/80 text-amber-900 dark:text-amber-200 font-bold text-xs sm:text-sm border border-amber-200 dark:border-amber-800 transition-colors flex items-center gap-2 self-start lg:self-center"
                >
                  <span>Ver Detalhes e Cronômetro</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Objective & Deliverable */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-amber-600 dark:text-amber-400">
                    Objetivo Principal
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {enc.objective}
                  </p>
                </div>

                <div className="bg-amber-50/60 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 space-y-1">
                  <p className="font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Entrega Esperada
                  </p>
                  <p className="text-amber-950 dark:text-amber-200 font-medium leading-relaxed">
                    {enc.deliverable}
                  </p>
                </div>
              </div>

              {/* Activity Chips */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Roteiro de Atividades ({enc.activities.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {enc.activities.map((act) => (
                    <div
                      key={act.id}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2"
                    >
                      <span className="font-bold text-slate-900 dark:text-white">{act.durationMinutes}m</span>
                      <span>{act.title}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
