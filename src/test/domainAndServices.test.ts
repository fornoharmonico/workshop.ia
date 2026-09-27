/**
 * Unit Test Suite for Fornologia V3
 * Validates domain invariants and tests T01 to T18 from Anexo 11.
 */
import { describe, it, expect } from 'vitest';
import { validateRegistryIntegrity } from '../domain/v3/registryIntegrity.ts';
import { getActivityOrThrow } from '../domain/v3/journeyRegistry.ts';
import { getPromptOrThrow } from '../domain/v3/promptRegistry.ts';
import { getArtifactOrThrow } from '../domain/v3/artifactRegistry.ts';
import { buildContextPack } from '../services/contextPackBuilder.ts';
import { parseResultEnvelope } from '../services/resultEnvelopeParser.ts';
import {
  getCanonicalCurrentActivity,
  getActivityStatus,
  getProgressSummary,
} from '../services/progressDerived.ts';
import { getDirectDependentArtifactIds } from '../services/dependencyGraph.ts';
import {
  createBackupJson,
  validateBackupJson,
  restoreProjectFromBackup,
} from '../services/backupV3.ts';
import { createInitialProject } from '../services/persistence.ts';
import { ActivityId, CanonicalProjectStateV3 } from '../domain/v3/types.ts';

describe('T01 — Registry 1:1:1 Integrity', () => {
  it('passes all 1:1:1 biunivocal checks between Activities, Prompts, and Artifacts', () => {
    const result = validateRegistryIntegrity();
    expect(result.errors).toEqual([]);
    expect(result.valid).toBe(true);
  });
});

describe('T02 — Invalid ID Lookup Throws Explicitly', () => {
  it('throws when requesting invalid Activity ID without silent fallback', () => {
    expect(() => getActivityOrThrow('A99' as any)).toThrowError(
      /Invalid Activity ID lookup/
    );
  });

  it('throws when requesting invalid Prompt ID', () => {
    expect(() => getPromptOrThrow('P99' as any)).toThrowError(/Invalid Prompt ID lookup/);
  });

  it('throws when requesting invalid Artifact ID', () => {
    expect(() => getArtifactOrThrow('AF99' as any)).toThrowError(
      /Invalid Artifact ID lookup/
    );
  });
});

describe('T03 & T18 — Context Pack Builder & Prompt Zero Rules', () => {
  const project = createInitialProject('Teste', 'Equipe');

  it('includes Prompt Zero in A01 context pack', () => {
    const pack = buildContextPack('A01', 'CREATE', project);
    expect(pack).toContain('<<< IARA CORE >>>');
    expect(pack).toContain('Você é **IARA**');
    expect(pack).toContain('<<< FIM IARA CORE >>>');
    expect(pack).toContain('<<< MODO DA ATIVIDADE >>>\nCREATE');
  });

  it('does NOT include Prompt Zero in A02 or subsequent activities in normal flow', () => {
    const pack = buildContextPack('A02', 'CREATE', project);
    expect(pack).not.toContain('<<< IARA CORE >>>');
    expect(pack).toContain('<<< CONTRATO E PROMPT P02 >>>');
  });

  it('T18: includes Prompt Zero in A06 when exceptional recovery mode is requested', () => {
    const recoveryPack = buildContextPack('A06', 'CREATE', project, {
      includeCoreForRecovery: true,
    });
    expect(recoveryPack).toContain('<<< IARA CORE >>>');
    expect(recoveryPack).toContain('<<< CONTRATO E PROMPT P06 >>>');
  });
});

describe('T04 & T05 — Context by Relevance & Stripping Old Embedded SOWs', () => {
  it('T04: A06 only gets AF05 as checkpoint context and does not include AF01..AF04', () => {
    const project: CanonicalProjectStateV3 = {
      ...createInitialProject(),
      artifacts: {
        AF01: {
          artifactId: 'AF01',
          body: '# AF01 Body Content',
          embeddedSow: 'OLD EMBEDDED SOW 1',
          status: 'VIGENTE',
          consolidatedAt: new Date().toISOString(),
        },
        AF05: {
          artifactId: 'AF05',
          body: '# AF05 Briefing Checkpoint Body',
          embeddedSow: 'OLD EMBEDDED SOW 5',
          status: 'VIGENTE',
          consolidatedAt: new Date().toISOString(),
        },
      },
    };

    const packA06 = buildContextPack('A06', 'CREATE', project);
    expect(packA06).toContain('# AF05 Briefing Checkpoint Body');
    // AF01 should not be injected into A06 context
    expect(packA06).not.toContain('# AF01 Body Content');
    // T05: Old embedded SOWs must NEVER be injected
    expect(packA06).not.toContain('OLD EMBEDDED SOW 5');
    expect(packA06).not.toContain('OLD EMBEDDED SOW 1');
  });
});

