/**
 * Fake Login Modal V3
 * Prototyping barrier with password 'segredo'.
 * Invariant: Explicit disclaimer that this is a workshop prototype gate, not secure cloud authentication.
 */
import React, { useState } from 'react';
import { Lock, ShieldAlert, X } from 'lucide-react';
import { useSession } from '../../state/SessionContext.tsx';

export const FakeLoginModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useSession();
  const [userNameInput, setUserNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim().toLowerCase() === 'segredo') {
      login(userNameInput.trim() || 'Equipe Participante');
      setPasswordInput('');
      setErrorMessage(null);
    } else {
      setErrorMessage('Senha incorreta. A senha provisória de prototipação é "segredo".');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-neutral-100">Acesso à Oficina</h2>
            <p className="text-xs text-neutral-400">Ambiente operacional da jornada Fornologia V3</p>
          </div>
        </div>

        {/* Prototyping Disclaimer */}
        <div className="mb-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-200/90 flex items-start space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Aviso de Prototipação:</strong> Esta é uma barreira pedagógica provisória. Seus dados ficam salvos localmente neste navegador. A senha da oficina é <code className="bg-amber-400/20 px-1 py-0.5 rounded font-mono font-bold text-amber-300">segredo</code>.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Nome do Participante ou Equipe (opcional)
            </label>
            <input
              type="text"
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
              placeholder="Ex: Equipe Alfa / Sofia"
              className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Senha de Prototipação
            </label>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Digite: segredo"
              autoFocus
              className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
            />
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-400 font-medium bg-rose-950/40 p-2.5 rounded-lg border border-rose-800/40">
              {errorMessage}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 py-2.5 text-xs font-bold text-neutral-950 hover:from-amber-400 hover:to-amber-300 transition-all shadow-md shadow-amber-500/20"
            >
              Entrar na Oficina
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
