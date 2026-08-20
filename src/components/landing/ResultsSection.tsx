import React from 'react';
import { 
  Search, 
  BrainCircuit, 
  ShieldCheck, 
  FileCode2, 
  Layers, 
  Presentation,
  CheckCircle2
} from 'lucide-react';

export const ResultsSection: React.FC = () => {
  const resultPillars = [
    {
      icon: Search,
      title: '1. Investigação & Diagnóstico Crítico',
      description: 'Identificar problemas reais da escola ou comunidade, diagnosticar causas-raiz (PHD e 5 Porquês) e diferenciar fatos comprovados de suposições antes de criar soluções.',
      badge: 'Investigação Profunda'
    },
    {
      icon: BrainCircuit,
      title: '2. Engenharia de Prompts & IA Ética',
      description: 'Dominar formulação socrática de prompts, provocar a IA como parceira reflexiva, auditar alucinações de dados e corrigir vieses e distorções algorítmicas.',
      badge: 'Parceira Cognitiva'
    },
    {
      icon: ShieldCheck,
      title: '3. Proteção de Dados & LGPD (Art. 14)',
      description: 'Reconhecer situações de risco à privacidade, proteger dados pessoais sensíveis e exercer cidadania digital segura.',
      badge: 'Conformidade & Ética'
    },
    {
      icon: FileCode2,
      title: '4. Estruturação de Produto (PRD & MVP)',
      description: 'Traduzir ideias abstratas em documentação técnica profissional: Briefing, Documento de Requisitos de Produto (PRD) e especificação de Produto Mínimo Viável (MVP).',
      badge: 'Design de Produto'
    },
    {
      icon: Layers,
      title: '5. Validação Ágil & Modelo de Sustentabilidade',
      description: 'Construir protótipos rápidos (V0 e V1), testar com usuários reais, sintetizar feedbacks no Business Model Canvas (BMC) e traçar roadmaps de evolução.',
      badge: 'Prototipagem Ágil'
    },
    {
      icon: Presentation,
      title: '6. Trabalho em Equipe & Pitch de 3 Minutos',
      description: 'Colaborar produtivamente em equipes multidisciplinares, estruturar narrativas concisas e defender o projeto com segurança para bancas e públicos avaliadores.',
      badge: 'Comunicação & Síntese'
    }
  ];

  return (
    <section 
      id="resultados" 
      aria-labelledby="resultados-title" 
      className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest px-3 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-full border border-amber-300 dark:border-amber-800">
            RESULTADOS ESPERADOS & COMPETÊNCIAS
          </span>
          <h2 id="resultados-title" className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            O que os estudantes conquistam ao final da jornada?
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300">
            Desenvolvimento integrado de pensamento crítico, letramento em IA, gestão de projetos e autonomia criativa.
          </p>
        </div>

        {/* 6 Structured Learning Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {resultPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/70 p-6 rounded-2xl border border-slate-300 dark:border-slate-700/90 hover:border-amber-500 dark:hover:border-amber-400 transition-all shadow-xs flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-950 dark:text-white leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
