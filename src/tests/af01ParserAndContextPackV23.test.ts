import { describe, it, expect } from 'vitest';
import { parseAF01Text, formatAF01CanonicalText } from '../utils/af01Parser';
import { buildContextPackV2 } from '../utils/contextPackBuilderV2';
import { ProjectStateV2 } from '../types/canonicalV2';

describe('AF01 Parser & V2.3 Context Pack Injection', () => {
  const dryRunAF01Text = `# AF01 — PONTO DE PARTIDA: SONHO + PROBLEMA

1. O QUE NOS MOVE
A vontade de conectar as pessoas à beleza e síntese poética do Haikai com o sotaque e afeto mineiro.

2. SONHO / REALIDADE DESEJADA
Um gerador poético acessível chamado "Haikai Uai" que cria versos ternos, cômicos e expressivos sobre o cotidiano de Minas Gerais.

3. PROBLEMA / DISTÂNCIA DA REALIDADE ATUAL
As pessoas acham que poesia é algo distante, acadêmico e difícil de criar no dia a dia.

4. ESCALA E CONTEXTO
Escola estadual de Belo Horizonte, jovens e professores no intervalo e salas de aula.

5. PESSOAS ENVOLVIDAS OU AFETADAS
Estudantes do ensino médio, educadores e amantes da cultura mineira.

6. POR QUE ISSO NOS MOVE
Acreditamos que todo mineiro tem uma alma poética guardada e que o riso aproxima as pessoas.`;

  it('deve fazer o parsing exato do AF01 da V2.3 com os 6 campos canônicos', () => {
    const parsed = parseAF01Text(dryRunAF01Text);

    expect(parsed.artifactVersion).toBe('2.3');
    expect(parsed.whatMovesUs).toContain('conectar as pessoas à beleza e síntese poética');
    expect(parsed.desiredState).toContain('Haikai Uai');
    expect(parsed.currentGapOrProblem).toContain('As pessoas acham que poesia é algo distante');
    expect(parsed.scaleAndContext).toContain('Escola estadual de Belo Horizonte');
    expect(parsed.peopleInvolvedOrAffected).toContain('Estudantes do ensino médio');
    expect(parsed.humanMotivation).toContain('alma poética guardada');
    expect(parsed.validatedByHuman).toBe(true);
  });

  it('deve manter retrocompatibilidade com AF01 no formato legado V2.2', () => {
    const legacyAF01 = `# AF01 — MAPA DE PROBLEMAS + PROBLEMA ESCOLHIDO
1. INVENTÁRIO DE DESAFIOS PERCEBIDOS:
- Desperdício de água
- Falta de opções culturais

2. PROBLEMA ESCOLHIDO PELA EQUIPE:
Dificuldade dos alunos em expressar sentimentos e emoções no ambiente escolar.

3. JUSTIFICATIVA HUMANA DA ESCOLHA:
Vemos muitos colegas isolados e calados, e queremos criar um espaço de acolhimento.

4. PESSOAS E CONTEXTO AFETADOS:
Estudantes da nossa turma do 9º ano na Escola Municipal Central.`;

    const parsed = parseAF01Text(legacyAF01);
    expect(parsed.artifactVersion).toBe('2.2');
    expect(parsed.currentGapOrProblem).toContain('expressar sentimentos e emoções');
    expect(parsed.humanMotivation).toContain('espaço de acolhimento');
    expect(parsed.peopleInvolvedOrAffected).toContain('Estudantes da nossa turma');
  });

  it('deve injetar o AF01 consolidado no P02 sem deixar NENHUM placeholder não resolvido (teste Haikai Uai)', () => {
    const state: ProjectStateV2 = {
      schemaVersion: 2,
      projectId: 'proj-haikai',
      projectName: 'Haikai Uai',
      currentActivityId: 'A02',
      projectContext: {
        teamName: 'Poetas de Minas',
        problemSummary: 'Poesia distante do cotidiano',
        targetAudience: 'Estudantes e comunidade escolar',
        territory: 'Belo Horizonte',
        selectedCause: ''
      },
      artifacts: {
        AF01: {
          id: 'AF01',
          content: dryRunAF01Text,
          status: 'validated',
          origin: 'ai_supported'
        }
      },
      activityStatus: {}
    };

    const pack = buildContextPackV2('A02', state);

    expect(pack.hasMissingRequired).toBe(false);
    expect(pack.isPromptReady).toBe(true);
    expect(pack.validation.isValid).toBe(true);
    expect(pack.validation.unresolvedPlaceholders.length).toBe(0);

    // Verificação de interpolação segura
    expect(pack.interpolatedPrompt).not.toContain('{AF01_CONSOLIDADO}');
    expect(pack.interpolatedPrompt).not.toContain('{PROBLEMA_ESCOLHIDO_AF01}');
    expect(pack.interpolatedPrompt).not.toContain('{JUSTIFICATIVA_AF01}');
    expect(pack.interpolatedPrompt).not.toContain('{PESSOAS_AFETADAS_AF01}');

    // Conteúdo injetado comprovado
    expect(pack.interpolatedPrompt).toContain('Haikai Uai');
    expect(pack.interpolatedPrompt).toContain('conectar as pessoas à beleza e síntese poética');
    expect(pack.interpolatedPrompt).toContain('Fornologia V2.3');
  });

  it('deve bloquear a prontidão do P02 com mensagem amigável se AF01 não foi consolidado', () => {
    const emptyState: ProjectStateV2 = {
      schemaVersion: 2,
      projectId: 'proj-empty',
      projectName: 'Projeto Inicial',
      currentActivityId: 'A02',
      projectContext: {
        teamName: 'Equipe Nova',
        problemSummary: '',
        targetAudience: '',
        territory: '',
        selectedCause: ''
      },
      artifacts: {},
      activityStatus: {}
    };

    const pack = buildContextPackV2('A02', emptyState);

    expect(pack.hasMissingRequired).toBe(true);
    expect(pack.isPromptReady).toBe(false);
    expect(pack.validation.missingRequiredArtifacts).toContain('AF01');
    expect(pack.validation.errorMessage).toBeDefined();
    expect(pack.validation.errorMessage).toContain('O contexto da etapa anterior');
    expect(pack.validation.errorMessage).toContain('Seu trabalho não foi apagado');
  });
});
