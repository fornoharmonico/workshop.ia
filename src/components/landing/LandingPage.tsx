/**
 * Landing Page Component V3
 * Institutional portal introducing the Fornologia V3 workshop:
 * - Value proposition & methodology
 * - The 4 Movements & 11 Activities
 * - Ethics, Age 13+, and Local-first architecture
 * - Facilitator & Contact actions
 */
import React from 'react';
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  HeartHandshake,
  Layers,
  Lock,
  MessageCircle,
  MessageSquare,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import { MOVEMENTS_V3 } from '../../domain/v3/journeyRegistry.ts';
import { SYLLABUS_INFO } from '../../domain/v3/syllabusRegistry.ts';
import { useSession } from '../../state/SessionContext.tsx';

export const LandingPage: React.FC = () => {
  const {
    isAuthenticated,
    setActiveTab,
    setIsAuthModalOpen,
    setIsContactModalOpen,
  } = useSession();

  const handleStartWorkshop = () => {
    if (isAuthenticated) {
      setActiveTab('current');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900/60 via-neutral-950 to-neutral-950 py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center space-x-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fornologia V3 • Workshop Imersivo 13+</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-neutral-100 tracking-tight leading-tight">
            Inteligência Artificial Aplicada:{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              do Problema ao Protótipo
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            Capacite jovens e equipes a investigar desafios reais, estruturar briefings consistentes, construir protótipos funcionais e testar hipóteses usando IA Generativa como parceira cognitiva — sem terceirizar o pensamento crítico.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={handleStartWorkshop}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-7 py-3.5 text-sm transition-all shadow-lg shadow-amber-500/25 hover:scale-[1.02]"
            >
              <span>{isAuthenticated ? 'Continuar Projeto' : 'Acessar Ambiente de Oficina'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-2xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-semibold px-6 py-3.5 text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Falar com a Equipe</span>
            </button>
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-neutral-800/80 text-left">
            <div className="space-y-1">
              <span className="font-mono text-lg font-black text-amber-400">12 Horas</span>
              <p className="text-xs text-neutral-400">4 encontros imersivos de 3h</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-lg font-black text-amber-400">11 Etapas</span>
              <p className="text-xs text-neutral-400">Relação canônica 1:1:1 de artefatos</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-lg font-black text-amber-400">13+ Anos</span>
              <p className="text-xs text-neutral-400">Desenvolvido para jovens e estudantes</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-lg font-black text-amber-400">Local-First</span>
              <p className="text-xs text-neutral-400">Seus dados salvos no seu dispositivo</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Central Workflow (O Fluxo de Trabalho) */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
            Como Funciona na Prática
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100">
            A IA como parceira cognitiva, nunca como autora
          </h2>
          <p className="text-xs text-neutral-400 max-w-xl mx-auto">
            O participante não é mero espectador de prompts: o ciclo da Fornologia garante autonomia e pensamento progressivo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-sm font-bold text-neutral-100">Context Pack</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              O webapp reúne automaticamente os prompts da etapa e o State of Work vigente em um pacote delimitado e limpo.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-sm font-bold text-neutral-100">Mesma Conversa</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Você cola o pacote na sua IA autorizada. A IARA faz perguntas socráticas, desafia premissas e apoia a decisão da equipe.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-sm font-bold text-neutral-100">Artefato + SOW</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              A equipe valida a proposta e a IA emite o artefato canônico acompanhado do SOW atualizado em delimitadores estritos.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 font-mono font-bold text-sm">
              04
            </div>
            <h3 className="text-sm font-bold text-neutral-100">Consolidação</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              O webapp valida o schema estrutural, recalcula o progresso e destrava a próxima etapa do projeto sem burocracia.
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Movements */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
            A Jornada Pedagógica
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100">
            Quatro Movimentos Estruturantes
          </h2>
          <p className="text-xs text-neutral-400 max-w-xl mx-auto">
            Inspirado no arco Sonhar → Planejar → Fazer → Celebrar da Fornologia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOVEMENTS_V3.map((mov) => (
            <div
              key={mov.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
                <span className="text-xs font-mono font-bold text-amber-400">
                  Encontro {mov.meetingNumber} • 180 min
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">
                  {mov.activityIds.length} atividades
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-100">{mov.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{mov.subtitle}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {mov.activityIds.map((act) => (
                  <span
                    key={act}
                    className="rounded bg-neutral-800/80 px-2 py-0.5 font-mono text-[11px] text-neutral-300 border border-neutral-700/60"
                  >
                    {act}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy, Ethics and Transparency */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-neutral-800 bg-gradient-to-tr from-neutral-900 via-neutral-900 to-neutral-950 p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Governança, Privacidade e Ética (13+)</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 max-w-xl">
            Transparência sem falsas promessas de privacidade absoluta
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300">
            <div className="space-y-2">
              <h4 className="font-bold text-neutral-100">Armazenamento Local</h4>
              <p className="text-neutral-400 leading-relaxed">
                Este webapp opera inteiramente no navegador do participante. Não há banco de dados remoto ou servidores salvando seus artefatos silenciosamente.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-neutral-100">IA Externa Autorizada</h4>
              <p className="text-neutral-400 leading-relaxed">
                Cada turma utiliza uma ferramenta de IA pré-aprovada pela escola ou facilitador. O que é enviado segue estritamente os termos daquele provedor.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-neutral-100">Minimização de Dados</h4>
              <p className="text-neutral-400 leading-relaxed">
                A metodologia proíbe a solicitação de CPFs, fotos íntimas, senhas ou dados sensíveis nos testes e nas atividades do projeto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilitator & Contact CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-6">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 sm:p-12 space-y-4">
          <h2 className="text-xl sm:text-3xl font-bold text-neutral-100">
            Pronto para levar a Fornologia V3 para sua escola ou equipe?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
            Converse diretamente com o facilitador responsável para agendar workshops ou obter suporte metodológico.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleStartWorkshop}
              className="rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-3 text-xs transition-colors shadow-lg shadow-amber-500/20"
            >
              Iniciar Workshop Agora
            </button>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="rounded-2xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold px-6 py-3 text-xs transition-colors"
            >
              Falar no WhatsApp Institucional
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
