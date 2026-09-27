/**
 * Context Pack Builder Service V3
 * Constructs deterministic context packs with precise boundary delimiters.
 */
import { getActivityOrThrow } from '../domain/v3/journeyRegistry.ts';
import { getPromptOrThrow, PROMPT_ZERO_IARA_CORE } from '../domain/v3/promptRegistry.ts';
import { getArtifactOrThrow } from '../domain/v3/artifactRegistry.ts';
import { SOW_SCHEMA_SECTIONS } from '../domain/v3/sowRegistry.ts';
import {
  ActivityExecutionMode,
  ActivityId,
  CanonicalProjectStateV3,
} from '../domain/v3/types.ts';

export interface ContextPackOptions {
  includeCoreForRecovery?: boolean;
}

export function buildContextPack(
  activityId: ActivityId,
  mode: ActivityExecutionMode,
  project: CanonicalProjectStateV3,
  options?: ContextPackOptions
): string {
  const act = getActivityOrThrow(activityId);
  const prompt = getPromptOrThrow(act.promptId);
  const targetArtifact = getArtifactOrThrow(act.artifactId);

  const parts: string[] = [];

  // 1. IARA CORE (Only for A01 or explicit recovery mode)
  if (activityId === 'A01' || options?.includeCoreForRecovery) {
    parts.push(`<<< IARA CORE >>>\n${PROMPT_ZERO_IARA_CORE}\n<<< FIM IARA CORE >>>\n`);
  }

  // 2. MODO DA ATIVIDADE
  parts.push(`<<< MODO DA ATIVIDADE >>>\n${mode}\n<<< FIM DO MODO >>>\n`);

  // 3. CONTRATO E PROMPT
  const contractText = `## CONTRATO DA ATIVIDADE ${act.id} — ${act.title}
- Objetivo: ${act.objective}
- Tempo de referência: ${act.estimatedMinutes} minutos
- Decisões humanas obrigatórias:
${act.humanDecisions.map((d) => `  * ${d}`).join('\n')}
- Critérios de parada:
${act.stopCriteria.map((s) => `  * ${s}`).join('\n')}
- Critérios de conclusão:
${act.completionCriteria.map((c) => `  * ${c}`).join('\n')}

## INSTRUÇÕES OPERACIONAIS DO PROMPT ${prompt.id}
${prompt.operationalBody}

## HANDOFF FINAL
${prompt.handoffFinal}`;

  parts.push(`<<< CONTRATO E PROMPT ${prompt.id} >>>\n${contractText}\n<<< FIM DO PROMPT >>>\n`);

  // 4. STATE OF WORK — SOW VIGENTE (Always from canonical project.currentSow, never old embedded ones)
  parts.push(
    `<<< STATE OF WORK — SOW VIGENTE >>>\n${project.currentSow || 'Início da jornada — nenhum SOW prévio consolidado.'}\n<<< FIM DO SOW >>>\n`
  );

  // 5. CONTEXTO AUTORITATIVO (Bodies of required + optional artifacts, pure body without embedded SOW)
  const contextArtifactIds = [...act.requiredContext, ...act.optionalContext];
  const contextBodies: string[] = [];

  for (const artId of contextArtifactIds) {
    const record = project.artifacts[artId];
    if (record && record.body) {
      contextBodies.push(`### ${record.artifactId}\n${record.body}`);
    }
  }

  if (contextBodies.length > 0) {
    parts.push(
      `<<< CONTEXTO AUTORITATIVO >>>\n${contextBodies.join('\n\n---\n\n')}\n<<< FIM DO CONTEXTO >>>\n`
    );
  }

  // 6. ARTEFATO ATUAL A REVISAR/REVALIDAR (Only in REVISE or REVALIDATE modes)
  if (mode === 'REVISE' || mode === 'REVALIDATE') {
    const currentTargetRecord = project.artifacts[targetArtifact.id];
    const targetBody = currentTargetRecord ? currentTargetRecord.body : '(Artefato ainda não consolidado)';
    parts.push(
      `<<< ARTEFATO ATUAL A REVISAR/REVALIDAR >>>\n${targetBody}\n<<< FIM DO ARTEFATO ATUAL >>>\n`
    );
  }

  // 7. OBSERVAÇÕES HUMANAS PENDENTES
  const pendingObs: string[] = [];
  for (const record of Object.values(project.artifacts)) {
    if (record && record.humanObservation && record.humanObservation.status === 'PENDING') {
      pendingObs.push(`- [Observação em ${record.artifactId}]: "${record.humanObservation.text}"`);
    }
  }

  if (pendingObs.length > 0) {
    parts.push(
      `<<< OBSERVAÇÕES HUMANAS PENDENTES >>>\n${pendingObs.join('\n')}\n<<< FIM DAS OBSERVAÇÕES >>>\n`
    );
  }

  // 8. SCHEMA DO OUTPUT ESPERADO
  let schemaInstructions = `Seu retorno final DEVE utilizar exatamente os seguintes delimitadores canônicos:\n\n`;

  if (mode === 'REVALIDATE') {
    schemaInstructions += `<<< RESULTADO DE REVALIDAÇÃO >>>\nSTATUS: SEM_ALTERACAO | COM_ALTERACAO\nMOTIVO: [1 a 3 frases objetivas explicando por que o artefato foi mantido ou alterado]\n<<< FIM DO RESULTADO DE REVALIDAÇÃO >>>\n\n`;
  }

  schemaInstructions += `<<< ARTEFATO ${targetArtifact.id} >>>\n${targetArtifact.markdownTemplate}\n<<< FIM DO ARTEFATO >>>\n\n<<< STATE OF WORK — SOW >>>\n${SOW_SCHEMA_SECTIONS.map((sec) => `${sec}\n[...]`).join('\n\n')}\n<<< FIM DO SOW >>>`;

  parts.push(
    `<<< SCHEMA DO OUTPUT ESPERADO >>>\n${schemaInstructions}\n<<< FIM DO SCHEMA >>>`
  );

  return parts.join('\n');
}
