import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Sparkles, 
  FileText, 
  HelpCircle,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RawEvidenceItem, TestExecutionStatus } from '../../types/workshop';

interface RealWorldTestSupportProps {
  onSyncEvidenceText?: (combinedText: string) => void;
}

export const RealWorldTestSupport: React.FC<RealWorldTestSupportProps> = ({
  onSyncEvidenceText
}) => {
  const { state, updateProjectData } = useApp();

  const [testStatus, setTestStatus] = useState<TestExecutionStatus>(
    state.projectData?.testExecutionStatus || 'realizado'
  );

  const [evidenceItems, setEvidenceItems] = useState<RawEvidenceItem[]>(
    state.projectData?.v3RawEvidenceItems && state.projectData.v3RawEvidenceItems.length > 0
      ? state.projectData.v3RawEvidenceItems
      : [
          {
            id: 'ev-1',
            testerProfile: '',
            attemptedAction: '',
            whatHappened: '',
            workedWithoutHelp: '',
            whereHesitated: '',
            whereNeededHelp: '',
            quoteOrComment: '',
            suggestion: '',
            otherLearning: ''
          }
        ]
  );

  const [testNotes, setTestNotes] = useState<string>(
    state.projectData?.testExecutionNotes || ''
  );

  const syncToProject = (
    newStatus: TestExecutionStatus, 
    items: RawEvidenceItem[], 
    notes: string
  ) => {
    // Generate readable formatted evidence block
    const formattedBlocks = items
      .filter(it => it.attemptedAction.trim() || it.whatHappened.trim())
      .map((it, idx) => {
        return `[TESTE #${idx + 1}] Perfil: ${it.testerProfile || 'Não especificado'}\n• Tarefa tentada: ${it.attemptedAction}\n• O que aconteceu (Fato): ${it.whatHappened}\n• Falas literais: "${it.quoteOrComment || 'Nenhuma fala registrada'}"\n• Onde hesitou/precisou de ajuda: ${it.whereHesitated || it.whereNeededHelp || 'Nenhuma'}\n• Sugestões/Aprendizados: ${it.suggestion || it.otherLearning || 'Nenhum'}`;
      })
      .join('\n\n');

    const combinedText = `STATUS DA EXECUÇÃO DO TESTE: ${newStatus}\n\nEVIDÊNCIAS DE CAMPO REGISTRADAS:\n${formattedBlocks || '(Nenhum registro individual detalhado preenchido)'}\n\nNOTAS GERAIS DE EXECUÇÃO:\n${notes || 'Sem observações adicionais'}`;

    updateProjectData({
      testExecutionStatus: newStatus,
      v3RawEvidenceItems: items,
      testExecutionNotes: notes,
      v3RawEvidence: combinedText
    });

    if (onSyncEvidenceText) {
      onSyncEvidenceText(combinedText);
    }
  };

  const handleStatusChange = (status: TestExecutionStatus) => {
    setTestStatus(status);
    syncToProject(status, evidenceItems, testNotes);
  };

  const handleAddItem = () => {
    const newItem: RawEvidenceItem = {
      id: `ev-${Date.now()}`,
      testerProfile: '',
      attemptedAction: '',
      whatHappened: '',
      workedWithoutHelp: '',
      whereHesitated: '',
      whereNeededHelp: '',
      quoteOrComment: '',
      suggestion: '',
      otherLearning: ''
    };
    const updated = [...evidenceItems, newItem];
    setEvidenceItems(updated);
    syncToProject(testStatus, updated, testNotes);
  };

  const handleUpdateItem = (id: string, field: keyof RawEvidenceItem, val: string) => {
    const updated = evidenceItems.map(item => {
      if (item.id === id) {
        return { ...item, [field]: val };
      }
      return item;
    });
    setEvidenceItems(updated);
    syncToProject(testStatus, updated, testNotes);
  };

  const handleRemoveItem = (id: string) => {
    if (evidenceItems.length === 1) {
      // Reset single item
      const reset = [{
        id: 'ev-1',
        testerProfile: '',
        attemptedAction: '',
        whatHappened: '',
        workedWithoutHelp: '',
        whereHesitated: '',
        whereNeededHelp: '',
        quoteOrComment: '',
        suggestion: '',
        otherLearning: ''
      }];
      setEvidenceItems(reset);
      syncToProject(testStatus, reset, testNotes);
      return;
    }
    const updated = evidenceItems.filter(item => item.id !== id);
    setEvidenceItems(updated);
    syncToProject(testStatus, updated, testNotes);
  };

  return (
    <div className="space-y-4">
      {/* 1. Status Real da Execução */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wide flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-500" />
              <span>1. Declaração do Status Real do Teste</span>
            </label>
            <p className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5">
              Transparência metodológica: nunca simule testes fictícios. Registre o que realmente aconteceu.
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            {(['realizado', 'parcialmente_realizado', 'nao_realizado'] as TestExecutionStatus[]).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => handleStatusChange(st)}
                className={`px-3 py-1.5 rounded-lg text-2xs font-extrabold transition cursor-pointer ${
                  testStatus === st
                    ? st === 'realizado'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : st === 'parcialmente_realizado'
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'bg-rose-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {st === 'realizado' && '✓ Realizado na Prática'}
                {st === 'parcialmente_realizado' && '⚠️ Parcialmente Realizado'}
                {st === 'nao_realizado' && '✕ Não Realizado'}
              </button>
            ))}
          </div>
        </div>

        {testStatus === 'nao_realizado' && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl flex items-start gap-2 text-xs text-rose-900 dark:text-rose-200">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Atenção Metodológica:</strong>
              <p className="mt-0.5 text-2xs text-rose-800 dark:text-rose-300">
                Se o teste de campo não pôde ser realizado, declare abertamente como hipótese nos próximos passos. O sistema registrará que as premissas permanecem como "NÃO TESTADAS".
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Coleta de Evidências de Testadores Reais */}
      {testStatus !== 'nao_realizado' && (
        <div className="bg-slate-50 dark:bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                2. Registro de Evidências Individuais ({evidenceItems.length})
              </h4>
            </div>

            <button
              type="button"
              onClick={handleAddItem}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-2xs rounded-xl transition flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Adicionar Testador</span>
            </button>
          </div>

          <div className="space-y-3">
            {evidenceItems.map((item, idx) => (
              <div 
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-2xs font-black px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                    Sessão de Teste #{idx + 1}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 transition cursor-pointer"
                    title="Remover este registro de teste"
                    aria-label={`Remover teste #${idx + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-2xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Perfil anônimo do testador:
                    </label>
                    <input
                      type="text"
                      value={item.testerProfile}
                      onChange={(e) => handleUpdateItem(item.id, 'testerProfile', e.target.value)}
                      placeholder="Ex: Estudante do 2º ano, 16 anos, usuário diário de ônibus"
                      className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Tarefa solicitada no protótipo:
                    </label>
                    <input
                      type="text"
                      value={item.attemptedAction}
                      onChange={(e) => handleUpdateItem(item.id, 'attemptedAction', e.target.value)}
                      placeholder="Ex: Tentar encontrar a rota do ônibus e clicar em confirmar"
                      className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-2xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    O que aconteceu de fato? (Fato observável, sem interpretar):
                  </label>
                  <textarea
                    value={item.whatHappened}
                    onChange={(e) => handleUpdateItem(item.id, 'whatHappened', e.target.value)}
                    placeholder="Ex: O participante demorou 40 segundos para achar o botão principal e clicou duas vezes no ícone errado."
                    className="w-full h-16 p-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-amber-500 resize-y"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-2xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Falas literais do testador ("aspas"):
                    </label>
                    <input
                      type="text"
                      value={item.quoteOrComment}
                      onChange={(e) => handleUpdateItem(item.id, 'quoteOrComment', e.target.value)}
                      placeholder='Ex: "Não entendi se já salvou ou se tenho que clicar de novo."'
                      className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Dificuldades / Fricções / Sugestões:
                    </label>
                    <input
                      type="text"
                      value={item.suggestion}
                      onChange={(e) => handleUpdateItem(item.id, 'suggestion', e.target.value)}
                      placeholder="Ex: Falta de feedback visual após a confirmação"
                      className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Notas Gerais do Teste */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
        <label className="block text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wide">
          3. Observações Gerais do Ambiente / Metodologia de Teste:
        </label>
        <textarea
          value={testNotes}
          onChange={(e) => {
            setTestNotes(e.target.value);
            syncToProject(testStatus, evidenceItems, e.target.value);
          }}
          placeholder="Ex: Os testes foram feitos com estudantes da sala vizinha durante o intervalo. O protótipo em papel funcionou bem para explicar o fluxo."
          className="w-full h-16 p-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-amber-500 resize-y"
        />
      </div>
    </div>
  );
};
