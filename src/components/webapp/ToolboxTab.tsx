import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  ExternalLink, 
  Plus, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Trash2, 
  Wrench,
  Globe,
  Tag,
  Code2,
  CalendarCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  ToolItem, 
  ToolPricing, 
  ToolOpenness, 
  PricingFilterOption, 
  OpennessFilterOption 
} from '../../types/tools';
import { OFFICIAL_TOOLS, TOOL_CATEGORIES, normalizeSearch } from '../../data/toolsData';
import { AddToolModal } from './AddToolModal';
import { ConfirmModal } from '../ConfirmModal';

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

export const ToolboxTab: React.FC = () => {
  const { appState, setAppState } = useApp();

  // Local storage secondary safety sync on mount
  useEffect(() => {
    if (!appState.customTools || appState.customTools.length === 0) {
      try {
        const savedCustom = localStorage.getItem('oforno_user_custom_tools_v1');
        if (savedCustom) {
          const parsed = JSON.parse(savedCustom);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Ensure backwards compatibility with openness
            const sanitized = parsed.map((t: ToolItem) => ({
              ...t,
              openness: t.openness || 'Proprietária'
            }));
            setAppState(prev => ({
              ...prev,
              customTools: sanitized
            }));
          }
        }
      } catch (err) {
        console.warn('Could not read cached custom tools', err);
      }
    }
  }, [appState.customTools, setAppState]);

  // Combine official tools with user added tools
  const allTools = useMemo<ToolItem[]>(() => {
    const userTools = (appState.customTools || []).map(t => ({
      ...t,
      openness: t.openness || ('Proprietária' as ToolOpenness)
    }));
    return [...OFFICIAL_TOOLS, ...userTools];
  }, [appState.customTools]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPricing, setSelectedPricing] = useState<PricingFilterOption>('all');
  const [selectedOpenness, setSelectedOpenness] = useState<OpennessFilterOption>('all');
  const [isDisclaimerExpanded, setIsDisclaimerExpanded] = useState<boolean>(true);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toolToDelete, setToolToDelete] = useState<ToolItem | null>(null);

  // Check if any filter is active
  const isFilterActive = 
    searchTerm.trim() !== '' || 
    selectedCategory !== 'all' || 
    selectedPricing !== 'all' ||
    selectedOpenness !== 'all';

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedPricing('all');
    setSelectedOpenness('all');
  };

  // Add custom tool handler
  const handleAddTool = (newTool: ToolItem) => {
    setAppState(prev => {
      const updated = [...(prev.customTools || []), newTool];
      try {
        localStorage.setItem('oforno_user_custom_tools_v1', JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to save to oforno_user_custom_tools_v1', err);
      }
      return {
        ...prev,
        customTools: updated
      };
    });
  };

  // Delete custom tool handler
  const handleDeleteTool = (toolId: string) => {
    setAppState(prev => {
      const updated = (prev.customTools || []).filter(t => t.id !== toolId);
      try {
        localStorage.setItem('oforno_user_custom_tools_v1', JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to save to oforno_user_custom_tools_v1', err);
      }
      return {
        ...prev,
        customTools: updated
      };
    });
    setToolToDelete(null);
  };

  // Filtering & Sorting (AND logic between all filters)
  const filteredTools = useMemo(() => {
    const normalizedQuery = normalizeSearch(searchTerm);

    return allTools
      .filter(tool => {
        // Category filter
        if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
          return false;
        }

        // Pricing filter
        if (selectedPricing !== 'all' && tool.pricing !== selectedPricing) {
          return false;
        }

        // Openness filter
        if (selectedOpenness !== 'all' && tool.openness !== selectedOpenness) {
          return false;
        }

        // Search query
        if (normalizedQuery) {
          const nameNorm = normalizeSearch(tool.name);
          const descNorm = normalizeSearch(tool.description);
          const catNorm = normalizeSearch(tool.category);

          const matches = 
            nameNorm.includes(normalizedQuery) ||
            descNorm.includes(normalizedQuery) ||
            catNorm.includes(normalizedQuery);

          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));
  }, [allTools, searchTerm, selectedCategory, selectedPricing, selectedOpenness]);

  // Color helper for pricing badges
  const getPricingBadgeClass = (pricing: ToolPricing) => {
    switch (pricing) {
      case 'Grátis':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Freemium':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Paga':
        return 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'A verificar':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  // Color helper for openness badges
  const getOpennessBadgeClass = (openness: ToolOpenness) => {
    switch (openness) {
      case 'Open source':
        return 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800';
      case 'Open weights':
        return 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      case 'Source-available':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Híbrida':
        return 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'Proprietária':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
      case 'A verificar':
        return 'bg-amber-100/70 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6">

      {/* Header section with intro */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-2xs font-extrabold uppercase tracking-wider">
                <Wrench className="w-3.5 h-3.5" />
                <span>Inventário de Tecnologias</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-3xs font-bold border border-slate-200 dark:border-slate-700">
                <CalendarCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>Base v1.5.1 auditada (11/09/2026)</span>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Caixa de Ferramentas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Explore 270+ ferramentas auditadas de IA, criação, produtividade, desenvolvimento, automação e pesquisa. Filtre por modelo de abertura, preço ou categoria.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="self-start sm:self-center px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition shadow-xs flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar ferramenta</span>
          </button>
        </div>

        {/* Mandatory Disclaimer Callout */}
        <div className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30 overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setIsDisclaimerExpanded(!isDisclaimerExpanded)}
            className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-amber-100/50 dark:hover:bg-amber-900/30 transition"
            aria-expanded={isDisclaimerExpanded}
            aria-controls="disclaimer-content"
          >
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="font-extrabold text-xs text-amber-950 dark:text-amber-200">
                Antes de usar uma ferramenta (Auditoria v1.5.1)
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-2xs font-semibold text-amber-700 dark:text-amber-400">
              <span>{isDisclaimerExpanded ? 'Ocultar aviso' : 'Ler aviso completo'}</span>
              {isDisclaimerExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </div>
          </button>

          {isDisclaimerExpanded && (
            <div 
              id="disclaimer-content" 
              className="px-4 pb-4 pt-1 text-2xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed border-t border-amber-200/60 dark:border-amber-900/40 space-y-2"
            >
              <p>
                O ecossistema de Inteligência Artificial e software evolui rapidamente. Ferramentas surgem continuamente, enquanto outras alteram seu funcionamento, licença, modelo de negócio ou são descontinuadas.
              </p>
              <p>
                Esta Caixa de Ferramentas é um inventário descritivo para descoberta e exploração estruturada. A inclusão de uma ferramenta não representa recomendação, endosso formal, certificação de segurança da informação ou garantia técnica por parte dos organizadores.
              </p>
              <p>
                Cada solução possui características próprias de governança: termos de uso, políticas de privacidade, modelo de abertura (software livre, pesos abertos, licenças restritas ou proprietárias), retenção e treinamento com dados dos usuários.
              </p>
              <p>
                Antes de inserir dados pessoais, informações confidenciais de clientes, segredos comerciais ou código proprietário em qualquer plataforma, leia a documentação oficial e os termos de serviço para verificar se a ferramenta atende às suas exigências de conformidade e segurança.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-amber-200/50 dark:border-amber-900/30">
                <p className="font-bold text-amber-950 dark:text-amber-100">
                  A decisão de utilizar uma ferramenta e a responsabilidade por seus dados e resultados pertencem exclusivamente ao usuário.
                </p>
                <span className="inline-block text-3xs font-extrabold text-amber-800/80 dark:text-amber-300/80 shrink-0">
                  Informações verificadas em 11/09/2026
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search & Multi-filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-3xl shadow-xs space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar ferramenta, tecnologia ou utilidade... (ex: transcrição, vídeo, programação, Open source, Cursor, n8n)"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition cursor-pointer"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter controls row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          
          {/* Category Dropdown */}
          <div>
            <label htmlFor="filter-category" className="block text-3xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Categoria
            </label>
            <select
              id="filter-category"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none transition cursor-pointer"
            >
              <option value="all">Todas as categorias ({TOOL_CATEGORIES.length})</option>
              {TOOL_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Pricing Dropdown */}
          <div>
            <label htmlFor="filter-pricing" className="block text-3xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Modelo de Preço
            </label>
            <select
              id="filter-pricing"
              value={selectedPricing}
              onChange={e => setSelectedPricing(e.target.value as PricingFilterOption)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none transition cursor-pointer"
            >
              <option value="all">Todos os preços</option>
              {PRICING_OPTIONS.map(p => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Openness Dropdown */}
          <div>
            <label htmlFor="filter-openness" className="block text-3xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Modelo de Abertura
            </label>
            <select
              id="filter-openness"
              value={selectedOpenness}
              onChange={e => setSelectedOpenness(e.target.value as OpennessFilterOption)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none transition cursor-pointer"
            >
              <option value="all">Todos os modelos de abertura</option>
              {OPENNESS_OPTIONS.map(o => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Counter & Clear Filters Row */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-2xs font-semibold text-slate-500 dark:text-slate-400">
            <strong className="text-slate-900 dark:text-white font-extrabold">{filteredTools.length}</strong>{' '}
            {filteredTools.length === 1 ? 'ferramenta encontrada' : 'ferramentas encontradas'}
          </span>

          {isFilterActive && (
            <button
              type="button"
              onClick={clearFilters}
              className="px-2.5 py-1 rounded-lg text-2xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition cursor-pointer flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              <span>Limpar filtros</span>
            </button>
          )}
        </div>

      </div>

      {/* Grid of Tools or Empty State */}
      {filteredTools.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Nenhuma ferramenta encontrada
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Tente pesquisar outro termo ou alterar os filtros de preço, abertura e categoria para ver os resultados.
            </p>
          </div>
          {isFilterActive && (
            <button
              type="button"
              onClick={clearFilters}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              <span>Limpar filtros</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map(tool => {
            const isUserAdded = tool.source === 'user-added';

            return (
              <div
                key={tool.id}
                className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md relative group ${
                  isUserAdded 
                    ? 'border-amber-300/80 dark:border-amber-700/60 bg-amber-500/[0.02]' 
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Top: Name, Badges & Category */}
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                        {tool.name}
                      </h3>
                      {isUserAdded && (
                        <span className="inline-block mt-0.5 text-3xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                          ★ Adicionada por você
                        </span>
                      )}
                    </div>

                    {isUserAdded && (
                      <button
                        type="button"
                        onClick={() => setToolToDelete(tool)}
                        className="p-1 text-slate-400 hover:text-red-500 rounded-md transition cursor-pointer opacity-80 hover:opacity-100 shrink-0"
                        title="Remover ferramenta pessoal"
                        aria-label={`Remover ${tool.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Dual Badges: Price & Openness */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-3xs font-extrabold uppercase border ${getPricingBadgeClass(tool.pricing)}`}>
                      {tool.pricing}
                    </span>

                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-3xs font-bold border ${getOpennessBadgeClass(tool.openness)}`}>
                      <Code2 className="w-2.5 h-2.5 shrink-0" />
                      <span>{tool.openness}</span>
                    </span>
                  </div>

                  {/* Category Chip */}
                  <div>
                    <span className="inline-flex items-center gap-1 text-3xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 max-w-full truncate">
                      <Tag className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">{tool.category}</span>
                    </span>
                  </div>

                  {/* Description / Utility */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>
                </div>

                {/* Bottom: Action link */}
                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition group-hover:underline"
                  >
                    <span>Acessar ferramenta</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* External Discovery Block */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" />
              Não encontrou o que procurava?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Existem milhares de ferramentas de IA sendo criadas e atualizadas continuamente. Você também pode explorar diretórios especializados para encontrar outras possibilidades.
            </p>
          </div>

          <a
            href="https://theresanaiforthat.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition shadow-xs inline-flex items-center gap-2 cursor-pointer shrink-0 active:scale-95"
          >
            <span>Explorar There's An AI For That</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <p className="text-3xs text-slate-400 border-t border-slate-800/80 pt-3">
          Fonte externa independente. Avalie cada ferramenta antes de utilizá-la.
        </p>
      </div>

      {/* Add Custom Tool Modal */}
      <AddToolModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTool={handleAddTool}
        existingTools={allTools}
      />

      {/* Delete Confirmation Modal */}
      {toolToDelete && (
        <ConfirmModal
          isOpen={true}
          title="Remover ferramenta pessoal?"
          message={`Tem certeza que deseja remover "${toolToDelete.name}" da sua Caixa de Ferramentas pessoal? Essa ação não pode ser desfeita.`}
          confirmLabel="Sim, remover"
          cancelLabel="Cancelar"
          variant="danger"
          onConfirm={() => handleDeleteTool(toolToDelete.id)}
          onCancel={() => setToolToDelete(null)}
        />
      )}

    </div>
  );
};
