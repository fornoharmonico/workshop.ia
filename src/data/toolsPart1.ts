import { ToolItem } from '../types/tools';

export const TOOLS_PART_1: ToolItem[] = [
  // 1. Assistentes gerais, pesquisa e agregadores de IA (23 tools)
  {
    id: 'tool-chatgpt',
    name: 'ChatGPT',
    description: 'Assistente geral para escrita, pesquisa, análise, programação, criação e trabalho com arquivos.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://chatgpt.com/',
    source: 'official-library'
  },
  {
    id: 'tool-claude',
    name: 'Claude',
    description: 'Assistente de IA da Anthropic, útil para escrita, análise, pesquisa e programação.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://claude.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-gemini',
    name: 'Gemini',
    description: 'Assistente multimodal do Google para pesquisa, escrita, análise e criação.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://gemini.google.com/',
    source: 'official-library'
  },
  {
    id: 'tool-google-ai-studio',
    name: 'Google AI Studio',
    description: 'Ambiente do Google para testar modelos Gemini, prompts, multimodalidade e protótipos com API.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://aistudio.google.com/',
    source: 'official-library'
  },
  {
    id: 'tool-perplexity',
    name: 'Perplexity',
    description: 'Motor de pesquisa com IA que responde perguntas apoiando-se em fontes da web.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.perplexity.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-pi',
    name: 'Pi',
    description: 'Assistente conversacional da Inflection voltado a conversas naturais e apoio reflexivo.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Grátis',
    openness: 'Proprietária',
    url: 'https://pi.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-deepai',
    name: 'DeepAI',
    description: 'Conjunto de ferramentas de IA, incluindo chat, geração de imagens e APIs.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://deepai.org/',
    source: 'official-library'
  },
  {
    id: 'tool-microsoft-copilot',
    name: 'Microsoft Copilot',
    description: 'Assistente da Microsoft integrado ao ecossistema Microsoft e à web.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://copilot.microsoft.com/',
    source: 'official-library'
  },
  {
    id: 'tool-manus',
    name: 'Manus',
    description: 'Agente de IA para executar tarefas de pesquisa, análise, produção e fluxos multi-etapas.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://manus.im/',
    source: 'official-library'
  },
  {
    id: 'tool-genspark',
    name: 'Genspark',
    description: 'Plataforma de agentes e pesquisa com IA para produzir respostas, páginas e entregáveis.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.genspark.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-runable',
    name: 'Runable',
    description: 'Agente geral para pesquisa, criação de sites, slides, imagens, vídeos e outros trabalhos.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://runable.com/',
    source: 'official-library'
  },
  {
    id: 'tool-sider',
    name: 'Sider',
    description: 'Assistente de IA para pesquisa, leitura, escrita, tradução e trabalho com páginas e vídeos.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://sider.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-abacus-ai',
    name: 'Abacus.AI',
    description: 'Plataforma que reúne modelos, agentes, automações e recursos de IA em um único ambiente.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://abacus.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-tess-ai',
    name: 'Tess AI',
    description: 'Plataforma de agentes de IA que orquestra centenas de modelos para execução de tarefas, chats multi-modelo, memórias, integrações e automações.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://tessai.io/',
    source: 'official-library'
  },
  {
    id: 'tool-samaira',
    name: 'Samaira',
    description: 'Plataforma de inferência para executar modelos open-weight por API, com foco em escala, observabilidade, baixa latência e implantação empresarial.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://samaira.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-futurepedia',
    name: 'Futurepedia',
    description: 'Diretório para descobrir e comparar ferramentas de IA por categoria.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Grátis',
    openness: 'Proprietária',
    url: 'https://www.futurepedia.io/',
    source: 'official-library'
  },
  {
    id: 'tool-agent-ai',
    name: 'Agent.ai',
    description: 'Marketplace e rede profissional voltados a agentes de IA.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://agent.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-google-labs',
    name: 'Google Labs',
    description: 'Portal de experimentos e produtos em fase de testes do Google.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Grátis',
    openness: 'Proprietária',
    url: 'https://labs.google/',
    source: 'official-library'
  },
  {
    id: 'tool-deepcogito',
    name: 'DeepCogito',
    description: 'Projeto de pesquisa e família de modelos Cogito voltados a raciocínio, com código e pesos de modelos publicados para uso e experimentação.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Grátis',
    openness: 'Open source',
    url: 'https://www.deepcogito.com/',
    source: 'official-library'
  },
  {
    id: 'tool-maritalk',
    name: 'MariTalk / Maritaca AI',
    description: 'IA brasileira da Maritaca AI, com forte foco em português e contexto brasileiro. O MariTalk possui acesso gratuito limitado e planos pagos; a API dos modelos Sabiá é cobrada por uso.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.maritaca.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-qwen',
    name: 'Qwen',
    description: 'Família de modelos e assistente da Alibaba para conversação, raciocínio, programação, documentos e tarefas multimodais, com modelos abertos e acesso via Qwen Chat.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Open weights',
    url: 'https://chat.qwen.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-mistral-ai-vibe',
    name: 'Mistral AI / Vibe',
    description: 'Assistente e ecossistema europeu de modelos para texto, pesquisa, código, documentos e agentes; o Vibe reúne modos de trabalho, programação e execução assistida.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Híbrida',
    url: 'https://chat.mistral.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-z-ai-glm',
    name: 'Z.ai / GLM (GLM-5.2)',
    description: 'Ecossistema da Z.ai/Zhipu AI para conversação, raciocínio, programação e agentes; combina o serviço Z.ai com modelos GLM disponibilizados separadamente.',
    category: 'Assistentes gerais, pesquisa e agregadores de IA',
    pricing: 'Freemium',
    openness: 'Híbrida',
    url: 'https://chat.z.ai/',
    source: 'official-library'
  },

  // 2. Conhecimento, produtividade, organização e tomada de decisão (15 tools)
  {
    id: 'tool-notion',
    name: 'Notion',
    description: 'Workspace para notas, documentos, bancos de dados, projetos e colaboração.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.notion.so/',
    source: 'official-library'
  },
  {
    id: 'tool-obsidian',
    name: 'Obsidian',
    description: 'Aplicativo local de notas em Markdown e base de conhecimento conectada; o app principal é gratuito e serviços opcionais como Sync e Publish são pagos.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Grátis',
    openness: 'Proprietária',
    url: 'https://obsidian.md/',
    source: 'official-library'
  },
  {
    id: 'tool-notebooklm',
    name: 'NotebookLM',
    description: 'Ferramenta do Google para pesquisar, resumir e conversar com um conjunto de fontes fornecidas pelo usuário.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://notebooklm.google/',
    source: 'official-library'
  },
  {
    id: 'tool-kortex',
    name: 'Kortex',
    description: 'Aplicativo de escrita e segundo cérebro para organizar ideias, notas e conhecimento.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Grátis',
    openness: 'Proprietária',
    url: 'https://kortex.co/',
    source: 'official-library'
  },
  {
    id: 'tool-tana',
    name: 'Tana',
    description: 'Workspace em rede para notas estruturadas, conhecimento e automação com IA.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://tana.inc/',
    source: 'official-library'
  },
  {
    id: 'tool-readwise',
    name: 'Readwise',
    description: 'Serviço para centralizar destaques de leitura e revisar conhecimento capturado.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://readwise.io/',
    source: 'official-library'
  },
  {
    id: 'tool-sparkle',
    name: 'Sparkle',
    description: 'Organizador de arquivos para Mac que usa IA para classificar e manter pastas organizadas.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://makeitsparkle.co/',
    source: 'official-library'
  },
  {
    id: 'tool-morgen',
    name: 'Morgen',
    description: 'Agenda e planejador que integra calendários, tarefas e gestão do tempo.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://www.morgen.so/',
    source: 'official-library'
  },
  {
    id: 'tool-reclaim-ai',
    name: 'Reclaim.ai',
    description: 'Planejamento automático de agenda, hábitos, tarefas e reuniões.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://reclaim.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-rize',
    name: 'Rize',
    description: 'Rastreamento de tempo e foco para compreender hábitos de trabalho e produtividade.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://rize.io/',
    source: 'official-library'
  },
  {
    id: 'tool-taskade',
    name: 'Taskade',
    description: 'Gestão de projetos, documentos colaborativos, automações e agentes de IA.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.taskade.com/',
    source: 'official-library'
  },
  {
    id: 'tool-vectal',
    name: 'Vectal',
    description: 'Workspace de produtividade e organização apoiado por IA.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.vectal.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-rationale',
    name: 'Rationale',
    description: 'Ferramenta da Jina AI para estruturar comparações e apoiar decisões.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Grátis',
    openness: 'Proprietária',
    url: 'https://rationale.jina.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-wolfram-alpha',
    name: 'Wolfram|Alpha',
    description: 'Motor computacional para cálculos, matemática, ciência e consultas estruturadas.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.wolframalpha.com/',
    source: 'official-library'
  },
  {
    id: 'tool-keepmind',
    name: 'KeepMind',
    description: 'Transforma materiais de estudo em flashcards, quizzes e mapas mentais com repetição espaçada.',
    category: 'Conhecimento, produtividade, organização e tomada de decisão',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://keepmind.ai/',
    source: 'official-library'
  },

  // 3. Reuniões, transcrição e captura de conhecimento (12 tools)
  {
    id: 'tool-plaud-note',
    name: 'PLAUD Note / Plaud',
    description: 'Ecossistema de gravadores PLAUD e software com IA para capturar, transcrever, resumir e organizar reuniões e conversas.',
    category: 'Reuniões, transcrição e captura de conhecimento',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.plaud.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-hedy-ai',
    name: 'Hedy AI',
    description: 'Assistente de reuniões que transcreve e oferece sugestões e coaching em tempo real.',
    category: 'Reuniões, transcrição e captura de conhecimento',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.hedy.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-granola',
    name: 'Granola',
    description: 'Bloco de notas com IA que transcreve reuniões e transforma notas e áudio em resumos estruturados.',
    category: 'Reuniões, transcrição e captura de conhecimento',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.granola.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-fathom',
    name: 'Fathom',
    description: 'Grava, transcreve e resume reuniões online, destacando decisões e próximos passos.',
    category: 'Reuniões, transcrição e captura de conhecimento',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://fathom.video/',
    source: 'official-library'
  },
  {
    id: 'tool-otter-ai',
    name: 'Otter.ai',
    description: 'Transcrição automática de reuniões, áudio e conversas com resumos e busca.',
    category: 'Reuniões, transcrição e captura de conhecimento',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://otter.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-tactiq',
    name: 'Tactiq',
    description: 'Extensão para transcrever reuniões online e gerar resumos e ações com IA.',
    category: 'Reuniões, transcrição e captura de conhecimento',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://tactiq.io/',
    source: 'official-library'
  },
  {
    id: 'tool-transkriptor',
    name: 'Transkriptor',
    description: 'Transcrição de áudio e vídeo para texto com recursos de resumo e edição.',
    category: 'Reuniões, transcrição e captura de conhecimento',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://transkriptor.com/',
    source: 'official-library'
  },
  {
    id: 'tool-turboscribe',
    name: 'TurboScribe',
    description: 'Serviço de transcrição de arquivos de áudio e vídeo.',
    category: 'Reuniões, transcrição e captura de conhecimento',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://turboscribe.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-gladia',
    name: 'Gladia',
    description: 'API e plataforma de speech-to-text e inteligência de áudio, com cobrança pay-as-you-go; novos usuários podem receber créditos iniciais não recorrentes.',
    category: 'Reuniões, transcrição e captura de conhecimento',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://www.gladia.io/',
    source: 'official-library'
  },
  {
    id: 'tool-audioscribe',
    name: 'Audioscribe',
    description: 'Converte áudio em transcrições limpas, resumos e registros com identificação de falantes.',
    category: 'Reuniões, transcrição e captura de conhecimento',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://audioscribe.org/',
    source: 'official-library'
  },
  {
    id: 'tool-riverside',
    name: 'Riverside',
    description: 'Gravação remota de áudio e vídeo, transcrição e recursos de edição e recortes automáticos.',
    category: 'Reuniões, transcrição e captura de conhecimento',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://riverside.fm/',
    source: 'official-library'
  },
  {
    id: 'tool-eightify',
    name: 'Eightify',
    description: 'Resume vídeos do YouTube e destaca seus principais pontos com IA.',
    category: 'Reuniões, transcrição e captura de conhecimento',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://eightify.app/',
    source: 'official-library'
  },

  // 4. Voz, clonagem, fala sintética e agentes de voz (13 tools)
  {
    id: 'tool-elevenlabs',
    name: 'ElevenLabs',
    description: 'Geração e clonagem de voz, text-to-speech, dublagem e agentes conversacionais.',
    category: 'Voz, clonagem, fala sintética e agentes de voz',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://elevenlabs.io/',
    source: 'official-library'
  },
  {
    id: 'tool-elevenlabs-conversational-ai',
    name: 'ElevenLabs Conversational AI',
    description: 'Criação de agentes de voz conversacionais conectáveis a sistemas e canais.',
    category: 'Voz, clonagem, fala sintética e agentes de voz',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://elevenlabs.io/conversational-ai',
    source: 'official-library'
  },
  {
    id: 'tool-hume-ai',
    name: 'Hume AI',
    description: 'Modelos e interfaces de voz com foco em expressão e inteligência emocional.',
    category: 'Voz, clonagem, fala sintética e agentes de voz',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.hume.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-vogent',
    name: 'Vogent',
    description: 'Plataforma para criar e operar agentes de voz com IA.',
    category: 'Voz, clonagem, fala sintética e agentes de voz',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://vogent.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-vapi',
    name: 'Vapi',
    description: 'Infraestrutura e APIs para construir agentes e aplicações de voz.',
    category: 'Voz, clonagem, fala sintética e agentes de voz',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://vapi.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-synthflow',
    name: 'Synthflow',
    description: 'Construtor no-code de agentes de voz para atendimento e automação.',
    category: 'Voz, clonagem, fala sintética e agentes de voz',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://synthflow.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-thoughtly',
    name: 'Thoughtly',
    description: 'Plataforma para criar agentes de voz para operações comerciais e atendimento.',
    category: 'Voz, clonagem, fala sintética e agentes de voz',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://www.thoughtly.com/',
    source: 'official-library'
  },
  {
    id: 'tool-cartesia-sonic',
    name: 'Cartesia Sonic',
    description: 'Modelo e API de voz/text-to-speech de baixa latência.',
    category: 'Voz, clonagem, fala sintética e agentes de voz',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://cartesia.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-lovo-ai',
    name: 'LOVO AI',
    description: 'Geração de voz, text-to-speech e criação de locuções com IA.',
    category: 'Voz, clonagem, fala sintética e agentes de voz',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://lovo.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-topmediai',
    name: 'TopMediai',
    description: 'Ferramentas de voz, clonagem, text-to-speech, música e mídia com IA.',
    category: 'Voz, clonagem, fala sintética e agentes de voz',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.topmediai.com/',
    source: 'official-library'
  },
  {
    id: 'tool-chatterbox-resemble',
    name: 'Chatterbox — Resemble AI',
    description: 'Modelo open source de text-to-speech e clonagem de voz; provável referência da anotação “Shatter box”.',
    category: 'Voz, clonagem, fala sintética e agentes de voz',
    pricing: 'Grátis',
    openness: 'Open source',
    url: 'https://www.resemble.ai/chatterbox/',
    source: 'official-library'
  },
  {
    id: 'tool-sesame',
    name: 'Sesame',
    description: 'Pesquisa e experiências de voz conversacional natural com IA.',
    category: 'Voz, clonagem, fala sintética e agentes de voz',
    pricing: 'Grátis',
    openness: 'Proprietária',
    url: 'https://www.sesame.com/',
    source: 'official-library'
  },
  {
    id: 'tool-aimybox',
    name: 'Aimybox',
    description: 'SDK e plataforma open source para criar e incorporar assistentes de voz em aplicativos e dispositivos.',
    category: 'Voz, clonagem, fala sintética e agentes de voz',
    pricing: 'Grátis',
    openness: 'Open source',
    url: 'https://aimybox.com/',
    source: 'official-library'
  },

  // 5. Imagem, design, branding e recursos visuais (31 tools)
  {
    id: 'tool-midjourney',
    name: 'Midjourney',
    description: 'Geração de imagens por prompts, com forte uso em arte, conceito e direção visual.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://www.midjourney.com/',
    source: 'official-library'
  },
  {
    id: 'tool-ideogram',
    name: 'Ideogram',
    description: 'Geração de imagens com bom suporte a tipografia, cartazes, logos e peças gráficas.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://ideogram.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-dreamina',
    name: 'Dreamina',
    description: 'Plataforma da ByteDance/CapCut para criação de imagens e vídeos com IA.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://dreamina.capcut.com/',
    source: 'official-library'
  },
  {
    id: 'tool-seaart',
    name: 'SeaArt',
    description: 'Plataforma de geração e edição de imagens e vídeos com diferentes modelos de IA.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.seaart.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-krea',
    name: 'Krea',
    description: 'Suite visual para geração, edição, upscale e experimentação com imagens e vídeo.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.krea.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-recraft',
    name: 'Recraft',
    description: 'Geração e edição de imagens, vetores, ícones e peças de design.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.recraft.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-openart',
    name: 'OpenArt',
    description: 'Geração e edição de imagens com IA, modelos e fluxos criativos.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://openart.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-freepik-ai',
    name: 'Freepik AI',
    description: 'Ferramentas de geração, edição e recursos visuais integradas ao ecossistema Freepik.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.freepik.com/ai',
    source: 'official-library'
  },
  {
    id: 'tool-microsoft-designer',
    name: 'Microsoft Designer',
    description: 'Criação de peças gráficas, imagens e layouts com assistência de IA.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://designer.microsoft.com/',
    source: 'official-library'
  },
  {
    id: 'tool-visual-electric',
    name: 'Visual Electric',
    description: 'Canvas generativo para criação visual, direção de arte, imagens e vídeos.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://visualelectric.com/',
    source: 'official-library'
  },
  {
    id: 'tool-lovart',
    name: 'Lovart',
    description: 'Agente de design para branding, identidade visual, imagens e peças criativas.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.lovart.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-cgdream',
    name: 'CGDream',
    description: 'Geração de imagens, logos, branding e recursos visuais com IA.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://cgdream.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-vizcom',
    name: 'Vizcom',
    description: 'Transforma sketches em renders e visualizações de produto para design industrial.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://vizcom.com/',
    source: 'official-library'
  },
  {
    id: 'tool-newarc',
    name: 'NewArc',
    description: 'Transforma desenhos e sketches em imagens realistas, especialmente para moda e produto.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.newarc.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-kive',
    name: 'Kive',
    description: 'Criação, organização e produção de imagens de produto e conteúdo visual.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://kive.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-topaz-labs',
    name: 'Topaz Labs',
    description: 'Upscale, redução de ruído e melhoria de qualidade de imagens e vídeos.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://www.topazlabs.com/',
    source: 'official-library'
  },
  {
    id: 'tool-magnific',
    name: 'Magnific',
    description: 'Upscale e aprimoramento generativo de imagens.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://magnific.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-remove-bg',
    name: 'Remove.bg',
    description: 'Remoção automática de fundo de imagens.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.remove.bg/',
    source: 'official-library'
  },
  {
    id: 'tool-coolors',
    name: 'Coolors',
    description: 'Gerador, explorador e organizador de paletas de cores.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://coolors.co/',
    source: 'official-library'
  },
  {
    id: 'tool-looka',
    name: 'Looka',
    description: 'Criação de logos, identidade visual e kit de marca com IA.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://looka.com/',
    source: 'official-library'
  },
  {
    id: 'tool-logomaster-ai',
    name: 'Logomaster.ai',
    description: 'Criação assistida de logos e identidade visual.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://logomaster.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-icons8',
    name: 'Icons8',
    description: 'Biblioteca de ícones, ilustrações, fotos e ferramentas criativas.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://icons8.com/',
    source: 'official-library'
  },
  {
    id: 'tool-lexica',
    name: 'Lexica',
    description: 'Busca e inspiração de imagens geradas por IA, com recursos de geração.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://lexica.art/',
    source: 'official-library'
  },
  {
    id: 'tool-sketchpad',
    name: 'Sketchpad',
    description: 'Editor de desenho e ilustração no navegador.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Grátis',
    openness: 'Proprietária',
    url: 'https://sketch.io/sketchpad/',
    source: 'official-library'
  },
  {
    id: 'tool-artistly',
    name: 'Artistly',
    description: 'Ferramenta de geração de arte e imagens com IA.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://artistly.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-shotdeck',
    name: 'ShotDeck',
    description: 'Biblioteca de frames de filmes para referência visual e cinematográfica.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://shotdeck.com/',
    source: 'official-library'
  },
  {
    id: 'tool-eyecandy',
    name: 'Eyecandy',
    description: 'Biblioteca de referências de movimentos de câmera, enquadramentos e linguagem audiovisual.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Grátis',
    openness: 'Proprietária',
    url: 'https://eyecannndy.com/',
    source: 'official-library'
  },
  {
    id: 'tool-playground',
    name: 'Playground',
    description: 'Ferramentas de criação e design visual com IA.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://playground.com/design',
    source: 'official-library'
  },
  {
    id: 'tool-jaaz',
    name: 'Jaaz',
    description: 'Agente/canvas de design para combinar referências e criar imagens e composições.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://jaaz.app/',
    source: 'official-library'
  },
  {
    id: 'tool-z-image',
    name: 'Z Image',
    description: 'Aplicativo desktop gratuito e open source para geração local de imagens com IA, executando modelos compatíveis no próprio computador.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Grátis',
    openness: 'Open source',
    url: 'https://www.zimage.space/',
    source: 'official-library'
  },
  {
    id: 'tool-clipdrop',
    name: 'Clipdrop',
    description: 'Suite de edição de imagens com IA para remoção de fundo e objetos, cleanup, upscale, relight, uncrop, substituição de fundo e outras tarefas visuais rápidas.',
    category: 'Imagem, design, branding e recursos visuais',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://clipdrop.co/',
    source: 'official-library'
  },

  // 6. Vídeo, animação, avatares e edição (34 tools)
  {
    id: 'tool-runway',
    name: 'Runway',
    description: 'Geração e edição de vídeo com IA, incluindo text-to-video e image-to-video. Possui uma camada gratuita de exploração com créditos únicos, mas o uso continuado depende de plano pago.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://runwayml.com/',
    source: 'official-library'
  },
  {
    id: 'tool-kling-ai',
    name: 'Kling AI',
    description: 'Geração de vídeo e animação de imagens a partir de prompts.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://klingai.com/',
    source: 'official-library'
  },
  {
    id: 'tool-hailuo-ai',
    name: 'Hailuo AI',
    description: 'Geração de vídeos por texto ou imagem.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://hailuoai.video/',
    source: 'official-library'
  },
  {
    id: 'tool-ltx-studio',
    name: 'LTX Studio',
    description: 'Criação audiovisual com IA, incluindo roteiro, storyboard, cenas e vídeo.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://ltx.studio/',
    source: 'official-library'
  },
  {
    id: 'tool-higgsfield',
    name: 'Higgsfield',
    description: 'Geração de vídeo e recursos cinematográficos controlados por IA.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://higgsfield.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-luma-ai',
    name: 'Luma AI',
    description: 'Criação de vídeo, imagens e conteúdo visual generativo.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://lumalabs.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-moonvalley',
    name: 'Moonvalley',
    description: 'Plataforma de geração de vídeo com IA.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://www.moonvalley.com/',
    source: 'official-library'
  },
  {
    id: 'tool-hedra',
    name: 'Hedra',
    description: 'Criação de personagens, avatares e vídeos falados com IA.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.hedra.com/',
    source: 'official-library'
  },
  {
    id: 'tool-pixverse',
    name: 'PixVerse',
    description: 'Geração e animação de vídeos com IA.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://app.pixverse.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-tencent-hunyuan',
    name: 'Tencent Hunyuan',
    description: 'Ecossistema de modelos e serviços de IA da Tencent, com recursos multimodais e alguns modelos/pesos publicados separadamente, além de serviços proprietários.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Híbrida',
    url: 'https://hunyuan.tencent.com/',
    source: 'official-library'
  },
  {
    id: 'tool-fal-ai',
    name: 'fal.ai',
    description: 'Infraestrutura/API para executar modelos generativos de imagem, vídeo, áudio e mídia.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://fal.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-syncmonster',
    name: 'SyncMonster',
    description: 'Lip-sync, dublagem e edição de expressão facial em vídeo com IA.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://syncmonster.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-lipdub',
    name: 'LipDub',
    description: 'Ferramenta de lip-sync e dublagem de vídeo em diferentes idiomas.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://lipdub.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-captions',
    name: 'Captions',
    description: 'Criação e edição de talking videos, legendas, avatares e recursos de IA para vídeo.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.captions.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-descript',
    name: 'Descript',
    description: 'Edição de áudio e vídeo baseada em texto, transcrição e recursos de IA.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.descript.com/',
    source: 'official-library'
  },
  {
    id: 'tool-adobe-podcast-enhance',
    name: 'Adobe Podcast Enhance',
    description: 'Melhora automaticamente clareza e qualidade de gravações de voz.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://podcast.adobe.com/enhance',
    source: 'official-library'
  },
  {
    id: 'tool-gling',
    name: 'Gling',
    description: 'Edição automática de vídeos falados, removendo pausas e trechos desnecessários.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.gling.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-firecut',
    name: 'FireCut',
    description: 'Plugin e ferramentas de IA para acelerar edição de vídeo.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://firecut.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-opusclip',
    name: 'OpusClip',
    description: 'Transforma vídeos longos em clipes curtos para redes sociais.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.opus.pro/',
    source: 'official-library'
  },
  {
    id: 'tool-reka-clip',
    name: 'Reka Clip',
    description: 'Ferramenta da Reka para transformar conteúdos longos em clipes curtos.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://clip.reka.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-magic-clips-riverside',
    name: 'Magic Clips — Riverside',
    description: 'Criação automática de cortes curtos a partir de gravações no Riverside.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://riverside.fm/magic-clips',
    source: 'official-library'
  },
  {
    id: 'tool-vidyo-ai-quso',
    name: 'Vidyo.ai / Quso.ai',
    description: 'Recorta e reaproveita vídeos longos para formatos curtos e sociais.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://quso.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-autoshorts',
    name: 'AutoShorts',
    description: 'Criação automatizada de vídeos curtos e conteúdo faceless.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://autoshorts.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-videdge',
    name: 'Videdge',
    description: 'Criação de vídeos faceless apoiada por IA.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://videdge.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-visla',
    name: 'Visla',
    description: 'Criação e edição de vídeos com IA a partir de texto, roteiro e mídia.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.visla.us/',
    source: 'official-library'
  },
  {
    id: 'tool-renderforest',
    name: 'Renderforest',
    description: 'Criação de vídeos, animações, apresentações e peças de marca por templates.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.renderforest.com/',
    source: 'official-library'
  },
  {
    id: 'tool-animaker',
    name: 'Animaker',
    description: 'Criação de vídeos animados e apresentações.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.animaker.com/',
    source: 'official-library'
  },
  {
    id: 'tool-adobe-express-animation-maker',
    name: 'Adobe Express Animation Maker',
    description: 'Criação rápida de animações e vídeos simples no Adobe Express.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.adobe.com/express/create/animation',
    source: 'official-library'
  },
  {
    id: 'tool-createstudio',
    name: 'CreateStudio',
    description: 'Software para criação de vídeos e animações.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://createstudio.com/',
    source: 'official-library'
  },
  {
    id: 'tool-clueso',
    name: 'Clueso',
    description: 'Transforma gravações de tela em vídeos de produto, onboarding e documentação.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.clueso.io/',
    source: 'official-library'
  },
  {
    id: 'tool-happyhorse',
    name: 'HappyHorse — Alibaba Cloud',
    description: 'Família/modelo de geração e edição de vídeo com IA da Alibaba Cloud, com texto-para-vídeo, imagem-para-vídeo, referência, 1080p, áudio nativo e lip-sync.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://www.alibabacloud.com/help/en/model-studio/happyhorse-text-to-video-api-reference',
    source: 'official-library'
  },
  {
    id: 'tool-seedance',
    name: 'Seedance — ByteDance',
    description: 'Família de modelos de geração de vídeo da ByteDance Seed. As versões atuais combinam texto, imagem, áudio e vídeo como referências, com narrativa multi-shot, áudio sincronizado, controle de referência e edição.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://seed.bytedance.com/en/seedance2_5',
    source: 'official-library'
  },
  {
    id: 'tool-wan-alibaba',
    name: 'Wan — Alibaba',
    description: 'Família de modelos visuais da Alibaba para geração e edição de vídeo e imagem, incluindo modelos publicados com código/pesos abertos e serviços hospedados comerciais.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Freemium',
    openness: 'Open source',
    url: 'https://www.alibabagroup.com/en-US/ai-governance/wan',
    source: 'official-library'
  },
  {
    id: 'tool-artlist-ai',
    name: 'Artlist AI',
    description: 'Suite criativa para vídeo, imagem, música e voiceover com IA, reunindo diversos modelos em um único ambiente, além do catálogo tradicional de música, SFX, footage e templates da Artlist.',
    category: 'Vídeo, animação, avatares e edição',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://artlist.io/ai',
    source: 'official-library'
  },

  // 7. Música e áudio criativo (8 tools)
  {
    id: 'tool-udio',
    name: 'Udio',
    description: 'Geração de músicas a partir de prompts e letras.',
    category: 'Música e áudio criativo',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.udio.com/',
    source: 'official-library'
  },
  {
    id: 'tool-riffusion',
    name: 'Riffusion',
    description: 'Geração e experimentação musical com IA.',
    category: 'Música e áudio criativo',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.riffusion.com/',
    source: 'official-library'
  },
  {
    id: 'tool-soundful',
    name: 'Soundful',
    description: 'Geração de faixas e trilhas musicais com IA.',
    category: 'Música e áudio criativo',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://soundful.com/',
    source: 'official-library'
  },
  {
    id: 'tool-aiva',
    name: 'AIVA',
    description: 'Composição musical assistida por inteligência artificial.',
    category: 'Música e áudio criativo',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://www.aiva.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-stable-audio',
    name: 'Stable Audio',
    description: 'Geração de áudio e música por IA.',
    category: 'Música e áudio criativo',
    pricing: 'Freemium',
    openness: 'Híbrida',
    url: 'https://stableaudio.com/',
    source: 'official-library'
  },
  {
    id: 'tool-aimusicgen',
    name: 'AIMusicGen',
    description: 'Gerador de música por IA.',
    category: 'Música e áudio criativo',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://aimusicgen.ai/',
    source: 'official-library'
  },
  {
    id: 'tool-songgenerator-io',
    name: 'SongGenerator.io',
    description: 'Gerador online de músicas a partir de instruções de texto.',
    category: 'Música e áudio criativo',
    pricing: 'Freemium',
    openness: 'Proprietária',
    url: 'https://songgenerator.io/features/ai-music-generator',
    source: 'official-library'
  },
  {
    id: 'tool-epidemic-sound',
    name: 'Epidemic Sound',
    description: 'Biblioteca licenciada de música e efeitos sonoros para produção de conteúdo.',
    category: 'Música e áudio criativo',
    pricing: 'Paga',
    openness: 'Proprietária',
    url: 'https://www.epidemicsound.com/',
    source: 'official-library'
  }
];
