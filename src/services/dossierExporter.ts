/**
 * Dossier Exporter Service V3
 * Generates deterministic Markdown and printable HTML for the project dossier.
 */
import { ACTIVITIES_V3 } from '../domain/v3/journeyRegistry.ts';
import { getArtifactOrThrow } from '../domain/v3/artifactRegistry.ts';
import { CanonicalProjectStateV3 } from '../domain/v3/types.ts';

export function generateDossierMarkdown(project: CanonicalProjectStateV3): string {
  const lines: string[] = [];

  lines.push(`# DOSSIÊ DO PROJETO: ${project.project.name || 'Sem título'}`);
  lines.push(`**Equipe:** ${project.project.teamName || 'Não informada'}`);
  lines.push(`**Criado em:** ${new Date(project.project.createdAt).toLocaleDateString('pt-BR')}`);
  lines.push(`**Atualizado em:** ${new Date(project.project.updatedAt).toLocaleDateString('pt-BR')}`);
  lines.push('\n---\n');

  lines.push('## ÍNDICE DE ARTEFATOS CONSOLIDADOS\n');
  let count = 0;
  for (const act of ACTIVITIES_V3) {
    const record = project.artifacts[act.artifactId];
    if (record) {
      count++;
      lines.push(`${count}. **${act.artifactId}** — ${act.title} (${record.status})`);
    }
  }

  if (count === 0) {
    lines.push('_Nenhum artefato foi consolidado até o momento._\n');
  }

  lines.push('\n---\n');
  lines.push('## STATE OF WORK (SOW) VIGENTE\n');
  lines.push('```text');
  lines.push(project.currentSow);
  lines.push('```');
  lines.push('\n---\n');

  lines.push('## ARTEFATOS DO PROJETO\n');

  for (const act of ACTIVITIES_V3) {
    const record = project.artifacts[act.artifactId];
    if (record) {
      const def = getArtifactOrThrow(act.artifactId);
      lines.push(`\n# [${def.id}] ${act.title}\n`);
      lines.push(`*Status:* \`${record.status}\` | *Consolidado em:* ${new Date(record.consolidatedAt).toLocaleString('pt-BR')}\n`);
      lines.push(record.body);

      if (record.humanObservation) {
        lines.push(`\n> **Observação humana registrada:** ${record.humanObservation.text}\n`);
      }

      lines.push('\n---\n');
    }
  }

  return lines.join('\n');
}

export function generatePrintableHtml(project: CanonicalProjectStateV3): string {
  const md = generateDossierMarkdown(project);

  // Simple clean HTML wrapper for browser printing
  const htmlContent = md
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-6 mb-3 text-neutral-900 border-b pb-2">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-5 mb-2 text-neutral-800">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium mt-4 mb-2 text-neutral-700">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```text([\s\S]*?)```/gim, '<pre class="bg-neutral-100 p-4 rounded text-xs overflow-x-auto border my-3 whitespace-pre-wrap">$1</pre>')
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-amber-500 pl-4 py-1 italic my-2 text-neutral-700">$1</blockquote>')
    .replace(/\n\n/g, '<p class="my-2 leading-relaxed text-neutral-800"></p>');

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Dossiê — ${project.project.name || 'Projeto'}</title>
  <style>
    @media print {
      body { font-size: 11pt; color: #111; }
      pre { page-break-inside: avoid; }
      h1, h2 { page-break-after: avoid; }
      @page { margin: 20mm; }
    }
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #222; }
    h1 { font-size: 24px; border-bottom: 2px solid #ccc; padding-bottom: 8px; margin-top: 24px; }
    h2 { font-size: 18px; margin-top: 20px; color: #333; }
    pre { background: #f4f4f5; padding: 12px; border-radius: 6px; font-size: 12px; overflow-x: auto; white-space: pre-wrap; }
    hr { border: none; border-top: 1px solid #e4e4e7; margin: 24px 0; }
    blockquote { border-left: 4px solid #f59e0b; margin: 12px 0; padding-left: 12px; color: #555; }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;
}
