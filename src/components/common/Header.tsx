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
    <header className="sticky top-0 z-30 border-b border-neutral-800/80 bg-neutral-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('landing')}
            className="group flex items-center space-x-2.5 text-left focus:outline-none"
            title="Ir para a página inicial institucional"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="font-mono text-base font-black">F3</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-neutral-100 text-sm tracking-tight group-hover:text-amber-400 transition-colors">
                  Fornologia V3
                </span>
                <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-300 border border-amber-500/20">
                  13+
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 hidden sm:block">
                Do Problema ao Protótipo
              </p>
            </div>
          </button>
        </div>

        {/* Central Nav Tabs (Exact specified order) */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center space-x-1 rounded-xl bg-neutral-900/90 p-1 border border-neutral-800">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm shadow-amber-500/30'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
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
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Timer Launcher */}
          {isAuthenticated && (
            <button
              onClick={() => openTimer(currentActId, displayMode === 'closed' ? 'restored' : displayMode)}
              className={`flex items-center space-x-1.5 rounded-lg px-2.5 py-1.5 text-xs font-mono border transition-all ${
                isRunning
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-300 animate-pulse'
                  : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }`}
              title="Abrir Cronômetro da Atividade"
            >
              <TimerIcon className="w-3.5 h-3.5" />
              <span>{formatTimerShort(secondsRemaining)}</span>
            </button>
          )}

          {/* Help Action */}
          <button
            onClick={() => setIsHelpModalOpen(true)}
            className="flex items-center space-x-1 rounded-lg p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 transition-colors border border-transparent hover:border-neutral-800"
            title="Ajuda, recuperação de conversa e orientações"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden lg:inline text-xs font-medium">Ajuda</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-lg p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 transition-colors border border-transparent hover:border-neutral-800"
            title={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-amber-500" />}
          </button>

          {/* Fake Login / Auth Button */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span className="text-[11px] text-neutral-400 hidden xl:inline">
                {userName || project.project.teamName || 'Equipe'}
              </span>
              <button
                onClick={logout}
                className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-2.5 py-1.5 text-xs text-neutral-400 hover:text-rose-400 hover:border-rose-900/40 transition-colors"
                title="Sair do modo de prototipação"
              >
                Sair
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center space-x-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-neutral-950 hover:bg-amber-400 transition-colors shadow-sm shadow-amber-500/20"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Acessar Oficina</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Nav Tabs Bar */}
      {isAuthenticated && (
        <div className="flex md:hidden border-t border-neutral-800/80 bg-neutral-950 px-2 py-1.5 justify-around">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-1 px-3 rounded-lg text-[11px] font-medium transition-colors ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {item.icon}
                <span className="mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
