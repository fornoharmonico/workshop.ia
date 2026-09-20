import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Bot, 
  MessageSquare, 
  FileText, 
  ClipboardCheck, 
  CheckCheck, 
  PenLine, 
  ArrowRight, 
  Sparkles, 
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface WorkflowStep {
  step: number;
  phaseLabel: string;
  phaseBadgeClass: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    phaseLabel: 'No App',
    phaseBadgeClass: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    icon: Copy,
    title: 'Copiar o prompt',
    description: 'Na etapa atual da Jornada, clique em "Copiar Prompt" para copiar as instruções estruturadas preparadas para a IA.'
  },
  {
    step: 2,
    phaseLabel: 'Na sua IA',
    phaseBadgeClass: 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    icon: Bot,
    title: 'Colar na IA de sua preferência',
    description: 'Abra a ferramenta que sua equipe preferir (ChatGPT, Claude, Gemini, Copilot ou outra) e cole o prompt copiado.'
  },
  {
    step: 3,
    phaseLabel: 'Na sua IA',
    phaseBadgeClass: 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    icon: MessageSquare,
    title: 'Responder às perguntas da IA',
    description: 'Dialogue com a IA respondendo às perguntas sobre seu projeto e contexto até chegar à consolidação do artefato da etapa.'
  },
  {
    step: 4,
    phaseLabel: 'Na sua IA',
    phaseBadgeClass: 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    icon: FileText,
    title: 'Copiar o artefato consolidado',
    description: 'Assim que a IA entregar o documento final estruturado e refinado daquela etapa, copie o texto do artefato gerado.'
  },
  {
    step: 5,
    phaseLabel: 'De volta ao App',
    phaseBadgeClass: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    icon: ClipboardCheck,
    title: 'Colar de volta no app',
    description: 'Retorne à Fornologia e cole o texto no campo de artefato da etapa correspondente para mantê-lo salvo no projeto.'
  },
  {
    step: 6,
    phaseLabel: 'De volta ao App',
    phaseBadgeClass: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    icon: CheckCheck,
    title: 'Revisar o conteúdo',
    description: 'Faça a leitura crítica em equipe, valide os pontos gerados e edite diretamente o texto para garantir a precisão e a autoria.'
  },
  {
    step: 7,
    phaseLabel: 'De volta ao App',
    phaseBadgeClass: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    icon: PenLine,
    title: 'Registrar anotações',
    description: 'Documente aprendizados, reflexões, decisões tomadas ou observações importantes da equipe no campo de anotações.'
  },
  {
    step: 8,
    phaseLabel: 'De volta ao App',
    phaseBadgeClass: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    icon: ArrowRight,
    title: 'Ir para o próximo passo',
    description: 'Com o artefato e anotações registrados, avance para a próxima etapa da Jornada para continuar tirando a ideia do forno!'
  }
];

export const OnboardingModal: React.FC = () => {
  const { isOnboardingModalOpen, closeOnboardingModal, setActiveWebappTab } = useApp();
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);

  useEffect(() => {
    if (isOnboardingModalOpen) {
      const isAlreadySeen = localStorage.getItem('oforno_onboarding_seen') === 'true';
      setDontShowAgain(isAlreadySeen);
    }
  }, [isOnboardingModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOnboardingModalOpen) {
        closeOnboardingModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOnboardingModalOpen, closeOnboardingModal]);

  if (!isOnboardingModalOpen) return null;

  const handleFinish = () => {
    if (dontShowAgain) {
      localStorage.setItem('oforno_onboarding_seen', 'true');
    } else {
      localStorage.removeItem('oforno_onboarding_seen');
    }
    closeOnboardingModal();
    setActiveWebappTab('jornada');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-modal-title"
    >
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-7 text-left overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 id="onboarding-modal-title" className="text-base sm:text-lg font-black text-slate-950 dark:text-white leading-tight">
                Fluxo de Trabalho • Guia Prático
              </h2>
              <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400">
                O ciclo simples de cada etapa para trabalhar com a sua IA de preferência
              </p>
            </div>
          </div>

          <button
            onClick={closeOnboardingModal}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Fechar guia"
            aria-label="Fechar guia"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 8 Workflow Steps Grid (Scrollable) */}
        <div className="py-3 overflow-y-auto flex-1 pr-1 space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {WORKFLOW_STEPS.map((item) => {
              const StepIcon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/90 hover:border-amber-300 dark:hover:border-amber-700/60 transition shadow-2xs flex flex-col justify-between gap-1.5"
                >
                  <div className="space-y-1.5">
                    {/* Top line with step number badge and phase */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                          {item.step}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <StepIcon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-3xs font-extrabold border shrink-0 ${item.phaseBadgeClass}`}>
                        {item.phaseLabel}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-2xs sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Practical Rule of Thumb Callout */}
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-950 dark:text-amber-200 text-2xs flex items-start gap-2.5 mt-2">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="font-bold text-amber-900 dark:text-amber-100 block">
                Regra de Ouro: Autoria &amp; Decisão da Equipe
              </strong>
              <p className="text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
                A IA é uma interlocutora de diálogo que faz perguntas e propõe estruturas. Vocês decidem quais sugestões aceitar, descartar ou aprimorar antes de salvar.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3.5 mt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <label className="flex items-center gap-2 text-2xs sm:text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 border-slate-300 dark:border-slate-700 cursor-pointer"
            />
            <span>Não exibir este guia automaticamente</span>
          </label>

          <button
            type="button"
            onClick={handleFinish}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
          >
            <span>Entendi o fluxo • Começar agora!</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