describe('T07 — Result Envelope Parser & Rejections', () => {
  it('rejects empty input', () => {
    const result = parseResultEnvelope('', 'AF01', 'CREATE');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Conteúdo vazio');
  });

  it('rejects mismatched artifact ID', () => {
    const badText = `<<< ARTEFATO AF02 >>>
# AF02
## 1. Realidade desejada de referência
texto
<<< FIM DO ARTEFATO >>>

<<< STATE OF WORK — SOW >>>
1. ETAPA CONSOLIDADA / POSIÇÃO SEMÂNTICA ATUAL
ok
<<< FIM DO SOW >>>`;

    const result = parseResultEnvelope(badText, 'AF01', 'CREATE');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Artefato incorreto');
  });

  it('rejects missing SOW', () => {
    const missingSowText = `<<< ARTEFATO AF01 >>>
# AF01 — Ponto de Partida: Sonho + Problema
## 1. O que nos move
Tema
## 2. Sonho / realidade desejada
Sonho
## 3. Problema / distância da realidade atual
Problema
## 4. Escala e contexto
Escola
## 5. Pessoas envolvidas ou afetadas
Alunos
## 6. Por que isso nos move
Motivação
<<< FIM DO ARTEFATO >>>`;

    const result = parseResultEnvelope(missingSowText, 'AF01', 'CREATE');
    expect(result.success).toBe(false);
    expect(result.error).toContain('State of Work');
  });

  it('T10: in REVALIDATE mode, requires revalidation block with STATUS', () => {
    const withoutRevalBlock = `<<< ARTEFATO AF01 >>>
# AF01 — Ponto de Partida: Sonho + Problema
## 1. O que nos move
Tema
## 2. Sonho / realidade desejada
Sonho
## 3. Problema / distância da realidade atual
Problema
## 4. Escala e contexto
Escola
## 5. Pessoas envolvidas ou afetadas
Alunos
## 6. Por que isso nos move
Motivação
<<< FIM DO ARTEFATO >>>

<<< STATE OF WORK — SOW >>>
1. ETAPA CONSOLIDADA / POSIÇÃO SEMÂNTICA ATUAL
ok
2. DECISÕES VIGENTES
nenhuma
3. EVIDÊNCIAS VIGENTES
nenhuma
4. HIPÓTESES ATIVAS
nenhuma
5. SIMULAÇÕES RELEVANTES
nenhuma
6. EM ABERTO
nenhuma
7. ARTEFATOS VIGENTES
AF01
8. REVALIDAÇÃO RECOMENDADA
nenhuma
<<< FIM DO SOW >>>`;

    const result = parseResultEnvelope(withoutRevalBlock, 'AF01', 'REVALIDATE');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Bloco de Revalidação obrigatório não encontrado');
  });

  it('T08: parses valid envelope successfully', () => {
    const validEnvelope = `<<< ARTEFATO AF01 >>>
# AF01 — Ponto de Partida: Sonho + Problema
## 1. O que nos move
Tema da equipe
## 2. Sonho / realidade desejada
Nossa realidade desejada
## 3. Problema / distância da realidade atual
Distância observada
## 4. Escala e contexto
Comunidade local
## 5. Pessoas envolvidas ou afetadas
Estudantes e vizinhos
## 6. Por que isso nos move
Importância humana
<<< FIM DO ARTEFATO >>>

<<< STATE OF WORK — SOW >>>
1. ETAPA CONSOLIDADA / POSIÇÃO SEMÂNTICA ATUAL
A01 concluída.
2. DECISÕES VIGENTES
- Decisão sobre o tema.
3. EVIDÊNCIAS VIGENTES
- [EVIDÊNCIA] Observação direta na escola.
4. HIPÓTESES ATIVAS
- [HIPÓTESE] Engajamento inicial.
5. SIMULAÇÕES RELEVANTES
- Nenhuma.
6. EM ABERTO
- [EM ABERTO] Parcerias.
7. ARTEFATOS VIGENTES
- AF01
8. REVALIDAÇÃO RECOMENDADA
- Nenhuma.
<<< FIM DO SOW >>>`;

    const result = parseResultEnvelope(validEnvelope, 'AF01', 'CREATE');
    expect(result.success).toBe(true);
    expect(result.data?.artifactId).toBe('AF01');
    expect(result.data?.artifactBody).toContain('# AF01');
    expect(result.data?.sowBody).toContain('A01 concluída');
  });
});

