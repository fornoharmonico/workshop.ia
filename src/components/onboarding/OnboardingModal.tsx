/**
 * Onboarding Modal V3
 * Concise 4-step progressive onboarding explaining the autonomous workflow:
 * - Authorized external AI
 * - Single continuous conversation (A mesma conversa durante toda a jornada)
 * - Copy Pack -> Talk/Decide -> Paste Envelope -> Consolidate
 * - Privacy & Minimization (13+)
 */
import React, { useState } from 'react';
import { Bot, Check, ChevronRight, Copy, MessageSquare, ShieldCheck, X } from 'lucide-react';
import { useSession } from '../../state/SessionContext.tsx';
import { usePreferences } from '../../state/PreferencesContext.tsx';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingModalOpen, setIsOnboardingModalOpen } = useSession();
  const { setHasSeenOnboarding } = usePreferences();
  const [step, setStep] = useState(1);

  if (!isOnboardingModalOpen) return null;

  const totalSteps = 4;

  const handleFinish = () => {
    setHasSeenOnboarding(true);
    setIsOnboardingModalOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={handleFinish}
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-100 transition-colors"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center space-x-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                s === step
                  ? 'bg-amber-500'
                  : s < step
                  ? 'bg-amber-500/40'
                  : 'bg-neutral-800'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Bot className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-neutral-100">
              1. Sua IA Externa Autorizada
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed">
              O webapp da Fornologia não possui IA generativa embarcada nem envia dados a servidores remotos. Você usará a ferramenta de IA indicada pelo seu facilitador ou instituição (ex: ChatGPT, Claude, Gemini, Copilot).
            </p>
            <div className="rounded-xl bg-neutral-950 p-3.5 border border-neutral-800 text-xs text-neutral-400 space-y-1">
              <p className="font-semibold text-neutral-200">Recomendação:</p>
              <p>Abra a sua ferramenta de IA em uma aba ao lado ou janela dividida.</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-neutral-100">
              2. Regra de Ouro: A Mesma Conversa
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Inicie um <strong>chat exclusivo</strong> para o seu projeto e <strong>permaneça na mesma conversa durante toda a oficina</strong>.
            </p>
            <div className="rounded-xl bg-emerald-950/30 p-3.5 border border-emerald-800/40 text-xs text-emerald-200 space-y-1">
              <p className="font-bold text-emerald-300">Por que manter a mesma conversa?</p>
              <p>
                A IARA aprende sobre seu projeto e acumula contexto. Não abra uma nova janela de chat a cada etapa.
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Copy className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-neutral-100">
              3. O Fluxo de 4 Passos
            </h2>
            <ol className="text-xs text-neutral-300 space-y-2.5">
              <li className="flex items-start space-x-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px]">1</span>
                <span><strong>Copiar pacote:</strong> No webapp, clique no botão principal para copiar o Context Pack.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px]">2</span>
                <span><strong>Conversar na IA:</strong> Cole na sua conversa com a IARA. Questione, decida e valide.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px]">3</span>
                <span><strong>Colar o resultado:</strong> Copie o bloco final (Artefato + SOW) e cole no campo de retorno do webapp.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px]">4</span>
                <span><strong>Consolidar etapa:</strong> Clique em Consolidar. O app valida o formato e avança automaticamente!</span>
              </li>
            </ol>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-neutral-100">
              4. Privacidade e Cuidado com Dados
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed">
              O webapp armazena seu progresso <strong>exclusivamente na memória deste navegador</strong>. O que você envia à IA externa está sujeito aos termos do provedor autorizado.
            </p>
            <div className="rounded-xl bg-neutral-950 p-3.5 border border-neutral-800 text-xs text-neutral-400 space-y-1">
              <p className="font-semibold text-neutral-200">Minimização:</p>
              <p>Não envie senhas, CPFs, fotos íntimas, endereços residenciais ou dados sensíveis para a IA.</p>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="mt-8 flex items-center justify-between pt-4 border-t border-neutral-800">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-3.5 py-1.5 text-xs text-neutral-400 hover:text-neutral-100 transition-colors"
            >
              Voltar
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center space-x-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition-colors shadow-sm shadow-amber-500/20"
            >
              <span>Próximo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center space-x-1.5 rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold text-neutral-950 hover:bg-emerald-400 transition-colors shadow-sm shadow-emerald-500/20"
            >
              <Check className="w-4 h-4" />
              <span>Começar a Jornada</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
