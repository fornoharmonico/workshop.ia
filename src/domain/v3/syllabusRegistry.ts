/**
 * Canonical Syllabus Registry V3
 * Master Dossier V3 - Anexo 03: Ementa Metodológica.
 */

export interface SyllabusMeeting {
  meetingNumber: number;
  title: string;
  movementName: string;
  durationMinutes: number;
  objective: string;
  scheduleReference: string;
  deliverables: string;
}

export const SYLLABUS_INFO = {
  title: 'Workshop Inteligência Artificial Aplicada: do Problema ao Protótipo',
  format: 'Workshop prático e imersivo (presencial ou híbrido)',
  workload: '12 horas em 4 encontros de 3h',
  targetAudience: 'Jovens e estudantes a partir de 13 anos',
  classReference: 'Até 20 participantes em equipes',
  methodology: 'Fornologia aplicada à aprendizagem mediada por IA',
  macroArc: 'Sonhar → Planejar → Fazer → Celebrar',
  centralObjective:
    'Capacitar participantes a reconhecer, investigar, estruturar, prototipar, testar, planejar e comunicar soluções para desafios reais, utilizando IA Generativa como parceira cognitiva sem transferir a ela a autoria ou responsabilidade humana.',
  principles: [
    { number: 1, title: 'Experiência antes de explicação extensa', desc: 'Aprende-se fazendo e investigando antes de teorizar.' },
    { number: 2, title: 'Complexidade nos bastidores; simplicidade na experiência', desc: 'A sofisticação metodológica não se torna burocracia para quem participa.' },
    { number: 3, title: 'IA como parceira cognitiva, não autora', desc: 'A inteligência artificial apoia, desafia e estrutura; a autoria e decisão são humanas.' },
    { number: 4, title: 'Tecnologia serve à metodologia; metodologia serve à aprendizagem', desc: 'O objetivo é a transformação das pessoas, não o culto à ferramenta.' },
    { number: 5, title: 'Investigar antes de solucionar', desc: 'Compreender a dor, as pessoas e as causas reais antes de apaixonar-se por ideias prematuras.' },
    { number: 6, title: 'Pensamento livre, estrutura progressiva', desc: 'Liberdade criativa canalizada em artefatos claros passo a passo.' },
    { number: 7, title: 'Contexto é patrimônio', desc: 'Não perguntar novamente o que já foi investigado e consolidado.' },
    { number: 8, title: 'Artefatos são rastros do pensamento', desc: 'O valor está no raciocínio gerado, não no preenchimento de formulário.' },
    { number: 9, title: 'Hipótese não é fato; simulação não é evidência', desc: 'Rigor epistêmico: nunca fabricar certeza onde há apenas suposição.' },
    { number: 10, title: '"Não sei" é válido', desc: 'Reconhecer lacunas é o ponto de partida de qualquer investigação honesta.' },
    { number: 11, title: 'Agência humana e revisão crítica', desc: 'Todo output de IA passa pelo crivo de validação da equipe.' },
    { number: 12, title: 'Prototipar é aprender', desc: 'A menor versão testável rápida para validar hipóteses concretas.' },
    { number: 13, title: 'Evidência antes de validação', desc: 'Só declaramos validação quando houve teste no mundo real.' },
    { number: 14, title: 'Progressão assíncrona entre equipes', desc: 'Cada grupo avança no seu ritmo sem travas artificiais.' },
    { number: 15, title: 'Menos burocracia, mais pensamento', desc: 'Foco no tempo dedicado a criar, testar e conversar.' },
    { number: 16, title: 'Rigor invisível', desc: 'Qualidade assegurada sem peso cognitivo desnecessário.' },
  ],
  meetings: [
    {
      meetingNumber: 1,
      title: 'Encontro 1: Investigar e Direcionar',
      movementName: 'INVESTIGAR E DIRECIONAR',
      durationMinutes: 180,
      objective: 'Criar vínculo, enquadrar uma tensão real, diagnosticar causas, reconhecer recursos e definir propósito e direção.',
      scheduleReference: '15 min abertura + 15 min relação com IA/acordos + A01 (40 min) + A02 (35 min) + A03 (30 min) + A04 (30 min) + 15 min síntese',
      deliverables: 'AF01, AF02, AF03, AF04 consolidados.',
    },
    {
      meetingNumber: 2,
      title: 'Encontro 2: Definir e Materializar',
      movementName: 'DEFINIR E MATERIALIZAR',
      durationMinutes: 180,
      objective: 'Transformar a investigação em Briefing completo, especificar funcionamento e materializar MVP/Protótipo V0.',
      scheduleReference: '15 min retrospectiva + A05 (55 min) + A06 (35 min) + A07 (45 min) + 20 min construção prática + 10 min fechamento',
      deliverables: 'AF05, AF06, AF07 consolidados.',
    },
    {
      meetingNumber: 3,
      title: 'Encontro 3: Testar, Aprender e Planejar',
      movementName: 'TESTAR, APRENDER E PLANEJAR',
      durationMinutes: 180,
      objective: 'Confrontar hipóteses com evidências quando possível, decidir evolução, pensar sustentabilidade e organizar próximos passos.',
      scheduleReference: '15 min retrospectiva + A08 (50 min) + A09 (35 min) + A10 (35 min) + 35 min evolução prática + 10 min fechamento',
      deliverables: 'AF08, AF09, AF10 consolidados.',
    },
    {
      meetingNumber: 4,
      title: 'Encontro 4: Comunicar e Celebrar',
      movementName: 'COMUNICAR E CELEBRAR',
      durationMinutes: 180,
      objective: 'Comunicar a trajetória real, demonstrar o projeto, praticar apresentação e reconhecer aprendizados.',
      scheduleReference: '15 min retrospectiva + A11 (90 min) + 45 min apresentações/banca + 20 min celebração + 10 min encerramento',
      deliverables: 'AF11 consolidado + apresentação pública.',
    },
  ] as SyllabusMeeting[],
  learningOutcomes: [
    'Usar IA de maneira criativa, crítica, ética, consciente e responsável;',
    'Formular perguntas melhores e fornecer contexto útil;',
    'Distinguir evidência, hipótese, simulação, dúvida/em aberto, recomendação da IA e decisão humana;',
    'Reconhecer "não sei" como resposta legítima e transformar lacunas em investigação;',
    'Investigar problemas e causas sem confundir plausibilidade com fato;',
    'Mapear recursos tangíveis, intangíveis, monetários e não monetários nas dimensões cultural, social, ambiental e financeira;',
    'Definir propósito, princípios e direção de uma solução;',
    'Consolidar e revisar criticamente um Briefing autossuficiente;',
    'Ler, questionar, corrigir e validar outputs de IA antes de consolidá-los;',
    'Especificar como uma solução precisa funcionar e diferenciar essencial de desejável;',
    'Definir e materializar um MVP testável em formato adequado ao problema;',
    'Planejar a realização considerando tempo, evento, espaço, pessoas, recursos e riscos;',
    'Planejar e conduzir testes sem induzir respostas e sem coletar dados desnecessários;',
    'Analisar evidências sem inventar consenso, validação ou feedback;',
    'Decidir melhorias fundamentadas para evolução V0→V1;',
    'Pensar sustentabilidade como continuidade plural, não apenas receita comercial;',
    'Organizar prioridades e próximos passos em roadmap e sete etapas sucessivas;',
    'Comunicar a trajetória com clareza, honestidade, autoria e capacidade de celebrar aprendizados.',
  ],
};
