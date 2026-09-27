/**
 * Problem Map Seed Dataset V3
 * Master Dossier V3 - Anexo 09: 15 canonical problem seeds across 9 categories and 6 scales.
 */
import { ProblemItem } from './types.ts';

export const PROBLEM_CATEGORIES = [
  'Educação e Aprendizagem',
  'Meio Ambiente e Clima',
  'Comunidade e Convivência',
  'Saúde e Bem-Estar',
  'Juventude e Futuro do Trabalho',
  'Cultura e Expressão',
  'Acessibilidade e Inclusão',
  'Cidadania e Direitos',
  'Tecnologia e Ética',
] as const;

export const PROBLEM_SCALES = [
  'Pessoal / Individual',
  'Escolar / Sala de Aula',
  'Bairro / Comunidade',
  'Cidade / Municipal',
  'Regional / Estadual',
  'Digital / Sem Fronteiras',
] as const;

export const PROBLEM_MAP_SEED: ProblemItem[] = [
  {
    id: 'prob-01',
    title: 'Desengajamento com Métodos Tradicionais de Estudo',
    question: 'Como tornar o aprendizado de temas difíceis mais interativo, prático e conectado à vida real dos estudantes?',
    description: 'Estudantes relatam desmotivação diante de aulas puramente expositivas e dificuldade de reter conteúdos abstratos sem aplicação prática imediata.',
    category: 'Educação e Aprendizagem',
    scale: 'Escolar / Sala de Aula',
  },
  {
    id: 'prob-02',
    title: 'Descarte Inadequado de Resíduos na Escola e Bairro',
    question: 'Como transformar a separação e reciclagem de resíduos em um hábito coletivo engajador e recompensador?',
    description: 'Falta de lixeiras adequadas, desconhecimento sobre reciclagem e ausência de incentivos geram acúmulo de lixo nas imediações escolares e praças públicas.',
    category: 'Meio Ambiente e Clima',
    scale: 'Bairro / Comunidade',
  },
  {
    id: 'prob-03',
    title: 'Ansiedade e Sobrecarga Emocional na Adolescência',
    question: 'Como criar espaços seguros de escuta, acolhimento e suporte emocional entre pares nas escolas?',
    description: 'Pressão por desempenho acadêmico, vestibular e exposição em redes sociais ampliam quadros de isolamento e sobrecarga emocional.',
    category: 'Saúde e Bem-Estar',
    scale: 'Pessoal / Individual',
  },
  {
    id: 'prob-04',
    title: 'Primeiro Emprego e Lacuna de Experiência Prática',
    question: 'Como conectar jovens sem experiência a projetos reais que desenvolvam portfólio e competências do futuro?',
    description: 'Empresas exigem experiência prévia até para vagas de estágio/jovem aprendiz, criando uma barreira invisível para quem está começando.',
    category: 'Juventude e Futuro do Trabalho',
    scale: 'Cidade / Municipal',
  },
  {
    id: 'prob-05',
    title: 'Espaços Públicos Subutilizados e Inseguros para Jovens',
    question: 'Como revitalizar praças e quadras com atividades culturais e esportivas geridas pela própria juventude?',
    description: 'Áreas de lazer abandonadas viram pontos ermos, afastando a comunidade e reduzindo opções saudáveis de convivência local.',
    category: 'Comunidade e Convivência',
    scale: 'Bairro / Comunidade',
  },
  {
    id: 'prob-06',
    title: 'Falta de Acessibilidade para Estudantes Neurodivergentes',
    question: 'Como adaptar materiais e rotinas escolares para incluir de forma efetiva alunos com TDAH, autismo ou dislexia?',
    description: 'Ambientes escolares hiperestimulantes e avaliações rígidas penalizam estudantes com diferentes ritmos e formas de processamento cognitivo.',
    category: 'Acessibilidade e Inclusão',
    scale: 'Escolar / Sala de Aula',
  },
  {
    id: 'prob-07',
    title: 'Desinformação e Despreparo Crítico com IA e Mídias',
    question: 'Como empoderar jovens a identificar notícias falsas, manipulações algorítmicas e deepfakes com agilidade?',
    description: 'A proliferação de conteúdos enganosos e uso acrítico de IA compromete a formação cidadã e gera polarização prejudicial.',
    category: 'Tecnologia e Ética',
    scale: 'Digital / Sem Fronteiras',
  },
  {
    id: 'prob-08',
    title: 'Invisibilidade de Artistas e Manifestações Culturais Locais',
    question: 'Como criar canais acessíveis para divulgar a produção artística e as tradições periféricas e regionais?',
    description: 'Talentos da música, teatro, literatura e artes visuais locais não encontram palcos ou plataformas com alcance além de seus círculos imediatos.',
    category: 'Cultura e Expressão',
    scale: 'Regional / Estadual',
  },
  {
    id: 'prob-09',
    title: 'Desperdício de Alimentos em Mercados e Refeitórios',
    question: 'Como reaproveitar alimentos próprios para consumo antes do descarte, conectando doadores e cozinhas comunitárias?',
    description: 'Alimentos com pequenas avarias estéticas são jogados fora diariamente enquanto famílias próximas enfrentam vulnerabilidade alimentar.',
    category: 'Meio Ambiente e Clima',
    scale: 'Cidade / Municipal',
  },
  {
    id: 'prob-10',
    title: 'Dificuldade de Mobilidade Segura para Mulheres e Meninas',
    question: 'Como mapear rotas seguras e criar redes de apoio para o deslocamento urbano de estudantes no período noturno?',
    description: 'Ruas mal iluminadas e falta de transporte pontual provocam medo e restringem o direito à cidade e aos estudos noturnos.',
    category: 'Cidadania e Direitos',
    scale: 'Bairro / Comunidade',
  },
  {
    id: 'prob-11',
    title: 'Educação Financeira Prática e Prevenção de Dívidas',
    question: 'Como ensinar planejamento financeiro, orçamento e consumo consciente de forma descomplicada para quem começa a ter renda?',
    description: 'O apelo ao crédito fácil e apostas online atinge jovens sem preparo básico sobre juros, poupança e independência financeira.',
    category: 'Juventude e Futuro do Trabalho',
    scale: 'Pessoal / Individual',
  },
  {
    id: 'prob-12',
    title: 'Barreiras de Comunicação para Surdos no Comércio e Saúde',
    question: 'Como capacitar estabelecimentos locais para atender clientes surdos com Libras básica ou recursos visuais práticos?',
    description: 'A comunidade surda enfrenta constrangimentos rotineiros pela quase inexistência de atendimento acessível em serviços essenciais.',
    category: 'Acessibilidade e Inclusão',
    scale: 'Cidade / Municipal',
  },
  {
    id: 'prob-13',
    title: 'Sedentarismo e Baixa Prática de Atividade Física',
    question: 'Como gamificar ou transformar a prática esportiva em encontros sociais leves para quem não gosta de esportes competitivos?',
    description: 'Muitos adolescentes passam horas em telas sedentárias e se sentem intimidados pela cultura de academias ou esportes de alto rendimento.',
    category: 'Saúde e Bem-Estar',
    scale: 'Escolar / Sala de Aula',
  },
  {
    id: 'prob-14',
    title: 'Falta de Voz dos Estudantes nas Decisões da Escola',
    question: 'Como estruturar canais de participação colegiada e escuta ativa entre gestão escolar e corpo discente?',
    description: 'Decisões sobre calendário, regras de convivência e eventos ocorrem sem consulta genuína àqueles que mais vivenciam o dia a dia.',
    category: 'Cidadania e Direitos',
    scale: 'Escolar / Sala de Aula',
  },
  {
    id: 'prob-15',
    title: 'Preservação de Rios Urbanos e Nascentes Locais',
    question: 'Como envolver escolas em projetos de ciência cidadã para monitorar a qualidade da água dos córregos da bacia local?',
    description: 'Cursos d’água urbanos são canalizados ou poluídos sem que a população conheça sua história e importância ambiental.',
    category: 'Meio Ambiente e Clima',
    scale: 'Regional / Estadual',
  },
];
