/**
 * Toast Container & Storage Alert Components
 */
import React from 'react';
import { AlertTriangle, CheckCircle2, Download, Info, X } from 'lucide-react';
import { useSession } from '../../state/SessionContext.tsx';
import { useProject } from '../../state/ProjectContext.tsx';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useSession();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between rounded-xl p-3.5 shadow-xl border backdrop-blur-md transition-all animate-in slide-in-from-bottom-2 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200'
              : toast.type === 'error'
              ? 'bg-rose-950/90 border-rose-500/30 text-rose-200'
              : 'bg-neutral-900/90 border-neutral-700/50 text-neutral-200'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-amber-400 shrink-0" />}
            <span className="text-xs font-medium leading-snug">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-3 text-neutral-400 hover:text-neutral-100 p-0.5 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export const StorageAlert: React.FC = () => {
  const { storageError, clearStorageError } = useProject();
  const { setIsBackupModalOpen } = useSession();

  if (!storageError) return null;

  return (
    <div className="bg-rose-950/80 border-b border-rose-800/60 px-4 py-2.5 text-rose-200 text-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>
            <strong>Atenção de Armazenamento:</strong> {storageError}
          </span>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => setIsBackupModalOpen(true)}
            className="flex items-center space-x-1 bg-rose-600 hover:bg-rose-500 text-neutral-950 font-bold px-2.5 py-1 rounded text-[11px] transition-colors"
          >
            <Download className="w-3 h-3" />
            <span>Exportar Backup Agora</span>
          </button>
          <button
            onClick={clearStorageError}
            className="text-rose-400 hover:text-rose-200 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
