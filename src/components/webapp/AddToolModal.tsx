import React, { useState, useEffect } from 'react';
import { X, Plus, AlertTriangle, Sparkles } from 'lucide-react';
import { ToolItem, ToolPricing, ToolOpenness } from '../../types/tools';
import { TOOL_CATEGORIES, normalizeSearch } from '../../data/toolsData';

interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTool: (tool: ToolItem) => void;
  existingTools: ToolItem[];
}

const OPENNESS_OPTIONS: ToolOpenness[] = [
  'Open source',
  'Open weights',
  'Source-available',
  'Híbrida',
  'Proprietária',
  'A verificar'
];

const PRICING_OPTIONS: ToolPricing[] = [
  'Grátis',
  'Freemium',
  'Paga',
  'A verificar'
];

export const AddToolModal: React.FC<AddToolModalProps> = ({
  isOpen,
  onClose,
  onAddTool,
  existingTools
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>(TOOL_CATEGORIES[0]);
  const [pricing, setPricing] = useState<ToolPricing>('Freemium');
  const [openness, setOpenness] = useState<ToolOpenness>('Proprietária');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setDescription('');
      setCategory(TOOL_CATEGORIES[0]);
      setPricing('Freemium');
      setOpenness('Proprietária');
      setUrl('');
      setErrors({});
      setDuplicateWarning(null);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const trimmedName = name.trim();
    const trimmedDesc = description.trim();
    const trimmedUrl = url.trim();

    if (!trimmedName) {
      newErrors.name = 'O nome da ferramenta é obrigatório.';
    }

    if (!trimmedDesc) {
      newErrors.description = 'A utilidade / descrição é obrigatória.';
    }

    if (!trimmedUrl) {
      newErrors.url = 'O link oficial da ferramenta é obrigatório.';
    } else {
      const urlPattern = /^https?:\/\/.+/i;
      if (!urlPattern.test(trimmedUrl)) {
        newErrors.url = 'O link deve começar com http:// ou https://';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check duplicate
  const checkDuplicate = (trimmedName: string, trimmedUrl: string): ToolItem | undefined => {
    const normName = normalizeSearch(trimmedName);
    const cleanUrl = trimmedUrl.toLowerCase().replace(/\/+$/, '');
    
    return existingTools.find(tool => {
      const toolNormName = normalizeSearch(tool.name);
      const toolCleanUrl = tool.url.toLowerCase().replace(/\/+$/, '');
      return toolNormName === normName || (cleanUrl.length > 8 && toolCleanUrl === cleanUrl);
    });
  };

  const handleSubmit = (e: React.FormEvent, forceSave = false) => {
    e.preventDefault();
    if (!validate()) return;

    const trimmedName = name.trim();
    const trimmedDesc = description.trim();
    let trimmedUrl = url.trim();
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
      trimmedUrl = `https://${trimmedUrl}`;
    }

    // Check duplicate
    if (!forceSave) {
      const dup = checkDuplicate(trimmedName, trimmedUrl);
      if (dup) {
        setDuplicateWarning(
          `Essa ferramenta parece já existir na sua Caixa de Ferramentas como "${dup.name}" (${dup.category}). Deseja adicionar mesmo assim?`
        );
        return;
      }
    }

    const newTool: ToolItem = {
      id: `user-tool-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: trimmedName,
      description: trimmedDesc,
      category,
      pricing,
      openness,
      url: trimmedUrl,
      source: 'user-added',
      createdAt: new Date().toISOString()
    };

    onAddTool(newTool);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-tool-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 id="add-tool-modal-title" className="text-base font-extrabold text-slate-900 dark:text-white">
                Adicionar Nova Ferramenta
              </h2>
              <p className="text-2xs text-slate-500 dark:text-slate-400">
                Adicione uma ferramenta à sua Caixa de Ferramentas pessoal
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content / Form */}
        <form onSubmit={e => handleSubmit(e)} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          
          {/* Duplicate Warning if detected */}
          {duplicateWarning && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="font-medium text-xs leading-relaxed">{duplicateWarning}</p>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setDuplicateWarning(null)}
                  className="px-3 py-1 text-2xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 cursor-pointer transition"
                >
                  Voltar e revisar
                </button>
                <button
                  type="button"
                  onClick={e => handleSubmit(e, true)}
                  className="px-3 py-1 text-2xs font-bold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer transition shadow-xs"
                >
                  Sim, adicionar mesmo assim
                </button>
              </div>
            </div>
          )}

          {/* Nome */}
          <div>
            <label htmlFor="tool-name" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Nome da Ferramenta <span className="text-amber-600 dark:text-amber-400">*</span>
            </label>
            <input
              id="tool-name"
              type="text"
              placeholder="Ex: Cursor, Claude, n8n, v0..."
              value={name}
              onChange={e => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                if (duplicateWarning) setDuplicateWarning(null);
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none transition ${
                errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
              }`}
            />
            {errors.name && <p className="text-2xs text-red-500 mt-1 font-medium">{errors.name}</p>}
          </div>

          {/* Utilidade */}
          <div>
            <label htmlFor="tool-desc" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Utilidade / Descrição Curta <span className="text-amber-600 dark:text-amber-400">*</span>
            </label>
            <textarea
              id="tool-desc"
              rows={2}
              placeholder="Ex: Editor de código com IA para programar com comandos em linguagem natural."
              value={description}
              onChange={e => {
                setDescription(e.target.value);
                if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none transition resize-none ${
                errors.description ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
              }`}
            />
            {errors.description && <p className="text-2xs text-red-500 mt-1 font-medium">{errors.description}</p>}
          </div>

          {/* Categoria */}
          <div>
            <label htmlFor="tool-category" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Categoria
            </label>
            <select
              id="tool-category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none transition cursor-pointer"
            >
              {TOOL_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Modelo de Preço e Modelo de Abertura (2 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="tool-pricing-select" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Modelo de Preço
              </label>
              <select
                id="tool-pricing-select"
                value={pricing}
                onChange={e => setPricing(e.target.value as ToolPricing)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none transition cursor-pointer"
              >
                {PRICING_OPTIONS.map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tool-openness-select" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Modelo de Abertura
              </label>
              <select
                id="tool-openness-select"
                value={openness}
                onChange={e => setOpenness(e.target.value as ToolOpenness)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none transition cursor-pointer"
              >
                {OPENNESS_OPTIONS.map(o => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Link Oficial */}
          <div>
            <label htmlFor="tool-url" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Link Oficial (URL) <span className="text-amber-600 dark:text-amber-400">*</span>
            </label>
            <input
              id="tool-url"
              type="text"
              placeholder="https://exemplo.com"
              value={url}
              onChange={e => {
                setUrl(e.target.value);
                if (errors.url) setErrors(prev => ({ ...prev, url: '' }));
                if (duplicateWarning) setDuplicateWarning(null);
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none transition ${
                errors.url ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
              }`}
            />
            {errors.url && <p className="text-2xs text-red-500 mt-1 font-medium">{errors.url}</p>}
          </div>

          {/* Notice info */}
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 text-2xs flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>
              A ferramenta será salva localmente no seu dispositivo e integrada à sua Caixa de Ferramentas.
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Salvar Ferramenta</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
