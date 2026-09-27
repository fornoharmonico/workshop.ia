/**
 * Problem Map Tab Component V3
 * Master Dossier V3 - Anexo 09: 15 canonical problem seeds + custom cards + filters.
 * Picking a problem populates provisional starting point for A01.
 */
import React, { useState } from 'react';
import {
  Compass,
  Filter,
  Lightbulb,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from 'lucide-react';
import {
  PROBLEM_CATEGORIES,
  PROBLEM_MAP_SEED,
  PROBLEM_SCALES,
} from '../../domain/v3/problemMapSeed.ts';
import { usePreferences } from '../../state/PreferencesContext.tsx';
import { useSession } from '../../state/SessionContext.tsx';

export const ProblemMapTab: React.FC = () => {
  const {
    customProblems,
    addCustomProblem,
    removeCustomProblem,
    setProvisionalProblemPrompt,
  } = usePreferences();
  const { setViewedActivityId, setActiveTab, addToast } = useSession();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedScale, setSelectedScale] = useState<string>('Todas');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form for custom problem
  const [newTitle, setNewTitle] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState<string>(PROBLEM_CATEGORIES[0]);
  const [newScale, setNewScale] = useState<string>(PROBLEM_SCALES[0]);

  const allProblems = [...customProblems, ...PROBLEM_MAP_SEED];

  const filteredProblems = allProblems.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Todas' || p.category === selectedCategory;
    const matchesScale = selectedScale === 'Todas' || p.scale === selectedScale;
    return matchesSearch && matchesCategory && matchesScale;
  });

  const handleSelectProblem = (problemTitle: string, question: string) => {
    const promptText = `${problemTitle} — Pergunta norteadora: ${question}`;
    setProvisionalProblemPrompt(promptText);
    setViewedActivityId('A01');
    setActiveTab('current');
    addToast('Ponto de partida selecionado provisoriamente para A01!', 'info');
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQuestion.trim()) return;

    addCustomProblem({
      title: newTitle.trim(),
      question: newQuestion.trim(),
      description: newDesc.trim() || 'Problema formulado localmente pela equipe.',
      category: newCat,
      scale: newScale,
    });

    setNewTitle('');
    setNewQuestion('');
    setNewDesc('');
    setIsAddModalOpen(false);
    addToast('Problema personalizado adicionado localmente!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Description */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-2">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
          <Lightbulb className="w-4 h-4" />
          <span>Repertório de Tensões Iniciais</span>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed">
          O Mapa de Problemas é um catálogo inspiracional para provocar o pensamento da equipe. Selecionar um card serve como <strong>ponto de partida provisório para a Atividade A01</strong>, sem transformar nada em decisão canônica antes da confirmação humana na conversa com a IARA.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por palavras-chave ou perguntas..."
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900 pl-10 pr-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-neutral-300 focus:border-amber-500 focus:outline-none"
          >
            <option value="Todas">Todas as Categorias</option>
            {PROBLEM_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={selectedScale}
            onChange={(e) => setSelectedScale(e.target.value)}
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-neutral-300 focus:border-amber-500 focus:outline-none"
          >
            <option value="Todas">Todas as Escalas</option>
            {PROBLEM_SCALES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 px-3.5 py-2 text-xs font-bold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Problema</span>
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProblems.map((prob) => (
          <div
            key={prob.id}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 flex flex-col justify-between hover:border-neutral-700 transition-all space-y-4 shadow-md"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="rounded bg-amber-500/10 px-2 py-0.5 font-medium text-amber-300 border border-amber-500/20">
                  {prob.category}
                </span>
                <span className="text-neutral-500 font-mono">{prob.scale}</span>
              </div>

              <h3 className="text-sm font-bold text-neutral-100 leading-snug">
                {prob.title}
              </h3>
              <p className="text-xs text-amber-200/90 italic font-medium leading-relaxed">
                "{prob.question}"
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {prob.description}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
              {prob.isCustom && (
                <button
                  onClick={() => removeCustomProblem(prob.id)}
                  className="text-neutral-500 hover:text-rose-400 p-1 text-xs transition-colors"
                  title="Remover problema personalizado"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={() => handleSelectProblem(prob.title, prob.question)}
                className="ml-auto flex items-center space-x-1.5 rounded-lg bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 px-3 py-1.5 text-xs font-semibold transition-all border border-neutral-700 hover:border-amber-500"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Usar como Ponto de Partida</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <div className="rounded-2xl border border-neutral-800 p-8 text-center text-xs text-neutral-400">
          Nenhum problema encontrado com os filtros selecionados.
        </div>
      )}

      {/* Add Custom Problem Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-neutral-100">
              Adicionar Problema Local
            </h3>
            <form onSubmit={handleCreateCustom} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 mb-1">Título do Problema</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Falta de reciclagem no bairro"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2.5 text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">Pergunta Norteadora</label>
                <input
                  type="text"
                  required
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Ex: Como engajar os moradores na separação do lixo?"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2.5 text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">Descrição Curta</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Contexto observado ou vivenciado pela equipe..."
                  rows={2}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2.5 text-neutral-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-neutral-300 mb-1">Categoria</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2 text-neutral-200 text-xs"
                  >
                    {PROBLEM_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 mb-1">Escala</label>
                  <select
                    value={newScale}
                    onChange={(e) => setNewScale(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2 text-neutral-200 text-xs"
                  >
                    {PROBLEM_SCALES.map((s) => (
                      <option key={s} value={s}>{s}</option>
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
                  Salvar Problema
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
