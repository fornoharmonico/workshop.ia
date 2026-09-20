import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Search, 
  Layers, 
  FlaskConical, 
  Presentation, 
  Compass, 
  Target, 
  BrainCircuit, 
  FileCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface MovementData {
  id: number;
  code: string;
  name: string;
  subtitle: string;
  duration: string;
  centralQuestion: string;
  focusDescription: string;
  howAiActs: string;
  humanRole: string;
  keyDeliverables: string[];
  practices: string[];
  icon: React.FC<{ className?: string }>;
  tagColor: string;
  badgeBg: string;
}

export const JourneySection: React.FC = () => {
  const { setCurrentView, setActiveWebappTab, setSelectedEncounterId } = useApp();
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleMovement = (id: number) => {
    setExpandedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const movements: MovementData[] = [
    {
      id: 1,
      code: 'MOVIMENTO 1',
      name: 'INVESTIGAR E DIRECIONAR',
      subtitle: 'Compreender o problema a fundo antes de propor soluções',
      duration: '3 horas (Encontro 1)',
      centralQuestion: 'Qual é o problema real que vale a pena resolver e quais causas estruturais o sustentam?',
      focusDescription: 'Acolhimento da turma, diagnóstico de repertório, mapeamento de desafios individuais e coletivos, separação entre fatos comprovados e suposições, investigação causal com critérios de parada, mapeamento de recursos em 4 dimensões e definição de propósito e direção.',
      howAiActs: 'Parceira socrática que provoca a equipe a duvidar de respostas fáceis, buscar contra-exemplos e organizar informações territoriais.',
      humanRole: 'Escuta atenta, observação do mundo real, escolha consciente do desafio e decisão sobre o que é prioridade.',
      keyDeliverables: [
        'Diagnóstico do Problema & Investigação Causal',
        'Mapa de Recursos',
        'Propósito e Direção'
      ],
      practices: [
        'Aprender fazendo desde o 1º minuto',
        'Investigação sem viés de confirmação',
        'Mapeamento confidencial e ético'
      ],
      icon: Search,
      tagColor: 'text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/60',
      badgeBg: 'bg-amber-600'
    },
    {
      id: 2,
      code: 'MOVIMENTO 2',
      name: 'DEFINIR E MATERIALIZAR',
      subtitle: 'Estruturar o produto e construir a primeira versão testável',
      duration: '3 horas (Encontro 2)',
      centralQuestion: 'Qual é a menor versão da solução capaz de testar nossa hipótese central com usuários reais?',
      focusDescription: 'Transição da investigação para a solução. Consolidação do Briefing inicial (V0) e sua revisão crítica (V1), especificação de requisitos no PRD, recorte do Produto Mínimo Viável (MVP), plano de realização executiva e construção do Protótipo V0 testável.',
      howAiActs: 'Apoio na estruturação técnica da documentação, formatação de requisitos essenciais e elaboração de roteiros neutros de teste.',
      humanRole: 'Definição do escopo essencial (Must Have), escolha do formato do protótipo e criação do artefato físico ou digital.',
      keyDeliverables: [
        'Briefing do Projeto Revisado (V1)',
        'Documento de Requisitos (PRD V0)',
        'Produto Mínimo Viável (MVP) & Plano de Realização',
        'Protótipo Testável V0 & Roteiro Neutro'
      ],
      practices: [
        'Prototipação rápida sem perfeccionismo',
        'Separação entre essencial e supérfluo',
        'Planejamento orientado à execução'
      ],
      icon: Layers,
      tagColor: 'text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/60',
      badgeBg: 'bg-blue-600'
    },
    {
      id: 3,
      code: 'MOVIMENTO 3',
      name: 'VALIDAR E EVOLUIR',
      subtitle: 'Colher evidências no mundo real e aprimorar a solução',
      duration: '3 horas (Encontro 3)',
      centralQuestion: 'O que os fatos e os usuários nos ensinaram sobre as nossas premissas iniciais?',
      focusDescription: 'Realização de testes com usuários reais sem vender a ideia, anotação de comportamentos e falas literais, síntese rigorosa de evidências (hipóteses validadas vs refutadas), modelagem de sustentabilidade prática, priorização no Roadmap e evolução para o Protótipo V1.',
      howAiActs: 'Parceira analítica para categorizar feedbacks, sugerir melhorias de usabilidade e questionar a viabilidade do modelo.',
      humanRole: 'Humildade para aprender com os erros, interpretação humana dos feedbacks e decisão sobre os rumos do produto.',
      keyDeliverables: [
        'Síntese de Evidências Reais de Campo',
        'Modelo de Sustentabilidade',
        'Roadmap de Evolução (Agora, Depois, Futuro)',
        'Protótipo Iterado & Ativo (Versão V1)'
      ],
      practices: [
        'Teste neutro sem induzir respostas',
        'Aprendizagem baseada em fatos concretos',
        'Evolução ágil e contínua do protótipo'
      ],
      icon: FlaskConical,
      tagColor: 'text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/60',
      badgeBg: 'bg-purple-600'
    },
    {
      id: 4,
      code: 'MOVIMENTO 4',
      name: 'COMUNICAR E CELEBRAR',
      subtitle: 'Sintetizar a jornada, defender a proposta e celebrar',
      duration: '3 horas (Encontro 4)',
      centralQuestion: 'Como contar a história real da nossa jornada com clareza, verdade e impacto em 3 minutos?',
      focusDescription: 'Construção da narrativa honesta da equipe (do problema ao aprendizado dos testes), elaboração do roteiro oral do Pitch de 3 minutos, suporte visual de até 6 slides, simulação interativa com banca avaliadora, ensaio cronometrado com acolhimento, apresentação final aberta e celebração coletiva.',
      howAiActs: 'Simulador de banca examinadora que faz perguntas difíceis para preparar a equipe e apoia no polimento da síntese verbal.',
      humanRole: 'Autoria plena da narrativa, presença de palco, articulação oral, trabalho em equipe e celebração da conquista.',
      keyDeliverables: [
        'Roteiro do Pitch Cronometrado (3 Minutos)',
        'Apresentação Visual de Apoio (Até 6 Slides)',
        'Defesa ao Vivo diante da Banca Avaliadora',
        'Celebração Coletiva & Reconhecimento'
      ],
      practices: [
        'Comunicação honesta focada em aprendizados',
        'Síntese rigorosa e respeito ao tempo',
        'Celebração compartilhada das conquistas'
      ],
      icon: Presentation,
      tagColor: 'text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/60',
      badgeBg: 'bg-emerald-600'
    }
  ];

  const handleOpenWebapp = (encounterId: number) => {
    setSelectedEncounterId(encounterId);
    setCurrentView('webapp');
    setActiveWebappTab('jornada');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="jornada" 
      aria-labelledby="jornada-title" 
      className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-full border border-amber-300 dark:border-amber-800 text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>A JORNADA METODOLÓGICA • 4 MOVIMENTOS (12H)</span>
          </div>
          <h2 id="jornada-title" className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Os Quatro Movimentos da Jornada
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Uma progressão pedagógica estruturada que conduz os participantes do diagnóstico profundo de problemas reais até a entrega de soluções testadas e comunicadas com clareza.
          </p>
        </div>

        {/* 4 Movement Cards with Progressive Disclosure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {movements.map((mov) => {
            const IconComp = mov.icon;
            const isExpanded = expandedIds.includes(mov.id);

            return (
              <div
                key={mov.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                  isExpanded
                    ? 'bg-white dark:bg-slate-900 border-amber-500/80 dark:border-amber-400 shadow-md ring-1 ring-amber-500/20'
                    : 'bg-white/90 dark:bg-slate-900/70 border-slate-300 dark:border-slate-800 hover:border-amber-300 hover:bg-white dark:hover:bg-slate-900 shadow-xs'
                }`}
              >
                {/* Primary Card Content (Compact / First Glance) */}
                <div className="p-5 flex flex-col justify-between gap-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm text-white ${mov.badgeBg} shadow-xs`}>
                        {mov.id}
                      </div>
                      <IconComp className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </div>
                    <span className="text-3xs font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80">
                      {mov.keyDeliverables.length} artefatos
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                      {mov.code}
                    </span>
                    <h3 className="text-base font-black text-slate-950 dark:text-white mt-0.5 leading-snug">
                      {mov.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">
                    {mov.subtitle}
                  </p>

                  {/* Toggle Button for Progressive Disclosure */}
                  <button
                    type="button"
                    onClick={() => toggleMovement(mov.id)}
                    aria-expanded={isExpanded}
                    className="w-full pt-3 mt-1 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-extrabold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500 rounded cursor-pointer"
                  >
                    <span>{isExpanded ? 'Ver menos' : 'Ver mais'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 shrink-0 transition-transform" />
                    ) : (
                      <ChevronDown className="w-4 h-4 shrink-0 transition-transform" />
                    )}
                  </button>
                </div>

                {/* Progressive Disclosure Section (Expanded details) */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-0 space-y-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/90">
                    
                    {/* Pergunta Orientadora */}
                    <div className="pt-3.5 space-y-1">
                      <span className="text-3xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1">
                        <Target className="w-3 h-3 text-amber-600" />
                        Pergunta Central
                      </span>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 italic leading-snug">
                        &ldquo;{mov.centralQuestion}&rdquo;
                      </p>
                    </div>

                    {/* Artefatos Gerados */}
                    <div className="space-y-2">
                      <span className="text-3xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        Artefatos Gerados ({mov.keyDeliverables.length})
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {mov.keyDeliverables.map((del, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5 font-medium leading-tight">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Papel da IA */}
                    <div className="space-y-1 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                      <span className="text-3xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1">
                        <BrainCircuit className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                        Papel da IA
                      </span>
                      <p className="text-2xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                        {mov.howAiActs}
                      </p>
                    </div>

                    {/* Direct CTA to Webapp */}
                    <button
                      type="button"
                      onClick={() => handleOpenWebapp(mov.id)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-amber-600 dark:bg-slate-800 dark:hover:bg-amber-600 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer mt-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Abrir no Webapp</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
