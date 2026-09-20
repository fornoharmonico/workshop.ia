import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  User, 
  Menu, 
  X,
  ArrowLeft,
  Presentation,
  ShieldCheck,
  Building2,
  HelpCircle,
  LogOut
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    state, 
    setCurrentView, 
    setActiveWebappTab, 
    setUserMode, 
    toggleTheme, 
    openOnboardingModal,
    isWebappAuthenticated,
    logoutWebapp
  } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isWebapp = state.currentView === 'webapp';

  const navLinks = [
    { label: 'Por Que IA?', href: '#desafio' },
    { label: 'Metodologia', href: '#metodologia' },
    { label: 'A Jornada', href: '#jornada' },
    { label: 'Resultados', href: '#resultados' },
    { label: 'Ética & LGPD', href: '#etica-lgpd' },
    { label: 'Facilitador', href: '#facilitador' },
    { label: 'Dúvidas', href: '#faq' },
  ];

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-amber-600 focus:text-white focus:rounded-xl focus:font-bold focus:shadow-xl focus:outline-none"
      >
        Pular para o conteúdo principal
      </a>

      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* Logo & Brand Identity */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={isWebapp ? '#top' : '#top'}
                onClick={(e) => {
                  if (isWebapp) {
                    e.preventDefault();
                    setCurrentView('landing');
                  }
                }}
                className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl p-1 group"
                title="Ir para o início"
                aria-label="O Forno - Início"
              >
                {/* Logo Image */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0 rounded-xl group-hover:scale-105 transition-transform overflow-hidden">
                  <img
                    src="https://i.postimg.cc/htL0bQZ5/LOGO-FORNO-FUNDO-BRANCO.png"
                    alt="Logo O Forno"
                    width={44}
                    height={44}
                    loading="eager"
                    decoding="async"
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain block dark:hidden"
                  />
                  <img
                    src="https://i.postimg.cc/RhpFKdKb/LOGO-FORNO-branco-sem-fundo.png"
                    alt="Logo O Forno"
                    width={44}
                    height={44}
                    loading="eager"
                    decoding="async"
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain hidden dark:block"
                  />
                </div>

                {/* Brand Name & Workshop Tag */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg leading-tight tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      FORNOLOG
                    </span>
                    <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
                      IA
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden md:block">
                    {isWebapp ? 'Ambiente da Turma' : 'do Problema ao Protótipo'}
                  </span>
                </div>
              </a>
            </div>

            {/* LANDING PAGE MODE NAVIGATION */}
            {!isWebapp ? (
              <>
                {/* Semantic Anchor Navigation for Desktop */}
                <nav aria-label="Navegação Institucional" className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors font-semibold"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                {/* Right Action Tools for Landing */}
                <div className="hidden sm:flex items-center gap-3 shrink-0">
                  {/* Discrete Webapp Entry for Existing Students / Teachers */}
                  <button
                    onClick={() => {
                      setCurrentView('webapp');
                      setActiveWebappTab('jornada');
                      openOnboardingModal();
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5"
                    title="Acessar o aplicativo e ambiente de trabalho da oficina"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Acessar App!</span>
                  </button>

                  {/* Primary Institutional CTA Button */}
                  <a
                    href="#contato"
                    className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md shadow-amber-600/20 hover:shadow-lg hover:shadow-amber-600/30 transition-all active:scale-[0.98] flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Solicitar Proposta</span>
                  </a>
                </div>
              </>
            ) : (
              /* WEBAPP MODE HEADER CONTROLS */
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Back to Presentation / Landing Button */}
                <button
                  id="nav-back-to-landing-btn"
                  onClick={() => setCurrentView('landing')}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Voltar à apresentação institucional do workshop"
                >
                  <ArrowLeft className="w-4 h-4 text-amber-600" />
                  <span className="hidden sm:inline">Apresentação</span>
                </button>

                {/* Controls only visible when authenticated */}
                {isWebappAuthenticated && (
                  <>
                    {/* Secret/Discreet Facilitator indicator when active */}
                    {state.userMode === 'facilitador' && (
                      <button
                        onClick={() => {
                          setUserMode('participante');
                          if (state.activeWebappTab === 'facilitador') {
                            setActiveWebappTab('jornada');
                          }
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-900 dark:text-amber-300 text-xs font-black flex items-center gap-1.5 hover:bg-amber-500/25 transition cursor-pointer"
                        title="Modo Facilitador Ativo — Clique para sair e voltar à visão de participante"
                      >
                        <Presentation className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span className="hidden sm:inline">Modo Facilitador</span>
                        <span className="text-2xs opacity-75 font-mono ml-0.5">✕</span>
                      </button>
                    )}

                    {/* Help Button - Ícone compacto de interrogação */}
                    <button
                      id="tab-ajuda"
                      role="tab"
                      aria-selected={state.activeWebappTab === 'ajuda'}
                      aria-controls="tabpanel-ajuda"
                      onClick={() => {
                        if (state.activeWebappTab === 'ajuda') {
                          setActiveWebappTab('jornada');
                        } else {
                          setActiveWebappTab('ajuda');
                        }
                      }}
                      className={`btn-interactive w-9 h-9 flex items-center justify-center rounded-xl transition-all cursor-pointer border ${
                        state.activeWebappTab === 'ajuda'
                          ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs font-black ring-2 ring-amber-400/40'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                      }`}
                      title="Ajuda e Orientações da Oficina"
                      aria-label="Ajuda e orientações"
                    >
                      <HelpCircle className="w-4 h-4" aria-hidden="true" />
                    </button>

                    {/* Logout button */}
                    <button
                      id="nav-logout-webapp-btn"
                      onClick={() => logoutWebapp()}
                      className="px-2.5 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-800 transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Sair do ambiente (Logout de teste)"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">Sair</span>
                    </button>
                  </>
                )}

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-9 h-9 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors focus:outline-none"
                  title="Alternar Tema Claro/Escuro"
                  aria-label="Alternar Tema Claro/Escuro"
                >
                  {state.activeTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            {!isWebapp && (
              <div className="flex items-center gap-2 lg:hidden">
                <button
                  onClick={toggleTheme}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-300 rounded-xl"
                  aria-label="Alternar tema"
                >
                  {state.activeTheme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
                </button>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {!isWebapp && isMobileMenuOpen && (
          <nav aria-label="Menu Mobile Institucional" className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
              <a
                href="#contato"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-center text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                <span>Solicitar Proposta para Instituição</span>
              </a>

              <button
                onClick={() => {
                  setCurrentView('webapp');
                  setActiveWebappTab('jornada');
                  setIsMobileMenuOpen(false);
                  openOnboardingModal();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-center text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Acessar App!</span>
              </button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};
