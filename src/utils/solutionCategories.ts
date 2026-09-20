import { SOLUTION_CATEGORY_OPTIONS, SolutionCategory } from '../types/workshop';

export interface CategoryMetadata {
  id: SolutionCategory;
  label: string;
  shortLabel: string;
  iconName: string;
  description: string;
  elementFocus: string;
  userFlowFocus: string;
  prototypingIdeas: string[];
}

export const CATEGORY_DETAILS: Record<SolutionCategory, CategoryMetadata> = {
  'produto físico': {
    id: 'produto físico',
    label: 'Produto Físico',
    shortLabel: 'Físico',
    iconName: 'Box',
    description: 'Objetos tangíveis, embalagens, equipamentos, dispositivos ou materiais concretos.',
    elementFocus: 'Componentes, materiais, ergonomia, dimensões e formato de uso.',
    userFlowFocus: 'Modo de uso, desempacotamento (unboxing), manuseio e descarte/reciclagem.',
    prototypingIdeas: [
      'Modelagem em papelão / papel / massinha / isopor',
      'Impressão 3D ou mockup escala 1:1',
      'Diagrama dimensional e ficha técnica de materiais',
      'Storyboard fotográfico de uso real'
    ]
  },
  'produto digital': {
    id: 'produto digital',
    label: 'Produto Digital',
    shortLabel: 'Digital',
    iconName: 'Smartphone',
    description: 'Aplicativos, sites, plataformas web, bots, dashboards, APIs ou extensões.',
    elementFocus: 'Telas, arquitetura de informação, botões, campos e interações.',
    userFlowFocus: 'Fluxo do usuário, navegação tela a tela, onboarding e mensagens de sucesso/erro.',
    prototypingIdeas: [
      'Wireframes em papel ou digitais (Figma, Miro)',
      'Protótipo navegável de baixa/média fidelidade',
      'Esqueletos de tela com simulação no celular',
      'Chatbot ou script simulado em plataforma de mensagens'
    ]
  },
  'serviço': {
    id: 'serviço',
    label: 'Serviço',
    shortLabel: 'Serviço',
    iconName: 'ConciergeBell',
    description: 'Atendimentos, consultorias, assistências, suporte, facilitação ou entrega contínua.',
    elementFocus: 'Etapas de atendimento, pontos de contato (touchpoints), equipe e suporte de retaguarda.',
    userFlowFocus: 'Jornada do cliente: antes, durante e depois da prestação do serviço.',
    prototypingIdeas: [
      'Service Blueprint (linha de visibilidade frente/retaguarda)',
      'Teatro de serviço (role-playing / encenação da experiência)',
      'Roteiro de atendimento passo a passo com checklists',
      'Script de acolhimento e canais de contato'
    ]
  },
  'processo': {
    id: 'processo',
    label: 'Processo',
    shortLabel: 'Processo',
    iconName: 'Workflow',
    description: 'Fluxos operacionais, rotinas de trabalho, tomadas de decisão ou esteiras produtivas.',
    elementFocus: 'Etapas sequenciais, nós de decisão, regras de transição, papéis e responsáveis.',
    userFlowFocus: 'Passagem de bastão entre áreas, gatilhos de entrada, saídas e critérios de aceite.',
    prototypingIdeas: [
      'Fluxograma / Diagrama de raias (swimlane)',
      'Matriz RACI e mapa de tomada de decisão',
      'Simulação de passagem de bastão com equipe',
      'Guia de procedimentos operacionais padrão (POP)'
    ]
  },
  'campanha': {
    id: 'campanha',
    label: 'Campanha',
    shortLabel: 'Campanha',
    iconName: 'Megaphone',
    description: 'Ações de conscientização, comunicação, captação, mobilização ou marketing.',
    elementFocus: 'Mensagens-chave, tom de voz, canais de distribuição e peças criativas.',
    userFlowFocus: 'Funil de engajamento: atração, conscientização, decisão e chamado para ação (CTA).',
    prototypingIdeas: [
      'Moodboard visual e guia de tom de voz',
      'Peças modelo (posts exemplo, cartazes, roteiro de vídeo curto)',
      'Calendário editorial e matriz de canais',
      'Roteiro de mensagem direta (copywriting)'
    ]
  },
  'evento': {
    id: 'evento',
    label: 'Evento',
    shortLabel: 'Evento',
    iconName: 'CalendarEvent',
    description: 'Encontros, conferências, festivais, lançamentos, feiras ou celebrações.',
    elementFocus: 'Programação/cronograma, ambientação do espaço, dinâmica de acolhimento e atrações.',
    userFlowFocus: 'Jornada do participante: credenciamento, circulação no espaço, sessões e encerramento.',
    prototypingIdeas: [
      'Cronograma minuto a minuto da programação',
      'Planta baixa e mapa de circulação do participante',
      'Roteiro de cerimonial e abertura',
      'Kit de boas-vindas / crachá simulado'
    ]
  },
  'experiência': {
    id: 'experiência',
    label: 'Experiência',
    shortLabel: 'Experiência',
    iconName: 'Sparkles',
    description: 'Jornadas imersivas, experiências sensoriais, vivências guiadas ou ambientações.',
    elementFocus: 'Estímulos sensoriais, momentos marcantes (peak moments), ambientação e rituais.',
    userFlowFocus: 'Arco emocional da experiência: expectativa, clímax sensorial e memória pós-experiência.',
    prototypingIdeas: [
      'Mapa de calor emocional da jornada',
      'Roteiro sensorial (sons, iluminação, interações táteis)',
      'Mini-piloto imersivo com pequeno grupo de voluntários',
      'Guia de rituais de início e fim da vivência'
    ]
  },
  'organização/iniciativa': {
    id: 'organização/iniciativa',
    label: 'Organização / Iniciativa',
    shortLabel: 'Iniciativa',
    iconName: 'Building',
    description: 'Coletivos, ONGs, movimentos comunitários, redes de apoio ou associações.',
    elementFocus: 'Estrutura de governança, valores compartilhados, papéis dos membros e sustentabilidade.',
    userFlowFocus: 'Onboarding de voluntários/membros, assembleias de decisão e fluxo de projetos.',
    prototypingIdeas: [
      'Manifesto de fundação e princípios norteadores',
      'Organograma circular e mapa de papéis comunitários',
      'Manual de boas-vindas para novos participantes',
      'Plano de sustentabilidade e voluntariado'
    ]
  },
  'negócio': {
    id: 'negócio',
    label: 'Negócio',
    shortLabel: 'Negócio',
    iconName: 'Briefcase',
    description: 'Empreendimentos, modelos de monetização, lojas, cooperativas ou novas empresas.',
    elementFocus: 'Proposta de valor, estrutura de custos, fontes de receita e parcerias.',
    userFlowFocus: 'Ciclo comercial: aquisição, venda, entrega de valor e pós-venda.',
    prototypingIdeas: [
      'Modelo de sustentabilidade detalhado com premissas de continuidade',
      'Página de teste de demanda (smoke test / landing de pré-venda)',
      'Simulação de precificação e custos unitários',
      'Pitch deck de viabilidade e tração'
    ]
  },
  'material ou conteúdo educativo': {
    id: 'material ou conteúdo educativo',
    label: 'Material ou Conteúdo Educativo',
    shortLabel: 'Educativo',
    iconName: 'BookOpen',
    description: 'Apostilas, cartilhas, cursos, vídeos tutoriais, podcasts ou infográficos didáticos.',
    elementFocus: 'Objetivos de aprendizagem, módulos, linguagem pedagógica e avaliações formativas.',
    userFlowFocus: 'Trilha de aprendizagem: diagnóstico prévio, absorção do conteúdo e prática aplicada.',
    prototypingIdeas: [
      'Amostra de 1 capítulo ou módulo piloto diagramado',
      'Infográfico ou mapa mental síntese do conceito',
      'Roteiro de aula / áudio-guia piloto de 3 minutos',
      'Exercício prático de fixação e autoavaliação'
    ]
  },
  'metodologia/oficina/atividade': {
    id: 'metodologia/oficina/atividade',
    label: 'Metodologia / Oficina / Atividade',
    shortLabel: 'Metodologia',
    iconName: 'GraduationCap',
    description: 'Dinâmicas guiadas, frameworks, workshops práticos, jogos sérios ou métodos de trabalho.',
    elementFocus: 'Passos metodológicos, ferramentas de apoio (canvas/templates), regras e entregáveis.',
    userFlowFocus: 'Dinâmica do facilitador e participantes: aquecimento, desenvolvimento e fechamento.',
    prototypingIdeas: [
      'Guia do facilitador passo a passo com tempos sugeridos',
      'Template / Canvas de trabalho para participantes',
      'Deck de cartas com perguntas provocadoras',
      'Simulação de 15 minutos da dinâmica principal'
    ]
  },
  'outra': {
    id: 'outra',
    label: 'Outra Categoria',
    shortLabel: 'Personalizada',
    iconName: 'PlusCircle',
    description: 'Qualquer outro formato ou manifestação que não se enquadre nos modelos anteriores.',
    elementFocus: 'Elementos centrais definidos especificamente pelo time do projeto.',
    userFlowFocus: 'Jornada e pontos de contato específicos da natureza da criação.',
    prototypingIdeas: [
      'Esboço visual livre adaptado ao formato',
      'Documento conceitual de escopo',
      'Maquete ou modelo simplificado de teste',
      'Roteiro descritivo das partes principais'
    ]
  }
};

