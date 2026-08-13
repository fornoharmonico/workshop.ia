import React from 'react';
import { useApp } from '../context/AppContext';
import { WORKSHOP_METADATA } from '../data/syllabus';
import { Flame, Mail, Phone, ExternalLink, Sparkles, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setActiveWebappTab, openBrandModal } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  openBrandModal({
                    imageUrl: 'https://i.postimg.cc/RhpFKdKb/LOGO-FORNO-branco-sem-fundo.png',
                    title: 'O FORNO',
                    subtitle: 'Escola de Planejamento & Gestão Cultural',
                    ctaUrl: 'https://ofornoapp.netlify.app/',
                    ctaLabel: "Confira o que tem n'O Forno!"
                  })
                }
                className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-800 p-0.5 flex items-center justify-center shadow-md shrink-0 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 overflow-hidden cursor-pointer group"
                title="Clique para ampliar a logo d'O Forno"
                aria-label="Ampliar Logo O Forno"
              >
                <img
                  src="https://i.postimg.cc/RhpFKdKb/LOGO-FORNO-branco-sem-fundo.png"
                  alt="O Forno Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-0"
                />
              </button>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  O FORNO | Escola de Planejamento & Gestão Cultural
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  Fornologia: A arte e ciência de tirar projetos do Forno.
                </p>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Workshop Inteligência Artificial Aplicada: do Problema ao Protótipo. Capacitando jovens a criar valor com ética, senso crítico e responsabilidade através da IA Generativa.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Privacidade em primeiro lugar: Dados salvos localmente em seu navegador.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setCurrentView('landing')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Apresentação do Workshop
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('webapp');
                    setActiveWebappTab('dashboard');
                  }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Webapp Operacional
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('webapp');
                    setActiveWebappTab('projeto');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Área do Projeto da Equipe
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('webapp');
                    setActiveWebappTab('prompts');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Biblioteca de Prompts
                </button>
              </li>
            </ul>
          </div>

          {/* Facilitator & Contacts */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Facilitador & Contato
            </h4>
            <div className="space-y-2.5 text-sm">
              <p className="font-semibold text-white">Pedro Lago</p>
              
              <a
                href={`mailto:${WORKSHOP_METADATA.facilitator.email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-500" />
                <span className="truncate">{WORKSHOP_METADATA.facilitator.email}</span>
              </a>

              <a
                href={WORKSHOP_METADATA.facilitator.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>{WORKSHOP_METADATA.facilitator.phone}</span>
              </a>

              <a
                href={WORKSHOP_METADATA.facilitator.fornoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors pt-1"
              >
                <ExternalLink className="w-4 h-4 text-amber-500" />
                <span>ofornoapp.netlify.app</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {year} O Forno. Todos os direitos reservados. Metodologia Fornologia.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Desenvolvido com foco em clareza pedagógica e uso ético da IA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
