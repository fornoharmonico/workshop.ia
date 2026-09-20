import React, { useState, useEffect, useRef } from 'react';
import { FolderKanban, Users, AlertCircle, Check, X, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProjectIdentificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  actionTitle?: string;
}

export const ProjectIdentificationModal: React.FC<Partial<ProjectIdentificationModalProps>> = (props) => {
  const {
    appState,
    isProjectIdentModalOpen,
    closeProjectIdentModal,
    projectIdentActionTitle,
    confirmProjectIdentification
  } = useApp();

  const isOpen = props.isOpen !== undefined ? props.isOpen : isProjectIdentModalOpen;
  const onClose = props.onClose || closeProjectIdentModal;
  const actionTitle = props.actionTitle || projectIdentActionTitle || 'salvar ou exportar o projeto';

  const currentProjectName = appState.projectData?.projectName || '';
  const currentTeamName = appState.projectData?.teamName || '';

  const [projectName, setProjectName] = useState(currentProjectName);
  const [teamName, setTeamName] = useState(currentTeamName);
  const [touched, setTouched] = useState(false);

  const projectInputRef = useRef<HTMLInputElement>(null);
  const teamInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setProjectName(appState.projectData?.projectName || '');
      setTeamName(appState.projectData?.teamName || '');
      setTouched(false);

      // Focus on the first empty field
      setTimeout(() => {
        if (!appState.projectData?.projectName?.trim()) {
          projectInputRef.current?.focus();
        } else if (!appState.projectData?.teamName?.trim()) {
          teamInputRef.current?.focus();
        }
      }, 80);
    }
  }, [isOpen, appState.projectData?.projectName, appState.projectData?.teamName]);

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

  const isProjectNameValid = projectName.trim().length > 0;
  const isTeamNameValid = teamName.trim().length > 0;
  const isFormValid = isProjectNameValid && isTeamNameValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!isFormValid) {
      if (!isProjectNameValid) {
        projectInputRef.current?.focus();
      } else if (!isTeamNameValid) {
        teamInputRef.current?.focus();
      }
      return;
    }

    // Call unified confirm handler
    confirmProjectIdentification(projectName.trim(), teamName.trim());
    if (props.onSuccess) {
      setTimeout(() => {
        props.onSuccess?.();
      }, 60);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ident-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-slate-900 border-2 border-amber-500/60 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-scaleUp">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-5 sm:p-6 text-slate-950 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center shadow-md shrink-0 font-black">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-slate-950/20 px-2.5 py-0.5 rounded-full inline-block mb-1">
                Requisito Mandatório
              </span>
              <h2 id="ident-modal-title" className="text-base sm:text-lg font-black leading-tight">
                Identificação do Projeto
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-950/10 hover:bg-slate-950/25 text-slate-950 transition cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content & Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
          <div className="bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-950 dark:text-amber-200">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Para <strong>{actionTitle}</strong>, é obrigatório preencher o <strong>Nome do Projeto</strong> e <strong>Seu Nome ou Nome da Equipe</strong>. Esses dados serão incluídos no Documento Mestre e no nome de todos os arquivos exportados.
            </p>
          </div>

          <div className="space-y-4">
            {/* Field 1: Nome do Projeto */}
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1.5">
                <span className="flex items-center gap-1.5">
                  <FolderKanban className="w-3.5 h-3.5 text-amber-500" />
                  Nome do Projeto
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                  Obrigatório
                </span>
              </label>
              <input
                ref={projectInputRef}
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Ex: Horta Comunitária Inteligente, EcoGuia..."
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white transition-all focus:outline-none ${
                  touched && !isProjectNameValid
                    ? 'border-red-500 focus:ring-2 focus:ring-red-400 bg-red-50/50 dark:bg-red-950/20'
                    : 'border-slate-300 dark:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30'
                }`}
              />
              {touched && !isProjectNameValid && (
                <p className="text-[11px] text-red-600 dark:text-red-400 font-bold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Por favor, informe o nome do projeto.
                </p>
              )}
            </div>

            {/* Field 2: Seu Nome ou Nome da Equipe */}
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-500" />
                  Seu Nome ou Nome da Equipe
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                  Obrigatório
                </span>
              </label>
              <input
                ref={teamInputRef}
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Ex: Maria Eduarda Silva OU Equipe Alfa..."
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white transition-all focus:outline-none ${
                  touched && !isTeamNameValid
                    ? 'border-red-500 focus:ring-2 focus:ring-red-400 bg-red-50/50 dark:bg-red-950/20'
                    : 'border-slate-300 dark:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30'
                }`}
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Pode ser o seu próprio nome (para projeto individual) ou o nome da sua equipe.
              </p>
              {touched && !isTeamNameValid && (
                <p className="text-[11px] text-red-600 dark:text-red-400 font-bold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Por favor, informe seu nome ou o nome da equipe.
                </p>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Confirmar e Continuar</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
