/**
 * State of Work (SOW) Registry V3
 * SOW_SCHEMA_V3 containing exactly 8 canonical sections.
 */

export const SOW_SCHEMA_SECTIONS = [
  '1. ETAPA CONSOLIDADA / POSIÇÃO SEMÂNTICA ATUAL',
  '2. DECISÕES VIGENTES',
  '3. EVIDÊNCIAS VIGENTES',
  '4. HIPÓTESES ATIVAS',
  '5. SIMULAÇÕES RELEVANTES',
  '6. EM ABERTO',
  '7. ARTEFATOS VIGENTES',
  '8. REVALIDAÇÃO RECOMENDADA',
] as const;

export const DEFAULT_INITIAL_SOW = `1. ETAPA CONSOLIDADA / POSIÇÃO SEMÂNTICA ATUAL
Início da jornada — Projeto ainda não iniciado.

2. DECISÕES VIGENTES
- Nenhuma decisão consolidada até o momento.

3. EVIDÊNCIAS VIGENTES
- Nenhuma evidência registrada.

4. HIPÓTESES ATIVAS
- [HIPÓTESE] A equipe formulará uma tensão inicial no Ponto de Partida.

5. SIMULAÇÕES RELEVANTES
- Nenhuma simulação realizada.

6. EM ABERTO
- [EM ABERTO] Definição do problema ou sonho inicial da equipe.

7. ARTEFATOS VIGENTES
- Nenhum artefato consolidado.

8. REVALIDAÇÃO RECOMENDADA
- Nenhuma.`;

export function validateSowStructure(sowText: string): { valid: boolean; missingSections: string[] } {
  if (!sowText || typeof sowText !== 'string') {
    return { valid: false, missingSections: [...SOW_SCHEMA_SECTIONS] };
  }
  const missing: string[] = [];
  for (const section of SOW_SCHEMA_SECTIONS) {
    // Check if section number and keyword exists in text
    const sectionIndex = section.slice(0, 2); // e.g. "1.", "2."
    const keyword = section.split('/')[0].replace(/^\d+\.\s*/, '').trim().toLowerCase();
    const hasNum = sowText.includes(sectionIndex);
    const hasKeyword = sowText.toLowerCase().includes(keyword.slice(0, 10));
    if (!hasNum && !hasKeyword) {
      missing.push(section);
    }
  }
  return {
    valid: missing.length === 0,
    missingSections: missing,
  };
}
