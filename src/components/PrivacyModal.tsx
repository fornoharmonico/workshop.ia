import React, { useState } from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle, Copy, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PrivacyModal: React.FC = () => {
  const { isPrivacyModalOpen, closePrivacyModal } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isPrivacyModalOpen) return null;

  const parentalConsentTemplate = `TERMO DE CONSENTIMENTO E AUTORIZAÇÃO DE PARTICIPAÇÃO
WORKSHOP: INTELIGÊNCIA ARTIFICIAL APLICADA - DO PROBLEMA AO PROTÓTIPO

Instituição / Escola: __________________________________________________
Nome do(a) Estudante: __________________________________________________
Data de Nascimento: ____/____/________  Idade: ______ anos
Nome do(a) Responsável Legal: _________________________________________
CPF do(a) Responsável: ______________________ Telefone: ________________

Eu, responsável legal pelo(a) estudante acima identificado(a), DECLARO estar ciente e AUTORIZO sua participação no "Workshop Inteligência Artificial Aplicada: do Problema ao Protótipo", com carga horária de 12 horas.

ESTOU CIENTE DE QUE:
1. Em conformidade com o Art. 14 da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), todo o tratamento de dados durante as atividades pedagógicas ocorre com o consentimento específico dos pais/responsáveis e visa exclusivamente o melhor interesse do(a) adolescente.
2. As atividades práticas do workshop não exigem cadastro com dados pessoais sensíveis ou cartão de crédito em serviços de IA pelos estudantes.
3. As reflexões e mapeamentos íntimos individuais do(a) estudante são estritamente privados e armazenados localmente em seu dispositivo de navegação, não sendo recolhidos, pontuados ou divulgados.
4. O workshop prioriza o letramento digital ético, a proteção de dados pessoais e o desenvolvimento do pensamento crítico.

Local e Data: __________________________, _____ de ________________ de 2026.

___________________________________________________________
Assinatura do(a) Pai / Mãe ou Responsável Legal`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(parentalConsentTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy consent template:', err);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closePrivacyModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-left overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closePrivacyModal}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
          title="Fechar janela de privacidade"
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 font-bold text-xs border border-emerald-300 dark:border-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>LGPD & CONFORMIDADE ÉTICA</span>
          </div>
          <h2 id="privacy-modal-title" className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Política de Privacidade & Termo LGPD
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Diretrizes legais, salvaguarda de dados para o público de 12 a 17 anos e minutas para instituições.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          
          {/* Section 1 */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              1. Conformidade com a LGPD (Art. 14 - Crianças e Adolescentes)
            </h3>
            <p>
              O tratamento de dados pessoais de jovens no âmbito do workshop é realizado estritamente em seu <strong>melhor interesse</strong> (Lei nº 13.709/2018, art. 14) e sob consentimento específico e em destaque dado por pelo menos um dos pais ou pelo responsável legal.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              2. Arquitetura Local-First (Privacidade Absoluta)
            </h3>
            <p>
              O webapp pedagógico funciona com arquitetura <em>Local-First</em>: os mapeamentos de desafios individuais e anotações do estudante permanecem gravados exclusivamente no <code>localStorage</code> do próprio navegador utilizado, não sendo transmitidos a servidores centrais ou bancos de dados em nuvem.
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              3. Regras de Ouro no Uso de Ferramentas de IA
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm pl-1">
              <li><strong>Zero Dados Sensíveis:</strong> Estudantes são instruídos a jamais inserir nomes completos, documentos, endereços ou senhas nos prompts.</li>
              <li><strong>Sem exigência de cartão ou planos pagos:</strong> As ferramentas utilizadas são orientadas a modelos gratuitos e institucionais seguros.</li>
              <li><strong>Auditoria Crítica:</strong> Treinamos a identificação de alucinações e vieses algorítmicos em todas as respostas da IA.</li>
            </ul>
          </div>

          {/* Section 4: Minuta para Escolas */}
          <div className="bg-amber-50/60 dark:bg-amber-950/40 p-5 rounded-2xl border border-amber-200 dark:border-amber-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-amber-950 dark:text-amber-200 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Minuta do Termo de Consentimento para a Instituição
              </h3>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar Minuta'}</span>
              </button>
            </div>
            <pre className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-amber-200 dark:border-amber-800 text-[11px] text-slate-700 dark:text-slate-300 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
              {parentalConsentTemplate}
            </pre>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={closePrivacyModal}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-bold text-sm transition-colors"
          >
            Entendido e Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
