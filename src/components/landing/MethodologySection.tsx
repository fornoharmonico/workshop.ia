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
    <section id="metodologia" className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            MÉTODOS & FERRAMENTAS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Perguntas orientadoras que guiam cada etapa
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            A metodologia combina o rigor do design de produtos e gestão de projetos com a agilidade do questionamento socrático apoiado por IA.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {METHOD_TOOLS.map((tool) => {
            const IconComponent = ICON_MAP[tool.iconName] || FileText;
            return (
              <div
                key={tool.id}
                className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 hover:border-amber-400 dark:hover:border-amber-500 transition-all shadow-xs flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      FERRAMENTA
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 leading-snug">
                      "{tool.orientingQuestion}"
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
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
