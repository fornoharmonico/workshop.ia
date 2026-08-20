import React from 'react';
import { Brain, AlertTriangle, CheckCircle, Lock, Eye, HelpCircle } from 'lucide-react';

export const ChallengeSection: React.FC = () => {
  return (
    <section 
      id="desafio" 
      aria-labelledby="desafio-title" 
      className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest px-3 py-1 bg-amber-100 dark:bg-amber-950/80 rounded-full border border-amber-300 dark:border-amber-800">
            A JUSTIFICATIVA PEDAGÓGICA
          </span>
          <h2 id="desafio-title" className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Por que ensinar IA além de meros comandos ou ferramentas?
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300">
            A IA Generativa já faz parte da nossa rotina e a utilizamos todos os dias, conscientes ou não. Entretanto, este acesso não garante uma utilização crítica, criativa ou produtiva.
          </p>
        </div>

        {/* Contrast Grid: O Risco do Consumo Passivo vs O Caminho da Parceira Cognitiva */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: O Risco do Consumo Passivo */}
          <div className="bg-rose-50/80 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-900/60 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-200 dark:bg-rose-900/60 text-rose-900 dark:text-rose-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-rose-950 dark:text-rose-100">
                  O Risco do Consumo Passivo
                </h3>
                <p className="text-xs font-semibold text-rose-800 dark:text-rose-300">
                  Usar a tecnologia para terceirizar o esforço de pensar
                </p>
              </div>
            </div>

            <ul className="space-y-3.5 text-sm text-rose-950 dark:text-rose-100 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-700 dark:text-rose-400 font-bold">•</span>
                <span><strong>Informações Falsas:</strong> Respostas bem redigidas pela IA podem conter alucinações de dados com forte aparência de verdade.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-700 dark:text-rose-400 font-bold">•</span>
                <span><strong>Descontextualização:</strong> Recomendações genéricas ignoram a realidade social, escolar e comunitária local do estudante.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-700 dark:text-rose-400 font-bold">•</span>
                <span><strong>Estereótipos e Vieses:</strong> Produções automatizadas podem reproduzir preconceitos e discriminações algorítmicas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-700 dark:text-rose-400 font-bold">•</span>
                <span><strong>Vazamento de Privacidade:</strong> Inserção ingênua de informações pessoais sensíveis em plataformas abertas de IA.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: A IA como Parceira Cognitiva */}
          <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-900/60 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-950 dark:text-amber-100">
                  A IA como Parceira Cognitiva
                </h3>
                <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                  Aprofundar a investigação, validar hipóteses e ampliar o raciocínio
                </p>
              </div>
            </div>

            <ul className="space-y-3.5 text-sm text-amber-950 dark:text-amber-100 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Formular Boas Perguntas:</strong> Provocar a IA com questionamentos socráticos, iterativos e contextualizados.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Compreender Antes de Solucionar:</strong> Diagnosticar causas-raiz reais dos problemas antes de criar protótipos.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Checagem Crítica:</strong> Analisar, duvidar, validar fatos e auditar minuciosamente cada documento gerado.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Responsabilidade & Ética:</strong> Assumir a liderança das decisões e proteger estritamente a privacidade e a LGPD.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-2">
            <HelpCircle className="w-7 h-7 text-amber-700 dark:text-amber-400 mb-1" />
            <h3 className="font-bold text-slate-950 dark:text-white text-base">
              Desconfiar de Respostas Fáceis
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Problemas reais da escola ou do bairro são complexos. O workshop desenvolve a capacidade de investigar o &apos;porquê&apos; até a causa-raiz estrutural.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-2">
            <Lock className="w-7 h-7 text-blue-700 dark:text-blue-400 mb-1" />
            <h3 className="font-bold text-slate-950 dark:text-white text-base">
              Privacidade em Primeiro Lugar
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Todos os dados são armazenados localmente no dispositivo do participante, garantindo total privacidade, proteção dos dados e conformidade com a LGPD.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-2">
            <Eye className="w-7 h-7 text-emerald-700 dark:text-emerald-400 mb-1" />
            <h3 className="font-bold text-slate-950 dark:text-white text-base">
              Impacto & Prototipagem Real
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Os participantes constroem protótipos funcionais, testam com usuários reais e preparam pitches de apresentação de 3 minutos.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
