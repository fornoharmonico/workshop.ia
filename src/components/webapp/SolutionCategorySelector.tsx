import React from 'react';
import { 
  Box, 
  Smartphone, 
  ConciergeBell, 
  Workflow, 
  Megaphone, 
  Calendar, 
  Sparkles, 
  Building, 
  Briefcase, 
  BookOpen, 
  GraduationCap, 
  PlusCircle, 
  Check, 
  Layers, 
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { 
  SOLUTION_CATEGORY_OPTIONS, 
  SolutionCategory 
} from '../../types/workshop';
import { 
  CATEGORY_DETAILS, 
  formatSolutionCategories, 
  getContextualSolutionLabels, 
  isHybridSolution 
} from '../../utils/solutionCategories';

interface SolutionCategorySelectorProps {
  selectedCategories?: string[];
  otherText?: string;
  onChange: (categories: string[], otherText?: string) => void;
  compact?: boolean;
  disabled?: boolean;
}

const CATEGORY_ICONS: Record<SolutionCategory, React.ReactNode> = {
  'produto físico': <Box className="w-4 h-4" />,
  'produto digital': <Smartphone className="w-4 h-4" />,
  'serviço': <ConciergeBell className="w-4 h-4" />,
  'processo': <Workflow className="w-4 h-4" />,
  'campanha': <Megaphone className="w-4 h-4" />,
  'evento': <Calendar className="w-4 h-4" />,
  'experiência': <Sparkles className="w-4 h-4" />,
  'organização/iniciativa': <Building className="w-4 h-4" />,
  'negócio': <Briefcase className="w-4 h-4" />,
  'material ou conteúdo educativo': <BookOpen className="w-4 h-4" />,
  'metodologia/oficina/atividade': <GraduationCap className="w-4 h-4" />,
  'outra': <PlusCircle className="w-4 h-4" />
};

export const SolutionCategorySelector: React.FC<SolutionCategorySelectorProps> = ({
  selectedCategories = [],
  otherText = '',
  onChange,
  compact = false,
  disabled = false
}) => {
  const currentList = Array.isArray(selectedCategories) ? selectedCategories : [];
  const isHybrid = isHybridSolution(currentList);
  const labels = getContextualSolutionLabels(currentList, otherText);

  const handleToggleCategory = (cat: SolutionCategory) => {
    if (disabled) return;
    let nextList: string[];
    if (currentList.includes(cat)) {
      nextList = currentList.filter((item) => item !== cat);
    } else {
      nextList = [...currentList, cat];
    }
    onChange(nextList, otherText);
  };

  const handleOtherTextChange = (text: string) => {
    if (disabled) return;
    onChange(currentList, text);
  };

  return (
    <div className="space-y-4">
      {/* Header Info & Hybrid Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Natureza / Formato da Solução</span>
            </span>

            {isHybrid && (
              <span className="text-2xs font-extrabold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 animate-in fade-in">
                Solução Híbrida ({currentList.length} formatos)
              </span>
            )}
          </div>
          <p className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5">
            Marque uma ou mais caixas. A prototipação se adapta ao formato real da sua criação.
          </p>
        </div>

        {currentList.length > 0 && !disabled && (
          <button
            type="button"
            onClick={() => onChange([], '')}
            className="text-2xs font-bold text-slate-400 hover:text-rose-500 transition self-start sm:self-auto cursor-pointer"
          >
            Limpar seleção
          </button>
        )}
      </div>

      {/* Grid of Checkboxes */}
      <div className={`grid ${compact ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-2.5`}>
        {SOLUTION_CATEGORY_OPTIONS.map((cat) => {
          const isSelected = currentList.includes(cat);
          const meta = CATEGORY_DETAILS[cat];

          return (
            <label
              key={cat}
              className={`flex items-start gap-3 p-3 rounded-2xl border transition cursor-pointer select-none ${
                isSelected
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-700 shadow-xs'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <div className="pt-0.5 shrink-0">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggleCategory(cat)}
                  disabled={disabled}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center transition ${
                    isSelected
                      ? 'bg-amber-500 border-amber-600 text-slate-950 shadow-2xs'
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`shrink-0 ${isSelected ? 'text-amber-700 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    {CATEGORY_ICONS[cat]}
                  </span>
                  <span className={`text-xs font-bold truncate ${isSelected ? 'text-slate-950 dark:text-amber-100 font-extrabold' : 'text-slate-800 dark:text-slate-200'}`}>
                    {meta.label}
                  </span>
                </div>
                {!compact && (
                  <p className="text-3xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {meta.description}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {/* Dynamic Text Input for 'outra' */}
      {currentList.includes('outra') && (
        <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 space-y-1.5 animate-in fade-in">
          <label className="text-2xs font-extrabold text-amber-900 dark:text-amber-200 uppercase tracking-wider block">
            Especifique a categoria da sua solução:
          </label>
          <input
            type="text"
            value={otherText}
            onChange={(e) => handleOtherTextChange(e.target.value)}
            disabled={disabled}
            placeholder="Ex: Intervenção urbana, podcast narrativo, jogo de tabuleiro..."
            className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          />
        </div>
      )}

      {/* Contextual Prototyping Guidance */}
      {currentList.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-2xs uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Adaptação da Prototipagem para este formato:</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 text-2xs text-slate-700 dark:text-slate-300">
            <div>
              <strong className="text-slate-900 dark:text-slate-100 block">Foco nos Elementos:</strong>
              <span>{labels.elementsLabel}</span>
            </div>
            <div>
              <strong className="text-slate-900 dark:text-slate-100 block">Foco na Jornada:</strong>
              <span>{labels.flowLabel}</span>
            </div>
          </div>

          {labels.recommendedPrototypes.length > 0 && (
            <div className="pt-1 border-t border-slate-200/60 dark:border-slate-800">
              <span className="text-3xs font-black text-slate-400 uppercase tracking-wider block mb-1">
                Sugestões de Formato de Protótipo (V0 / V1):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {labels.recommendedPrototypes.map((proto, idx) => (
                  <span
                    key={idx}
                    className="text-3xs font-medium px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    • {proto}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
