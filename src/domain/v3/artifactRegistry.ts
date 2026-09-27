/**
 * Canonical Artifact Registry V3
 * Exact 11 Artifact schemas (AF01..AF11).
 */
import { ArtifactDefinition, ArtifactId } from './types.ts';

export const ARTIFACTS_V3: ArtifactDefinition[] = [
  {
    id: 'AF01',
    activityId: 'A01',
    title: 'AF01 — Ponto de Partida: Sonho + Problema',
    kind: 'document',
    functionDescription: 'Tensão inicial autêntica que move a equipe.',
    requiredSections: [
      '1. O que nos move',
      '2. Sonho / realidade desejada',
      '3. Problema / distância da realidade atual',
      '4. Escala e contexto',
      '5. Pessoas envolvidas ou afetadas',
      '6. Por que isso nos move',
    ],
    markdownTemplate: `# AF01 — Ponto de Partida: Sonho + Problema

## 1. O que nos move
[Descreva o tema, incômodo ou curiosidade central que mobilizou a equipe]

## 2. Sonho / realidade desejada
[Como seria o cenário ideal ou a realidade que queremos construir]

## 3. Problema / distância da realidade atual
[Qual é a situação real hoje e qual a distância em relação ao sonho]

## 4. Escala e contexto
[Onde isso acontece: escola, bairro, comunidade, digital, pessoal]

## 5. Pessoas envolvidas ou afetadas
[Quem vive esse problema ou quem se beneficia da realidade desejada]

## 6. Por que isso nos move
[Qual a relevância e motivação real da equipe para dedicar energia a este desafio]`,
  },
  {
    id: 'AF02',
    activityId: 'A02',
    title: 'AF02 — Diagnóstico da Tensão de Projeto',
    kind: 'document',
    functionDescription: 'Diagnóstico que distingue evidência, hipótese e lacuna.',
    requiredSections: [
      '1. Realidade desejada de referência',
      '2. Problema / distância investigada',
      '3. Enquadramento da situação',
      '4. Quem é afetado e como',
      '5. Observações e evidências diretas',
      '6. Hipóteses e suposições',
      '7. Dúvidas e lacunas',
      '8. Causas/impedimentos possíveis: imediatos, intermediários e profundos',
      '9. O que precisa ser investigado no mundo real',
      '10. Síntese do diagnóstico',
    ],
    markdownTemplate: `# AF02 — Diagnóstico da Tensão de Projeto

## 1. Realidade desejada de referência
[Ponto de chegada desejado]

## 2. Problema / distância investigada
[A tensão central a ser compreendida]

## 3. Enquadramento da situação
[Contexto objetivo e limites do problema]

## 4. Quem é afetado e como
[Impactos reais nas pessoas envolvidas]

## 5. Observações e evidências diretas
[Fatos observados no mundo real com fontes mínimas]

## 6. Hipóteses e suposições
[Explicações plausíveis ainda não confirmadas]

## 7. Dúvidas e lacunas
[O que não sabemos e precisamos assumir como "em aberto"]

## 8. Causas/impedimentos possíveis: imediatos, intermediários e profundos
[Camadas de causas investigadas]

## 9. O que precisa ser investigado no mundo real
[Perguntas que exigem contato com a realidade]

## 10. Síntese do diagnóstico
[Conclusão clara do diagnóstico sem promover hipóteses a fatos]`,
  },
  {
    id: 'AF03',
    activityId: 'A03',
    title: 'AF03 — Mapa de Recursos 4D',
    kind: 'document',
    functionDescription: 'Recursos e lacunas cultural, social, ambiental e financeira.',
    requiredSections: [
      '1. Cultural — Temos / Precisamos / Podemos mobilizar / Precisamos investigar',
      '2. Social — Temos / Precisamos / Podemos mobilizar / Precisamos investigar',
      '3. Ambiental — Temos / Precisamos / Podemos mobilizar / Precisamos investigar',
      '4. Financeira — Temos / Precisamos / Podemos mobilizar / Precisamos investigar',
      '5. Maiores forças da equipe e do território',
      '6. Principais lacunas a resolver',
    ],
    markdownTemplate: `# AF03 — Mapa de Recursos 4D

## 1. Cultural — Temos / Precisamos / Podemos mobilizar / Precisamos investigar
- **Temos**: [Saberes, competências, valores que já possuímos]
- **Precisamos**: [Conhecimentos ausentes indispensáveis]
- **Podemos mobilizar**: [Quem pode nos ensinar ou apoiar]
- **Precisamos investigar**: [Lacunas a compreender]

## 2. Social — Temos / Precisamos / Podemos mobilizar / Precisamos investigar
- **Temos**: [Pessoas da equipe, relações próximas]
- **Precisamos**: [Contatos e redes que ainda não temos]
- **Podemos mobilizar**: [Comunidades, lideranças, parcerias possíveis]
- **Precisamos investigar**: [Como acessar grupos-chave]

## 3. Ambiental — Temos / Precisamos / Podemos mobilizar / Precisamos investigar
- **Temos**: [Espaços, ferramentas, internet, materiais disponíveis]
- **Precisamos**: [Infraestrutura física ou digital faltante]
- **Podemos mobilizar**: [Equipamentos emprestados, espaços públicos]
- **Precisamos investigar**: [Condições de acesso e segurança]

## 4. Financeira — Temos / Precisamos / Podemos mobilizar / Precisamos investigar
- **Temos**: [Recursos próprios, trocas viáveis]
- **Precisamos**: [Custos indispensáveis estimados]
- **Podemos mobilizar**: [Doações, apoios pontuais, autofinanciamento]
- **Precisamos investigar**: [Valores reais de mercado]

## 5. Maiores forças da equipe e do território
[Ativos principais para alavancar a ação]

## 6. Principais lacunas a resolver
[Pontos de atenção que exigirão cuidado especial]`,
  },
  {
    id: 'AF04',
    activityId: 'A04',
    title: 'AF04 — Propósito e Direção',
    kind: 'document',
    functionDescription: 'Transformação pretendida, princípios e direção escolhida.',
    requiredSections: [
      '1. Transformação desejada',
      '2. Por que isso importa',
      '3. Princípios inegociáveis de ação',
      '4. Direção da solução escolhida pela equipe',
    ],
    markdownTemplate: `# AF04 — Propósito e Direção

## 1. Transformação desejada
[O que mudará concretamente no mundo se tivermos sucesso]

## 2. Por que isso importa
[A razão de ser e o propósito humano do projeto]

## 3. Princípios inegociáveis de ação
[2 ou 3 regras éticas e práticas fundamentais que não abriremos mão]

## 4. Direção da solução escolhida pela equipe
[O caminho ou conceito adotado pela equipe — decisão humana explícita]`,
  },
  {
    id: 'AF05',
    activityId: 'A05',
    title: 'AF05 — Briefing',
    kind: 'document',
    functionDescription: 'Checkpoint completo e autossuficiente que consolida a fase de investigação e direção.',
    requiredSections: [
      '1. Nome provisório ou título do projeto',
      '2. Resumo executivo em até 6 linhas',
      '3. Ponto de partida e tensão',
      '4. Problema e contexto',
      '5. Público/comunidade envolvida',
      '6. Evidências e observações disponíveis',
      '7. Hipóteses relevantes',
      '8. Dúvidas e questões em aberto',
      '9. Causas/impedimentos investigados',
      '10. Recursos 4D: forças, mobilizáveis e lacunas',
      '11. Propósito e transformação pretendida',
      '12. Princípios inegociáveis',
      '13. Direção/conceito da solução escolhida',
      '14. Resultados esperados e sinais iniciais de sucesso',
      '15. Riscos, restrições e pontos de incerteza',
      '16. O que ainda precisa ser validado/investigado',
    ],
    markdownTemplate: `# AF05 — Briefing

## 1. Nome provisório ou título do projeto
[Título de trabalho do projeto]

## 2. Resumo executivo em até 6 linhas
[Síntese clara e densa do projeto em até seis linhas]

## 3. Ponto de partida e tensão
[Origem do projeto e o descompasso investigado]

## 4. Problema e contexto
[Definição precisa do problema no seu território/escopo]

## 5. Público/comunidade envolvida
[Pessoas afetadas e participantes centrais]

## 6. Evidências e observações disponíveis
[Fatos reais documentados até o momento]

## 7. Hipóteses relevantes
[Premissas que ainda precisam de confirmação]

## 8. Dúvidas e questões em aberto
[Pontos não resolvidos aceitos conscientemente]

## 9. Causas/impedimentos investigados
[Raízes do problema identificadas]

## 10. Recursos 4D: forças, mobilizáveis e lacunas
[Síntese dos recursos culturais, sociais, ambientais e financeiros]

## 11. Propósito e transformação pretendida
[O impacto almejado]

## 12. Princípios inegociáveis
[Valores operacionais que norteiam a conduta]

## 13. Direção/conceito da solução escolhida
[Conceito da intervenção escolhido pela equipe]

## 14. Resultados esperados e sinais iniciais de sucesso
[Como saberemos se estamos no caminho certo]

## 15. Riscos, restrições e pontos de incerteza
[Fatores críticos que exigem cautela]

## 16. O que ainda precisa ser validado/investigado
[Próximos passos de validação no mundo real]`,
  },
  {
    id: 'AF06',
    activityId: 'A06',
    title: 'AF06 — Especificação de Funcionamento / PRD',
    kind: 'document',
    functionDescription: 'Como a solução precisa funcionar sem pressupor um formato tecnológico específico.',
    requiredSections: [
      '1. Objetivo da solução',
      '2. Usuário/público principal',
      '3. Jornada/experiência passo a passo',
      '4. Requisitos essenciais / must have',
      '5. Requisitos desejáveis / depois',
      '6. Conteúdos, dados ou materiais necessários',
      '7. Critérios de qualidade e funcionamento',
      '8. Restrições e limitações conhecidas',
      '9. Dúvidas em aberto',
    ],
    markdownTemplate: `# AF06 — Especificação de Funcionamento / PRD

## 1. Objetivo da solução
[O que a solução faz de forma direta]

## 2. Usuário/público principal
[Quem vai interagir ou se beneficiar diretamente]

## 3. Jornada/experiência passo a passo
[Como o usuário começa, passa pelo núcleo da experiência e conclui]

## 4. Requisitos essenciais / must have
[O que é indispensável para funcionar agora]

## 5. Requisitos desejáveis / depois
[O que agrega valor mas pode ficar para versões futuras]

## 6. Conteúdos, dados ou materiais necessários
[Insumos concretos necessários para a solução existir]

## 7. Critérios de qualidade e funcionamento
[Como avaliar se a solução está funcionando bem]

## 8. Restrições e limitações conhecidas
[Prazos, orçamento, capacidades e limites técnicos/físicos]

## 9. Dúvidas em aberto
[Questões funcionais que serão decididas após o teste]`,
  },
  {
    id: 'AF07',
    activityId: 'A07',
    title: 'AF07 — MVP + Protótipo V0 + Plano de Realização',
    kind: 'prototype',
    functionDescription: 'Recorte mínimo testável e engenharia prática da realização.',
    requiredSections: [
      '1. Hipótese central a testar',
      '2. Descrição do MVP em uma frase',
      '3. O que inclui',
      '4. O que deliberadamente não inclui agora',
      '5. Formato escolhido para o Protótipo V0 e justificativa',
      '6. Plano de realização: quando / evento / espaço / pessoas',
      '7. Objetivo, essenciais, expectativas, organização, prioridades, riscos e plano B',
      '8. Registro/acesso/instruções do Protótipo V0',
      '9. Como poderá ser testado e o que observar',
    ],
    markdownTemplate: `# AF07 — MVP + Protótipo V0 + Plano de Realização

## 1. Hipótese central a testar
[A principal suposição de risco que este protótipo colocará à prova]

## 2. Descrição do MVP em uma frase
[O menor artefato concreto capaz de gerar aprendizado relevante]

## 3. O que inclui
[Funcionalidades e elementos presentes no teste inicial]

## 4. O que deliberadamente não inclui agora
[Elementos adiados para evitar desperdício]

## 5. Formato escolhido para o Protótipo V0 e justificativa
[Digital, físico, manual, encenação, serviço, evento ou híbrido e o porquê]

## 6. Plano de realização: quando / evento / espaço / pessoas
- **Quando**: [Datas e horários]
- **Evento**: [O que vai acontecer no teste]
- **Espaço**: [Onde o teste ocorrerá]
- **Pessoas**: [Quem vai testar e quem vai conduzir]

## 7. Objetivo, essenciais, expectativas, organização, prioridades, riscos e plano B
[Cuidados operacionais para viabilizar a experiência]

## 8. Registro/acesso/instruções do Protótipo V0
[Link, roteiro, fotos, instruções práticas para visualizar/operar o protótipo]

## 9. Como poderá ser testado e o que observar
[Guia de observação para coletar reações e aprendizados sem induzir respostas]`,
  },
  {
    id: 'AF08',
    activityId: 'A08',
    title: 'AF08 — Testes, Aprendizados e Plano de Evolução V0→V1',
    kind: 'document',
    functionDescription: 'Evidências reais quando disponíveis; ausência de evidência claramente marcada quando não houver teste.',
    requiredSections: [
      '1. Status epistemológico: COM EVIDÊNCIA EXTERNA / PARCIAL / SEM EVIDÊNCIA EXTERNA',
      '2. Como o teste foi feito, se realizado',
      '3. Evidências coletadas com proveniência mínima',
      '4. Interpretações da equipe separadas das evidências',
      '5. Simulações utilizadas, se houver',
      '6. Síntese dos aprendizados',
      '7. Plano V0→V1: manter / corrigir / descartar / acrescentar',
      '8. Pontos que continuam em aberto',
    ],
    markdownTemplate: `# AF08 — Testes, Aprendizados e Plano de Evolução V0→V1

## 1. Status epistemológico: COM EVIDÊNCIA EXTERNA / PARCIAL / SEM EVIDÊNCIA EXTERNA
[COM EVIDÊNCIA EXTERNA | PARCIAL | SEM EVIDÊNCIA EXTERNA]

## 2. Como o teste foi feito, se realizado
[Metodologia do teste real ou registro explícito de que não foi possível testar com público externo]

## 3. Evidências coletadas com proveniência mínima
[Fatos observados e falas reais sem identificar dados sensíveis]

## 4. Interpretações da equipe separadas das evidências
[O que a equipe deduz a partir das evidências]

## 5. Simulações utilizadas, se houver
[Cenários artificiais explorados com IA ou encenação interna]

## 6. Síntese dos aprendizados
[O que aprendemos sobre o problema e a solução]

## 7. Plano V0→V1: manter / corrigir / descartar / acrescentar
- **Manter**: [O que funcionou e continua]
- **Corrigir**: [O que precisa de ajuste]
- **Descartar**: [O que não agregou valor e deve ser removido]
- **Acrescentar**: [Novos elementos indispensáveis descobertos]

## 8. Pontos que continuam em aberto
[Incertezas que exigirão novos testes no futuro]`,
  },
  {
    id: 'AF09',
    activityId: 'A09',
    title: 'AF09 — Modelo de Sustentabilidade',
    kind: 'document',
    functionDescription: 'Continuidade plural: valor, relações, recursos, parcerias, custos e sustentação.',
    requiredSections: [
      '1. Público/comunidade atendida',
      '2. Valor gerado e benefícios',
      '3. Formas de acesso e comunicação',
      '4. Relação e vínculo com o público',
      '5. Atividades essenciais contínuas',
      '6. Recursos indispensáveis',
      '7. Parceiros e apoiadores',
      '8. Custos e esforços principais',
      '9. Arranjos de sustentabilidade e continuidade',
      '10. Hipóteses de sustentabilidade a testar',
    ],
    markdownTemplate: `# AF09 — Modelo de Sustentabilidade

## 1. Público/comunidade atendida
[Quem continua recebendo a proposta]

## 2. Valor gerado e benefícios
[O impacto positivo contínuo da solução]

## 3. Formas de acesso e comunicação
[Como as pessoas descobrem e chegam até a solução]

## 4. Relação e vínculo com o público
[Como a comunidade se envolve e constrói confiança]

## 5. Atividades essenciais contínuas
[O trabalho rotineiro necessário para a solução não morrer]

## 6. Recursos indispensáveis
[Energia, materiais e tecnologia que precisam de manutenção]

## 7. Parceiros e apoiadores
[Aliados estratégicos para viabilidade no longo prazo]

## 8. Custos e esforços principais
[Despesas monetárias e desgaste de energia da equipe]

## 9. Arranjos de sustentabilidade e continuidade
[Mecanismos plurais: editais, doações, parcerias, voluntariado ou serviços]

## 10. Hipóteses de sustentabilidade a testar
[O que ainda precisa ser colocado à prova sobre sustentação]`,
  },
  {
    id: 'AF10',
    activityId: 'A10',
    title: 'AF10 — Roadmap + Linha do Tempo em 7 Etapas',
    kind: 'document',
    functionDescription: 'Prioridades temporais e sequência coordenada de evolução.',
    requiredSections: [
      '1. Agora — próximas 2 semanas',
      '2. Depois — próximos 2 meses',
      '3. Futuramente — médio/longo prazo',
      '4. O que deliberadamente não faremos agora',
      '5. Linha do Tempo em exatamente 7 etapas: verbo + objeto, responsável e prazo',
      '6. Dependências e impedimentos críticos',
    ],
    markdownTemplate: `# AF10 — Roadmap + Linha do Tempo em 7 Etapas

## 1. Agora — próximas 2 semanas
[Ações imediatas e urgentes pós-workshop]

## 2. Depois — próximos 2 meses
[Evolução estruturada da versão V1]

## 3. Futuramente — médio/longo prazo
[Visão de escala e amadurecimento]

## 4. O que deliberadamente não faremos agora
[Ideias boas que guardaremos para não perder o foco]

## 5. Linha do Tempo em exatamente 7 etapas: verbo + objeto, responsável e prazo
1. [Verbo + Objeto] — Responsável: [...] | Prazo: [...]
2. [Verbo + Objeto] — Responsável: [...] | Prazo: [...]
3. [Verbo + Objeto] — Responsável: [...] | Prazo: [...]
4. [Verbo + Objeto] — Responsável: [...] | Prazo: [...]
5. [Verbo + Objeto] — Responsável: [...] | Prazo: [...]
6. [Verbo + Objeto] — Responsável: [...] | Prazo: [...]
7. [Verbo + Objeto] — Responsável: [...] | Prazo: [...]

## 6. Dependências e impedimentos críticos
[Gargalos que podem travar o avanço e como destravá-los]`,
  },
  {
    id: 'AF11',
    activityId: 'A11',
    title: 'AF11 — Kit de Comunicação Final',
    kind: 'presentation',
    functionDescription: 'Pitch oral, roteiro visual, divisão de papéis e preparação para banca.',
    requiredSections: [
      '1. Pitch V1 autoritativo de 3 minutos com marcações de tempo',
      '2. Roteiro visual de apoio — máximo 6 telas',
      '3. Divisão de papéis e transições',
      '4. Até 5 perguntas prováveis e estratégias de resposta honesta',
      '5. Acordos de ensaio e demonstração',
      '6. Aprendizados que a equipe quer reconhecer/celebrar',
    ],
    markdownTemplate: `# AF11 — Kit de Comunicação Final

## 1. Pitch V1 autoritativo de 3 minutos com marcações de tempo
- **0:00 - 0:30 (Gancho e Tensão)**: [Abertura impactante sobre o problema real]
- **0:30 - 1:00 (Diagnóstico e Pessoas)**: [Quem sofre e o que investigamos]
- **1:00 - 1:45 (Solução e Protótipo)**: [Demonstração do protótipo V0 e proposta]
- **1:45 - 2:20 (Evidências e Aprendizados)**: [Resultados reais ou limites do teste]
- **2:20 - 2:45 (Sustentabilidade e Próximos Passos)**: [Continuidade e roadmap]
- **2:45 - 3:00 (Fechamento e Chamada)**: [Conclusão e convite à ação]

## 2. Roteiro visual de apoio — máximo 6 telas
- **Tela 1**: Título do projeto + Frase de impacto
- **Tela 2**: O Problema vivido pelas pessoas
- **Tela 3**: O Protótipo V0 em ação
- **Tela 4**: Aprendizados e o que o teste revelou
- **Tela 5**: Plano de continuidade e Linha do Tempo
- **Tela 6**: A Equipe e Contatos

## 3. Divisão de papéis e transições
[Quem fala cada parte e como passar a palavra com naturalidade]

## 4. Até 5 perguntas prováveis e estratégias de resposta honesta
1. **Pergunta**: [...] | **Resposta**: [...]
2. **Pergunta**: [...] | **Resposta**: [...]
3. **Pergunta**: [...] | **Resposta**: [...]
4. **Pergunta**: [...] | **Resposta**: [...]
5. **Pergunta**: [...] | **Resposta**: [...]

## 5. Acordos de ensaio e demonstração
[Regras práticas de palco, equipamentos e demonstração ao vivo]

## 6. Aprendizados que a equipe quer reconhecer/celebrar
[Celebração da trajetória humana da equipe durante a oficina]`,
  },
];

export const ARTIFACT_MAP = new Map<ArtifactId, ArtifactDefinition>(
  ARTIFACTS_V3.map((a) => [a.id, a])
);

export function getArtifactOrThrow(id: ArtifactId): ArtifactDefinition {
  const art = ARTIFACT_MAP.get(id);
  if (!art) {
    throw new Error(`[ArtifactRegistry] Invalid Artifact ID lookup: "${id}". Expected valid AF01..AF11.`);
  }
  return art;
}
