/**
 * Toolbox Tab Component V3
 * Master Dossier V3 - Anexo 09: Catalog of 269 seeded AI & prototyping tools + custom additions.
 * Search, filters, mandatory disclaimer, and external link to TAAFT.
 */
import React, { useState } from 'react';
import {
  ExternalLink,
  Filter,
  Plus,
  Search,
  ShieldAlert,
  Trash2,
  Wrench,
} from 'lucide-react';
import {
  TOOLBOX_CATEGORIES,
  TOOLBOX_DISCLAIMER,
  TOOLBOX_OPENNESS,
  TOOLBOX_PRICING,
  TOOLBOX_SEED,
} from '../../domain/v3/toolboxSeed.ts';
import { usePreferences } from '../../state/PreferencesContext.tsx';
import { useSession } from '../../state/SessionContext.tsx';

export const ToolboxTab: React.FC = () => {
  const { customTools, addCustomTool, removeCustomTool } = usePreferences();
  const { addToast } = useSession();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedPricing, setSelectedPricing] = useState<string>('Todos');
  const [selectedOpenness, setSelectedOpenness] = useState<string>('Todas');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New tool form state
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCat, setNewCat] = useState<string>(TOOLBOX_CATEGORIES[0]);
  const [newPricing, setNewPricing] = useState<any>('Grátis');
  const [newOpenness, setNewOpenness] = useState<any>('Proprietária');

  const allTools = [...customTools, ...TOOLBOX_SEED];

  const filteredTools = allTools.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Todas' || t.category === selectedCategory;
    const matchesPricing =
      selectedPricing === 'Todos' || t.pricing === selectedPricing;
    const matchesOpenness =
      selectedOpenness === 'Todas' || t.openness === selectedOpenness;
    return matchesSearch && matchesCategory && matchesPricing && matchesOpenness;
  });

  const handleCreateTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newUrl.trim()) return;

    addCustomTool({
      name: newName.trim(),
      description: newDesc.trim() || 'Ferramenta adicionada pela equipe.',
      category: newCat,
      pricing: newPricing,
      openness: newOpenness,
      url: newUrl.startsWith('http') ? newUrl.trim() : `https://${newUrl.trim()}`,
      source: 'Equipe Local',
    });

    setNewName('');
    setNewDesc('');
    setNewUrl('');
    setIsAddModalOpen(false);
    addToast('Ferramenta personalizada adicionada à sua Caixa!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Mandatory Disclaimer Card */}
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-200/90 flex items-start space-x-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">{TOOLBOX_DISCLAIMER}</p>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar ferramentas por nome ou finalidade..."
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 pl-10 pr-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center space-x-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 px-4 py-2.5 text-xs font-bold transition-colors shadow-sm shadow-amber-500/20 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Ferramenta</span>
          </button>
        </div>

        {/* Category, Pricing, Openness Selectors */}
        <div className="flex flex-wrap gap-2 text-xs">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-neutral-300 focus:border-amber-500 focus:outline-none"
          >
            <option value="Todas">Todas as Categorias ({allTools.length})</option>
            {TOOLBOX_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={selectedPricing}
            onChange={(e) => setSelectedPricing(e.target.value)}
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-neutral-300 focus:border-amber-500 focus:outline-none"
          >
            <option value="Todos">Todos os Preços</option>
            {TOOLBOX_PRICING.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            value={selectedOpenness}
            onChange={(e) => setSelectedOpenness(e.target.value)}
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-neutral-300 focus:border-amber-500 focus:outline-none"
          >
            <option value="Todas">Todas as Licenças</option>
            {TOOLBOX_OPENNESS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>

          <span className="self-center ml-auto text-[11px] text-neutral-500 font-mono">
            {filteredTools.length} ferramentas encontradas
          </span>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 flex flex-col justify-between hover:border-neutral-700 transition-all space-y-3 shadow-md"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="rounded bg-neutral-800 px-2 py-0.5 text-neutral-400 font-medium">
                  {tool.category}
                </span>
                <div className="flex space-x-1.5 font-mono">
                  <span
                    className={`rounded px-1.5 py-0.2 ${
                      tool.pricing === 'Grátis'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : tool.pricing === 'Freemium'
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {tool.pricing}
                  </span>
                  <span className="rounded bg-neutral-800/80 px-1.5 py-0.2 text-neutral-400">
                    {tool.openness}
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-neutral-100">{tool.name}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                {tool.description}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs">
              <span className="text-[10px] text-neutral-500 font-mono">
                {tool.source}
              </span>

              <div className="flex items-center space-x-2">
                {tool.isCustom && (
                  <button
                    onClick={() => removeCustomTool(tool.id)}
                    className="text-neutral-500 hover:text-rose-400 p-1"
                    title="Remover ferramenta personalizada"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <span>Acessar</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* External TAAFT CTA Banner */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xl">
        <div>
          <h3 className="text-sm font-bold text-neutral-100">
            Não encontrou o que procurava?
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Explore milhares de outras ferramentas no maior diretório global de Inteligência Artificial.
          </p>
        </div>
        <a
          href="https://theresanaiforthat.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 px-4 py-2 text-xs font-semibold transition-colors shrink-0"
        >
          <span>Explorar There's An AI For That</span>
          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
        </a>
      </div>

      {/* Add Custom Tool Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-neutral-100">
              Adicionar Ferramenta Personalizada
            </h3>
            <form onSubmit={handleCreateTool} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 mb-1">Nome da Ferramenta</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex: Whisper local"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2.5 text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">Link ou URL</label>
                <input
                  type="text"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2.5 text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">Descrição</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="O que esta ferramenta faz de útil..."
                  rows={2}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2.5 text-neutral-100"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-neutral-300 mb-1">Categoria</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2 text-neutral-200 text-[11px]"
                  >
                    {TOOLBOX_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1">Preço</label>
                  <select
                    value={newPricing}
                    onChange={(e) => setNewPricing(e.target.value as any)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2 text-neutral-200 text-[11px]"
                  >
                    {TOOLBOX_PRICING.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1">Abertura</label>
                  <select
                    value={newOpenness}
                    onChange={(e) => setNewOpenness(e.target.value as any)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2 text-neutral-200 text-[11px]"
                  >
                    {TOOLBOX_OPENNESS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-neutral-400 text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2 text-xs"
                >
                  Salvar Ferramenta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
