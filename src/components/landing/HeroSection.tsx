import React from 'react';
import { useApp } from '../../context/AppContext';
import { WORKSHOP_METADATA } from '../../data/syllabus';
import { 
  Building2, 
  BookOpen, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentView, setActiveWebappTab, openOnboardingModal } = useApp();

  return (
    <section 
      id="top" 
      aria-labelledby="hero-main-title" 
      className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28 bg-gradient-to-b from-amber-50/80 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors"
    >
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/30 dark:bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-200/20 dark:bg-orange-950/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Institutional Badge with explicit image dimensions and V1.4.1 versioning */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900 dark:bg-slate-800 text-slate-100 border border-slate-700 text-xs sm:text-sm font-semibold shadow-xs select-none">
            <img
              src="https://i.postimg.cc/RhpFKdKb/LOGO-FORNO-branco-sem-fundo.png"
              alt="Logo O Forno"
              width={24}
              height={24}
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0"
            />
            <span>Fornologia: A arte e ciência de tirar projetos d&apos;O Forno.</span>
            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-black">
              {WORKSHOP_METADATA.version}
            </span>
          </div>

          {/* Main Title with Guaranteed High-Contrast Fallback */}
          <h1 id="hero-main-title" className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.15]">
            Inteligência Artificial Aplicada:{' '}
            <span className="text-amber-700 dark:text-amber-400 font-black inline-block sm:bg-gradient-to-r sm:from-amber-600 sm:via-orange-600 sm:to-amber-700 sm:dark:from-amber-400 sm:dark:via-orange-400 sm:dark:to-amber-300 sm:bg-clip-text sm:text-transparent">
              do Problema ao Protótipo
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
            {WORKSHOP_METADATA.headlineDescription}
          </p>

          {/* Target Audience & Purpose */}
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Um workshop prático e imersivo para pessoas que querem aprender a utilizar a IA como parceira no desenvolvimento de um projeto de ponta a ponta, da investigação do problema a construção do protótipo da solução.
          </p>

          {/* Primary B2B Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {/* Primary B2B Institutional Action */}
            <a
              href="#contato"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-base shadow-xl shadow-amber-600/25 hover:shadow-2xl hover:shadow-amber-600/35 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] group"
            >
              <Building2 className="w-5 h-5 text-amber-200" />
              <span>Leve para sua Escola ou Instituição</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary Action: ACESSAR APP! */}
            <button
              id="hero-acessar-app-btn"
              onClick={() => {
                setCurrentView('webapp');
                setActiveWebappTab('jornada');
                openOnboardingModal();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-black text-base border-2 border-amber-500/60 dark:border-amber-500/50 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>ACESSAR APP!</span>
            </button>
          </div>

          {/* Tertiary Discrete Note for Pedagogical Syllabus */}
          <div className="pt-1">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Quer conhecer a estrutura pedagógica completa?{' '}
              <a
                href="#jornada"
                className="font-bold text-amber-800 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Conhecer os 4 Encontros
              </a>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

