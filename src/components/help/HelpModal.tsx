/**
 * Help Modal Component V3
 * Master Dossier V3 - RF22 & Anexo 08:
 * Explains workflow, single continuous AI session, troubleshooting,
 * exceptional chat recovery route (re-injects Prompt Zero + current SOW/context),
 * and institutional team support via WhatsApp.
 */
import React, { useState } from 'react';
import {
  AlertTriangle,
  Bot,
  Check,
  Copy,
  ExternalLink,
  HelpCircle,
  LifeBuoy,
  MessageCircle,
  MessageSquare,
  RefreshCw,
  Shield,
  X,
} from 'lucide-react';
import { useSession } from '../../state/SessionContext.tsx';
import { useProject } from '../../state/ProjectContext.tsx';
import { useDraft } from '../../state/DraftContext.tsx';
import { getCanonicalCurrentActivity } from '../../services/progressDerived.ts';
import { buildContextPack } from '../../services/contextPackBuilder.ts';

export const HelpModal: React.FC = () => {
  const {
    isHelpModalOpen,
    setIsHelpModalOpen,
    setIsContactModalOpen,
    addToast,
  } = useSession();

  const { project } = useProject();
  const { drafts } = useDraft();

  const [isRecoveryActive, setIsRecoveryActive] = useState(false);
  const [copiedRecovery, setCopiedRecovery] = useState(false);

  if (!isHelpModalOpen) return null;

  const currentActId = getCanonicalCurrentActivity(project, drafts);

  // Recovery pack: injects Prompt Zero even on A02..A11!
  const recoveryPack = buildContextPack(currentActId, 'CREATE', project, {
    includeCoreForRecovery: true,
  });

  const handleCopyRecovery = async () => {
    try {
      await navigator.clipboard.writeText(recoveryPack);
      setCopiedRecovery(true);
      addToast('Pacote de recuperação copiado com Prompt Zero e SOW vigente!', 'success');
      setTimeout(() => setCopiedRecovery(false), 3000);
    } catch {
      addToast('Falha ao copiar automaticamente.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex flex-col max-h-[85vh] w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 bg-neutral-950/60">
          <div className="flex items-center space-x-2.5">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold text-neutral-100">Ajuda e Orientações</h2>
              <p className="text-xs text-neutral-400">Guia de suporte da Fornologia V3</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsRecoveryActive(false);
              setIsHelpModalOpen(false);
            }}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 transition-colors rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-neutral-300">
          {/* Main principle */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-2">
            <h3 className="font-bold text-neutral-100 text-sm flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>A Regra da Mesma Conversa</span>
            </h3>
            <p className="leading-relaxed text-neutral-400">
              O fluxo normal do workshop exige usar a <strong>mesma conversa na sua IA durante toda a jornada</strong>. Não abra uma nova janela a cada etapa. Assim, a IARA preserva a memória do seu projeto e compreende as decisões já tomadas.
            </p>
          </div>

          {/* Troubleshoot delimiters */}
          <div className="space-y-2">
            <h3 className="font-bold text-neutral-100 uppercase tracking-wider text-[11px]">
              O que fazer se der erro ao consolidar?
            </h3>
            <p className="leading-relaxed text-neutral-400">
              Se o webapp avisar que delimitadores estão ausentes ou que o documento está incompleto:
            </p>
            <div className="rounded-xl bg-neutral-950 p-3.5 border border-neutral-800 space-y-1 font-mono text-[11px] text-amber-300">
              <p>Envie esta mensagem rápida para sua IA:</p>
              <p className="text-neutral-200 italic">
                "Por favor, emita novamente o resultado final completo da etapa no formato exigido, incluindo os blocos com os delimitadores exatos &lt;&lt;&lt; ARTEFATO ... &gt;&gt;&gt; e &lt;&lt;&lt; STATE OF WORK — SOW &gt;&gt;&gt;."
              </p>
            </div>
          </div>

          {/* Exceptional Recovery Section */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-amber-300 font-bold">
                <RefreshCw className="w-4 h-4 text-amber-400" />
                <span>Minha conversa com a IA não está mais disponível</span>
              </div>
              <button
                onClick={() => setIsRecoveryActive(!isRecoveryActive)}
                className="text-[11px] text-amber-400 hover:text-amber-300 underline font-semibold"
              >
                {isRecoveryActive ? 'Ocultar recuperação' : 'Ver rota de recuperação'}
              </button>
            </div>

            <p className="text-neutral-400 text-[11px] leading-relaxed">
              Esta é uma <strong>rota excepcional</strong> caso sua conversa anterior tenha sido fechada, perdida ou apagada por engano. Ela gera um pacote especial com o Prompt Zero reinjetado junto com o SOW vigente da atividade <strong>{currentActId}</strong>.
            </p>

            {isRecoveryActive && (
              <div className="mt-3 pt-3 border-t border-amber-500/20 space-y-3">
                <button
                  onClick={handleCopyRecovery}
                  className={`w-full flex items-center justify-center space-x-2 rounded-xl py-2.5 text-xs font-bold transition-all shadow-sm ${
                    copiedRecovery
                      ? 'bg-emerald-500 text-neutral-950'
                      : 'bg-amber-500 text-neutral-950 hover:bg-amber-400'
                  }`}
                >
                  {copiedRecovery ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>
                    {copiedRecovery
                      ? 'Pacote de Recuperação Copiado!'
                      : `Copiar Pacote de Recuperação para ${currentActId}`}
                  </span>
                </button>
                <p className="text-[10px] text-neutral-500 text-center font-mono">
                  Abra uma nova janela de chat, cole este pacote para reinicializar a IARA com seu contexto autoritativo vigente.
                </p>
              </div>
            )}
          </div>

          {/* Privacy reminder */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-2">
            <h3 className="font-bold text-neutral-100 text-xs flex items-center space-x-2">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>Privacidade Local & IA Externa</span>
            </h3>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              O webapp salva seu projeto localmente no navegador (sem banco remoto). O que você copia para a IA externa segue os termos e políticas do provedor autorizado pela sua escola/instituição. Não compartilhe senhas, dados sensíveis ou informações pessoais desnecessárias.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800 px-6 py-4 bg-neutral-950/60 flex items-center justify-between">
          <button
            onClick={() => {
              setIsHelpModalOpen(false);
              setIsContactModalOpen(true);
            }}
            className="flex items-center space-x-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com a equipe / Reportar problema</span>
          </button>

          <button
            onClick={() => setIsHelpModalOpen(false)}
            className="rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold px-4 py-2 text-xs transition-colors"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};
