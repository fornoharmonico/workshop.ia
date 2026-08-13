import React from 'react';
import { WORKSHOP_METADATA } from '../../data/syllabus';
import { CheckCircle2, Award, Sparkles } from 'lucide-react';

export const ResultsSection: React.FC = () => {
  return (
    <section id="resultados" className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            RESULTADOS ESPERADOS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            O que o estudante estará apto a fazer ao final do workshop?
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Habilidades práticas, comportamentais e éticas desenvolvidas ao longo do percurso.
          </p>
        </div>

        {/* Grid of Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {WORKSHOP_METADATA.expectedResults.map((result, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex items-start gap-3.5 hover:border-amber-400 dark:hover:border-amber-500 transition-colors"
            >
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {result}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
