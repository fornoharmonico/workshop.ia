import React from 'react';
import { useApp } from '../../context/AppContext';
import { WORKSHOP_METADATA } from '../../data/syllabus';
import { Flame, Mail, Phone, ExternalLink, GraduationCap, Award, BookOpen } from 'lucide-react';

export const FacilitatorSection: React.FC = () => {
  const { openBrandModal } = useApp();
  const f = WORKSHOP_METADATA.facilitator;

  return (
    <section id="facilitador" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            O FACILITADOR DO WORKSHOP
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Conheça quem conduz a jornada
          </h2>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Pedro Lago Profile Photo */}
            <div className="space-y-4 text-center shrink-0">
              <button
                onClick={() =>
                  openBrandModal({
                    imageUrl: 'https://i.postimg.cc/4dCphfs1/PEDRO-LAGO-PERFIL.png',
                    title: 'Pedro Lago',
                    subtitle: 'Criador & Facilitador — O Forno',
                    ctaUrl: 'https://ofornoapp.netlify.app/',
                    ctaLabel: "Confira o que tem n'O Forno!"
                  })
                }
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden shadow-xl shadow-amber-500/20 border-4 border-white dark:border-slate-800 bg-slate-900 relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 p-0 hover:scale-[1.03] transition-all"
                title="Clique para ampliar a foto de Pedro Lago"
                aria-label="Ampliar foto de Pedro Lago"
              >
                <img
                  src="https://i.postimg.cc/4dCphfs1/PEDRO-LAGO-PERFIL.png"
                  alt="Pedro Lago - O Forno"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105 p-0"
                />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-xs border border-amber-200 dark:border-amber-800">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Fornologia</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 text-center md:text-left flex-1">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {f.name}
                </h3>
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mt-1">
                  {f.role}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {f.bio}
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-semibold">
                <a
                  href={`mailto:${f.email}`}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-amber-500" />
                  <span>{f.email}</span>
                </a>

                <a
                  href={f.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <span>{f.phone}</span>
                </a>

                <a
                  href={f.fornoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition-colors flex items-center gap-2 shadow-sm"
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