export interface ContextualSolutionLabels {
  isHybrid: boolean;
  categoriesSummary: string;
  elementsLabel: string;
  flowLabel: string;
  deliverablesLabel: string;
  recommendedPrototypes: string[];
}

/**
 * Checks if a set of categories represents a hybrid solution (2 or more selected).
 */
export function isHybridSolution(categories?: string[]): boolean {
  return Array.isArray(categories) && categories.length >= 2;
}

/**
 * Formats the human-readable summary of selected categories.
 */
export function formatSolutionCategories(categories?: string[], otherText?: string): string {
  if (!categories || categories.length === 0) {
    return 'Não categorizada (formato livre)';
  }

  const names = categories.map((cat) => {
    if (cat === 'outra') {
      return otherText ? `Outra (${otherText})` : 'Outra (Personalizada)';
    }
    return CATEGORY_DETAILS[cat as SolutionCategory]?.label || cat;
  });

  if (names.length === 1) {
    return names[0];
  }

  return `${names.join(' + ')} (Solução Híbrida)`;
}

/**
 * Returns contextual labels and adaptive terminology for PRD, MVP, Prototypes and Evolution.
 */
export function getContextualSolutionLabels(
  categories?: string[], 
  otherText?: string
): ContextualSolutionLabels {
  const selected = Array.isArray(categories) && categories.length > 0 
    ? categories 
    : [];

  const isHybrid = selected.length >= 2;
  const categoriesSummary = formatSolutionCategories(selected, otherText);

  // If empty, return balanced defaults
  if (selected.length === 0) {
    return {
      isHybrid: false,
      categoriesSummary: 'Formato Livre / Não especificado',
      elementsLabel: 'Componentes, Telas ou Etapas da Solução',
      flowLabel: 'Fluxo de Experiência / Jornada / Uso',
      deliverablesLabel: 'Protótipo / Peça de Teste (V0 e V1)',
      recommendedPrototypes: [
        'Esboço em papel ou diagrama conceitual',
        'Simulação da dinâmica / uso com pessoas reais',
        'Artefato visual ou roteiro passo a passo'
      ]
    };
  }

  // Aggregate prototype ideas
  const prototypeIdeasSet = new Set<string>();
  selected.forEach((cat) => {
    const meta = CATEGORY_DETAILS[cat as SolutionCategory];
    if (meta?.prototypingIdeas) {
      meta.prototypingIdeas.forEach((idea) => prototypeIdeasSet.add(idea));
    }
  });

  // Calculate adaptive labels
  let elementsLabel = 'Componentes, Telas ou Etapas';
  let flowLabel = 'Fluxo de Uso / Jornada';

  if (selected.length === 1) {
    const singleCat = selected[0];
    switch (singleCat) {
      case 'serviço':
        elementsLabel = 'Etapas, Momentos e Pontos de Contato (Touchpoints)';
        flowLabel = 'Jornada do Atendimento (Antes, Durante e Depois)';
        break;
      case 'evento':
        elementsLabel = 'Momentos da Programação e Espaços do Evento';
        flowLabel = 'Jornada do Participante (Credenciamento à Saída)';
        break;
      case 'campanha':
        elementsLabel = 'Mensagens-Chave, Peças Criativas e Canais';
        flowLabel = 'Fluxo de Engajamento e Chamadas para Ação (CTAs)';
        break;
      case 'produto físico':
        elementsLabel = 'Componentes, Materiais, Dimensões e Uso';
        flowLabel = 'Jornada de Manuseio, Uso e Ergonomia';
        break;
      case 'produto digital':
        elementsLabel = 'Telas, Interações e Arquitetura de Informação';
        flowLabel = 'Fluxo de Navegação e Interação Tela a Tela';
        break;
      case 'processo':
        elementsLabel = 'Etapas, Decisões, Regras e Responsáveis';
        flowLabel = 'Passagem de Bastão e Fluxo de Tomada de Decisão';
        break;
      case 'experiência':
        elementsLabel = 'Momentos Marcantes, Rituais e Ambientação';
        flowLabel = 'Arco Sensorial e Emocional da Vivência';
        break;
      case 'material ou conteúdo educativo':
        elementsLabel = 'Módulos, Conceitos, Formatos e Recursos Didáticos';
        flowLabel = 'Trilha de Aprendizagem do Estudante';
        break;
      case 'metodologia/oficina/atividade':
        elementsLabel = 'Dinâmicas, Ferramentas de Trabalho e Entregáveis';
        flowLabel = 'Roteiro de Facilitação e Participação';
        break;
      case 'organização/iniciativa':
      case 'negócio':
        elementsLabel = 'Estrutura, Canais, Proposta de Valor e Operação';
        flowLabel = 'Ciclo de Relacionamento e Entrega de Valor';
        break;
      case 'outra':
        elementsLabel = `Componentes e Partes de ${otherText || 'Solução Personalizada'}`;
        flowLabel = 'Fluxo de Funcionamento e Interação';
        break;
    }
  } else {
    // Hybrid Solution
    elementsLabel = 'Componentes Integrados (Etapas, Telas, Peças ou Materiais)';
    flowLabel = 'Jornada Integrada (Interações Físicas, Digitais ou Relacionais)';
  }

  return {
    isHybrid,
    categoriesSummary,
    elementsLabel,
    flowLabel,
    deliverablesLabel: isHybrid 
      ? 'Protótipo Híbrido Multiformato (V0 e V1)' 
      : 'Protótipo / Artefato de Teste (V0 e V1)',
    recommendedPrototypes: Array.from(prototypeIdeasSet).slice(0, 5)
  };
}
