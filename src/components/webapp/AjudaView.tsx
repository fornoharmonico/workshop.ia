import React, { useState } from 'react';
import { 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  RotateCcw, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  Play,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AjudaView: React.FC = () => {
  const { setActiveWebappTab, setCurrentPilotActivityId, state } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqItems = [
    {
      question: '1. Não sei o que fazer agora. Por onde começo?',
      answer: 'O sistema sempre indica a atividade recomendada com base no seu progresso. Clique no botão "Ir para a Atividade Atual" abaixo para acessar o workspace da etapa do seu projeto.',
      cta: {
        label: 'Ir para a Atividade Atual',
        action: () => {
          setActiveWebappTab('atividade');
        }
      }
    },
    {
      question: '2. O que devo copiar e enviar para o chat da IA?',
      answer: 'Na tela da Atividade Atual, use o botão principal "COPIAR PROMPT + CONTEXTO". Esse botão gera o prompt correto da atividade com o Context Pack (acumulado de decisões anteriores). Basta colar diretamente no ChatGPT, Claude ou ferramenta de IA que sua equipe estiver utilizando.',
      cta: {
        label: 'Ver Atividade Atual',
        action: () => {
          setActiveWebappTab('atividade');
        }
      }
    },
    {
      question: '3. A IA respondeu algo estranho, inventado ou irrelevante. O que fazer?',
      answer: 'A IA pode falhar ou ter alucinações. Lembre-se: o resultado gerado pela IA é apenas um rascunho de apoio. Sua equipe deve editar, corrigir ou recusar o texto no painel de consolidação antes de confirmar o checkpoint.',
      cta: null
    },
    {
      question: '4. Minha equipe não sabe responder a uma pergunta da atividade. Estamos travados?',
      answer: 'Não! No método O FORNO, "não sabemos ainda" é uma resposta perfeitamente válida. Registre sua dúvida abertamente no texto ou classifique essa afirmação com o status de "HIPÓTESE" ou "AINDA NÃO TESTADO".',
      cta: null
    },
    {
      question: '5. Mudamos de ideia sobre uma decisão anterior (ex: briefing ou problema). E agora?',
      answer: 'Tudo bem mudar de ideia! Basta voltar à atividade correspondente (ex: E2-A01 ou E1-A05), ajustar o texto e consolidar um novo checkpoint. O sistema atualizará a versão do artefato (ex: Briefing V1) e preservará o histórico de evolução.',
      cta: {
        label: 'Ver Histórico no Meu Projeto',
        action: () => {
          setActiveWebappTab('projeto');
        }
      }
    },
    {
      question: '6. Como garantir que meu progresso não seja perdido se eu trocar de computador?',
      answer: 'O webapp salva suas decisões automaticamente neste navegador em tempo real. Se você fechar a aba ou desligar o computador, seus dados permanecerão gravados. Para levar o trabalho da equipe para outro computador (ex: no próximo encontro ou em casa), vá em "4. Recursos" -> "Exportar & Backup", clique em "Baixar JSON" e, no outro aparelho, clique em "Carregar Backup".',
      cta: {
        label: 'Acessar Exportar & Backup',
        action: () => {
          setActiveWebappTab('recursos');
        }
      }
    },
    {
      question: '7. Qual é exatamente o papel da IA e qual é o papel da nossa equipe?',
      answer: 'A IA atua como um copiloto socrático: ela ajuda a organizar ideias, sintetizar discussões, fazer perguntas críticas e propor estruturas. A decisão, a autoria, a escolha do problema e a validação são 100% da sua equipe.',
      cta: null
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 px-4 sm:px-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-2">
        <h1 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          Guia de Ajuda & Orientação Rápida
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Encontre respostas diretas para as dúvidas mais frequentes durante a realização do workshop O FORNO.
        </p>
      </div>

      {/* Main Quick Action Card */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-2xs font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
            AÇÃO RÁPIDA DE SUPORTE
          </span>
          <h2 className="text-base font-black text-slate-900 dark:text-slate-100">
            Dúvidas sobre o próximo passo?
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Retorne instantaneamente ao workspace operacional do projeto.
          </p>
        </div>

        <button
          onClick={() => setActiveWebappTab('atividade')}
          className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>IR PARA A ATIVIDADE ATUAL</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openFaqIndex === index;

          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition shadow-xs space-y-3"
            >
              <div
                onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                className="flex items-center justify-between cursor-pointer select-none gap-4"
              >
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  {item.question}
                </h3>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>

              {isOpen && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p>{item.answer}</p>

                  {item.cta && (
                    <div className="pt-2">
                      <button
                        onClick={item.cta.action}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer"
                      >
                        <span>{item.cta.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Security & Privacy Reminder */}
      <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-2xs text-slate-600 dark:text-slate-400 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800 dark:text-slate-200 block text-xs mb-0.5">
            Lembrete de Privacidade & Ética
          </strong>
          Não insira senhas, nomes completos de alunos, fotos de pessoas sem permissão ou dados sensíveis nos prompts. Toda informação compartilhada com ferramentas de IA deve ser tratada como pública.
        </div>
      </div>

    </div>
  );
};
