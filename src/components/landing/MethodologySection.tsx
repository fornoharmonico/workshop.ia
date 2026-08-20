import React from 'react';
import { METHOD_TOOLS } from '../../data/syllabus';
import { BrainCircuit, Search, Target, FileText, Cpu, LayoutGrid, Zap, MapPin, Presentation } from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  BrainCircuit,
  Search,
  Target,
  FileText,
  Cpu,
  LayoutGrid,
  Zap,
  MapPin,
  Presentation
};

export const MethodologySection: React.FC = () => {
  return (
    <section 
      id="metodologia" 
      aria-labelledby="metodologia-title" 
      className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest px-3 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-full border border-amber-300 dark:border-amber-800">
            MÉTODOS & ESTRUTURAS
          </span>
          <h2 id="metodologia-title" className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Perguntas orientadoras que guiam cada etapa
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300">
            A metodologia combina o rigor da gestão de projetos (Fornologia) e design de produtos com o questionamento socrático apoiado por IA.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {METHOD_TOOLS.map((tool) => {
            const IconComponent = ICON_MAP[tool.iconName] || FileText;
            return (
              <div
                key={tool.id}
                className="bg-slate-50 dark:bg-slate-800/70 p-6 rounded-2xl border border-slate-300 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 transition-all shadow-xs flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                      FERRAMENTA
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-black text-slate-950 dark:text-white">
                      {tool.name}
                    </h3>
                    <p className="text-sm font-bold text-amber-900 dark:text-amber-200 leading-snug">
                      &ldquo;{tool.orientingQuestion}&rdquo;
                    </p>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {tool.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
