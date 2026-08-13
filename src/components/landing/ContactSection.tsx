import React from 'react';
import { WORKSHOP_METADATA } from '../../data/syllabus';
import { Mail, Phone, ExternalLink, Flame, MessageSquare, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const f = WORKSHOP_METADATA.facilitator;

  return (
    <section id="contato" className="py-16 lg:py-24 bg-slate-900 text-white transition-colors relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-90" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-4xl mx-auto bg-slate-800/80 rounded-3xl p-8 sm:p-12 border border-slate-700 shadow-2xl backdrop-blur-sm space-y-8 text-center sm:text-left">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>LEVE O WORKSHOP PARA SUA INSTITUIÇÃO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Pronto para transformar problemas em protótipos com IA?
            </h2>
            <p className="text-base text-slate-300">
              Entre em contato direto com a equipe de facilitação para agendar turmas, adaptar formatos ou tirar dúvidas pedagógicas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-700/80">
            
            <a
              href={`mailto:${f.email}`}
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700/80 hover:border-amber-500 transition-all flex flex-col items-center sm:items-start space-y-2 group"
            >
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">E-mail</span>
              <span className="text-sm font-semibold text-white break-all">{f.email}</span>
            </a>

            <a
              href={f.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700/80 hover:border-emerald-500 transition-all flex flex-col items-center sm:items-start space-y-2 group"
            >
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp / Telefone</span>
              <span className="text-sm font-semibold text-white">{f.phone}</span>
            </a>

            <a
              href={f.fornoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700/80 hover:border-amber-500 transition-all flex flex-col items-center sm:items-start space-y-2 group"
            >
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                <ExternalLink className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plataforma</span>
              <span className="text-sm font-semibold text-white">ofornoapp.netlify.app</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
