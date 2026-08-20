import React from 'react';
import { useApp } from '../../context/AppContext';
import { WORKSHOP_METADATA } from '../../data/syllabus';
import { Flame, Mail, Phone, ExternalLink } from 'lucide-react';

export const FacilitatorSection: React.FC = () => {
  const { openBrandModal } = useApp();
  const f = WORKSHOP_METADATA.facilitator;

  return (
    <section 
      id="facilitador" 
      aria-labelledby="facilitador-title" 
      className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest px-3 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-full border border-amber-300 dark:border-amber-800">
            O FACILITADOR & AUTOR
          </span>
          <h2 id="facilitador-title" className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Conheça quem conduz a jornada
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300">
            A experiência é conduzida pelo criador da metodologia e da tecnologia de planejamento e gestão de projetos.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-300 dark:border-slate-800 shadow-md">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Pedro Lago Profile Photo */}
            <div className="space-y-4 text-center shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden shadow-xl shadow-amber-600/15 border-4 border-white dark:border-slate-800 bg-slate-900 relative group">
                <img
                  src="https://i.postimg.cc/4dCphfs1/PEDRO-LAGO-PERFIL.png"
                  alt="Pedro Lago, fundador d'O Forno e facilitador do workshop"
                  width={160}
                  height={160}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-bold text-xs border border-amber-300 dark:border-amber-800">
                <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Fornologia</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 text-center md:text-left flex-1">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
                  {f.name}
                </h3>
                <p className="text-sm font-bold text-amber-900 dark:text-amber-300 mt-1">
                  {f.role}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {f.bio}
              </p>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm font-semibold">
                <a
                  href={`mailto:${f.email}`}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors flex items-center gap-2 border border-slate-300 dark:border-slate-700"
                >
                  <Mail className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>{f.email}</span>
                </a>

                <a
                  href={f.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors flex items-center gap-2 border border-slate-300 dark:border-slate-700"
                >
                  <Phone className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>{f.phone}</span>
                </a>

                <a
                  href={f.fornoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors flex items-center gap-2 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Acessar O Forno</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
