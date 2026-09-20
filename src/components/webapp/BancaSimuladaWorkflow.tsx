import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft, 
  HelpCircle, 
  ShieldAlert, 
  FileText, 
  Edit3,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const BANCA_QUESTIONS_V3 = [
  {
    id: 1,
    category: 'Problema & Evidência',
    question: 'Qual evidência concreta de teste comprova que esse problema é realmente prioritário para as pessoas afetadas e não apenas uma suposição da equipe?',
    tip: 'Foque em fatos concretos observados nos testes ou entrevistas, evitando generalizações como "todo mundo precisa disso".',
    suggestedFocus: 'Mencione dados do diagnóstico ou reações concretas de quem testou.'
  },
  {
    id: 2,
    category: 'Diferencial & Proposta de Valor',
    question: 'Por que a solução proposta por vocês é mais aderente ou viável do que as alternativas e hábitos que os usuários já possuem hoje?',
    tip: 'Explique o ganho real de simplicidade, custo ou eficiência sem apelar para chavões genéricos.',
    suggestedFocus: 'Destaque o recorte do MVP e a essência da proposta de valor.'
  },
  {
    id: 3,
    category: 'Testes & Aprendizados',
    question: 'O que funcionou sem nenhuma ajuda nos testes práticos e qual foi a maior hesitação ou falha observada?',
    tip: 'Demonstrar transparência sobre as dificuldades gera muito mais credibilidade perante a banca do que fingir que tudo deu 100% certo.',
    suggestedFocus: 'Cite uma hesitação real e como ela motivou uma mudança no Protótipo V1.'
  },
  {
    id: 4,
    category: 'Sustentabilidade & Viabilidade',
    question: 'Como vocês pretendem sustentar operacionalmente e financeiramente a iniciativa após esta fase piloto?',
    tip: 'Conecte sua resposta aos blocos do Modelo de Sustentabilidade (BMC) e esclareça quais hipóteses de receita/custo ainda estão abertas.',
    suggestedFocus: 'Mostre clareza sobre parcerias, custos prioritários e fontes de sustentação.'
  },
  {
    id: 5,
    category: 'Roadmap & Limitações',
    question: 'Qual é a principal afirmação que vocês ainda NÃO podem fazer e qual é o próximo teste obrigatório do roadmap?',
    tip: 'A banca valoriza equipes que conhecem os limites do que validaram e sabem exatamente o que farão no horizonte "Agora".',
    suggestedFocus: 'Reforce o compromisso ético e a próxima prioridade número 1 do Roadmap.'
  }
];

