import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { WORKSHOP_METADATA } from '../data/syllabus';
import { Mail, Phone, ExternalLink, Shield, FileText, Sparkles, Check, Presentation } from 'lucide-react';

export const Footer: React.FC = () => {
  const { state, setCurrentView, openPrivacyModal, setUserMode, setActiveWebappTab } = useApp();
  const year = new Date().getFullYear();

  const [clickCount, setClickCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleVersionSecretClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setClickCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= 3) {
        if (state.userMode === 'facilitador') {
          setUserMode('participante');
          if (state.activeWebappTab === 'facilitador') {
            setActiveWebappTab('jornada');
          }
          setToastMessage('Modo Participante ativado.');
        } else {
          setUserMode('facilitador');
          setActiveWebappTab('facilitador');
          if (state.currentView !== 'webapp') {
            setCurrentView('webapp');
          }
          setToastMessage('Modo Facilitador ativado!');
        }
        setTimeout(() => setToastMessage(null), 3000);
        return 0;
      }
      return nextCount;
    });

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 1500);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Column (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <a
                href="#top"
                onClick={(e) => {
                  setCurrentView('landing');
                }}
                className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 p-1.5 flex items-center justify-center shadow-md shrink-0 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 overflow-hidden group"
                title="Voltar ao início"
                aria-label="O Forno - Início"
              >
                <img
                  src="https://i.postimg.cc/RhpFKdKb/LOGO-FORNO-branco-sem-fundo.png"
                  alt="Logomarca O Forno"
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-0 group-hover:brightness-110 transition-all"
                />
              </a>
              <div>
                <h3 className="text-lg font-black text-white tracking-tight">
                  O FORNO | Fornologia
                </h3>
                <p className="text-xs text-amber-400 font-semibold">
                  A arte e ciência de tirar projetos do Forno.
                </p>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 max-w-md leading-relaxed font-normal">
              Workshop Inteligência Artificial Aplicada: do Problema ao Protótipo. Capacitando pessoas a utilizar a IA de forma ética, crítica, criativa e produtiva.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Privacidade Local-First: Todos os seus dados ficam salvos APENAS no seu dispositivo.</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                <button
                  onClick={openPrivacyModal}
                  className="text-amber-300 hover:text-amber-200 underline font-semibold"
                >
                  Ver Política de Privacidade & Termo LGPD (Art. 14)
                </button>
              </div>
            </div>
          </div>

          {/* Institutional Anchor Navigation (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Institucional & Programa
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#desafio" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Por que ensinar IA?
                </a>
              </li>
              <li>
                <a href="#jornada" className="text-slate-400 hover:text-amber-400 transition-colors">
                  A Jornada dos 4 Encontros
                </a>
              </li>
              <li>
                <a href="#metodologia" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Métodos & Ferramentas
                </a>
              </li>
              <li>
                <a href="#resultados" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Resultados Esperados
                </a>
              </li>
              <li>
                <a href="#etica-lgpd" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  LGPD & Privacidade (12-17 anos)
                </a>
              </li>
              <li>
                <a href="#contato" className="text-amber-400 hover:text-amber-300 font-bold transition-colors">
                  Solicitar Proposta para sua Escola
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Contato
            </h4>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={`mailto:${WORKSHOP_METADATA.facilitator.email}`} className="hover:text-white truncate">
                  {WORKSHOP_METADATA.facilitator.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <a href={WORKSHOP_METADATA.facilitator.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {WORKSHOP_METADATA.facilitator.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={WORKSHOP_METADATA.facilitator.fornoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  ofornoapp.netlify.app
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {year} O Forno — Escola de Planejamento & Gestão Cultural. Metodologia Fornologia.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <button onClick={openPrivacyModal} className="hover:text-amber-300 underline">
              Termos de Privacidade & LGPD
            </button>
            <span>•</span>
            <span>Uso Pedagógico Responsável da IA</span>
            <span>•</span>
            <button
              id="secret-version-trigger"
              onClick={handleVersionSecretClick}
              className="font-mono text-2xs text-slate-600 hover:text-slate-400 transition-colors cursor-pointer select-none px-1.5 py-0.5 rounded focus:outline-none"
              title="Versão do sistema"
              aria-label="Versão do sistema"
            >
              v2.0.2
            </button>
          </div>
        </div>

        {/* Secret Activation Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-amber-300 border border-amber-500/40 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </footer>
  );
};
