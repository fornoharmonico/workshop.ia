/**
 * Institutional Contact Modal V3
 * Master Dossier V3 - RF23 & Anexo 08:
 * Client-only form.
 * Confirmation modal text exact:
 * "Você será direcionado para nosso WhatsApp, continuamos a conversa por lá, ok?"
 * Target URL: https://wa.me/5532998344329 with all fields encoded in text.
 */
import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { useSession } from '../../state/SessionContext.tsx';

export const InstitutionalContactModal: React.FC = () => {
  const { isContactModalOpen, setIsContactModalOpen, addToast } = useSession();

  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  if (!isContactModalOpen) return null;

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setShowConfirmDialog(true);
  };

  const handleProceedWhatsApp = () => {
    const textPayload = `Olá! Gostaria de falar sobre o Workshop Fornologia V3 (Inteligência Artificial Aplicada: do Problema ao Protótipo):

*Nome:* ${name.trim()}
*Organização/Instituição:* ${organization.trim() || 'Não informada'}
*E-mail:* ${email.trim() || 'Não informado'}
*Telefone/WhatsApp:* ${phone.trim() || 'Não informado'}
*Mensagem/Interesse:*
${message.trim()}`;

    const encoded = encodeURIComponent(textPayload);
    const waUrl = `https://wa.me/5532998344329?text=${encoded}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setShowConfirmDialog(false);
    setIsContactModalOpen(false);
    addToast('Redirecionando para o WhatsApp institucional...', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 p-6 sm:p-7 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center space-x-2.5 text-sm font-bold">
            <img
              src="https://i.postimg.cc/RhpFKdKb/LOGO-FORNO-branco-sem-fundo.png"
              alt="Logo d'O Forno"
              width={24}
              height={24}
              loading="lazy"
              decoding="async"
              className="hidden dark:block h-6 w-6 object-contain"
            />
            <img
              src="https://i.postimg.cc/htL0bQZ5/LOGO-FORNO-FUNDO-BRANCO.png"
              alt="Logo d'O Forno"
              width={24}
              height={24}
              loading="lazy"
              decoding="async"
              className="block dark:hidden h-6 w-6 object-contain rounded"
            />
            <span className="text-neutral-100">Falar com a Equipe / Institucional</span>
          </div>
          <button
            onClick={() => {
              setShowConfirmDialog(false);
              setIsContactModalOpen(false);
            }}
            className="text-neutral-400 hover:text-neutral-100 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showConfirmDialog ? (
          <form onSubmit={handleInitialSubmit} className="space-y-3.5 text-xs">
            <p className="text-neutral-400 leading-relaxed">
              Preencha os dados abaixo para tirar dúvidas pedagógicas, solicitar uma turma na sua escola ou propor parcerias.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Seu Nome *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome completo"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2.5 text-neutral-100 placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Instituição / Escola</label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Nome da organização"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2.5 text-neutral-100 placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2.5 text-neutral-100 placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Telefone / WhatsApp</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(DDD) 99999-9999"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2.5 text-neutral-100 placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Mensagem ou Interesse *</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Conte sobre sua turma, desafio ou interesse na oficina..."
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-2.5 text-neutral-100 placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold py-3 text-xs transition-colors shadow-md shadow-emerald-500/20"
              >
                <span>Avançar para Envio</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Dialog with Exact Required Copy */
          <div className="space-y-5 text-center py-2 animate-in fade-in">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mx-auto">
              <MessageCircle className="w-6 h-6" />
            </div>

            {/* Exact required copy from RF23 and Anexo 08 */}
            <p className="text-sm font-semibold text-neutral-100 leading-relaxed max-w-sm mx-auto">
              Você será direcionado para nosso WhatsApp, continuamos a conversa por lá, ok?
            </p>

            <div className="rounded-xl bg-neutral-950 p-3 text-left font-mono text-[11px] text-neutral-400 border border-neutral-800 space-y-1">
              <p className="text-neutral-300 font-bold">Mensagem pré-formatada:</p>
              <p>• Contato: {name} ({email || phone || 'sem telefone'})</p>
              <p>• Instituição: {organization || 'Não informada'}</p>
            </div>

            <div className="flex justify-center space-x-3 pt-2">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold px-4 py-2 text-xs transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleProceedWhatsApp}
                className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold px-5 py-2 text-xs transition-colors shadow-md shadow-emerald-500/20"
              >
                Continuar no WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
