import React from 'react';
import { useApp } from '../../context/AppContext';
import { WORKSHOP_METADATA } from '../../data/syllabus';
import { Flame, Sparkles, Clock, Calendar, Users, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentView, setActiveWebappTab, openBrandModal } = useApp();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-amber-50/60 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors">
      
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/30 dark:bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-200/20 dark:bg-orange-950/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white border border-slate-800 text-xs sm:text-sm font-semibold shadow-xs select-none"
          >
            <img
              src="https://i.postimg.cc/RhpFKdKb/LOGO-FORNO-branco-sem-fundo.png"
              alt="O Forno Logo"
              referrerPolicy="no-referrer"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain p-0 shrink-0"
            />
            <span>Fornologia: A arte e ciência de tirar projetos do Forno.</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Inteligência Artificial Aplicada:{' '}
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 bg-clip-text text-transparent">
              do Problema ao Protótipo
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
            {WORKSHOP_METADATA.headlineDescription}
          </p>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Um workshop prático e imersivo para jovens e estudantes de 12 a 17 anos aprenderem a transformar desafios reais em soluções concretas, utilizando a IA Generativa como parceira cognitiva e crítica.
          </p>

          {/* Key Quick Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>{WORKSHOP_METADATA.totalDuration} (4 x 3h)</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>4 Encontros Práticos</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <Users className="w-4 h-4 text-blue-500" />
              <span>Até 20 estudantes (4 equipes)</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Presencial ou Híbrido</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setCurrentView('webapp');
                setActiveWebappTab('dashboard');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-base shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>Acessar o Webapp Operacional</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#jornada"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-base border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              <span>Conhecer a Jornada</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
