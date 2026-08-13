import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MAPPED_PROBLEMS,
  PROBLEM_CATEGORIES,
  PROBLEM_SCALES,
  MappedProblem,
  ProblemScale
} from '../../data/problemsData';
import { AddProblemModal } from './AddProblemModal';
import { ConfirmModal } from '../ConfirmModal';
import {
  Search,
  Filter,
  Sparkles,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  Info,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  X,
  Layers,
  Grid,
  Network,
  Share2,
  ChevronRight,
  Target,
  Plus,
  Trash2
} from 'lucide-react';

export const ProblemMapTab: React.FC = () => {
  const { appState, setAppState, setActiveWebappTab } = useApp();
  
  // Combine official problems with user/facilitator added custom problems
  const allProblems = useMemo(() => {
    return [...MAPPED_PROBLEMS, ...(appState.customProblems || [])];
  }, [appState.customProblems]);

  // Extract all existing tags dynamically across official & custom problems
  const existingTags = useMemo(() => {
    const tagSet = new Set<string>();
    allProblems.forEach(p => p.tags.forEach(t => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [allProblems]);

  // Local state for search & filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedScale, setSelectedScale] = useState<ProblemScale | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'scales' | 'connections'>('grid');
  
  // Creation & deletion modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState<MappedProblem | null>(null);

  // Selected problem detail modal
  const [activeModalProblem, setActiveModalProblem] = useState<MappedProblem | null>(null);

  // Get currently chosen problem from state
  const chosenProblemId = appState.selectedProblemId;
  const chosenProblem = useMemo(() => {
    return allProblems.find(p => p.id === chosenProblemId);
  }, [allProblems, chosenProblemId]);

  // Filter logic
  const filteredProblems = useMemo(() => {
    return allProblems.filter(prob => {
      // Category filter
      if (selectedCategory && !prob.categories.includes(selectedCategory)) {
        return false;
      }
      // Scale filter
      if (selectedScale && !prob.scales.includes(selectedScale)) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = prob.title.toLowerCase().includes(query);
        const matchesQuestion = prob.question.toLowerCase().includes(query);
        const matchesTags = prob.tags.some(t => t.toLowerCase().includes(query));
        const matchesIncludes = prob.includes?.some(i => i.toLowerCase().includes(query));
        return matchesTitle || matchesQuestion || matchesTags || matchesIncludes;
      }
      return true;
    });
  }, [allProblems, selectedCategory, selectedScale, searchTerm]);

  // Function to choose/select a problem
  const handleSelectProblem = (problem: MappedProblem) => {
    setAppState(prev => ({
      ...prev,
      selectedProblemId: problem.id,
      // Pre-fill collective challenge into projectData if empty or user confirms
      projectData: {
        ...prev.projectData,
        collectiveChallenge: prev.projectData?.collectiveChallenge || problem.title + ": " + problem.question,
      } as any
    }));
  };

  // Add custom problem card handler
  const handleAddProblemCard = (newProblemData: Omit<MappedProblem, 'id'>) => {
    const maxId = Math.max(...allProblems.map(p => p.id), 0);
    const newProblem: MappedProblem = {
      ...newProblemData,
      id: maxId + 1,
    };

    setAppState(prev => ({
      ...prev,
      customProblems: [...(prev.customProblems || []), newProblem],
      selectedProblemId: newProblem.id,
      projectData: {
        ...prev.projectData,
        collectiveChallenge: prev.projectData?.collectiveChallenge || newProblem.title + ": " + newProblem.question,
      } as any
    }));
  };

  // Delete custom problem card handler
  const confirmDeleteCustomProblem = () => {
    if (!problemToDelete) return;
    const idToDelete = problemToDelete.id;
    setAppState(prev => ({
      ...prev,
      customProblems: (prev.customProblems || []).filter(p => p.id !== idToDelete),
      selectedProblemId: prev.selectedProblemId === idToDelete ? undefined : prev.selectedProblemId
    }));
    setProblemToDelete(null);
  };

  const getCategoryObj = (catId: string) => {
    return PROBLEM_CATEGORIES.find(c => c.id === catId);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Modal for Adding New Custom Problem Card */}
      <AddProblemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProblem={handleAddProblemCard}
        existingTags={existingTags}
      />

      {/* Modal for Deleting Custom Problem Card */}
      <ConfirmModal
        isOpen={!!problemToDelete}
        title={`Apagar Card #${problemToDelete?.id}?`}
        message={`Tem certeza que deseja excluir o card "${problemToDelete?.title}"? Esta ação removerá o problema do mapa.`}
        confirmLabel="Sim, Excluir Card"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={confirmDeleteCustomProblem}
        onCancel={() => setProblemToDelete(null)}
      />

      {/* Pedagogical Principle Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/20 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diagnóstico do Encontro 1</span>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Mapear Novo Problema</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Mapa de Problemas e Desafios
          </h1>

          <blockquote className="p-4 rounded-2xl bg-amber-500/10 border-l-4 border-amber-500 text-amber-100 italic text-sm sm:text-base leading-relaxed">
            “Antes de pensar na solução, precisamos compreender melhor o problema.”
          </blockquote>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Abaixo estão organizados os {allProblems.length} desafios essenciais mapeados e levantados coletivamente pelos participantes e facilitadores. 
            Navegue pelos temas e escalas, perceba conexões ou mapeie novos cards para construir seu <strong>Briefing</strong>.
          </p>

          {/* Chosen Problem Highlight Badge */}
          {chosenProblem && (
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md">
                <Target className="w-4 h-4" />
                <span>Seu problema selecionado: <strong>#{chosenProblem.id} {chosenProblem.title}</strong></span>
              </div>

              <button
                onClick={() => {
                  setActiveWebappTab('jornada');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5 border border-white/20 cursor-pointer"
              >
                <span>Ir para 1. Jornada</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Control Bar: Search, Category Pills, Scale Pills, and View Switcher */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        
        {/* Search input, Add button & View Toggles */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por palavras-chave (ex: bullying, lixo, esgoto, drogas, trânsito)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-2 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 font-extrabold text-xs transition-all flex items-center gap-1.5 border border-amber-500/30 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Mapear Problema</span>
            </button>

            {/* View selector buttons */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>

              <button
                onClick={() => setViewMode('scales')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'scales'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Por Escalas</span>
              </button>

              <button
                onClick={() => setViewMode('connections')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'connections'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Conexões</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Categorias Temáticas
            </span>
            {(selectedCategory || selectedScale || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedScale(null);
                  setSearchTerm('');
                }}
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold"
              >
                Limpar Filtros
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === null
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Todas Categorias ({allProblems.length})
            </button>

            {PROBLEM_CATEGORIES.map(cat => {
              const count = allProblems.filter(p => p.categories.includes(cat.id)).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                      : `${cat.bgLight} ${cat.color} ${cat.borderLight} hover:opacity-90`
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-75 font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scale Pills Filter */}
        <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Escalas Territoriais:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedScale(null)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedScale === null
                  ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              #todas
            </button>
            {PROBLEM_SCALES.map(sc => {
              const count = allProblems.filter(p => p.scales.includes(sc.id)).length;
              const isSelected = selectedScale === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScale(isSelected ? null : sc.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title={sc.description}
                >
                  <span>{sc.icon}</span>
                  <span>{sc.label}</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* VIEW MODE 1: GRID OF CARDS */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Exibindo <span className="text-slate-900 dark:text-white font-black">{filteredProblems.length}</span> de {allProblems.length} problemas
            </p>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="text-xs font-extrabold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Mapear Outro Problema</span>
            </button>
          </div>

          {filteredProblems.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
              <Search className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Nenhum problema encontrado</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Tente ajustar os termos de busca, limpar os filtros ou mapear um novo problema para este tema.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedScale(null);
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs"
                >
                  Limpar Todos os Filtros
                </button>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Mapear Novo Problema</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProblems.map(problem => {
                const isChosen = chosenProblemId === problem.id;
                const isCustom = appState.customProblems?.some(cp => cp.id === problem.id);

                return (
                  <div
                    key={problem.id}
                    className={`group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between hover:shadow-xl ${
                      isChosen
                        ? 'border-amber-500 ring-2 ring-amber-500/50 shadow-lg shadow-amber-500/10'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Top Header: ID, Badge & Categories */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black text-xs flex items-center justify-center shrink-0">
                            #{problem.id}
                          </span>

                          {isCustom && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                              Mapeado pela Equipe
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <div className="flex flex-wrap items-center justify-end gap-1">
                            {problem.categories.map(catId => {
                              const cat = getCategoryObj(catId);
                              if (!cat) return null;
                              return (
                                <span
                                  key={catId}
                                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${cat.bgLight} ${cat.color} ${cat.borderLight}`}
                                >
                                  {cat.icon} {cat.name}
                                </span>
                              );
                            })}
                          </div>

                          {isCustom && (
                            <button
                              onClick={() => setProblemToDelete(problem)}
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors ml-1"
                              title="Excluir este card"
                              aria-label="Excluir card"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Problem Title & Question */}
                      <div className="space-y-2">
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {problem.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 italic font-medium leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                          "{problem.question}"
                        </p>
                      </div>

                      {/* Includes snippet */}
                      {problem.includes && problem.includes.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inclui aspectos de:</span>
                          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                            {problem.includes.slice(0, 3).map((item, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-amber-500 font-bold">•</span>
                                <span className="line-clamp-1">{item}</span>
                              </li>
                            ))}
                            {problem.includes.length > 3 && (
                              <li className="text-[10px] text-amber-600 font-bold">
                                + {problem.includes.length - 3} outros aspectos...
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Group questions warning note indicator */}
                      {problem.importantNote && (
                        <div className="text-[11px] bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 p-2.5 rounded-xl border border-rose-200 dark:border-rose-800/60 flex items-start gap-2">
                          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-500" />
                          <span className="line-clamp-2">Nota ética: Foco nas condições sociais e acesso a direitos.</span>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 pt-2">
                        {problem.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveModalProblem(problem)}
                        className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 flex items-center gap-1 transition-colors"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Ver Detalhes</span>
                      </button>

                      <button
                        onClick={() => handleSelectProblem(problem)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isChosen
                            ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {isChosen ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Selecionado</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>Investigar</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: MATRIX BY SCALES */}
      {viewMode === 'scales' && (
        <div className="space-y-6">
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-xs text-amber-900 dark:text-amber-200">
            <strong>Navegação por Escalas Territoriais e Sociais:</strong> As escalas ajudam a enxergar se o problema se manifesta no comportamento do indivíduo, no convívio familiar, no ambiente escolar, na rua/quarteirão, no bairro inteiro ou na gestão pública da cidade.
          </div>

          <div className="space-y-6">
            {PROBLEM_SCALES.map(scale => {
              const problemsInScale = allProblems.filter(p => p.scales.includes(scale.id));
              if (problemsInScale.length === 0) return null;

              return (
                <div key={scale.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{scale.icon}</span>
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                          Escala {scale.label}
                        </h3>
                        <p className="text-xs text-slate-500">{scale.description}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                      {problemsInScale.length} problemas
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {problemsInScale.map(p => (
                      <div
                        key={p.id}
                        onClick={() => setActiveModalProblem(p)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer hover:border-amber-500 ${
                          chosenProblemId === p.id
                            ? 'bg-amber-500/10 border-amber-500'
                            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-black text-amber-600">#{p.id}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{p.tags[0]}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                          {p.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic mt-1 line-clamp-2">
                          "{p.question}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 3: CONNECTIONS & GRAPH */}
      {viewMode === 'connections' && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Network className="w-4 h-4" />
              <span>Mapa de Interconexões dos Desafios</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Os problemas urbanos e educacionais não acontecem isolados. Veja como a desmotivação se conecta ao formato das aulas; como o lixo se conecta aos córregos e à saúde; e como os serviços públicos se relacionam com as oportunidades locais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allProblems.map(p => {
              const related = p.relatedProblemIds
                ? allProblems.filter(rel => p.relatedProblemIds?.includes(rel.id))
                : [];

              return (
                <div key={p.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-black text-amber-500">Nó #{p.id}</span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{p.title}</h3>
                    </div>
                    <button
                      onClick={() => setActiveModalProblem(p)}
                      className="text-xs font-bold text-amber-500 hover:underline shrink-0"
                    >
                      Ver Detalhes
                    </button>
                  </div>

                  {related.length > 0 ? (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                        Conecta-se diretamente com:
                      </span>
                      <div className="space-y-2">
                        {related.map(relP => (
                          <div
                            key={relP.id}
                            onClick={() => setActiveModalProblem(relP)}
                            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-3 cursor-pointer hover:border-amber-500 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <ArrowRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                #{relP.id} {relP.title}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono shrink-0">
                              {relP.scales[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Desafio transversal sistêmico.</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DETAILED PROBLEM MODAL */}
      {activeModalProblem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            
            {/* Close button */}
            <button
              onClick={() => setActiveModalProblem(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-black text-xs">
                  Problema #{activeModalProblem.id}
                </span>

                {activeModalProblem.categories.map(catId => {
                  const cat = getCategoryObj(catId);
                  if (!cat) return null;
                  return (
                    <span
                      key={catId}
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${cat.bgLight} ${cat.color} ${cat.borderLight}`}
                    >
                      {cat.icon} {cat.name}
                    </span>
                  );
                })}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {activeModalProblem.title}
              </h2>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-slate-900 dark:text-amber-100 italic text-sm font-medium">
                "{activeModalProblem.question}"
              </div>
            </div>

            {/* Includes Section */}
            {activeModalProblem.includes && activeModalProblem.includes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  O que este problema abrange e inclui:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {activeModalProblem.includes.map((item, idx) => (
                    <li key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Group Questions if present */}
            {activeModalProblem.groupQuestions && (
              <div className="space-y-2 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> Questões levantadas pelo grupo para investigação:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {activeModalProblem.groupQuestions.map((gq, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">?</span>
                      <span>{gq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Important Ethical / Pedagogy Note */}
            {activeModalProblem.importantNote && (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Princípio de Abordagem Social:</span>
                </div>
                <p className="leading-relaxed">{activeModalProblem.importantNote}</p>
              </div>
            )}

            {/* Hypotheses if present */}
            {activeModalProblem.hypotheses && (
              <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200 text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-cyan-700 dark:text-cyan-300">
                  <Lightbulb className="w-4 h-4" />
                  <span>Hipótese de Solução Levantada:</span>
                </div>
                {activeModalProblem.hypotheses.map((h, i) => (
                  <p key={i} className="leading-relaxed">{h}</p>
                ))}
              </div>
            )}

            {/* Tags & Scales */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Escalas e Tags Associadas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeModalProblem.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveModalProblem(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Fechar
              </button>

              <button
                onClick={() => {
                  handleSelectProblem(activeModalProblem);
                  setActiveModalProblem(null);
                  setActiveWebappTab('jornada');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Escolher este Desafio para Minha Equipe e Ir para a Jornada</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
