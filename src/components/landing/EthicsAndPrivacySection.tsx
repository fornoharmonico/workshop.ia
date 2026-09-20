import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, FileText, CheckCircle } from 'lucide-react';

export const EthicsAndPrivacySection: React.FC = () => {
  const { openPrivacyModal } = useApp();

  return (
    <section 
      id="etica-lgpd" 
      aria-labelledby="etica-lgpd-title" 
      className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-widest px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 rounded-full border border-emerald-300 dark:border-emerald-800">
            ÉTICA, PRIVACIDADE & CONFORMIDADE LEGAL
          </span>
          <h2 id="etica-lgpd-title" className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Salvaguarda de Dados & LGPD
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Uma abordagem pedagógica responsável, com total conformidade ao Art. 14 da Lei Geral de Proteção de Dados (LGPD) e respeito à privacidade dos estudantes.
          </p>
        </div>

        {/* Consolidated Information Block: 3 Pillars of Data Safety */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-300 dark:border-slate-800 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
            
            {/* Pillar 1: LGPD Art. 14 */}
            <div className="space-y-2 pt-4 first:pt-0 md:pt-0 md:px-4 md:first:pl-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950 dark:text-white">
                    Conformidade LGPD
                  </h3>
                  <p className="text-2xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase">
                    Art. 14 • Melhor interesse
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Prioridade integral aos direitos do estudante, garantindo salvaguarda de dados pessoais e autorização formal dos responsáveis legais.
              </p>
            </div>

            {/* Pillar 2: Privacidade 100% Local */}
            <div className="space-y-2 pt-4 md:pt-0 md:px-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950 dark:text-white">
                    Privacidade 100% Local
                  </h3>
                  <p className="text-2xs font-extrabold text-blue-700 dark:text-blue-400 uppercase">
                    Sem servidores externos
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Reflexões e registros pessoais ficam salvos estritamente no dispositivo do aluno (<code className="text-[11px] bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">localStorage</code>), sem coleta ou transmissão externa.
              </p>
            </div>

            {/* Pillar 3: Uso Seguro de IA */}
            <div className="space-y-2 pt-4 md:pt-0 md:px-4 md:last:pr-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950 dark:text-white">
                    IA Ética & Segura
                  </h3>
                  <p className="text-2xs font-extrabold text-amber-700 dark:text-amber-400 uppercase">
                    Zero dados sensíveis
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Práticas ativas para não incluir dados pessoais em prompts de IA, utilizando planos institucionais com checagem criteriosa de alucinações.
              </p>
            </div>

          </div>
        </div>

        {/* Action Box to Open Consent Terms */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl font-black tracking-tight flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Consulte a Política de Privacidade & Termo LGPD Completo</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal">
              Veja a minuta detalhada do termo de consentimento parental e os compromissos de segurança de dados.
            </p>
          </div>

          <button
            onClick={openPrivacyModal}
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-amber-500/20 active:scale-[0.98] cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Visualizar Minuta LGPD</span>
          </button>
        </div>

      </div>
    </section>
  );
};
