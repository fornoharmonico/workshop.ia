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
      <section className="relative overflow-hidden border-b border-neutral-800/80 bg-gradient-to-b from-amber-500/5 via-neutral-950 to-neutral-950 dark:from-neutral-900/40 dark:via-neutral-950 dark:to-neutral-950 py-12 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center space-x-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-500 shadow-sm max-w-full">
            <img
              src="https://i.postimg.cc/RhpFKdKb/LOGO-FORNO-branco-sem-fundo.png"
              alt="Logo d'O Forno"
              width={18}
              height={18}
              loading="eager"
              decoding="async"
              className="hidden dark:inline-block h-4 w-4 shrink-0 object-contain"
            />
            <img
              src="https://i.postimg.cc/htL0bQZ5/LOGO-FORNO-FUNDO-BRANCO.png"
              alt="Logo d'O Forno"
              width={18}
              height={18}
              loading="eager"
              decoding="async"
              className="inline-block dark:hidden h-4 w-4 shrink-0 object-contain rounded-full"
            />
            <span className="truncate">
              Fornologia: A arte e ciência de tirar projetos d'O Forno. [V3]
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-neutral-100 tracking-tight leading-tight">
              Inteligência Artificial Aplicada:{' '}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                do Problema ao Protótipo
              </span>
            </h1>

            <p className="text-sm sm:text-lg md:text-xl font-medium sm:font-semibold text-neutral-200 tracking-tight max-w-3xl mx-auto leading-snug">
              Desenvolvimento de soluções para desafios pessoais, estudantis, profissionais, escolares e comunitários
            </p>
          </div>

          <p className="mx-auto max-w-2xl text-xs sm:text-base text-neutral-400 dark:text-neutral-300 leading-relaxed font-normal">
            Desenvolvido para capacitar pessoas a utilizar a IA como parceira no desenvolvimento de um projeto de ponta a ponta, da investigação do problema a construção do protótipo da solução.
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
        </div>
      </section>

      {/* The Central Workflow (O Fluxo de Trabalho) */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">
            Como Funciona na Prática
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100">
            A IA como parceira de pensamento — quem decide sempre é você
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Nada de respostas mágicas ou automáticas: a oficina ensina você a fazer perguntas inteligentes, debater ideias com a inteligência artificial e construir um projeto real, passo a passo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-2.5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-sm font-bold text-neutral-100">
              Copiar o Guia da Etapa
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              O aplicativo reúne com um só clique as perguntas da etapa e o resumo do que você já fez, prontinho para levar para a sua inteligência artificial.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-2.5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-sm font-bold text-neutral-100">
              Conversar com a IA
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Você cola o texto na sua IA (como ChatGPT, Gemini ou Claude). A assistente faz perguntas provocadoras e ajuda sua equipe a enxergar novos caminhos.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-2.5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-sm font-bold text-neutral-100">
              Gerar a Entrega
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Depois que sua equipe toma as decisões, a IA ajuda a redigir o documento oficial da etapa (como o diagnóstico, o mapa de recursos ou o plano de testes).
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-2.5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 font-mono font-bold text-sm">
              04
            </div>
            <h3 className="text-sm font-bold text-neutral-100">
              Salvar e Avançar
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Você cola a entrega de volta aqui no aplicativo. Ele confere se está tudo certinho, salva o progresso no seu aparelho e desbloqueia o próximo desafio.
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Movements */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">
            A Jornada de Aprendizado
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100">
            Quatro Movimentos Práticos
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Uma jornada de 4 encontros práticos inspirada no ciclo criativo da Fornologia: Sonhar → Planejar → Fazer → Celebrar.
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
                  Oficina {mov.meetingNumber} • 3 horas
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">
                  {mov.activityIds.length} atividades
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-100">{mov.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {mov.subtitle.replace('Briefing, PRD e Protótipo V0', 'proposta de projeto, regras de funcionamento e protótipo inicial')}
              </p>
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

      {/* Os 12 passos da Fornologia */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">
            Metodologia Passo a Passo
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight">
            Os 12 passos da Fornologia:
          </h2>
          <p className="text-sm sm:text-base font-semibold text-neutral-200 max-w-2xl mx-auto">
            as perguntas e entregas geradas em cada etapa:
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto italic leading-relaxed">
            "Cada etapa da Fornologia V3 responde a uma pergunta orientadora para transformar reflexão crítica em realização autoral."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              number: '01',
              category: 'Investigação',
              title: 'Escolher o Problema',
              question: 'O que está acontecendo e o que queremos enfrentar?',
              description: 'Levantamento de desafios reais observados na vida pessoal, escolar e comunitária, organizando ideias e escolhendo juntos o foco central.',
            },
            {
              number: '02',
              category: 'Investigação',
              title: 'Diagnóstico do Problema',
              question: 'O que observamos, o que supomos e quais são as causas possíveis?',
              description: 'Separação cuidadosa entre o que é fato comprovado, o que é suposição e o que ainda precisamos descobrir sobre o problema.',
            },
            {
              number: '03',
              category: 'Sistêmica',
              title: 'Mapa de Recursos',
              question: 'Quais recursos temos, precisamos e podemos mobilizar nas 4 dimensões?',
              description: 'Mapeamento do que já existe e do que falta em quatro áreas fundamentais: pessoas e saberes, cultura, meio ambiente e finanças.',
            },
            {
              number: '04',
              category: 'Propósito',
              title: 'Propósito e Direção',
              question: 'Que transformação queremos provocar e qual caminho escolhemos?',
              description: 'Definição do objetivo do projeto, dos valores éticos da equipe e da melhor direção para criar a solução.',
            },
            {
              number: '05',
              category: 'Estruturação',
              title: 'Briefing Inicial (V0)',
              question: 'Como organizamos a primeira visão do projeto sem inventar fatos?',
              description: 'O primeiro resumo oficial do projeto: conecta o problema, os recursos disponíveis, quem será ajudado e o caminho escolhido, sem dados inventados.',
            },
            {
              number: '06',
              category: 'Revisão',
              title: 'Revisão Crítica da Proposta (V1)',
              question: 'O que a crítica aponta e quais decisões assumimos conscientemente?',
              description: 'A equipe debate as perguntas provocadoras da IA e os feedbacks dos colegas, decidindo o que melhorar para deixar o projeto ainda mais forte.',
            },
            {
              number: '07',
              category: 'Especificação',
              title: 'Como a Solução vai Funcionar',
              question: 'Como a solução precisa funcionar e o que é essencial vs. desejável?',
              description: 'Definição clara da experiência de quem vai usar a solução, separando o que é indispensável logo de início do que pode ficar para depois.',
            },
            {
              number: '08',
              category: 'Materialização',
              title: 'Primeiro Protótipo de Teste (MVP)',
              question: 'Qual é a menor versão testável e como realizá-la com qualidade?',
              description: 'Criação da primeira versão prática para colocar à prova (MVP) e plano de realização: quem faz, quando, onde e como a mágica acontece.',
            },
            {
              number: '09',
              category: 'Aprendizagem',
              title: 'Testes, Aprendizados e Evolução',
              question: 'O que aprendemos com evidências reais e o que manter, corrigir ou melhorar?',
              description: 'Hora de testar com pessoas de verdade, ouvir a realidade com empatia e ajustar a solução com base no que funcionou e no que falhou.',
            },
            {
              number: '10',
              category: 'Sustentabilidade',
              title: 'Sustentabilidade e Continuidade',
              question: 'Como a solução gera valor e se sustenta no tempo?',
              description: 'Planejamento dos pilares que mantêm o projeto vivo no futuro: quem apoia, quais parceiros convidar e como gerar impacto contínuo.',
            },
            {
              number: '11',
              category: 'Planejamento',
              title: 'Linha do Tempo e Próximos Passos',
              question: 'O que faremos agora, depois e futuramente em uma sequência de 7 tempos?',
              description: 'Cronograma simples e realista: o que a equipe faz agora, o que faz em seguida e o que fica para o futuro, organizado em 7 passos.',
            },
            {
              number: '12',
              category: 'Comunicação',
              title: 'Apresentação Final (Pitch de 3 Minutos)',
              question: 'Como comunicar a verdade da nossa trajetória em um pitch de 3 minutos?',
              description: 'Roteiro de apresentação rápida e sincera de 3 minutos, com apoio visual de até 6 telas e ensaio em grupo para encantar a banca.',
            },
          ].map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 space-y-3.5 shadow-sm hover:border-amber-500/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2.5">
                  <span className="inline-flex items-center rounded-lg bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-500">
                    {step.category} • {step.number}
                  </span>
                  <span className="font-mono text-xs font-bold text-neutral-500">
                    Passo {step.number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-100 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs font-medium text-amber-500 dark:text-amber-300 italic bg-amber-500/5 p-2.5 rounded-xl border border-amber-500/10 leading-relaxed">
                  "{step.question}"
                </p>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy, Ethics and Transparency */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-neutral-800 bg-gradient-to-tr from-neutral-900 via-neutral-900 to-neutral-950 p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center space-x-2 text-amber-500 font-bold text-xs uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Segurança, Privacidade e Ética (Classificação 13+)</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 max-w-xl">
            Transparência e cuidado total com os seus dados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300">
            <div className="space-y-2">
              <h4 className="font-bold text-neutral-100">Tudo Salvo no seu Aparelho</h4>
              <p className="text-neutral-400 leading-relaxed">
                Este aplicativo funciona 100% no seu navegador (celular ou computador). Seus rascunhos e projetos ficam salvos somente com você, sem nenhum servidor guardando suas ideias em segredo.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-neutral-100">Uso Consciente da IA</h4>
              <p className="text-neutral-400 leading-relaxed">
                Cada turma utiliza uma inteligência artificial autorizada pela escola ou equipe (como ChatGPT ou Claude). Você tem total controle sobre as perguntas que envia.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-neutral-100">Proteção de Dados Pessoais</h4>
              <p className="text-neutral-400 leading-relaxed">
                Nossa metodologia ensina que nunca se deve colocar dados sigilosos (como senhas, documentos ou fotos pessoais) nas conversas com a IA ou nas atividades do projeto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilitator & Author Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
            O FACILITADOR & AUTOR
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100">
            Conheça quem conduz a jornada
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            A experiência é conduzida pelo criador da metodologia e da tecnologia de planejamento e gestão de projetos.
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Photo column */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative group max-w-[260px] sm:max-w-[280px] w-full">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-amber-500/20 to-amber-300/10 blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative overflow-hidden rounded-2xl border border-neutral-700/80 bg-neutral-950 shadow-2xl">
                  <img
                    src="https://i.postimg.cc/4dCphfs1/PEDRO-LAGO-PERFIL.png"
                    alt="Pedro Lago — Criador da Fornologia & Facilitador do Workshop"
                    width={280}
                    height={350}
                    className="w-full h-auto object-cover object-top aspect-[4/5] hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="inline-block rounded-full bg-neutral-900/90 border border-neutral-700/80 px-3 py-1 font-mono text-[10px] text-amber-300 backdrop-blur-sm">
                      Facilitador & Autor
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio column */}
            <div className="md:col-span-8 space-y-4 text-left">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                  Criador da Fornologia & Facilitador do Workshop
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-100 tracking-tight">
                  Pedro Lago
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                <p>
                  Pedro Lago é criador da Fornologia e fundador d'O Forno, escola de planejamento e gestão de projetos. Graduado em Comunicação Social pela Universidade Federal de São João del-Rei (UFSJ).
                </p>
                <p>
                  Poeta, músico, compositor e gestor cultural com mais de uma década de atuação, já idealizou, viabilizou e realizou dezenas de projetos artísticos, educacionais e comunitários com a ajuda da Fornologia: metodologia autoral de investigação, planejamento e criação orientada por perguntas, autonomia e agência humana.
                </p>
              </div>

              {/* Highlights */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded-xl border border-neutral-800 bg-neutral-950/80 px-3 py-1.5 text-neutral-300 font-medium">
                  🎓 Comunicação Social (UFSJ)
                </span>
                <span className="inline-flex items-center space-x-1.5 rounded-xl border border-neutral-800 bg-neutral-950/80 px-3 py-1.5 text-neutral-300 font-medium">
                  <img
                    src="https://i.postimg.cc/RhpFKdKb/LOGO-FORNO-branco-sem-fundo.png"
                    alt="O Forno"
                    width={16}
                    height={16}
                    loading="lazy"
                    decoding="async"
                    className="hidden dark:inline-block h-3.5 w-3.5 object-contain"
                  />
                  <img
                    src="https://i.postimg.cc/htL0bQZ5/LOGO-FORNO-FUNDO-BRANCO.png"
                    alt="O Forno"
                    width={16}
                    height={16}
                    loading="lazy"
                    decoding="async"
                    className="inline-block dark:hidden h-3.5 w-3.5 object-contain rounded"
                  />
                  <span>Fundador d'O Forno</span>
                </span>
                <span className="rounded-xl border border-neutral-800 bg-neutral-950/80 px-3 py-1.5 text-neutral-300 font-medium">
                  ⚡ +10 anos de Gestão de Projetos
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilitator & Contact CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-6">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 sm:p-12 space-y-4">
          <h2 className="text-xl sm:text-3xl font-bold text-neutral-100">
            Que tal levar a Fornologia V3 para sua organização?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
            Fale com nossa equipe, agendar workshops ou obter suporte metodológico.
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
