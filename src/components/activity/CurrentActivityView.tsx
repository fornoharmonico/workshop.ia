/**
 * Current Activity View Component V3
 * Unified operational home for A01..A11.
 * Clean, mobile-first, high-contrast, progressive disclosure, unmistakable next step.
 */
import React, { useState, useMemo } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Eye,
  FileCheck,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  Play,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { getActivityOrThrow, getMovementById } from '../../domain/v3/journeyRegistry.ts';
import { ActivityExecutionMode, ActivityId } from '../../domain/v3/types.ts';
import { useProject } from '../../state/ProjectContext.tsx';
import { useDraft } from '../../state/DraftContext.tsx';
import { useSession } from '../../state/SessionContext.tsx';
import { useTimer } from '../../state/TimerContext.tsx';
import { usePreferences } from '../../state/PreferencesContext.tsx';
import {
  getActivityStatus,
  getCanonicalCurrentActivity,
  isJourneyCompleted,
} from '../../services/progressDerived.ts';
import { buildContextPack } from '../../services/contextPackBuilder.ts';
import { parseResultEnvelope, ParseResult } from '../../services/resultEnvelopeParser.ts';
import { ContextPackViewerModal } from './ContextPackViewerModal.tsx';

interface CurrentActivityViewProps {
  activityId?: ActivityId;
}

