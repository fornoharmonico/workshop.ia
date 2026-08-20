import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, FileText, UserCheck, CheckCircle, ExternalLink } from 'lucide-react';

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

        {/* 4 Pillars of Data Safety */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Card 1: LGPD Art. 14 */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950 dark:text-white">
                  1. Conformidade com a LGPD (Art. 14)
                </h3>
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400">
                  Melhor interesse da criança e do adolescente
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Todo o processo pedagógico do workshop observa os direitos fundamentais do público jovem. O consentimento dos pais ou responsáveis legais é solicitado previamente pelas escolas e instituições parceiras.
            </p>
          </div>

          {/* Card 2: Local-First Privacy */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950 dark:text-white">
                  2. Mapeamento Íntimo 100% Local
                </h3>
                <p className="text-xs font-bold text-blue-800 dark:text-blue-400">
                  Sem armazenamento em servidores externos
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              O exercício de mapeamento de desafios individuais é estritamente confidencial: é gravado apenas na memória local (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">localStorage</code>) do dispositivo do aluno. Não é recolhido, transmitido nem avaliado.
            </p>
          </div>

          {/* Card 3: Safe AI Practices */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950 dark:text-white">
                  3. Uso Seguro de Ferramentas de IA
                </h3>
                <p className="text-xs font-bold text-amber-800 dark:text-amber-400">
                  Sem dados sensíveis e sem cobrança aos alunos
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Diretrizes claras de segurança digital: os alunos são treinados a não inserir dados pessoais em prompts de IA, a utilizar planos gratuitos institucionais e a checar alucinações antes de aceitar qualquer resposta.
            </p>
          </div>

          {/* Card 4: Parental Consent & Documentation */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950 dark:text-white">
                  4. Minuta de Consentimento Institucional
                </h3>
                <p className="text-xs font-bold text-purple-800 dark:text-purple-400">
                  Documentação pronta para a coordenação pedagógica
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Disponibilizamos para as escolas parceiras uma minuta padronizada de autorização dos pais/responsáveis legais e um guia de conformidade com a LGPD para anexar ao planejamento pedagógico.
            </p>
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
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-amber-500/20 active:scale-[0.98]"
          >
            <FileText className="w-4 h-4" />
            <span>Visualizar Minuta LGPD</span>
          </button>
        </div>

      </div>
    </section>
  );
};
