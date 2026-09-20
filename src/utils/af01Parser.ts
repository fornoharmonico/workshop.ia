/**
 * PARSER E ESTRUTURA DO ARTEFATO AF01 — V2.3 CANDIDATA
 * Fornologia V2.3 — Ponto de Partida: Sonho + Problema
 *
 * Mapeia o artefato textual em estrutura de dados canônica e garante
 * retrocompatibilidade integral com artefatos legados da V2.2.
 */

export type AF01EntryMode = 'dream' | 'problem' | 'exploratory';

export interface AF01StructuredV23 {
  artifactId: 'AF01';
  artifactVersion: '2.3' | '2.2';
  entryMode: AF01EntryMode;
  whatMovesUs: string;
  desiredState: string;
  currentGapOrProblem: string;
  scaleAndContext: string;
  peopleInvolvedOrAffected: string;
  humanMotivation: string;
  canonicalText: string;
  validatedByHuman: boolean;
  consolidatedAt?: string;
}

/**
 * Faz o parsing tolerante e estruturado do texto de AF01.
 * Extrai seções canônicas da V2.3 ou remapeia seções legadas da V2.2.
 */
export function parseAF01Text(rawText: string): AF01StructuredV23 {
  const text = (rawText || '').trim();

  // Template vazio inicial
  const result: AF01StructuredV23 = {
    artifactId: 'AF01',
    artifactVersion: '2.3',
    entryMode: 'problem',
    whatMovesUs: '',
    desiredState: '',
    currentGapOrProblem: '',
    scaleAndContext: '',
    peopleInvolvedOrAffected: '',
    humanMotivation: '',
    canonicalText: text,
    validatedByHuman: text.length > 20
  };

  if (!text) return result;

  // Helper para extrair seção por regex entre títulos numerados
  const extractSection = (pattern: RegExp): string => {
    const match = text.match(pattern);
    return match && match[1] ? match[1].trim() : '';
  };

  // 1. Detecta explicitamente formato legado V2.2 se contiver cabeçalhos legados
  const isLegacyV22 = /(?:INVENTÁRIO DE DESAFIOS|PROBLEMA ESCOLHIDO PELA EQUIPE|JUSTIFICATIVA HUMANA DA ESCOLHA)/i.test(text);

  if (isLegacyV22) {
    const legProblem = extractSection(/(?:2\.\s*PROBLEMA ESCOLHIDO PELA EQUIPE|PROBLEMA ESCOLHIDO\s*:?)([\s\S]*?)(?=(?:3\.\s*JUSTIFICATIVA|JUSTIFICATIVA HUMANA|$))/i);
    const legJustification = extractSection(/(?:3\.\s*JUSTIFICATIVA HUMANA DA ESCOLHA|JUSTIFICATIVA\s*:?)([\s\S]*?)(?=(?:4\.\s*PESSOAS E CONTEXTO|PESSOAS E CONTEXTO|$))/i);
    const legPeople = extractSection(/(?:4\.\s*PESSOAS E CONTEXTO AFETADOS|PESSOAS E CONTEXTO AFETADOS\s*:?)([\s\S]*?)$/i);

    result.artifactVersion = '2.2';
    result.entryMode = 'problem';
    result.whatMovesUs = legProblem || 'Problema mapeado pela equipe';
    result.currentGapOrProblem = legProblem;
    result.humanMotivation = legJustification;
    result.peopleInvolvedOrAffected = legPeople;
    result.desiredState = 'Transformação da realidade identificada no problema.';
    result.scaleAndContext = legPeople;
    return result;
  }

  // 2. Extrai formato canônico V2.3
  const sec1 = extractSection(/(?:1\.\s*O QUE NOS MOVE|O QUE NOS MOVE\s*:?)([\s\S]*?)(?=(?:2\.\s*SONHO|2\.\s*REALIDADE DESEJADA|SONHO \/ REALIDADE DESEJADA|$))/i);
  const sec2 = extractSection(/(?:2\.\s*(?:SONHO|REALIDADE DESEJADA|SONHO \/\s*REALIDADE DESEJADA)|(?:SONHO|REALIDADE DESEJADA)\s*:?)([\s\S]*?)(?=(?:3\.\s*PROBLEMA|3\.\s*DISTÂNCIA|PROBLEMA \/\s*DISTÂNCIA|$))/i);
  const sec3 = extractSection(/(?:3\.\s*(?:PROBLEMA|DISTÂNCIA|PROBLEMA \/\s*DISTÂNCIA)|(?:PROBLEMA|DISTÂNCIA)\s*:?)([\s\S]*?)(?=(?:4\.\s*ESCALA|ESCALA E CONTEXTO|$))/i);
  const sec4 = extractSection(/(?:4\.\s*ESCALA E CONTEXTO|ESCALA E CONTEXTO\s*:?)([\s\S]*?)(?=(?:5\.\s*PESSOAS|PESSOAS ENVOLVIDAS|$))/i);
  const sec5 = extractSection(/(?:5\.\s*PESSOAS ENVOLVIDAS OU AFETADAS|PESSOAS ENVOLVIDAS OU AFETADAS\s*:?)([\s\S]*?)(?=(?:6\.\s*POR QUE ISSO NOS MOVE|POR QUE ISSO NOS MOVE|$))/i);
  const sec6 = extractSection(/(?:6\.\s*POR QUE ISSO NOS MOVE|POR QUE ISSO NOS MOVE\s*:?)([\s\S]*?)$/i);

  const isV23 = Boolean(sec1 || sec2 || sec3 || sec4 || sec5 || sec6);

  if (isV23) {
    result.artifactVersion = '2.3';
    result.whatMovesUs = sec1;
    result.desiredState = sec2;
    result.currentGapOrProblem = sec3;
    result.scaleAndContext = sec4;
    result.peopleInvolvedOrAffected = sec5;
    result.humanMotivation = sec6;

    if (sec2 && !sec3) {
      result.entryMode = 'dream';
    } else if (sec3 && !sec2) {
      result.entryMode = 'problem';
    } else if (sec1.toLowerCase().includes('sonho') || sec1.toLowerCase().includes('publicar') || sec1.toLowerCase().includes('criar')) {
      result.entryMode = 'dream';
    } else if (sec1.toLowerCase().includes('problema') || sec1.toLowerCase().includes('falta') || sec1.toLowerCase().includes('dificuldade')) {
      result.entryMode = 'problem';
    } else {
      result.entryMode = 'dream';
    }
    return result;
  }

  // 3. Fallback para texto livre se não encontrar títulos de seções
  result.whatMovesUs = text.slice(0, 150);
  result.currentGapOrProblem = text;
  result.desiredState = 'Realidade desejada a definir com base no ponto de partida.';
  result.humanMotivation = 'Compromisso da equipe com a transformação do projeto.';
  return result;
}

/**
 * Monta o texto canônico de AF01 a partir dos campos estruturados.
 */
export function formatAF01CanonicalText(data: Partial<AF01StructuredV23>): string {
  return [
    '# AF01 — PONTO DE PARTIDA: SONHO + PROBLEMA',
    '',
    '1. O QUE NOS MOVE',
    data.whatMovesUs || '[A definir pela equipe]',
    '',
    '2. SONHO / REALIDADE DESEJADA',
    data.desiredState || '[A definir pela equipe]',
    '',
    '3. PROBLEMA / DISTÂNCIA DA REALIDADE ATUAL',
    data.currentGapOrProblem || '[A definir pela equipe]',
    '',
    '4. ESCALA E CONTEXTO',
    data.scaleAndContext || '[A definir pela equipe]',
    '',
    '5. PESSOAS ENVOLVIDAS OU AFETADAS',
    data.peopleInvolvedOrAffected || '[A definir pela equipe]',
    '',
    '6. POR QUE ISSO NOS MOVE',
    data.humanMotivation || '[A definir pela equipe]'
  ].join('\n');
}