export const CurrentActivityView: React.FC<CurrentActivityViewProps> = ({
  activityId: propActivityId,
}) => {
  const { project, consolidateActivity } = useProject();
  const { drafts, updateDraft, clearDraft, isAutosaving } = useDraft();
  const { viewedActivityId, setViewedActivityId, addToast, setActiveTab } = useSession();
  const { openTimer } = useTimer();
  const { provisionalProblemPrompt, setProvisionalProblemPrompt } = usePreferences();

  // Determine which activity is active: prop > viewed > canonical
  const canonicalActivityId = getCanonicalCurrentActivity(project, drafts);
  const activeActivityId = propActivityId || viewedActivityId || canonicalActivityId;

  const activity = getActivityOrThrow(activeActivityId);
  const movement = getMovementById(activity.movementId);
  const currentStatus = getActivityStatus(activeActivityId, project, drafts);

  // Execution mode: CREATE | REVISE | REVALIDATE
  const [explicitReviseMode, setExplicitReviseMode] = useState<boolean>(false);

  const executionMode: ActivityExecutionMode = useMemo(() => {
    if (currentStatus === 'REVALIDACAO_RECOMENDADA') return 'REVALIDATE';
    if (currentStatus === 'CONCLUIDA' && explicitReviseMode) return 'REVISE';
    return 'CREATE';
  }, [currentStatus, explicitReviseMode]);

  // Draft state
  const draft = drafts[activeActivityId] || {
    pastedResult: '',
    userObservation: '',
    updatedAt: new Date().toISOString(),
  };

  const [pastedInput, setPastedInput] = useState(draft.pastedResult);
  const [observationInput, setObservationInput] = useState(draft.userObservation);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [parseError, setParseError] = useState<{ error: string; guidance?: string } | null>(null);

  // Sync draft when input changes
  const handlePastedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setPastedInput(val);
    updateDraft(activeActivityId, val, observationInput);
    if (parseError) setParseError(null);
  };

  const handleObservationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setObservationInput(val);
    updateDraft(activeActivityId, pastedInput, val);
  };

  // Build Context Pack for current state and mode
  const contextPack = useMemo(() => {
    return buildContextPack(activeActivityId, executionMode, project);
  }, [activeActivityId, executionMode, project]);

  const handleCopyPack = async () => {
    try {
      await navigator.clipboard.writeText(contextPack);
      setCopiedSuccess(true);
      addToast('Pacote de contexto copiado para a área de transferência!', 'success');
      setTimeout(() => setCopiedSuccess(false), 3000);
    } catch {
      setIsViewerOpen(true);
      addToast('Não foi possível copiar automaticamente. Use a visualização para copiar.', 'info');
    }
  };

  // Consolidation Action
  const handleConsolidate = () => {
    if (!pastedInput.trim()) {
      setParseError({
        error: 'Cole a resposta da IA antes de consolidar.',
        guidance: 'Copie todo o bloco contendo o ARTEFATO e o SOW retornado pela sua conversa.',
      });
      return;
    }

    const parseResult: ParseResult = parseResultEnvelope(
      pastedInput,
      activity.artifactId,
      executionMode
    );

    if (!parseResult.success || !parseResult.data) {
      setParseError({
        error: parseResult.error || 'Erro na validação do envelope de retorno.',
        guidance: parseResult.recoveryGuidance,
      });
      return;
    }

    // Call transactional consolidation
    const result = consolidateActivity(
      activeActivityId,
      executionMode,
      parseResult.data,
      observationInput
    );

    if (!result.success) {
      setParseError({
        error: result.error || 'Falha ao salvar no armazenamento do navegador.',
      });
      return;
    }

    // Success
    clearDraft(activeActivityId);
    setPastedInput('');
    setObservationInput('');
    setParseError(null);
    setExplicitReviseMode(false);
    setViewedActivityId(null);
    addToast(`Etapa ${activity.id} consolidada com sucesso! Salvo neste dispositivo.`, 'success');
  };

  const journeyDone = isJourneyCompleted(project);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 space-y-6">
      {/* Journey Completed Banner */}
      {journeyDone && activeActivityId === 'A11' && currentStatus === 'CONCLUIDA' && (
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/60 to-neutral-900 p-6 shadow-xl text-center space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-neutral-100">
            Jornada Concluída com Sucesso!
          </h2>
          <p className="text-xs text-neutral-300 max-w-lg mx-auto">
            Todas as 11 atividades foram consolidadas. Você pode revisar seus artefatos, gerar o Dossiê completo do projeto e preparar sua apresentação.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveTab('project')}
              className="rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold text-neutral-950 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
            >
              Ver Meu Projeto e Dossiê
            </button>
          </div>
        </div>
      )}

      {/* Viewed Activity Warning if inspecting different than canonical */}
      {viewedActivityId && viewedActivityId !== canonicalActivityId && (
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/30 p-3.5 flex items-center justify-between text-xs text-sky-200">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              Você está consultando a atividade <strong>{viewedActivityId}</strong>. Sua etapa operacional canônica atual é <strong>{canonicalActivityId}</strong>.
            </span>
          </div>
          <button
            onClick={() => setViewedActivityId(null)}
            className="ml-3 shrink-0 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 px-2.5 py-1 text-[11px] font-semibold text-sky-200 transition-colors"
          >
            Voltar para {canonicalActivityId}
          </button>
        </div>
      )}

      {/* Revalidation Banner */}
      {currentStatus === 'REVALIDACAO_RECOMENDADA' && (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-950/40 p-5 space-y-2 text-amber-200 shadow-lg">
          <div className="flex items-center space-x-2.5 font-bold text-sm text-amber-300">
            <RefreshCw className="w-4 h-4 text-amber-400 shrink-0 animate-spin-slow" />
            <span>Revalidação Recomendada</span>
          </div>
          <p className="text-xs text-amber-200/90 leading-relaxed">
            Uma decisão ou artefato anterior mudou. Esta etapa precisa ser revalidada com a IARA para confirmar se o artefato atual continua coerente (<code>SEM_ALTERACAO</code>) ou se requer ajustes (<code>COM_ALTERACAO</code>).
          </p>
        </div>
      )}

      {/* Blocked Notice */}
      {currentStatus === 'BLOQUEADA' && (
        <div className="rounded-2xl border border-rose-800/40 bg-rose-950/30 p-5 space-y-3 text-rose-200">
          <div className="flex items-center space-x-2 font-bold text-sm text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Etapa Bloqueada</span>
          </div>
          <p className="text-xs text-rose-200/90">
            Esta atividade necessita dos seguintes artefatos vigentes para ser executada:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {activity.requiredContext.map((reqArt) => (
              <span
                key={reqArt}
                className="rounded-lg bg-rose-900/50 border border-rose-700/50 px-2.5 py-1 font-mono text-[11px] text-rose-200"
              >
                {reqArt} necessário
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Activity Header Card */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 shadow-xl space-y-4">
        {/* Breadcrumb & Movement Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
          <div className="flex items-center space-x-2 text-xs">
            <span className="font-semibold text-amber-400 tracking-wide uppercase text-[11px]">
              {movement.title}
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400">Encontro {activity.meetingRecommended}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => openTimer(activity.id)}
              className="flex items-center space-x-1.5 rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-xs font-mono text-neutral-300 hover:border-amber-500/40 hover:text-amber-300 transition-colors"
              title="Abrir cronômetro para esta atividade"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{activity.estimatedMinutes} min</span>
              <Play className="w-2.5 h-2.5 ml-1 text-neutral-500" />
            </button>
          </div>
        </div>

        {/* Title & Objective */}
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              {activity.id}
            </span>
            <h1 className="text-lg sm:text-xl font-bold text-neutral-100 tracking-tight">
              {activity.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-1">
            {activity.objective}
          </p>
        </div>

        {/* Provisional Problem Inspiration for A01 */}
        {activity.id === 'A01' && provisionalProblemPrompt && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-amber-400 font-semibold">
              <span className="flex items-center space-x-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>Ponto de Partida Provisório Escolhido no Mapa:</span>
              </span>
              <button
                onClick={() => setProvisionalProblemPrompt(undefined)}
                className="text-[11px] text-neutral-400 hover:text-neutral-200"
              >
                Limpar
              </button>
            </div>
            <p className="text-neutral-200 italic font-medium">"{provisionalProblemPrompt}"</p>
            <p className="text-[11px] text-neutral-400">
              Lembre-se: este é apenas um ponto de partida para inspirar sua conversa com a IARA. A tensão autêntica será confirmada por vocês.
            </p>
          </div>
        )}

        {/* Already Consolidated Notice */}
        {currentStatus === 'CONCLUIDA' && !explicitReviseMode && (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-emerald-200">
            <div className="flex items-center space-x-2.5">
              <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Esta etapa já possui o artefato <strong>{activity.artifactId}</strong> consolidado e vigente.
              </span>
            </div>
            <button
              onClick={() => setExplicitReviseMode(true)}
              className="rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-amber-300 hover:border-amber-500/40 transition-colors shrink-0"
            >
              Revisar esta etapa (Modo REVISE)
            </button>
          </div>
        )}
      </div>

      {/* READY TO TALK TO AI CARD */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-neutral-100 uppercase tracking-wider">
                Pronto para conversar com a IA
              </h2>
              <span className="rounded bg-neutral-800 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300 border border-neutral-700">
                MODO: {executionMode}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Copie o pacote e cole na <strong>mesma conversa</strong> com a IARA.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsViewerOpen(true)}
              className="flex items-center space-x-1.5 rounded-xl border border-neutral-700 bg-neutral-800/80 px-3 py-1.5 text-xs text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
              title="Visualizar todo o pacote antes de copiar"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver o que será enviado</span>
            </button>
          </div>
        </div>

        {/* Included Blocks Summary */}
        <div className="rounded-xl bg-neutral-950 p-4 border border-neutral-800/80 space-y-2">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
            Conteúdo empacotado neste envio:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
            {activity.id === 'A01' && (
              <div className="flex items-center space-x-1.5 text-amber-300 font-medium">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>Prompt Zero (IARA Core)</span>
              </div>
            )}
            <div className="flex items-center space-x-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contrato & Prompt {activity.promptId}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>SOW Vigente</span>
            </div>
            {activity.requiredContext.length > 0 && (
              <div className="flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Contexto Autoritativo ({activity.requiredContext.join(', ')})</span>
              </div>
            )}
            {(executionMode === 'REVISE' || executionMode === 'REVALIDATE') && (
              <div className="flex items-center space-x-1.5 text-amber-300">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>Artefato Atual a {executionMode === 'REVISE' ? 'Revisar' : 'Revalidar'}</span>
              </div>
            )}
            <div className="flex items-center space-x-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Schema Canônico {activity.artifactId} + SOW</span>
            </div>
          </div>
        </div>

        {/* Primary CTA: Copy Pack */}
        <div>
          <button
            onClick={handleCopyPack}
            className={`w-full group flex items-center justify-center space-x-3 rounded-2xl py-4 px-6 font-bold text-sm transition-all shadow-lg ${
              copiedSuccess
                ? 'bg-emerald-500 text-neutral-950 shadow-emerald-500/20'
                : 'bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 hover:from-amber-400 hover:to-amber-300 shadow-amber-500/20 hover:scale-[1.01]'
            }`}
          >
            {copiedSuccess ? (
              <>
                <Check className="w-5 h-5 text-neutral-950" />
                <span>Pacote Copiado! Agora cole na sua conversa com a IARA</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 text-neutral-950 group-hover:rotate-6 transition-transform" />
                <span>Copiar Pacote para a IA</span>
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-neutral-400 mt-2">
            Cole no chat com sua IA autorizada. Converse, decida e copie o resultado final delimitado.
          </p>
        </div>
      </div>

      {/* RETURN & CONSOLIDATION FORM */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div>
            <h2 className="text-sm font-bold text-neutral-100 uppercase tracking-wider">
              Retorno da Conversa & Consolidação
            </h2>
            <p className="text-xs text-neutral-400">
              Cole o resultado emitido pela IARA e consolide a etapa.
            </p>
          </div>
          <div className="text-[11px] text-neutral-400 font-mono">
            {isAutosaving ? (
              <span className="text-amber-400 animate-pulse">Salvando rascunho...</span>
            ) : (
              <span>Rascunho salvo automaticamente.</span>
            )}
          </div>
        </div>

        {/* Error banner if parser fails */}
        {parseError && (
          <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-4 space-y-2 text-rose-200 animate-in fade-in duration-150">
            <div className="flex items-center space-x-2 font-bold text-xs text-rose-300">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{parseError.error}</span>
            </div>
            {parseError.guidance && (
              <p className="text-xs text-rose-200/90 whitespace-pre-wrap leading-relaxed">
                {parseError.guidance}
              </p>
            )}
          </div>
        )}

        {/* Pasted Result Textarea */}
        <div>
          <label className="block text-xs font-semibold text-neutral-200 mb-1.5">
            Cole aqui o resultado final da sua conversa com a IA
          </label>
          <textarea
            value={pastedInput}
            onChange={handlePastedChange}
            placeholder={`<<< ARTEFATO ${activity.artifactId} >>>\n...\n<<< FIM DO ARTEFATO >>>\n\n<<< STATE OF WORK — SOW >>>\n...\n<<< FIM DO SOW >>>`}
            rows={10}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3.5 font-mono text-xs text-neutral-200 placeholder-neutral-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed resize-y"
          />
        </div>

        {/* Human Observation Textarea */}
        <div>
          <label className="block text-xs font-semibold text-neutral-300 mb-1">
            Observações humanas da equipe ou contexto adicional (opcional)
          </label>
          <textarea
            value={observationInput}
            onChange={handleObservationChange}
            placeholder="Ex: Tivemos dificuldade em decidir a causa 3; queremos testar com a professora amanhã."
            rows={2}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-xs text-neutral-200 placeholder-neutral-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-y"
          />
          <p className="text-[11px] text-neutral-400 mt-1">
            Fica registrado no dossiê da etapa e será metabolizado na consolidação.
          </p>
        </div>

        {/* Consolidate Button */}
        <div className="pt-2">
          <button
            onClick={handleConsolidate}
            disabled={!pastedInput.trim()}
            className={`w-full flex items-center justify-center space-x-2 rounded-xl py-3.5 px-6 font-bold text-xs uppercase tracking-wider transition-all shadow-md ${
              pastedInput.trim()
                ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400 shadow-amber-500/20 cursor-pointer hover:scale-[1.005]'
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/50'
            }`}
          >
            <span>Consolidar Etapa {activity.id}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Context Pack Viewer Modal */}
      <ContextPackViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        packContent={contextPack}
        activityTitle={`${activity.id} — ${activity.title}`}
      />
    </div>
  );
};