export const BancaSimuladaWorkflow: React.FC<{
  onComplete?: () => void;
}> = ({ onComplete }) => {
  const { state, updateProjectData } = useApp();
  const projectData = (state.projectData || {}) as Record<string, any>;

  const [activeWorkflowStep, setActiveWorkflowStep] = useState<1 | 2 | 3 | 4>(1);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);

  // Question answers state
  const [questionAnswers, setQuestionAnswers] = useState<Record<number, string>>({
    1: projectData.v3BancaAnswer1 || '',
    2: projectData.v3BancaAnswer2 || '',
    3: projectData.v3BancaAnswer3 || '',
    4: projectData.v3BancaAnswer4 || '',
    5: projectData.v3BancaAnswer5 || '',
  });

  const handleAnswerChange = (qNum: number, text: string) => {
    setQuestionAnswers(prev => ({ ...prev, [qNum]: text }));
    updateProjectData({
      [`v3BancaAnswer${qNum}`]: text
    });
  };

  const currentQ = BANCA_QUESTIONS_V3[currentQuestionIdx];

  return (
    <div className="space-y-6">
      {/* Workflow Navigation Stepper */}
      <div className="bg-slate-50 dark:bg-slate-950 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-2xs font-black">
          {[
            { step: 1, title: '1. Diagnóstico do Pitch' },
            { step: 2, title: '2. 5 Perguntas da Banca' },
            { step: 3, title: '3. Refinamento do Pitch' },
            { step: 4, title: '4. Consolidação & Síntese Crítica' }
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveWorkflowStep(item.step as any)}
              className={`px-3 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeWorkflowStep === item.step
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : activeWorkflowStep > item.step
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                  : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {activeWorkflowStep > item.step ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-3xs">
                  {item.step}
                </span>
              )}
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: DIAGNÓSTICO DO PITCH */}
      {activeWorkflowStep === 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Passo 1: Avaliação Diagnóstica da Apresentação</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Antes de responder à banca simulada, avalie a minuta do pitch da equipe segundo os <strong>5 critérios de clareza da V1.4.1</strong>:
          </p>

          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-extrabold block">1. Gancho & Dor Real</strong>
              <p className="text-slate-500 dark:text-slate-400 text-2xs leading-relaxed">
                O problema é introduzido em menos de 30 segundos com foco no público afetado, sem introduções prolixas.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-extrabold block">2. Clareza da Solução</strong>
              <p className="text-slate-500 dark:text-slate-400 text-2xs leading-relaxed">
                Qualquer pessoa leiga consegue entender o que a solução faz e como ela funciona logo na primeira menção.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-extrabold block">3. Honestidade Epistemológica</strong>
              <p className="text-slate-500 dark:text-slate-400 text-2xs leading-relaxed">
                A equipe separa rigorosamente o que foi testado/comprovado daquilo que ainda é hipótese ou meta futura.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-extrabold block">4. Aprendizado Visível</strong>
              <p className="text-slate-500 dark:text-slate-400 text-2xs leading-relaxed">
                O pitch conta a história da evolução do Protótipo V0 para V1 a partir dos feedbacks recebidos.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 sm:col-span-2 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-extrabold block">5. Próximo Passo Concreto</strong>
              <p className="text-slate-500 dark:text-slate-400 text-2xs leading-relaxed">
                O fechamento deixa claro o que a equipe precisa agora (apoio, mentoria, novos testes) sem pedidos vagos.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => setActiveWorkflowStep(2)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Avançar para as 5 Perguntas da Banca</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: AS 5 PERGUNTAS DA BANCA (UMA POR VEZ) */}
      {activeWorkflowStep === 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">
                {currentQuestionIdx + 1}
              </span>
              <div>
                <span className="text-2xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                  Pergunta {currentQuestionIdx + 1} de 5 • {currentQ.category}
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  Simulação Interativa de Arguição
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {BANCA_QUESTIONS_V3.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIdx(idx)}
                  className={`min-h-[36px] min-w-[36px] rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center touch-manipulation ${
                    currentQuestionIdx === idx
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : questionAnswers[q.id]?.trim()
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                  title={`Pergunta ${q.id}: ${q.category}`}
                >
                  {q.id}
                </button>
              ))}
            </div>
          </div>

          {/* Question Card */}
          <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-900/60 space-y-2">
            <div className="flex items-center gap-1.5 text-2xs font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              <Users className="w-4 h-4 text-amber-600" />
              <span>Pergunta do Avaliador / Banca:</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
              "{currentQ.question}"
            </p>
            <p className="text-2xs text-slate-600 dark:text-slate-300 italic pt-1">
              💡 <strong>Dica da Metodologia:</strong> {currentQ.tip}
            </p>
          </div>

          {/* Team Answer Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Resposta da Equipe (Treine sua fala oral ou anote pontos-chave):</span>
              <span className="text-2xs text-slate-400 font-normal">
                {currentQ.suggestedFocus}
              </span>
            </label>
            <textarea
              rows={4}
              value={questionAnswers[currentQ.id] || ''}
              onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
              placeholder={`Escreva em tópicos ou frases curtas como a equipe responderá à Pergunta ${currentQ.id}...`}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Stepping controls between the 5 questions */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                if (currentQuestionIdx > 0) {
                  setCurrentQuestionIdx(prev => prev - 1);
                } else {
                  setActiveWorkflowStep(1);
                }
              }}
              className="px-3.5 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{currentQuestionIdx === 0 ? 'Voltar ao Diagnóstico' : 'Pergunta Anterior'}</span>
            </button>

            {currentQuestionIdx < BANCA_QUESTIONS_V3.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <span>Próxima Pergunta ({currentQuestionIdx + 2}/5)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setActiveWorkflowStep(3)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Concluir Perguntas & Refinar Pitch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: REFINAMENTO DO PITCH */}
      {activeWorkflowStep === 3 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">3</span>
              <div>
                <span className="text-2xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                  Passo 3: Refinamento Textual
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  Pitch Revisado (Versão Polida Pós-Ensaio)
                </h3>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Incorpore os ajustes identificados durante a arguição da banca. Encurte frases difíceis, destaque as evidências reais e marque pausas estratégicas de fala.
          </p>

          <div className="space-y-1.5">
            <label className="block text-xs font-black text-slate-700 dark:text-slate-300">
              Texto Integral do Pitch Revisado:
            </label>
            <textarea
              rows={8}
              value={projectData.v3PitchRevised || ''}
              onChange={(e) => updateProjectData({ v3PitchRevised: e.target.value })}
              placeholder="Cole ou redija aqui o texto definitivo da fala do Pitch Revisado..."
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveWorkflowStep(2)}
              className="px-3.5 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Voltar às Perguntas</span>
            </button>

            <button
              onClick={() => setActiveWorkflowStep(4)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Avançar para Síntese Crítica & Cartão de Banca</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CONSOLIDAÇÃO & SÍNTESE CRÍTICA */}
      {activeWorkflowStep === 4 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">4</span>
              <div>
                <span className="text-2xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                  Passo 4: Consolidação
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  Síntese Crítica do Pitch & Cartão de Banca
                </h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Pontos Fortes */}
            <div className="space-y-1.5">
              <label className="block text-2xs font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
                1. Pontos Fortes da Narrativa
              </label>
              <textarea
                rows={3}
                value={projectData.v3PitchStrongPoints || ''}
                onChange={(e) => updateProjectData({ v3PitchStrongPoints: e.target.value })}
                placeholder="Ex: Problema muito bem contextualizado; conexão clara com o usuário..."
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Pontos de Atenção */}
            <div className="space-y-1.5">
              <label className="block text-2xs font-extrabold uppercase text-rose-600 dark:text-rose-400">
                2. Pontos de Atenção / Fragilidades
              </label>
              <textarea
                rows={3}
                value={projectData.v3PitchAttentionPoints || ''}
                onChange={(e) => updateProjectData({ v3PitchAttentionPoints: e.target.value })}
                placeholder="Ex: Risco de falar rápido demais na transição entre MVP e protótipo..."
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Cartão de Banca */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-2xs font-extrabold uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>3. Cartão de Banca (Respostas Rápidas na Ponta da Língua)</span>
              </label>
              <textarea
                rows={4}
                value={projectData.v3PitchBancaCard || ''}
                onChange={(e) => updateProjectData({ v3PitchBancaCard: e.target.value })}
                placeholder={`P1: [Pergunta esperada] -> R: [Resposta curta e fundamentada em evidências]\nP2: ...`}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Afirmações que NÃO devemos fazer */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-2xs font-extrabold uppercase text-slate-500 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                <span>4. Afirmações que Ainda NÃO Devemos Fazer (Guarda-Corpo Epistemológico)</span>
              </label>
              <textarea
                rows={3}
                value={projectData.v3PitchWhatNotToClaimYet || ''}
                onChange={(e) => updateProjectData({ v3PitchWhatNotToClaimYet: e.target.value })}
                placeholder="Ex: Não afirmar que temos 100% de adesão garantida, mas sim que o teste piloto indicou alto interesse inicial..."
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveWorkflowStep(3)}
              className="px-3.5 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Voltar ao Pitch Revisado</span>
            </button>

            {onComplete && (
              <button
                onClick={onComplete}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Salvar & Concluir Preparação da Banca</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
