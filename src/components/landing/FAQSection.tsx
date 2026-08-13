import React, { useState } from 'react';
import { FAQItem } from '../../types/workshop';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQS: FAQItem[] = [
  {
    question: "Para quem é indicado este workshop?",
    answer: "O workshop é estruturado especialmente para jovens e estudantes do Ensino Médio. Pode ser realizado em escolas públicas, privadas, organizações sociais ou comunidades."
  },
  {
    question: "É necessário saber programar ou ter conhecimentos prévios em tecnologia?",
    answer: "Não! Não é exigido nenhum conhecimento prévio de programação. O foco é metodológico, crítico e de uso consciente das ferramentas de IA Generativa."
  },
  {
    question: "Quantos encontros e qual é a carga horária total?",
    answer: "O workshop possui carga horária de 12 horas divididas em quatro encontros práticos de 3 horas cada. A modalidade pode ser presencial ou híbrida."
  },
  {
    question: "Como os estudantes trabalharão durante as atividades?",
    answer: "Os estudantes se organizam em até 4 equipes (de até 5 participantes cada). Cada equipe desenvolve um projeto coletivo do diagnóstico ao protótipo."
  },
  {
    question: "Como o workshop lida com a privacidade dos dados dos estudantes?",
    answer: "A privacidade é um pilar essencial. O mapeamento de desafios individuais é totalmente íntimo e privado (não é recolhido nem avaliado). Reforçamos o pacto de não inserir dados pessoais sensíveis nas plataformas de IA."
  },
  {
    question: "O que será entregue ao final do workshop?",
    answer: "Cada equipe entregará uma documentação completa (Briefing, PRD, BMC, MVP), um protótipo testável (V1) e apresentará um Pitch de 3 minutos sobre a trajetória e aprendizados do projeto."
  }
];

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            PERGUNTAS FREQUENTES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dúvidas Frequentes sobre o Workshop
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-amber-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-700/50">
                    {faq.answer}
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
