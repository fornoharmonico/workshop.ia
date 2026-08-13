import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WORKSHOP_METADATA } from '../data/syllabus';
import { 
  Flame, 
  Sparkles, 
  LayoutDashboard, 
  BookOpen, 
  FolderKanban, 
  Terminal, 
  Sun, 
  Moon, 
  User, 
  ShieldCheck, 
  Menu, 
  X,
  ExternalLink,
  Presentation
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { state, setCurrentView, setActiveWebappTab, setUserMode, toggleTheme, openBrandModal } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isWebapp = state.currentView === 'webapp';

  const handleLogoClick = () => {
    openBrandModal({
      imageUrl: state.activeTheme === 'dark' 
        ? 'https://i.postimg.cc/RhpFKdKb/LOGO-FORNO-branco-sem-fundo.png'
        : 'https://i.postimg.cc/htL0bQZ5/LOGO-FORNO-FUNDO-BRANCO.png',
      title: 'O FORNO',
      subtitle: 'Fornologia em Planejamento & Gestão',
      ctaUrl: 'https://ofornoapp.netlify.app/',
      ctaLabel: "Confira o que tem n'O Forno!"
    });
  };

  const navToWebappTab = (tab: typeof state.activeWebappTab) => {
    setCurrentView('webapp');
    setActiveWebappTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5">
            {/* Clickable Logo Icon (Opens Brand Modal) */}
            <button
              onClick={handleLogoClick}
              className="w-12 h-12 flex items-center justify-center shrink-0 rounded-xl hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 overflow-hidden cursor-pointer p-0 group"
              title="Clique para ampliar a logo d'O Forno"
              aria-label="Ampliar Logo O Forno"
            >
              {/* Light Mode Logo: Positive on white background without black box */}
              <img
                src="https://i.postimg.cc/htL0bQZ5/LOGO-FORNO-FUNDO-BRANCO.png"
                alt="O Forno Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-0 block dark:hidden"
              />
              {/* Dark Mode Logo: Negative without heavy box */}
              <img
                src="https://i.postimg.cc/RhpFKdKb/LOGO-FORNO-branco-sem-fundo.png"
                alt="O Forno Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-0 hidden dark:block"
              />
            </button>

            {/* Clickable Title (Navigates Home) */}
            <button
              onClick={() => {
                setCurrentView('landing');
                setIsMobileMenuOpen(false);
              }}
              className="text-left group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-0.5"
              title="Ir para a página inicial"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 dark:text-white text-base leading-tight tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  O FORNO
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800">
                  IA
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                IA Aplicada: do Problema ao Protótipo
              </p>
            </button>
          </div>

          {/* Desktop Main Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-sm font-medium">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                state.currentView === 'landing'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Landing Page
            </button>
            <button
              onClick={() => navToWebappTab('jornada')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                state.currentView === 'webapp'
                  ? 'bg-amber-500 text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Webapp Operacional
            </button>
          </div>

          {/* Right Action Tools */}
          <div className="hidden lg:flex items-center gap-3">
            {/* User Mode Selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setUserMode('participante')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                  state.userMode === 'participante'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
                title="Modo focado em preenchimento e atividades do estudante"
              >
                <User className="w-3.5 h-3.5 text-blue-500" />
                Participante
              </button>
              <button
                onClick={() => setUserMode('facilitador')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                  state.userMode === 'facilitador'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
                title="Modo facilitador com cronômetro, modo projeção e checklists"
              >
                <Presentation className="w-3.5 h-3.5 text-amber-200" />
                Facilitador
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Alternar Tema Claro/Escuro"
              aria-label="Alternar Tema Claro/Escuro"
            >
              {state.activeTheme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Webapp Quick CTA */}
            {state.currentView === 'landing' && (
              <button
                onClick={() => navToWebappTab('dashboard')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-sm shadow-md shadow-amber-500/20 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Acessar Webapp
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 rounded-lg"
              aria-label="Alternar tema"
            >
              {state.activeTheme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => {
                setCurrentView('landing');
                setIsMobileMenuOpen(false);
              }}
              className={`py-2 px-3 text-center text-sm font-semibold rounded-lg ${
                state.currentView === 'landing' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Landing Page
            </button>
            <button
              onClick={() => navToWebappTab('dashboard')}
              className={`py-2 px-3 text-center text-sm font-semibold rounded-lg ${
                state.currentView === 'webapp' ? 'bg-amber-500 text-white' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Webapp
            </button>
          </div>

          {state.currentView === 'webapp' && (
            <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 pb-1">
                Navegação Webapp
              </p>
              <button
                onClick={() => navToWebappTab('jornada')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  state.activeWebappTab === 'jornada' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" /> 1. Jornada
              </button>
              <button
                onClick={() => navToWebappTab('atividade')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  state.activeWebappTab === 'atividade' || state.activeWebappTab === 'v2-atividade' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <Flame className="w-4 h-4 text-amber-500" /> 2. Atividade Atual
              </button>
              <button
                onClick={() => navToWebappTab('projeto')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  state.activeWebappTab === 'projeto' || state.activeWebappTab === 'v2-projeto' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <FolderKanban className="w-4 h-4" /> 3. Meu Projeto
              </button>
              <button
                onClick={() => navToWebappTab('recursos')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  state.activeWebappTab === 'recursos' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <BookOpen className="w-4 h-4" /> 4. Recursos
              </button>
              <button
                onClick={() => navToWebappTab('ajuda')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  state.activeWebappTab === 'ajuda' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <Terminal className="w-4 h-4" /> 5. Ajuda
              </button>
            </div>
          )}

          {/* Mode Selector Mobile */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 pb-2">
              Modo de Operação
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setUserMode('participante');
                  setIsMobileMenuOpen(false);
                }}
                className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 border ${
                  state.userMode === 'participante'
                    ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800'
                    : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                }`}
              >
                <User className="w-3.5 h-3.5" /> Modo Participante
              </button>
              <button
                onClick={() => {
                  setUserMode('facilitador');
                  setIsMobileMenuOpen(false);
                }}
                className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 border ${
                  state.userMode === 'facilitador'
                    ? 'bg-amber-500 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                }`}
              >
                <Presentation className="w-3.5 h-3.5" /> Modo Facilitador
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
