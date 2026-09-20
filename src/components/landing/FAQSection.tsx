import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Para qual público e faixa etária o workshop é indicado?",
    answer: "O workshop é estruturado especialmente para jovens e estudantes de 12 a 17 anos (Ensino Fundamental II e Ensino Médio). É ideal para implementação em escolas públicas, privadas, organizações do terceiro setor e centros de inovação pedagógica, mediante consentimento parental e adesão pedagógica."
  },
  {
    question: "É necessário saber programar ou ter conhecimentos avançados em tecnologia?",
    answer: "Não. Não é exigido nenhum pré-requisito de programação ou informática avançada. O foco do workshop é metodológico, crítico e focado no uso ético, criativo e consciente de modelos de linguagem e ferramentas de IA Generativa."
  },
  {
    question: "Como o workshop garante a conformidade com a LGPD e a privacidade dos estudantes?",
    answer: "A conformidade com o Art. 14 da LGPD é estruturante: os mapeamentos de desafios individuais são 100% locais (gravados apenas no navegador do estudante, sem envio para servidores externos ou pontuação). Os alunos são rigorosamente orientados a jamais digitar dados pessoais ou sensíveis nos prompts de IA, e disponibilizamos a minuta de autorização parental para a escola."
  },
  {
    question: "Quais são os formatos e a carga horária disponíveis?",
    answer: "O formato padrão possui 12 horas totais, organizadas em 4 encontros práticos de 3 horas. Também oferecemos o formato intensivo (imersão de 2 dias com 6h cada) e programas de capacitação e formação de multiplicadores para o corpo docente."
  },
  {
    question: "Como a turma é organizada durante a oficina?",
    answer: "Trabalhamos com turmas de até 20 estudantes divididos em até 4 equipes (cerca de 5 alunos por equipe). Cada equipe escolhe um desafio coletivo real e percorre toda a jornada: do diagnóstico com causas-raiz até a entrega do protótipo testado e apresentação final em pitch."
  },
  {
    question: "O que a instituição e os estudantes recebem ao final?",
    answer: "A instituição recebe os relatórios e entregas consolidadas (Briefings, PRDs, BMCs e links dos protótipos V0 e V1), além do acesso permanente ao Webapp pedagógico da Fornologia. Os estudantes recebem certificados de conclusão de 12 horas e vivência prática em gestão ágil de projetos."
  }
];

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section 
      id="faq" 
      aria-labelledby="faq-title" 
      className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest px-3 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-full border border-amber-300 dark:border-amber-800">
            PERGUNTAS FREQUENTES
          </span>
          <h2 id="faq-title" className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Dúvidas Frequentes sobre o Workshop
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300">
            Respostas claras sobre público-alvo, segurança, formatos e contratação institucional.
          </p>
        </div>

        {/* Accessible Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const questionId = `faq-question-${idx}`;
            const answerId = `faq-answer-${idx}`;

            return (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-300 dark:border-slate-700/80 overflow-hidden transition-all shadow-xs"
              >
                <button
                  id={questionId}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="w-full min-h-[52px] px-6 py-4 text-left font-bold text-slate-950 dark:text-white text-base sm:text-lg flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-2xl cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div 
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className="px-6 pb-5 pt-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-700/60 font-medium"
                  >
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
