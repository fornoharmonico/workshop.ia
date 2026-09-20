import React from 'react';
import { METHOD_TOOLS } from '../../data/syllabus';
import { 
  BrainCircuit, 
  Search, 
  Target, 
  FileText, 
  Cpu, 
  LayoutGrid, 
  Zap, 
  MapPin, 
  Presentation,
  Flame,
  Sparkles,
  Layers,
  HeartHandshake,
  Workflow,
  Compass,
  Calendar,
  FlaskConical,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  BrainCircuit,
  Search,
  Target,
  FileText,
  Cpu,
  LayoutGrid,
  Zap,
  MapPin,
  Presentation,
  Layers,
  Compass,
  Calendar,
  FlaskConical,
  ShieldCheck
};

export const MethodologySection: React.FC = () => {
  // Pilares Autoriais da Fornologia V2.2
  const methodologyPillars = [
    {
      pillar: 'Primazia da Pergunta',
      concept: 'Perguntar antes de responder',
      description: 'A jornada não antecipa decisões. A IA provoca a reflexão através de perguntas socráticas e oferece sugestões somente quando solicitada ou para desbloquear impasses.',
      accent: 'border-amber-400 dark:border-amber-600 bg-amber-50/60 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200'
    },
    {
      pillar: 'Diálogo Socrático',
      concept: 'Forma no sistema, conteúdo humano',
      description: 'Estruturas conceituais complexas tornam-se perguntas simples, progressivas e contextualizadas. O método guia o caminho; a equipe humana fornece a vivência, a escuta e as respostas.',
      accent: 'border-blue-400 dark:border-blue-600 bg-blue-50/60 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200'
    },
    {
      pillar: 'Agência Humana',
      concept: 'A IA sugere; a equipe decide',
      description: 'A IA atua como parceira cognitiva para investigar, comparar e organizar, mas jamais para tomar decisões pela equipe. A soberania autoral pertence aos participantes.',
      accent: 'border-purple-400 dark:border-purple-600 bg-purple-50/60 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200'
    },
    {
      pillar: 'Rigor Invisível & Documento Mestre',
      concept: 'Informação completa sem burocracia',
      description: 'A equipe responde a etapas práticas e reflexivas enquanto o sistema consolida o Documento Mestre do Projeto de forma estruturada e transparente, preservando cada aprendizado.',
      accent: 'border-emerald-400 dark:border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
    }
  ];

  return (
    <section 
      id="metodologia" 
      aria-labelledby="metodologia-title" 
      className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-full border border-amber-300 dark:border-amber-800 text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>METODOLOGIA FORNOLOGIA V2.2</span>
          </div>
          <h2 id="metodologia-title" className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            A arte e ciência de tirar projetos d&apos;O Forno
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            A Fornologia é a metodologia autoral de investigação, criação, planejamento e experimentação de projetos que estrutura toda a experiência do workshop. Ela coloca a <strong>Inteligência Artificial como parceira cognitiva</strong> sob rigorosa <strong>agência humana</strong>, orientada por perguntas, autonomia e ação prática.
          </p>
        </div>

        {/* Fornologia Core Positioning Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-8">
          
          <div className="space-y-3">
            <span className="text-2xs font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Arquitetura Pedagógica & Epistemológica
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Os Quatro Pilares Autoriais da Fornologia
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Em vez de despejar teorias ou nomes de frameworks externos, a Fornologia conduz a experiência através de princípios vivos de reflexão socrática e protagonismo jovem:
            </p>
          </div>

          {/* 4 Pillars Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {methodologyPillars.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2 hover:border-amber-500/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-amber-300">{item.pillar}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* 4 Core Pillars of Pedagogical Action */}
          <div className="pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <span className="text-lg">🎯</span>
              <p className="text-xs font-black text-slate-100">Problema Primeiro</p>
              <p className="text-2xs text-slate-400">Diagnosticar causas antes de saltar para soluções</p>
            </div>
            <div className="space-y-1">
              <span className="text-lg">🤖</span>
              <p className="text-xs font-black text-slate-100">Parceira Cognitiva</p>
              <p className="text-2xs text-slate-400">IA para provocar, revisar e organizar o pensamento</p>
            </div>
            <div className="space-y-1">
              <span className="text-lg">🧪</span>
              <p className="text-xs font-black text-slate-100">Evidência Real</p>
              <p className="text-2xs text-slate-400">Hipótese não é fato: aprender com o mundo real</p>
            </div>
            <div className="space-y-1">
              <span className="text-lg">🎉</span>
              <p className="text-xs font-black text-slate-100">Documento Mestre</p>
              <p className="text-2xs text-slate-400">Síntese unificada e viva da autoria da equipe</p>
            </div>
          </div>

        </div>

        {/* Tools Section Title */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Perguntas que guiam as 12 etapas práticas da oficina
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Cada etapa da Fornologia V2.2 responde a uma pergunta orientadora para transformar reflexão crítica em realização autêntica:
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {METHOD_TOOLS.map((tool, idx) => {
              const IconComponent = ICON_MAP[tool.iconName] || FileText;
              return (
                <div
                  key={tool.id}
                  className="bg-slate-50 dark:bg-slate-800/70 p-6 rounded-2xl border border-slate-300 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 transition-all shadow-xs flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 group-hover:scale-105 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                        {tool.category || 'MOVIMENTO'} • {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-lg font-black text-slate-950 dark:text-white">
                        {tool.name}
                      </h4>
                      <p className="text-xs font-bold text-amber-900 dark:text-amber-300 italic">
                        &ldquo;{tool.orientingQuestion}&rdquo;
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {tool.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
