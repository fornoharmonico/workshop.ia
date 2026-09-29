/**
 * Header Component V3
 * Main navigation preserving canonical tab order:
 * Etapa Atual | Jornada | Meu Projeto | Recursos
 * Plus auxiliary actions (Timer, Help, Theme, Prototyping Auth).
 */
import React from 'react';
import {
  Compass,
  FileText,
  HelpCircle,
  Layers,
  Moon,
  Sparkles,
  Sun,
  Timer as TimerIcon,
  Unlock,
  Wrench,
} from 'lucide-react';
import { MainNavTab, useSession } from '../../state/SessionContext.tsx';
import { usePreferences } from '../../state/PreferencesContext.tsx';
import { useTimer } from '../../state/TimerContext.tsx';
import { useProject } from '../../state/ProjectContext.tsx';
import { getCanonicalCurrentActivity } from '../../services/progressDerived.ts';
import { useDraft } from '../../state/DraftContext.tsx';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isAuthenticated,
    setIsAuthModalOpen,
    setIsHelpModalOpen,
    setIsContactModalOpen,
    userName,
    logout,
  } = useSession();

  const { theme, setTheme } = usePreferences();
  const { openTimer, isRunning, secondsRemaining, displayMode } = useTimer();
  const { project } = useProject();
  const { drafts } = useDraft();

  const currentActId = getCanonicalCurrentActivity(project, drafts);

  const formatTimerShort = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const navItems: { id: MainNavTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'current',
      label: 'Etapa Atual',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'journey',
      label: 'Jornada',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: 'project',
      label: 'Meu Projeto',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'resources',
      label: 'Recursos',
      icon: <Layers className="w-4 h-4" />,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-6 sm:py-2.5">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('landing')}
              className="group flex items-center space-x-2.5 text-left focus:outline-none"
              title="Ir para a página inicial institucional d'O Forno"
            >
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl overflow-hidden bg-amber-500/10 border border-amber-500/30 group-hover:scale-105 transition-transform shadow-sm">
                <img
                  src="https://i.postimg.cc/RhpFKdKb/LOGO-FORNO-branco-sem-fundo.png"
                  alt="Logo d'O Forno"
                  width={36}
                  height={36}
                  loading="eager"
                  decoding="async"
                  className="hidden dark:block h-7 w-7 object-contain"
                />
                <img
                  src="https://i.postimg.cc/htL0bQZ5/LOGO-FORNO-FUNDO-BRANCO.png"
                  alt="Logo d'O Forno"
                  width={36}
                  height={36}
                  loading="eager"
                  decoding="async"
                  className="block dark:hidden h-7 w-7 object-contain rounded-lg"
                />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-neutral-100 text-sm tracking-tight group-hover:text-amber-500 transition-colors">
                    Fornologia
                  </span>
                  <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-500 border border-amber-500/20">
                    V3
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 hidden sm:block">
                  Do Problema ao Protótipo
                </p>
              </div>
            </button>
          </div>

          {/* Central Nav Tabs (Desktop only - exact specified order) */}
          {isAuthenticated && (
            <nav
              aria-label="Navegação Principal"
              className="hidden md:flex items-center space-x-1 rounded-xl bg-neutral-900/90 p-1 border border-neutral-800/80 shadow-sm"
            >
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm shadow-amber-500/25'
                        : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            {/* Quick Timer Launcher */}
            {isAuthenticated && (
              <button
                onClick={() => openTimer(currentActId, displayMode === 'closed' ? 'restored' : displayMode)}
                className={`flex items-center space-x-1.5 rounded-xl px-2.5 py-1.5 text-xs font-mono border transition-all ${
                  isRunning
                    ? 'border-amber-500/40 bg-amber-500/10 text-amber-400 animate-pulse font-bold'
                    : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 shadow-sm'
                }`}
                title="Abrir Cronômetro da Atividade"
              >
                <TimerIcon className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold">{formatTimerShort(secondsRemaining)}</span>
              </button>
            )}

            {/* Help Action */}
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="flex items-center space-x-1 rounded-xl p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 transition-colors border border-transparent hover:border-neutral-800 min-h-[38px] min-w-[38px] justify-center"
              title="Ajuda, recuperação de conversa e orientações"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden lg:inline text-xs font-medium">Ajuda</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center rounded-xl p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 transition-colors border border-neutral-800/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 min-h-[38px] min-w-[38px]"
              title={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
              aria-label={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-amber-600" />
              )}
            </button>

            {/* Fake Login / Auth Button */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-neutral-400 hidden xl:inline">
                  {userName || project.project.teamName || 'Equipe'}
                </span>
                <button
                  onClick={logout}
                  className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-400 hover:text-rose-400 hover:border-rose-900/40 transition-colors shadow-sm font-medium"
                  title="Sair do modo de prototipação"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-1.5 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition-colors shadow-sm shadow-amber-500/20"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Acessar</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Dock (fixed at thumb reach, safe area padded) */}
      {isAuthenticated && (
        <nav
          aria-label="Navegação Inferior Mobile"
          className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden items-center justify-around border-t border-neutral-800/80 bg-neutral-950/95 backdrop-blur-lg px-2 py-1 shadow-2xl safe-area-pb"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl min-h-[48px] min-w-[64px] text-[11px] font-semibold transition-all ${
                  isActive
                    ? 'text-amber-500 font-bold bg-amber-500/10'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <div className="relative">
                  {item.icon}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                  )}
                </div>
                <span className="mt-1 leading-none text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </>
  );
};
