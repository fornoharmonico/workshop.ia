/**
 * Context Pack Viewer Modal V3
 * Read-only progressive disclosure viewer of the exact generated Context Pack.
 */
import React from 'react';
import { Copy, X, FileText, Check } from 'lucide-react';
import { useSession } from '../../state/SessionContext.tsx';

interface ContextPackViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  packContent: string;
  activityTitle: string;
}

export const ContextPackViewerModal: React.FC<ContextPackViewerModalProps> = ({
  isOpen,
  onClose,
  packContent,
  activityTitle,
}) => {
  const { addToast } = useSession();
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(packContent);
      setCopied(true);
      addToast('Pacote de contexto copiado com sucesso!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      addToast('Erro ao copiar automaticamente. Selecione e copie o texto.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex flex-col h-[85vh] w-full max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 bg-neutral-950/50">
          <div className="flex items-center space-x-2.5">
            <FileText className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-bold text-neutral-100">
                O que será enviado à IA
              </h2>
              <p className="text-[11px] text-neutral-400">{activityTitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                copied
                  ? 'bg-emerald-500 text-neutral-950'
                  : 'bg-amber-500 text-neutral-950 hover:bg-amber-400'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Pacote'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-100 transition-colors rounded-lg hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Preview */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-xs text-neutral-300 whitespace-pre-wrap selection:bg-amber-500/20 leading-relaxed bg-neutral-950/60">
          {packContent}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800 px-6 py-3 bg-neutral-950/50 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Tamanho: ~{packContent.length} caracteres | Delimitadores canônicos V3</span>
          <button
            onClick={onClose}
            className="text-neutral-300 hover:text-neutral-100 font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
