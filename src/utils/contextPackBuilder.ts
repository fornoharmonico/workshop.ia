import { ArtifactVersion, ContextPackConfig, ProjectStateV2 } from '../types/workshop';

export interface BuiltContextPack {
  formattedText: string;
  snapshotsIncluded: { key: string; label: string; value: string; status: string }[];
  artifactsIncluded: { artifactId: string; versionName: string; versionId: string; isRequired: boolean }[];
  authorityInstruction?: string;
  hasMissingRequiredArtifacts: boolean;
  missingArtifactIds: string[];
}

const FIELD_LABELS: Record<string, string> = {
  problem: 'PROBLEMA',
  audience: 'PÚBLICO-ALVO / USUÁRIOS',
  purpose: 'PROPÓSITO / OBJETIVO CENTRAL',
  solution: 'CONCEITO DA SOLUÇÃO',
  centralHypothesis: 'HIPÓTESE CENTRAL A TESTAR',
  requirements: 'REQUISITOS ESSENCIAIS',
  mvp: 'DEFINIÇÃO DE MVP',
  currentPrototype: 'PROTÓTIPO ATUAL',
};

export function buildContextPack(
  config: ContextPackConfig | undefined,
  artifactVersions: ArtifactVersion[],
  projectState: ProjectStateV2
): BuiltContextPack {
  if (!config) {
    return {
      formattedText: 'Nenhum contexto prévio necessário para esta atividade.',
      snapshotsIncluded: [],
      artifactsIncluded: [],
      hasMissingRequiredArtifacts: false,
      missingArtifactIds: [],
    };
  }

  const sections: string[] = [];
  const snapshotsIncluded: { key: string; label: string; value: string; status: string }[] = [];
  const artifactsIncluded: { artifactId: string; versionName: string; versionId: string; isRequired: boolean }[] = [];
  const missingArtifactIds: string[] = [];

  sections.push('=== PACOTE DE CONTEXTO DO PROJETO (CONTEXT PACK V2) ===');
  sections.push('As informações a seguir foram consolidadas pela equipe do projeto e servem de base obrigatória para esta interação.\n');

  // 1. Snapshot do Estado Atual (Project Claims)
  if (config.snapshotFields && config.snapshotFields.length > 0) {
    const snapshotLines: string[] = [];
    snapshotLines.push('--- ESTADO ATUAL DO PROJETO (DECISÕES E HIPÓTESES) ---');

    for (const fieldKey of config.snapshotFields) {
      const claim = (projectState as Record<string, any>)[fieldKey];
      const label = FIELD_LABELS[fieldKey] || fieldKey.toUpperCase();

      if (claim && claim.value && claim.value.trim() !== '') {
        const statusTag = claim.epistemologicalStatus ? `[${claim.epistemologicalStatus}]` : '[REGISTRADO]';
        snapshotLines.push(`• ${label} ${statusTag}:`);
        snapshotLines.push(`  "${claim.value.trim()}"`);
        
        snapshotsIncluded.push({
          key: fieldKey,
          label,
          value: claim.value.trim(),
          status: claim.epistemologicalStatus || 'REGISTRADO',
        });
      }
    }

    if (snapshotLines.length > 1) {
      sections.push(snapshotLines.join('\n') + '\n');
    }
  }

  // Helper to find latest consolidated artifact version by artifactId
  const findLatestConsolidatedArtifact = (artId: string): ArtifactVersion | undefined => {
    return artifactVersions
      .filter((v) => v.artifactId === artId && v.status === 'CONSOLIDADO')
      .sort((a, b) => b.versionNumber - a.versionNumber)[0];
  };

  // 2. Required Artifacts
  if (config.requiredArtifacts && config.requiredArtifacts.length > 0) {
    sections.push('--- ARTEFATOS OBRIGATÓRIOS CONSOLIDADOS ---');
    for (const artId of config.requiredArtifacts) {
      const version = findLatestConsolidatedArtifact(artId);
      if (version) {
        sections.push(`[ARTEFATO: ${version.versionName.toUpperCase()}]`);
        sections.push(version.content);
        sections.push('');
        artifactsIncluded.push({
          artifactId: artId,
          versionName: version.versionName,
          versionId: version.id,
          isRequired: true,
        });
      } else {
        missingArtifactIds.push(artId);
        sections.push(`[ATENÇÃO: Artefato obrigatório "${artId}" ainda não foi consolidado pela equipe!]`);
      }
    }
  }

  // 3. Optional Artifacts
  if (config.optionalArtifacts && config.optionalArtifacts.length > 0) {
    const optLines: string[] = [];
    for (const artId of config.optionalArtifacts) {
      const version = findLatestConsolidatedArtifact(artId);
      if (version) {
        optLines.push(`[ARTEFATO COMPLEMENTAR: ${version.versionName.toUpperCase()}]`);
        optLines.push(version.content);
        optLines.push('');
        artifactsIncluded.push({
          artifactId: artId,
          versionName: version.versionName,
          versionId: version.id,
          isRequired: false,
        });
      }
    }
    if (optLines.length > 0) {
      sections.push('--- ARTEFATOS COMPLEMENTARES ---');
      sections.push(optLines.join('\n'));
    }
  }

  // 4. Historical Versions (if requested)
  if (config.includeHistoricalVersions) {
    const supersededVersions = artifactVersions.filter((v) => v.status === 'SUPERADO');
    if (supersededVersions.length > 0) {
      sections.push('--- HISTÓRICO DE VERSÕES ANTERIORES (REFERÊNCIA) ---');
      for (const oldVer of supersededVersions) {
        sections.push(`[VERSÃO SUPERADA: ${oldVer.versionName}]`);
        sections.push(oldVer.content);
        sections.push('');
      }
    }
  }

  // 5. Epistemological Authority Hierarchy Instructions
  sections.push('--- REGRAS DE AUTORIDADE E CONFIANÇA DO CONTEXTO ---');
  sections.push('1. MAIOR AUTORIDADE: Artefatos explicitamente consolidados e confirmados pela equipe do projeto (seções "ARTEFATOS OBRIGATÓRIOS/COMPLEMENTARES").');
  sections.push('2. TAMBÉM AUTORITATIVO: Decisões e declarações confirmadas manualmente no estado do projeto.');
  sections.push('3. MENOR AUTORIDADE / INFERÊNCIAS: Resumos automáticos, observações prévias ou conjecturas não consolidadas.');
  sections.push('* REGRA DE PREVALÊNCIA: Em caso de divergência entre um resumo sintetizado do estado e o texto integral de um artefato consolidado, O ARTEFATO CONSOLIDADO PREVALECE.');
  sections.push('* REGRA DE PROMOÇÃO DE STATUS: Jamais promova uma hipótese, suposição ou pergunta aberta a [OBSERVADO] ou [DECIDIDO] sem confirmação humana direta da equipe.');

  if (config.authorityInstructions) {
    sections.push(config.authorityInstructions);
  }
  sections.push('');

  sections.push('=== FIM DO PACOTE DE CONTEXTO ===');

  return {
    formattedText: sections.join('\n\n'),
    snapshotsIncluded,
    artifactsIncluded,
    authorityInstruction: config.authorityInstructions,
    hasMissingRequiredArtifacts: missingArtifactIds.length > 0,
    missingArtifactIds,
  };
}
