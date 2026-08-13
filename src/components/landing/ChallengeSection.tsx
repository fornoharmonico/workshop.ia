import React from 'react';
import { WORKSHOP_METADATA } from '../../data/syllabus';
import { ShieldCheck, Brain, AlertTriangle, CheckCircle, Lock, Eye, HelpCircle } from 'lucide-react';

export const ChallengeSection: React.FC = () => {
  return (
    <section id="desafio" className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            A JUSTIFICATIVA PEDAGÓGICA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Por que ensinar IA além de meros comandos ou ferramentas?
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            A IA Generativa já faz parte do dia a dia dos jovens. Entretanto, o simples acesso não garante uma utilização consciente, ética ou produtiva.
          </p>
        </div>

        {/* Contrast Grid: O Risco do Consumo Passivo vs O Caminho da Parceira Cognitiva */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: O Risco do Consumo Passivo */}
          <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-rose-950 dark:text-rose-200">
                  O Risco do Consumo Passivo
                </h3>
                <p className="text-xs font-medium text-rose-700 dark:text-rose-400">
                  Usar a tecnologia para terceirizar o esforço de pensar
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-rose-900/90 dark:text-rose-200/90">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Informações Falsas:</strong> Respostas bem escritas pela IA podem conter alucinações de fatos com aparência de verdade.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Descontextualização:</strong> Recomendações genéricas podem ignorar a realidade social e local do estudante.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Estereótipos e Vieses:</strong> Produções visuais e textuais podem reproduzir preconceitos automatizados.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Vazamento de Privacidade:</strong> Inserção ingênua de dados pessoais sensíveis em servidores públicos de IA.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: A IA como Parceira Cognitiva */}
          <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-950 dark:text-amber-200">
                  A IA como Parceira Cognitiva
                </h3>
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                  Aprofundar a investigação, validar ideias e ampliar o pensamento
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-amber-900/90 dark:text-amber-200/90">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Formular Boas Perguntas:</strong> Aprender a provocar a IA com questionamentos socráticos e profundos.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Compreender Antes de Responder:</strong> Diagnosticar causas-raiz reais dos problemas antes de propor soluções.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Checagem Crítica:</strong> Analisar, duvidar, verificar dados e revisar documentos gerados.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Responsabilidade Humana:</strong> Assumir a liderança das decisões e proteger estritamente dados pessoais.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <HelpCircle className="w-8 h-8 text-amber-500 mb-3" />
            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
              Desconfiar de Respostas Simples
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Respostas fáceis para problemas comunitários complexos costumam ser superficiais. O workshop desenvolve a capacidade de investigar 'por quê' até a causa-raiz.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Lock className="w-8 h-8 text-blue-500 mb-3" />
            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
              Proteger Dados Pessoais
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Mapeamentos íntimos permanecem privados. Os estudantes aprendem na prática o que nunca deve ser digitado em plataformas de Inteligência Artificial.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Eye className="w-8 h-8 text-emerald-500 mb-3" />
            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
              Criar Valor Real
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              O objetivo final é capacitar os jovens como agentes ativos da transformação social, construindo protótipos reais e testados com a comunidade.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