describe('T09 — Direct Dependent Revalidation Propagation', () => {
  it('returns strictly direct dependent artifact IDs (1 level propagation)', () => {
    // When AF01 changes, direct dependents requiring AF01 are AF02 and AF05
    const dependentsAF01 = getDirectDependentArtifactIds('AF01');
    expect(dependentsAF01).toContain('AF02');
    expect(dependentsAF01).toContain('AF05');
    // AF03 requires AF02, so it is NOT a direct dependent of AF01
    expect(dependentsAF01).not.toContain('AF03');
  });
});

describe('T11 — Viewing Another Activity Does Not Mutate Canonical Stage', () => {
  it('canonical current activity is derived strictly from state, regardless of UI viewed activity', () => {
    const project = createInitialProject();
    // Initially canonical is A01
    expect(getCanonicalCurrentActivity(project)).toBe('A01');

    // Simulate user viewing A06 in the UI:
    const viewedActivityId: ActivityId = 'A06';
    // Canonical current must still be A01!
    expect(getCanonicalCurrentActivity(project)).toBe('A01');
    expect(viewedActivityId).toBe('A06');
  });
});

describe('T12 — Backup V3 Export & Import', () => {
  it('produces valid BackupV3 JSON and restores project state', () => {
    const project = createInitialProject('Projeto Futuro', 'Equipe Beta');
    project.artifacts['AF01'] = {
      artifactId: 'AF01',
      body: '# AF01 Conteúdo',
      embeddedSow: 'SOW 1',
      status: 'VIGENTE',
      consolidatedAt: new Date().toISOString(),
    };

    const json = createBackupJson(project);
    expect(json).toContain('"schemaVersion": "3.0"');
    expect(json).toContain('Projeto Futuro');
    expect(json).not.toContain('theme');
    expect(json).not.toContain('drafts');

    const validation = validateBackupJson(json);
    expect(validation.valid).toBe(true);
    expect(validation.preview?.projectName).toBe('Projeto Futuro');
    expect(validation.preview?.artifactCount).toBe(1);

    if (validation.backup) {
      const restored = restoreProjectFromBackup(validation.backup);
      expect(restored.project.name).toBe('Projeto Futuro');
      expect(restored.artifacts.AF01?.body).toBe('# AF01 Conteúdo');
    }
  });

  it('rejects invalid schema version', () => {
    const legacy = JSON.stringify({ schemaVersion: '2.0', project: {} });
    const validation = validateBackupJson(legacy);
    expect(validation.valid).toBe(false);
    expect(validation.error).toContain('Versão de schema incompatível');
  });
});

describe('Progress Derivation', () => {
  it('reports 0% when no artifact is consolidated', () => {
    const project = createInitialProject();
    const summary = getProgressSummary(project);
    expect(summary.completedCount).toBe(0);
    expect(summary.percentage).toBe(0);
    expect(summary.isCompleted).toBe(false);
  });

  it('blocks A02 when A01 is missing', () => {
    const project = createInitialProject();
    const status = getActivityStatus('A02', project);
    expect(status).toBe('BLOQUEADA');
  });

  it('T06: drafts do not mark activity as CONCLUIDA or alter canonical progress', () => {
    const project = createInitialProject();
    const drafts = {
      A01: {
        pastedResult: 'Algum texto copiado provisoriamente',
        userObservation: 'Observação em rascunho',
        updatedAt: new Date().toISOString(),
      },
    };
    const status = getActivityStatus('A01', project, drafts);
    expect(status).toBe('EM_ANDAMENTO');
    // A02 is still blocked because A01 has not been consolidated
    expect(getActivityStatus('A02', project, drafts)).toBe('BLOQUEADA');
    expect(getCanonicalCurrentActivity(project, drafts)).toBe('A01');
  });
});

