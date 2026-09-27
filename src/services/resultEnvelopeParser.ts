/**
 * Result Envelope Parser Service V3
 * Parses the external AI response with strict boundary checks.
 */
import {
  ActivityExecutionMode,
  ArtifactId,
  ParsedEnvelopeResult,
  RevalidationParsedBlock,
  RevalidationResultStatus,
} from '../domain/v3/types.ts';
import { validateSowStructure } from '../domain/v3/sowRegistry.ts';
import { validateArtifactStructure } from './structuralValidator.ts';

export interface ParseResult {
  success: boolean;
  data?: ParsedEnvelopeResult;
  error?: string;
  recoveryGuidance?: string;
}

export function parseResultEnvelope(
  rawText: string,
  expectedArtifactId: ArtifactId,
  mode: ActivityExecutionMode
): ParseResult {
  if (!rawText || typeof rawText !== 'string' || rawText.trim().length === 0) {
    return {
      success: false,
      error: 'Conteúdo vazio.',
      recoveryGuidance:
        'Cole a resposta final fornecida pela sua conversa externa com a IARA antes de consolidar.',
    };
  }

  const text = rawText.trim();

  // 1. If in REVALIDATE mode, verify and extract revalidation block
  let revalidationBlock: RevalidationParsedBlock | undefined;

  if (mode === 'REVALIDATE') {
    const revalRegex =
      /<<< RESULTADO DE REVALIDAÇÃO >>>([\s\S]*?)<<< FIM DO RESULTADO DE REVALIDAÇÃO >>>/i;
    const revalMatch = text.match(revalRegex);

    if (!revalMatch) {
      return {
        success: false,
        error: 'Bloco de Revalidação obrigatório não encontrado.',
        recoveryGuidance:
          'Como esta etapa está em modo REVALIDATE, a IARA deve incluir o bloco "<<< RESULTADO DE REVALIDAÇÃO >>>" com STATUS (SEM_ALTERACAO ou COM_ALTERACAO) e MOTIVO. Peça à mesma conversa para fornecer o resultado completo com esse bloco.',
      };
    }

    const revalContent = revalMatch[1].trim();
    const statusMatch = revalContent.match(/STATUS:\s*(SEM_ALTERACAO|COM_ALTERACAO)/i);

    if (!statusMatch) {
      return {
        success: false,
        error: 'STATUS de revalidação inválido ou ausente.',
        recoveryGuidance:
          'O bloco de revalidação deve conter expressamente "STATUS: SEM_ALTERACAO" ou "STATUS: COM_ALTERACAO". Peça à IA para corrigir o cabeçalho.',
      };
    }

    const status = statusMatch[1].toUpperCase() as RevalidationResultStatus;
    const reasonMatch = revalContent.match(/MOTIVO:\s*([\s\S]*)/i);
    const reason = reasonMatch ? reasonMatch[1].trim() : 'Revalidação concluída.';

    revalidationBlock = { status, reason };
  }

  // 2. Check for Artifact delimiters
  // Allow flexible case or extra spaces in artifact tag
  const artifactRegex = new RegExp(
    `<<<\\s*ARTEFATO\\s+(${expectedArtifactId})\\s*>>>([\\s\\S]*?)<<<\\s*FIM DO ARTEFATO\\s*>>>`,
    'i'
  );
  const artifactMatch = text.match(artifactRegex);

  if (!artifactMatch) {
    // Check if another artifact ID was pasted by mistake
    const anyArtifactRegex = /<<<\s*ARTEFATO\s+(AF\d{2})\s*>>>/i;
    const anyMatch = text.match(anyArtifactRegex);

    if (anyMatch) {
      const foundId = anyMatch[1].toUpperCase();
      return {
        success: false,
        error: `Artefato incorreto: foi encontrado ${foundId}, mas a etapa atual exige ${expectedArtifactId}.`,
        recoveryGuidance: `Certifique-se de que a resposta colada corresponde à atividade ${expectedArtifactId}. Se você estiver na mesma conversa, solicite o artefato da etapa atual.`,
      };
    }

    return {
      success: false,
      error: `Delimitadores do artefato ${expectedArtifactId} não encontrados.`,
      recoveryGuidance: `Não consegui reconhecer o bloco do artefato. O texto deve conter "<<< ARTEFATO ${expectedArtifactId} >>>" no início do documento e "<<< FIM DO ARTEFATO >>>" no término. Volte à mesma conversa com sua IA e peça o resultado no formato canônico solicitado.`,
    };
  }

  const artifactBody = artifactMatch[2].trim();
  if (artifactBody.length < 20) {
    return {
      success: false,
      error: `O corpo do artefato ${expectedArtifactId} parece incompleto ou vazio.`,
      recoveryGuidance:
        'O documento retornado está muito curto. Verifique se o conteúdo foi copiado por inteiro da sua conversa com a IA.',
    };
  }

  // 3. Structural validation of artifact sections
  const artifactStructureValidation = validateArtifactStructure(expectedArtifactId, artifactBody);
  if (!artifactStructureValidation.valid) {
    return {
      success: false,
      error: `Estrutura incompleta no artefato ${expectedArtifactId}.`,
      recoveryGuidance: `Faltam as seguintes seções obrigatórias no documento:\n${artifactStructureValidation.missingSections.map((s) => `• ${s}`).join('\n')}\n\nPeça à IA para preencher todas as seções obrigatórias conforme o schema da atividade.`,
    };
  }

  // 4. Check for SOW delimiters
  const sowRegex =
    /<<<\s*STATE OF WORK\s*[—\-]\s*SOW\s*>>>([\s\S]*?)<<<\s*FIM DO SOW\s*>>>/i;
  const sowMatch = text.match(sowRegex);

  if (!sowMatch) {
    return {
      success: false,
      error: 'Delimitadores do State of Work (SOW) não encontrados.',
      recoveryGuidance:
        'Não foi encontrado o bloco "<<< STATE OF WORK — SOW >>>" e "<<< FIM DO SOW >>>". Toda consolidação de etapa exige o SOW atualizado acompanhando o artefato. Peça à mesma conversa da IA para emitir o SOW junto ao artefato.',
    };
  }

  const sowBody = sowMatch[1].trim();
  if (sowBody.length < 30) {
    return {
      success: false,
      error: 'O corpo do State of Work (SOW) está excessivamente curto ou vazio.',
      recoveryGuidance:
        'O SOW deve conter o resumo das decisões, evidências, hipóteses e artefatos vigentes. Peça à IA para emitir o SOW completo.',
    };
  }

  // 5. Check SOW sections structure
  const sowStructureValidation = validateSowStructure(sowBody);
  if (!sowStructureValidation.valid && sowStructureValidation.missingSections.length > 4) {
    return {
      success: false,
      error: 'O State of Work (SOW) não respeita a estrutura canônica de 8 seções.',
      recoveryGuidance: `O SOW deve conter as 8 seções do SOW_SCHEMA_V3. Seções faltantes:\n${sowStructureValidation.missingSections.map((s) => `• ${s}`).join('\n')}`,
    };
  }

  return {
    success: true,
    data: {
      artifactId: expectedArtifactId,
      artifactBody,
      sowBody,
      revalidation: revalidationBlock,
    },
  };
}
