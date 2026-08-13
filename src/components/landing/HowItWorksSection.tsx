import React from 'react';
import { useApp } from '../../context/AppContext';
import { WORKSHOP_METADATA } from '../../data/syllabus';
import { Users, Puzzle, Code2, Rocket, ArrowRight, MessageSquareQuote } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { setCurrentView, setActiveWebappTab } = useApp();

  return (
    <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            COMO FUNCIONA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Uma jornada de 12 horas dividida em 4 encontros
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            A aprendizagem acontece na prática (Learning by Doing), combinando investigação socrática, colaboração em equipe e prototipação ágil.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-400 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Encontro 1: INVESTIGAR
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Mapeamento de desafios individuais (privados) e coletivos, diagnóstico de causas-raiz com PHD e 5 Porquês, Golden Circle e transição para o Briefing.
            </p>
            <span className="inline-block text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-md">
              Entrega: Diagnóstico, PHD & Golden Circle
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-400 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Encontro 2: DEFINIR E MATERIALIZAR
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Construção do Briefing V0, especificação do PRD V0, definição do MVP e início do desenvolvimento do Protótipo V0.
            </p>
            <span className="inline-block text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50 px-2.5 py-1 rounded-md">
              Entrega: Briefing, PRD, MVP & Protótipo V0
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-400 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Encontro 3: VALIDAR E EVOLUIR
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Análise de feedbacks com usuários reais, Modelo de Sustentabilidade (BMC), planejamento do Roadmap e desenvolvimento do Protótipo V1.
            </p>
            <span className="inline-block text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md">
              Entrega: Feedbacks, BMC, Roadmap & Protótipo V1
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-400 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Encontro 4: COMUNICAR
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Elaboração do roteiro e apresentação do Pitch de 3 minutos, ensaios com cronômetro, apresentação dos projetos e celebração final.
            </p>
            <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md">
              Entrega: Roteiro, Apresentação & Pitch Final
            </span>
          </div>

        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-extrabold tracking-tight">
              Pronto para experimentar a aplicação operacional?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Nossa plataforma interativa permite conduzir e acompanhar as atividades de cada encontro com cronômetros, biblioteca de prompts e salvamento local automático.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('webapp');
              setActiveWebappTab('encontros');
            }}
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-amber-500/20"
          >
            <span>Explorar Encontros no Webapp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