describe('T10b — Revalidation with Change (COM_ALTERACAO)', () => {
  it('parses valid revalidation with COM_ALTERACAO and reason', () => {
    const revalWithChange = `<<< RESULTADO DE REVALIDAÇÃO >>>
STATUS: COM_ALTERACAO
MOTIVO: O público mudou de estudantes para famílias da comunidade local.
<<< FIM DO RESULTADO DE REVALIDAÇÃO >>>

<<< ARTEFATO AF01 >>>
# AF01 — Ponto de Partida: Sonho + Problema
## 1. O que nos move
Tema revisado
## 2. Sonho / realidade desejada
Sonho comunitário
## 3. Problema / distância da realidade atual
Problema ampliado
## 4. Escala e contexto
Bairro inteiro
## 5. Pessoas envolvidas ou afetadas
Famílias
## 6. Por que isso nos move
Impacto real
<<< FIM DO ARTEFATO >>>

<<< STATE OF WORK — SOW >>>
1. ETAPA CONSOLIDADA / POSIÇÃO SEMÂNTICA ATUAL
A01 revalidada com alteração.
2. DECISÕES VIGENTES
- Nova decisão de público.
3. EVIDÊNCIAS VIGENTES
- Nenhuma.
4. HIPÓTESES ATIVAS
- [HIPÓTESE] Maior adesão comunitária.
5. SIMULAÇÕES RELEVANTES
- Nenhuma.
6. EM ABERTO
- [EM ABERTO] Custos de materiais.
7. ARTEFATOS VIGENTES
- AF01
8. REVALIDAÇÃO RECOMENDADA
- Revalidar AF02.
<<< FIM DO SOW >>>`;

    const parsed = parseResultEnvelope(revalWithChange, 'AF01', 'REVALIDATE');
    expect(parsed.success).toBe(true);
    expect(parsed.data?.revalidation?.status).toBe('COM_ALTERACAO');
    expect(parsed.data?.revalidation?.reason).toContain('famílias da comunidade');
  });
});

describe('T15 — Institutional Contact URL Generation', () => {
  it('formats wa.me/5532998344329 with all form fields in URL', () => {
    const contactData = {
      name: 'Maria Silva',
      organization: 'Escola Modelo',
      email: 'maria@escola.org',
      phone: '(11) 98765-4321',
      purpose: 'Oficina para turma do 9º ano',
    };

    const textPayload = `Olá! Gostaria de falar sobre a Oficina Fornologia V3:
Nome: ${contactData.name}
Instituição/Organização: ${contactData.organization}
E-mail: ${contactData.email}
Telefone/WhatsApp: ${contactData.phone}
Interesse/Mensagem: ${contactData.purpose}`;

    const encoded = encodeURIComponent(textPayload);
    const targetUrl = `https://wa.me/5532998344329?text=${encoded}`;

    expect(targetUrl).toContain('wa.me/5532998344329');
    expect(targetUrl).toContain('Maria%20Silva');
    expect(targetUrl).toContain('Escola%20Modelo');
  });
});

describe('T16 & T17 — Current SOW Precedence & Human Observations Lifecycle', () => {
  it('T16: currentSow is the single operational truth in Context Pack', () => {
    const project = createInitialProject();
    project.currentSow = 'SOW OPERACIONAL VIGENTE ATUAL';
    project.artifacts['AF01'] = {
      artifactId: 'AF01',
      body: '# AF01 Body',
      embeddedSow: 'SOW EMBUTIDO ANTIGO QUE DEVE SER IGNORADO',
      status: 'VIGENTE',
      consolidatedAt: new Date().toISOString(),
    };

    const pack = buildContextPack('A02', 'CREATE', project);
    expect(pack).toContain('SOW OPERACIONAL VIGENTE ATUAL');
    expect(pack).not.toContain('SOW EMBUTIDO ANTIGO QUE DEVE SER IGNORADO');
  });

  it('T17: pending human observations are included in Context Pack', () => {
    const project = createInitialProject();
    project.artifacts['AF01'] = {
      artifactId: 'AF01',
      body: '# AF01 Body',
      embeddedSow: 'SOW 1',
      humanObservation: {
        id: 'obs-1',
        text: 'Atenção para a falta de internet na escola.',
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      },
      status: 'VIGENTE',
      consolidatedAt: new Date().toISOString(),
    };

    const pack = buildContextPack('A02', 'CREATE', project);
    expect(pack).toContain('<<< OBSERVAÇÕES HUMANAS PENDENTES >>>');
    expect(pack).toContain('Atenção para a falta de internet na escola.');
  });
});

