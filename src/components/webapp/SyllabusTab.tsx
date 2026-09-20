import React from 'react';
import { WORKSHOP_METADATA, METHOD_TOOLS } from '../../data/syllabus';
import { 
  Target, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  Users, 
  Flame, 
  Sparkles,
  Compass,
  Layers,
  FlaskConical,
  Presentation,
  HelpCircle,
  FileText,
  FileCheck2,
  Workflow
} from 'lucide-react';

export const SyllabusTab: React.FC = () => {
  const movements = [
    {
      num: 1,
      name: 'INVESTIGAR E DIRECIONAR',
      subtitle: 'Escolha do problema, recursos e propósito',
      duration: '3h recomendadas (Encontro 1)',
      icon: Compass,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10 border-amber-500/30',
      description: 'Acolhimento, diagnóstico individual confidencial, escolha consciente do problema, separação entre observações, hipóteses e dúvidas, mapa de recursos nas 4 dimensões e propósito.',
      deliverables: [
        'Mapa de Problemas + Problema Escolhido',
        'Diagnóstico do Problema (Fatos, Hipóteses e Causas)',
        'Mapa de Recursos',
        'Propósito e Direção'
      ]
    },
    {
      num: 2,
      name: 'DEFINIR E MATERIALIZAR',
      subtitle: 'Briefing revisado, PRD e protótipo testável',
      duration: '3h recomendadas (Encontro 2)',
      icon: Layers,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10 border-blue-500/30',
      description: 'Estruturação do Briefing inicial, revisão crítica com IA para consolidar o projeto, especificação de requisitos da solução, recorte do MVP e construção do protótipo testável.',
      deliverables: [
        'Briefing Inicial do Projeto',
        'Briefing Revisado e Consolidado',
        'Especificação de Requisitos da Solução',
        'Produto Mínimo Viável (MVP) e Protótipo Testável'
      ]
    },
    {
      num: 3,
      name: 'TESTAR, APRENDER E PLANEJAR',
      subtitle: 'Mundo real, sustentabilidade e roadmap',
      duration: '3h recomendadas (Encontro 3)',
      icon: FlaskConical,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10 border-purple-500/30',
      description: 'Acolhimento de evidências do mundo real (ou marcação honesta de hipóteses a testar), análise de evolução da solução, modelo de sustentabilidade prática e linha do tempo de próximos passos.',
      deliverables: [
        'Evidências do Mundo Real e Aprendizados',
        'Modelo de Sustentabilidade Prática',
        'Linha do Tempo e Próximos Passos'
      ]
    },
    {
      num: 4,
      name: 'COMUNICAR E CELEBRAR',
      subtitle: 'Pitch de 3min, apoio visual, banca e celebração',
      duration: '3h recomendadas (Encontro 4)',
      icon: Presentation,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      description: 'Construção da narrativa oral real da jornada, roteiro do Pitch de 3 minutos, suporte visual de até 6 telas, simulação com a banca e celebração coletiva.',
      deliverables: [
        'Roteiro do Pitch Cronometrado (3 Minutos)',
        'Apresentação Visual de Apoio (Até 6 Telas)',
        'Documento Mestre Consolidado'
      ]
    }
  ];

  const autoralPillars = [
    {
      title: 'Primazia da Pergunta',
      badge: 'Regra de Ouro',
      description: 'A Fornologia pergunta antes de responder. A IA provoca a reflexão para que a decisão surja da própria equipe, sugerindo caminhos somente quando solicitada.',
      color: 'text-amber-400',
      border: 'border-amber-500/30 bg-amber-500/10'
    },
    {
      title: 'Metabolização Socrática',
      badge: 'Arquitetura Pedagógica',
      description: 'Estruturas conceituais complexas são transformadas em perguntas simples, cotidianas e progressivas. A complexidade vive no sistema; o participante fornece o conteúdo autêntico.',
      color: 'text-blue-400',
      border: 'border-blue-500/30 bg-blue-500/10'
    },
    {
      title: 'Agência Humana & Forma no Sistema',
      badge: 'Soberania Decisória',
      description: 'O sistema fornece sequência, campos, critérios e memória; a equipe é autoridade soberana sobre o problema, hipóteses, prioridades, evidências e soluções.',
      color: 'text-purple-400',
      border: 'border-purple-500/30 bg-purple-500/10'
    },
    {
      title: 'Rigor Invisível & Documento Mestre',
      badge: 'Visão Unificada',
      description: 'Informações detalhadas são captadas sem burocracia nem formulários pesados, acumulando-se harmonicamente no Documento Mestre do Projeto que reúne todas as decisões e aprendizados.',
      color: 'text-emerald-400',
      border: 'border-emerald-500/30 bg-emerald-500/10'
    }
  ];

  return (
    <div className="space-y-10 pb-12">
      
      {/* Title & Metadata Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs border border-amber-500/30">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>EMENTA OFICIAL DA FORNOLOGIA</span>
          </div>
          <span className="text-xs font-black px-2.5 py-1 rounded-md bg-amber-500 text-slate-950">
            VERSÃO {WORKSHOP_METADATA.version}
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {WORKSHOP_METADATA.title}
          </h1>
          <p className="text-amber-400 text-sm sm:text-base font-semibold mt-1">
            {WORKSHOP_METADATA.subtitle}
          </p>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed max-w-4xl">
          {WORKSHOP_METADATA.headlineDescription}
        </p>

        {/* Quick Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-700/80 text-xs sm:text-sm">
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <p className="text-slate-400 text-[11px] font-bold uppercase">Carga Horária</p>
            <p className="font-bold text-white mt-0.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              {WORKSHOP_METADATA.totalDuration} (4 encontros flexíveis)
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <p className="text-slate-400 text-[11px] font-bold uppercase">Público-Alvo</p>
            <p className="font-bold text-white mt-0.5 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              {WORKSHOP_METADATA.targetAudience}
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <p className="text-slate-400 text-[11px] font-bold uppercase">Estrutura da Jornada</p>
            <p className="font-bold text-white mt-0.5 flex items-center gap-1.5">
              <Workflow className="w-4 h-4 text-amber-400" />
              12 Etapas Práticas com IA
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <p className="text-slate-400 text-[11px] font-bold uppercase">Metodologia</p>
            <p className="font-bold text-amber-400 mt-0.5">
              Fornologia Autoral V2.2
            </p>
          </div>
        </div>
      </div>

      {/* The 4 Movements of the Journey */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Os Quatro Movimentos da Jornada V2.2</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Cronograma recomendado e flexível de 12 horas (sem amarração computacional rígida)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {movements.map((mov) => {
            const IconComp = mov.icon;
            return (
              <div 
                key={mov.num} 
                className={`p-5 rounded-2xl border ${mov.bg} space-y-3 flex flex-col justify-between`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white font-black text-xs flex items-center justify-center">
                      {mov.num}
                    </span>
                    <span className="text-2xs font-bold text-slate-500 dark:text-slate-400">{mov.duration}</span>
                  </div>

                  <div>
                    <h3 className={`font-black text-sm ${mov.color}`}>{mov.name}</h3>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{mov.subtitle}</p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {mov.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
                  <p className="text-2xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Registros Produzidos:</p>
                  <ul className="text-2xs space-y-1 text-slate-700 dark:text-slate-300 font-semibold">
                    {mov.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                        <span className="truncate">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fornologia Core Pillars Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Pilares Autoriais da Fornologia V2.2</h2>
            <p className="text-xs text-slate-400">A epistemologia que organiza a jornada de ponta a ponta sem jargões externos</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
          A <strong>Fornologia</strong> não existe para fornecer respostas prontas. Ela existe para fazer, na ordem certa, as perguntas necessárias para que pessoas e equipes construam suas próprias respostas, com autonomia e, quando desejado, com apoio da Inteligência Artificial.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {autoralPillars.map((pillar, pIdx) => (
            <div key={pIdx} className={`p-4 rounded-xl border ${pillar.border} space-y-2`}>
              <div className="flex items-center justify-between">
                <h4 className={`text-xs font-black ${pillar.color}`}>{pillar.title}</h4>
                <span className="text-[10px] font-bold text-slate-400">{pillar.badge}</span>
              </div>
              <p className="text-2xs text-slate-300 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pedagogical Principles Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Os 16 Princípios Pedagógicos da Fornologia V2.2</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Regras constitucionais de condução e aprendizagem</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {WORKSHOP_METADATA.corePrinciples.map((principle, idx) => (
            <div 
              key={idx} 
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-black flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{principle.name}</h4>
              </div>
              <p className="text-2xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Objectives & Method Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Objectives */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Objetivo & Resultados de Aprendizagem</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Capacitação prática orientada à agência humana</p>
            </div>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            {WORKSHOP_METADATA.objective}
          </p>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Resultados Esperados ({WORKSHOP_METADATA.expectedResults.length})
            </h3>
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-2">
              {WORKSHOP_METADATA.expectedResults.map((res, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 12 Method Tools / Movements */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">As 12 Ferramentas / Movimentos da Matriz</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Perguntas orientadoras que guiam cada atividade canônica</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-120 overflow-y-auto pr-1">
            {METHOD_TOOLS.map((tool, idx) => (
              <div key={tool.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    {tool.category || 'MOVIMENTO'} • {String(idx + 1).padStart(2, '0')}
                  </span>
                  <Cpu className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{tool.name}</p>
                  <p className="text-[11px] font-semibold text-amber-900 dark:text-amber-200 italic mt-0.5">
                    &ldquo;{tool.orientingQuestion}&rdquo;
                  </p>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50/60 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 text-amber-950 dark:text-amber-200 text-xs font-medium">
            <strong>Proteção e Ética (Art. 14 da LGPD):</strong> Os desafios íntimos dos estudantes são confidenciais e mantidos apenas localmente no navegador. Jamais insira dados pessoais ou sensíveis nos prompts de Inteligência Artificial.
          </div>
        </div>

      </div>

    </div>
  );
};
