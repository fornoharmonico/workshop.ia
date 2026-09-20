/**
 * SYLLABUS V2.2 — WORKSHOP INTELIGÊNCIA ARTIFICIAL APLICADA
 * 
 * Fonte de cronograma recomendado e flexível para os 4 encontros (12h totais),
 * estruturado sobre as 12 tríades canônicas da Fornologia V2.2 (A01 a A12).
 * Não há vinculação computacional obrigatória entre atividades e encontros.
 */

export interface SyllabusActivitySummary {
  id: string;
  order: number;
  title: string;
  minutes: number;
  deliverable?: string;
  hasAi: boolean;
  roleOfAi: string;
  pedagogicalGoal: string;
}

export interface SyllabusEncounterV2 {
  number: number;
  title: string;
  theme: string;
  totalMinutes: number;
  introMinutes: number;
  recessMinutes: number;
  closureMinutes: number;
  activities: SyllabusActivitySummary[];
  mainDeliverables: string[];
}

export const SYLLABUS_V2: SyllabusEncounterV2[] = [
  {
    number: 1,
    title: 'Encontro 1 — Investigar e Direcionar',
    theme: 'Da Escolha do Problema ao Propósito e Direção da Solução',
    totalMinutes: 180,
    introMinutes: 40, // Acolhimento, acordos, diagnóstico de IA e mapeamento inicial
    recessMinutes: 15,
    closureMinutes: 10,
    mainDeliverables: [
      'AF01 — Mapa de Problemas + Problema Escolhido',
      'AF02 — Diagnóstico do Problema',
      'AF03 — Mapa de Recursos',
      'AF04 — Propósito e Direção'
    ],
    activities: [
      {
        id: 'A01',
        order: 10,
        title: 'Escolher o problema',
        minutes: 30,
        deliverable: 'AF01 — Mapa de Problemas + Problema Escolhido',
        hasAi: true,
        roleOfAi: 'Ajuda a agrupar desafios levantados pela turma e provoca a equipe a justificar a escolha humana.',
        pedagogicalGoal: 'Mapear incômodos reais do cotidiano e exercitar a escolha consciente da equipe.'
      },
      {
        id: 'A02',
        order: 20,
        title: 'Entender melhor o problema',
        minutes: 35,
        deliverable: 'AF02 — Diagnóstico do Problema',
        hasAi: true,
        roleOfAi: 'Ajuda a separar observações de hipóteses e aprofunda causas possíveis sem saltar para soluções.',
        pedagogicalGoal: 'Compreender a fundo o problema antes de tentar resolvê-lo (hipótese não é fato).'
      },
      {
        id: 'A03',
        order: 30,
        title: 'O que temos e o que precisamos',
        minutes: 25,
        deliverable: 'AF03 — Mapa de Recursos',
        hasAi: true,
        roleOfAi: 'Provoca o olhar sistêmico nas dimensões cultural, social, ambiental e financeira.',
        pedagogicalGoal: 'Reconhecer recursos disponíveis e mobilizáveis, superando a ilusão de escassez.'
      },
      {
        id: 'A04',
        order: 40,
        title: 'Que transformação queremos provocar?',
        minutes: 25,
        deliverable: 'AF04 — Propósito e Direção',
        hasAi: true,
        roleOfAi: 'Estimula a reflexão sobre a transformação pretendida e sugere caminhos alternativos sob demanda.',
        pedagogicalGoal: 'Definir o propósito essencial e a direção da solução antes de definir formatos técnicos.'
      }
    ]
  },
  {
    number: 2,
    title: 'Encontro 2 — Definir e Materializar',
    theme: 'Da Estruturação do Briefing ao MVP e Protótipo V0',
    totalMinutes: 180,
    introMinutes: 15, // Retrospectiva breve
    recessMinutes: 15,
    closureMinutes: 10,
    mainDeliverables: [
      'AF05 — Briefing V0',
      'AF06 — Briefing V1 (Versão autoritativa revisada)',
      'AF07 — Especificação de Funcionamento / PRD',
      'AF08 — MVP + Protótipo V0 (com Plano de Realização)'
    ],
    activities: [
      {
        id: 'A05',
        order: 50,
        title: 'Organizar a primeira versão do projeto',
        minutes: 25,
        deliverable: 'AF05 — Briefing V0',
        hasAi: true,
        roleOfAi: 'Organiza as peças investigadas (problema, recursos, público e direção) em um primeiro documento coeso.',
        pedagogicalGoal: 'Consolidar um primeiro rascunho estruturado sem inventar informações inexistentes.'
      },
      {
        id: 'A06',
        order: 60,
        title: 'Revisar e melhorar o projeto',
        minutes: 30,
        deliverable: 'AF06 — Briefing V1',
        hasAi: true,
        roleOfAi: 'Atua como revisora crítica imparcial: aponta inconsistências, riscos e pontos de melhoria para a equipe decidir.',
        pedagogicalGoal: 'Exercitar a agência humana, o pacto de revisão e a decisão soberana da equipe.'
      },
      {
        id: 'A07',
        order: 70,
        title: 'Como a solução precisa funcionar?',
        minutes: 30,
        deliverable: 'AF07 — Especificação de Funcionamento / PRD',
        hasAi: true,
        roleOfAi: 'Ajuda a detalhar o funcionamento e a discriminar o que é essencial agora do que é desejável depois.',
        pedagogicalGoal: 'Explicar com clareza a experiência da solução antes de gastar energia na construção.'
      },
      {
        id: 'A08',
        order: 80,
        title: 'Construir a menor versão que podemos testar',
        minutes: 55,
        deliverable: 'AF08 — MVP + Protótipo V0',
        hasAi: true,
        roleOfAi: 'Auxilia no recorte da hipótese essencial, preenche o Plano de Realização e apoia a materialização.',
        pedagogicalGoal: 'Materializar a menor versão testável para aprender com pessoas reais no mundo exterior.'
      }
    ]
  },
  {
    number: 3,
    title: 'Encontro 3 — Testar, Aprender e Planejar',
    theme: 'Das Evidências Reais ao Modelo de Sustentabilidade e Roadmap',
    totalMinutes: 180,
    introMinutes: 15, // Checagem e acolhimento das experiências de teste
    recessMinutes: 15,
    closureMinutes: 10,
    mainDeliverables: [
      'AF09 — Testes, Aprendizados e Plano de Evolução V0→V1',
      'AF10 — Modelo de Sustentabilidade',
      'AF11 — Roadmap + Linha do Tempo em 7 Etapas'
    ],
    activities: [
      {
        id: 'A09',
        order: 90,
        title: 'Testar, aprender e decidir o que melhorar',
        minutes: 45,
        deliverable: 'AF09 — Testes, Aprendizados e Plano de Evolução V0→V1',
        hasAi: true,
        roleOfAi: 'Organiza evidências de campo (ou registra honestamente a ausência de teste) e propõe caminhos de evolução.',
        pedagogicalGoal: 'Vivenciar que hipótese não é fato e fundamentar a evolução do protótipo em evidências reais.'
      },
      {
        id: 'A10',
        order: 100,
        title: 'Como essa solução pode se sustentar?',
        minutes: 45,
        deliverable: 'AF10 — Modelo de Sustentabilidade',
        hasAi: true,
        roleOfAi: 'Ajuda a estruturar nove componentes autorais de valor, público, recursos, parcerias e continuidade.',
        pedagogicalGoal: 'Compreender como a solução pode continuar existindo no tempo com sustentabilidade plural.'
      },
      {
        id: 'A11',
        order: 110,
        title: 'O que fazemos agora, depois e futuramente?',
        minutes: 50,
        deliverable: 'AF11 — Roadmap + Linha do Tempo em 7 Etapas',
        hasAi: true,
        roleOfAi: 'Auxilia na priorização temporal e na estruturação da sequência de 7 etapas coordenadas.',
        pedagogicalGoal: 'Organizar a evolução no tempo e ter coragem de definir o que NÃO será feito agora.'
      }
    ]
  },
  {
    number: 4,
    title: 'Encontro 4 — Comunicar e Celebrar',
    theme: 'Narrativa, Pitch, Simulação com Banca e Celebração',
    totalMinutes: 180,
    introMinutes: 15, // Abertura e alinhamento
    recessMinutes: 15,
    closureMinutes: 15, // Celebração, retrospectiva e entrega simbólica
    mainDeliverables: [
      'AF12 — Kit de Comunicação Final (Pitch V1 + Roteiro Visual + Ensaio)',
      'Documento Mestre do Projeto (Visão consolidada da autoria)',
      'Apresentações Finais e Celebração Coletiva'
    ],
    activities: [
      {
        id: 'A12',
        order: 120,
        title: 'Preparar a apresentação final',
        minutes: 60,
        deliverable: 'AF12 — Kit de Comunicação Final',
        hasAi: true,
        roleOfAi: 'Apoia a redação do Pitch V1, o roteiro visual de até 6 telas e a simulação de perguntas de banca.',
        pedagogicalGoal: 'Aprender a comunicar a verdade do projeto com clareza, honestidade e impacto em 3 minutos.'
      },
      {
        id: 'A12-Ensaio',
        order: 121,
        title: 'Ensaio e Apresentação para a Banca',
        minutes: 45,
        deliverable: 'Apresentação pública do projeto',
        hasAi: false,
        roleOfAi: 'Sem IA. Atividade prática 100% humana de presença, fala e escuta.',
        pedagogicalGoal: 'Defender o projeto com segurança, ouvir a banca e exercitar a comunicação oral.'
      },
      {
        id: 'A12-Celebracao',
        order: 122,
        title: 'Retrospectiva, Celebração e Documento Mestre',
        minutes: 30,
        deliverable: 'Documento Mestre do Projeto + Celebração',
        hasAi: false,
        roleOfAi: 'Sem IA. Momento humano de reconhecimento da autoria e da trajetória percorrida.',
        pedagogicalGoal: 'Celebrar a transformação do grupo, a autonomia desenvolvida e os próximos passos do projeto.'
      }
    ]
  }
];
