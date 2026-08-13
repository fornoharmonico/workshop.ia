import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Plus, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Tag as TagIcon, 
  FolderPlus, 
  HelpCircle, 
  FileText,
  Layers
} from 'lucide-react';
import { 
  PROBLEM_CATEGORIES, 
  PROBLEM_SCALES, 
  MappedProblem, 
  ProblemScale 
} from '../../data/problemsData';

interface AddProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProblem: (newProblem: Omit<MappedProblem, 'id'>) => void;
  existingTags: string[];
}

export const AddProblemModal: React.FC<AddProblemModalProps> = ({
  isOpen,
  onClose,
  onAddProblem,
  existingTags
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState('');
  const [selectedScales, setSelectedScales] = useState<ProblemScale[]>(['bairro']);
  const [includesText, setIncludesText] = useState('');

  // Validation Error state
  const [errors, setErrors] = useState<{
    title?: string;
    question?: string;
    categories?: string;
    tags?: string;
  }>({});

  // Ensure scroll is at the top when modal opens & focus title
  useEffect(() => {
    if (isOpen) {
      if (formRef.current) {
        formRef.current.scrollTop = 0;
      }
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Category Toggle
  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev => 
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
    if (errors.categories) {
      setErrors(prev => ({ ...prev, categories: undefined }));
    }
  };

  // Tag Toggle (existing)
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    if (errors.tags) {
      setErrors(prev => ({ ...prev, tags: undefined }));
    }
  };

  // Add Custom Tag
  const handleAddCustomTag = () => {
    let clean = customTagInput.trim();
    if (!clean) return;
    if (!clean.startsWith('#')) {
      clean = `#${clean}`;
    }
    // Format tag (remove spaces inside tag or replace with camelCase)
    clean = clean.replace(/\s+/g, '');

    if (!selectedTags.includes(clean)) {
      setSelectedTags(prev => [...prev, clean]);
    }
    setCustomTagInput('');
    if (errors.tags) {
      setErrors(prev => ({ ...prev, tags: undefined }));
    }
  };

  // Scale Toggle
  const toggleScale = (scaleId: ProblemScale) => {
    setSelectedScales(prev => 
      prev.includes(scaleId) ? prev.filter(s => s !== scaleId) : [...prev, scaleId]
    );
  };

  // Submit Handler with Strict Validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = 'O nome do problema é obrigatório.';
    }
    if (!question.trim()) {
      newErrors.question = 'A pergunta geradora é obrigatória.';
    }
    if (selectedCategories.length === 0) {
      newErrors.categories = 'Selecione pelo menos uma categoria temática.';
    }
    if (selectedTags.length === 0) {
      newErrors.tags = 'Selecione ou inclua pelo menos uma tag.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to top of form to show validation errors
      if (formRef.current) {
        formRef.current.scrollTop = 0;
      }
      return;
    }

    // Split includes by lines
    const includesList = includesText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    onAddProblem({
      title: title.trim(),
      question: question.trim(),
      categories: selectedCategories,
      scales: selectedScales.length > 0 ? selectedScales : ['bairro'],
      tags: selectedTags,
      includes: includesList.length > 0 ? includesList : undefined
    });

    // Reset & Close
    setTitle('');
    setQuestion('');
    setSelectedCategories([]);
    setSelectedTags([]);
    setCustomTagInput('');
    setSelectedScales(['bairro']);
    setIncludesText('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transform animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-problem-title"
      >
        {/* Fixed Header */}
        <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Co-criação da Equipe / Facilitador
              </span>
              <h2 id="add-problem-title" className="text-xl font-black text-slate-900 dark:text-white">
                Mapear Novo Problema
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6"
        >
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Preencha os campos obrigatórios abaixo para incluir um novo problema no Mapa Interativo de Desafios.
          </p>

          {/* Global Error Banner */}
          {Object.keys(errors).length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold space-y-1">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>Existem campos obrigatórios não preenchidos:</span>
              </div>
              <ul className="list-disc list-inside pl-6 font-semibold space-y-0.5">
                {errors.title && <li>{errors.title}</li>}
                {errors.question && <li>{errors.question}</li>}
                {errors.categories && <li>{errors.categories}</li>}
                {errors.tags && <li>{errors.tags}</li>}
              </ul>
            </div>
          )}

          {/* 1. Nome do Problema (Title) */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>1. Nome do Problema <span className="text-rose-500">*</span></span>
              </span>
              <span className="text-[10px] font-normal text-slate-400">(Obrigatório)</span>
            </label>
            <input
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
              }}
              placeholder="Ex: Descarte inadequado de pilhas e eletrônicos no bairro"
              className={`w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                errors.title 
                  ? 'border-rose-500 focus:ring-rose-500' 
                  : 'border-slate-200 dark:border-slate-700 focus:ring-amber-500'
              }`}
            />
            {errors.title && (
              <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.title}
              </p>
            )}
          </div>

          {/* 2. Pergunta que Resuma o Problema (Question) */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>2. Pergunta Sintética que Resuma o Problema <span className="text-rose-500">*</span></span>
              </span>
              <span className="text-[10px] font-normal text-slate-400">(Obrigatório)</span>
            </label>
            <textarea
              rows={2}
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                if (errors.question) setErrors(prev => ({ ...prev, question: undefined }));
              }}
              placeholder="Ex: Por que os moradores descartam lixo eletrônico no lixo comum e quais os impactos ambientais no bairro?"
              className={`w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                errors.question 
                  ? 'border-rose-500 focus:ring-rose-500' 
                  : 'border-slate-200 dark:border-slate-700 focus:ring-amber-500'
              }`}
            />
            {errors.question && (
              <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.question}
              </p>
            )}
          </div>

          {/* 3. Categorização (Categories) */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FolderPlus className="w-4 h-4 text-amber-500" />
                <span>3. Categorias Temáticas <span className="text-rose-500">*</span></span>
              </span>
              <span className="text-[10px] font-normal text-slate-400">Selecione uma ou mais</span>
            </label>

            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border ${
              errors.categories ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700/60'
            }`}>
              {PROBLEM_CATEGORIES.map(cat => {
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`p-2.5 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all border ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                        : `${cat.bgLight} ${cat.color} ${cat.borderLight} hover:opacity-90`
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    {isSelected && <Check className="w-4 h-4 shrink-0" />}
                  </button>
                );
              })}
            </div>
            {errors.categories && (
              <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.categories}
              </p>
            )}
          </div>

          {/* 4. Tageamento (Tags) */}
          <div className="space-y-3">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <TagIcon className="w-4 h-4 text-amber-500" />
                <span>4. Tags do Problema <span className="text-rose-500">*</span></span>
              </span>
              <span className="text-[10px] font-normal text-slate-400">Selecione existentes ou crie nova tag</span>
            </label>

            {/* Custom Tag Creator Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomTag();
                  }
                }}
                placeholder="Digitar nova tag (ex: #meioAmbiente, #coleta)..."
                className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={handleAddCustomTag}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Tag</span>
              </button>
            </div>

            {/* Tags Selection Box */}
            <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border max-h-40 overflow-y-auto space-y-2 ${
              errors.tags ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700/60'
            }`}>
              <div className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400">
                Tags Selecionadas ({selectedTags.length}):
              </div>

              {selectedTags.length === 0 ? (
                <p className="text-xs text-slate-400 italic">Nenhuma tag selecionada ainda.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {selectedTags.map(tag => (
                    <span
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer hover:bg-rose-500 hover:text-white transition-colors"
                      title="Clique para remover"
                    >
                      <span>{tag}</span>
                      <X className="w-3 h-3" />
                    </span>
                  ))}
                </div>
              )}

              <hr className="border-slate-200 dark:border-slate-700 my-2" />

              <div className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400">
                Ou selecione das tags do workshop:
              </div>

              <div className="flex flex-wrap gap-1.5">
                {existingTags.map(tag => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
            {errors.tags && (
              <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.tags}
              </p>
            )}
          </div>

          {/* 5. Escala do Problema (Scales) */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>5. Escala Territorial do Problema</span>
              </span>
              <span className="text-[10px] font-normal text-slate-400">Opcional</span>
            </label>

            <div className="flex flex-wrap gap-2">
              {PROBLEM_SCALES.map(sc => {
                const isSelected = selectedScales.includes(sc.id);
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => toggleScale(sc.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span>{sc.icon}</span>
                    <span>{sc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Aspectos / Tópicos Inclusos (Includes) */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>6. Aspectos Inclusos / Detalhamento do Problema</span>
              <span className="text-[10px] font-normal text-slate-400">Opcional (um por linha)</span>
            </label>
            <textarea
              rows={3}
              value={includesText}
              onChange={(e) => setIncludesText(e.target.value)}
              placeholder={`Ex:\n- Falta de pontos de coleta seletiva\n- Falta de conscientização da população\n- Risco de contaminação do solo e lençol freático`}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Invisible submit button for Enter key form submission */}
          <button type="submit" className="hidden" />
        </form>

        {/* Fixed Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-extrabold text-xs sm:text-sm transition-all"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={(e) => handleSubmit(e as any)}
            className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Salvar e Mapear Problema</span>
          </button>
        </div>
      </div>
    </div>
  );
};

