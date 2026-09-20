import React, { useState } from 'react';
import { 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  MessageSquarePlus, 
  Eye, 
  Sliders, 
  TrendingUp, 
  Flame, 
  AlertTriangle,
  Lightbulb,
  FlaskConical,
  Target,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TeamProject, TestExecutionStatus } from '../../types/workshop';
import { PILOT_CHAIN_ACTIVITIES, getPilotActivityById } from '../../data/pilotChain';

export type TeamOperationalStatus = 'avancou' | 'parado' | 'sem_teste' | 'precisa_apoio';

interface CanonicalActivityMapping {
  canonicalCode: string;
  title: string;
  encounterNum: number;
  socraticProvocation: string;
  facilitatorAttentionPoint: string;
}

export const CANONICAL_ACTIVITIES_MAP: Record<string, CanonicalActivityMapping> = {
  'A01': {
    canonicalCode: 'A01',
    title: 'Escolher o problema',
    encounterNum: 1,
    socraticProvocation: 'O problema afeta pessoas reais no território ou é apenas uma ideia abstrata?',
    facilitatorAttentionPoint: 'Garantir que a equipe não escolha uma solução antes de enquadrar o problema.'
  },
  'A02': {
    canonicalCode: 'A02',
    title: 'Entender melhor o problema',
    encounterNum: 1,
    socraticProvocation: 'Vocês estão separando fatos observados daquilo que são apenas hipóteses da equipe?',
    facilitatorAttentionPoint: 'Checar se a investigação causal separa observação de hipótese e tem critério de parada.'
  },
  'A03': {
    canonicalCode: 'A03',
    title: 'O que temos e o que precisamos (Mapa de Recursos)',
    encounterNum: 1,
    socraticProvocation: 'Quais recursos nas dimensões cultural, social, ambiental e financeira vocês já possuem sem depender de dinheiro?',
    facilitatorAttentionPoint: 'Estimular o olhar de abundância e parcerias locais antes de alegar falta de verba.'
  },
  'A04': {
    canonicalCode: 'A04',
    title: 'Que transformação queremos provocar? (Propósito e Direção)',
    encounterNum: 1,
    socraticProvocation: 'Qual é a transformação real que a equipe quer gerar antes de definir o formato técnico da solução?',
    facilitatorAttentionPoint: 'Evitar que o propósito vire slogan publicitário genérico desvinculado dos princípios.'
  },
  'A05': {
    canonicalCode: 'A05',
    title: 'Organizar a primeira versão do projeto (Briefing V0)',
    encounterNum: 2,
    socraticProvocation: 'O que ficou intencionalmente de fora do escopo inicial da solução?',
    facilitatorAttentionPoint: 'Garantir clareza sobre o público beneficiário e o problema atacado.'
  },
  'A06': {
    canonicalCode: 'A06',
    title: 'Revisar e melhorar o projeto (Briefing V1)',
    encounterNum: 2,
    socraticProvocation: 'O que mudou do Briefing V0 para a V1 após a revisão crítica e o que a equipe decidiu soberanamente?',
    facilitatorAttentionPoint: 'Verificar se a agência humana foi exercida e se a equipe não voltou a inchar o escopo.'
  },
  'A07': {
    canonicalCode: 'A07',
    title: 'Como a solução precisa funcionar? (PRD)',
    encounterNum: 2,
    socraticProvocation: 'Qual é o fluxo passo a passo que o usuário fará na solução?',
    facilitatorAttentionPoint: 'Separar o que é estritamente essencial agora do que é desejável depois.'
  },
  'A08': {
    canonicalCode: 'A08',
    title: 'Construir a menor versão testável (MVP + Protótipo V0)',
    encounterNum: 2,
    socraticProvocation: 'Qual é a menor versão que permite testar a hipótese central com usuários reais no mundo exterior?',
    facilitatorAttentionPoint: 'Impedir protótipos complexos que atrasem o teste de campo e garantir o preenchimento do plano de realização.'
  },
  'A09': {
    canonicalCode: 'A09',
    title: 'Testar, aprender e decidir o que melhorar (Evidências e Evolução V0→V1)',
    encounterNum: 3,
    socraticProvocation: 'Não vendam a ideia. Onde o usuário hesitou? Quais hipóteses iniciais caíram por terra?',
    facilitatorAttentionPoint: 'Checar se a equipe está colhendo evidências factuais ou se declarou honestamente a ausência de teste.'
  },
  'A10': {
    canonicalCode: 'A10',
    title: 'Como essa solução pode se sustentar? (Modelo de Sustentabilidade)',
    encounterNum: 3,
    socraticProvocation: 'Como essa solução continuará viva no tempo considerando múltiplos arranjos além do monetário?',
    facilitatorAttentionPoint: 'Verificar coerência entre a transformação gerada e os recursos necessários.'
  },
  'A11': {
    canonicalCode: 'A11',
    title: 'Planejar os próximos passos (Roadmap + Linha do Tempo em 7 Etapas)',
    encounterNum: 3,
    socraticProvocation: 'O que está no "Agora" que realmente cabe nas próximas semanas e quem é responsável pelas 7 etapas?',
    facilitatorAttentionPoint: 'Garantir foco nas prioridades imediatas sem sobrecarregar a equipe.'
  },
  'A12': {
    canonicalCode: 'A12',
    title: 'Contar a história do projeto e celebrar (Kit de Comunicação Final)',
    encounterNum: 4,
    socraticProvocation: 'A narrativa conta a história real da jornada da equipe ou parece uma apresentação de vendas?',
    facilitatorAttentionPoint: 'Destacar o aprendizado dos testes reais, a honestidade intelectual e a celebração coletiva.'
  }
};

interface Props {
  onOpenObservationModal: (activityId?: string) => void;
  onSelectTeamForView?: (teamId: string) => void;
}

export const FacilitatorProgressRadar: React.FC<Props> = ({
  onOpenObservationModal,
  onSelectTeamForView
}) => {
  const { state, updateTeamProject, updateProjectData, setActiveWebappTab } = useApp();
  const teams = state.teams || [];
  const projectData = (state.projectData || {}) as Record<string, any>;

  // Filter state for radar
  const [filterStatus, setFilterStatus] = useState<'ALL' | TeamOperationalStatus>('ALL');

  // Quick edit modal for team progress
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);

  // Helper to determine team's current activity and operational status
  const getTeamProgressDetails = (team: TeamProject, index: number) => {
    // Default initial mock progression if not set
    const defaultActivities = ['A01', 'A05', 'A08', 'A11'];
    const defaultStatuses: TeamOperationalStatus[] = ['avancou', 'avancou', 'sem_teste', 'parado'];

    const canonicalCode = (team as any).currentActivityCode || defaultActivities[index % defaultActivities.length];
    const operationalStatus: TeamOperationalStatus = (team as any).operationalStatus || defaultStatuses[index % defaultStatuses.length];
    const activityInfo = CANONICAL_ACTIVITIES_MAP[canonicalCode] || CANONICAL_ACTIVITIES_MAP['A01'];

    return {
      canonicalCode,
      activityInfo,
      operationalStatus,
      problem: team.problemStatement || 'Problema em diagnóstico...',
      membersCount: team.members?.length || 0,
      prototypeUrl: team.prototypeUrl
    };
  };

  // Status counts for executive summary
  const counts = teams.reduce(
    (acc, t, idx) => {
      const { operationalStatus } = getTeamProgressDetails(t, idx);
      acc[operationalStatus] = (acc[operationalStatus] || 0) + 1;
      return acc;
    },
    { avancou: 0, parado: 0, sem_teste: 0, precisa_apoio: 0 } as Record<TeamOperationalStatus, number>
  );

  const handleUpdateTeamStatus = (teamId: string, status: TeamOperationalStatus) => {
    updateTeamProject(teamId, { operationalStatus: status } as any);
  };

  const handleUpdateTeamActivity = (teamId: string, activityCode: string) => {
    updateTeamProject(teamId, { currentActivityCode: activityCode } as any);
  };

  return (
    <div className="space-y-6">
      
      {/* ------------------------------------------------------------- */}
      {/* EXECUTIVE SUMMARY BAR: RADAR DE PROGRESSÃO ASSÍNCRONA         */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <TrendingUp className="w-5 h-5" />
              </span>
              <h2 className="text-base font-black text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Radar de Progressão Assíncrona das Equipes
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              O sistema assume o trabalho operacional para liberar você para: <strong>observar, provocar, questionar e apoiar</strong>.
            </p>
          </div>

          <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 self-start sm:self-auto">
            {teams.length} Equipes Acompanhadas
          </span>
        </div>

        {/* 4 Semaphores / Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          {/* 1. QUEM AVANÇOU */}
          <button
            type="button"
            onClick={() => setFilterStatus(filterStatus === 'avancou' ? 'ALL' : 'avancou')}
            className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
              filterStatus === 'avancou'
                ? 'bg-emerald-500 text-slate-950 border-emerald-600 shadow-sm ring-2 ring-emerald-300'
                : 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-100/70'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-2xs font-black uppercase tracking-wider ${filterStatus === 'avancou' ? 'text-slate-950' : 'text-emerald-800 dark:text-emerald-300'}`}>
                🟢 Avançou
              </span>
              <span className={`text-xl font-black ${filterStatus === 'avancou' ? 'text-slate-950' : 'text-emerald-700 dark:text-emerald-400'}`}>
                {counts.avancou}
              </span>
            </div>
            <p className={`text-2xs mt-1 font-medium ${filterStatus === 'avancou' ? 'text-slate-950/90' : 'text-emerald-700 dark:text-emerald-300'}`}>
              Ritmo ativo e artefatos validados
            </p>
          </button>

          {/* 2. QUEM PARECE PARADO */}
          <button
            type="button"
            onClick={() => setFilterStatus(filterStatus === 'parado' ? 'ALL' : 'parado')}
            className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
              filterStatus === 'parado'
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm ring-2 ring-amber-300'
                : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50 hover:bg-amber-100/70'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-2xs font-black uppercase tracking-wider ${filterStatus === 'parado' ? 'text-slate-950' : 'text-amber-800 dark:text-amber-300'}`}>
                🟡 Parece Parado
              </span>
              <span className={`text-xl font-black ${filterStatus === 'parado' ? 'text-slate-950' : 'text-amber-700 dark:text-amber-400'}`}>
                {counts.parado}
              </span>
            </div>
            <p className={`text-2xs mt-1 font-medium ${filterStatus === 'parado' ? 'text-slate-950/90' : 'text-amber-700 dark:text-amber-300'}`}>
              Tempo na mesma atividade
            </p>
          </button>

          {/* 3. QUEM AINDA NÃO TESTOU */}
          <button
            type="button"
            onClick={() => setFilterStatus(filterStatus === 'sem_teste' ? 'ALL' : 'sem_teste')}
            className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
              filterStatus === 'sem_teste'
                ? 'bg-purple-500 text-white border-purple-600 shadow-sm ring-2 ring-purple-300'
                : 'bg-purple-50/70 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900/50 hover:bg-purple-100/70'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-2xs font-black uppercase tracking-wider ${filterStatus === 'sem_teste' ? 'text-white' : 'text-purple-800 dark:text-purple-300'}`}>
                🔬 Ainda Não Testou
              </span>
              <span className={`text-xl font-black ${filterStatus === 'sem_teste' ? 'text-white' : 'text-purple-700 dark:text-purple-400'}`}>
                {counts.sem_teste}
              </span>
            </div>
            <p className={`text-2xs mt-1 font-medium ${filterStatus === 'sem_teste' ? 'text-white/90' : 'text-purple-700 dark:text-purple-300'}`}>
              Chegou em A09 sem evidências
            </p>
          </button>

          {/* 4. QUEM PRECISA DE APOIO */}
          <button
            type="button"
            onClick={() => setFilterStatus(filterStatus === 'precisa_apoio' ? 'ALL' : 'precisa_apoio')}
            className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
              filterStatus === 'precisa_apoio'
                ? 'bg-rose-500 text-white border-rose-600 shadow-sm ring-2 ring-rose-300'
                : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 hover:bg-rose-100/70'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-2xs font-black uppercase tracking-wider ${filterStatus === 'precisa_apoio' ? 'text-white' : 'text-rose-800 dark:text-rose-300'}`}>
                🆘 Precisa de Apoio
              </span>
              <span className={`text-xl font-black ${filterStatus === 'precisa_apoio' ? 'text-white' : 'text-rose-700 dark:text-rose-400'}`}>
                {counts.precisa_apoio}
              </span>
            </div>
            <p className={`text-2xs mt-1 font-medium ${filterStatus === 'precisa_apoio' ? 'text-white/90' : 'text-rose-700 dark:text-rose-300'}`}>
              Dúvidas críticas / travamentos
            </p>
          </button>

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* LISTAGEM DAS EQUIPES: PROGRESSÃO ASSÍNCRONA + PROVOCAÇÕES      */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-4">
        {teams.map((team, idx) => {
          const { canonicalCode, activityInfo, operationalStatus, problem, membersCount } = getTeamProgressDetails(team, idx);

          // Apply filter
          if (filterStatus !== 'ALL' && operationalStatus !== filterStatus) {
            return null;
          }

          return (
            <div
              key={team.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 hover:border-amber-500/40 transition-all"
            >
              {/* Header da Equipe: Nome + Posição Canônica + Semáforo */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                      {team.name}
                    </h3>
                    <span className="text-2xs text-slate-400 font-bold">
                      ({membersCount} integrantes)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <Target className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="line-clamp-1">{problem}</span>
                  </div>
                </div>

                {/* Right: Posição Canônica em Destaque */}
                <div className="flex flex-wrap items-center gap-3">
                  
                  {/* Badge da Posição na Jornada (Ex: A01, A05, A08, A11) */}
                  <div className="px-3.5 py-1.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-black flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>{canonicalCode} • {activityInfo.title}</span>
                  </div>

                  {/* Operational Status Selector */}
                  <select
                    value={operationalStatus}
                    onChange={(e) => handleUpdateTeamStatus(team.id, e.target.value as TeamOperationalStatus)}
                    className={`text-xs font-black py-1.5 px-3 rounded-xl border cursor-pointer focus:outline-none ${
                      operationalStatus === 'avancou'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
                        : operationalStatus === 'parado'
                        ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                        : operationalStatus === 'sem_teste'
                        ? 'bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-200'
                        : 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200'
                    }`}
                  >
                    <option value="avancou">🟢 Avançou</option>
                    <option value="parado">🟡 Parece Parado</option>
                    <option value="sem_teste">🔬 Ainda Não Testou</option>
                    <option value="precisa_apoio">🆘 Precisa de Apoio</option>
                  </select>
                </div>
              </div>

              {/* Bloco de Provocação Pedagógica Pronta (O Facilitador Provoca e Apoia) */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-2xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  <Lightbulb className="w-4 h-4" />
                  <span>Sugestão de Provocação Pedagógica para esta Atividade:</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 italic leading-relaxed">
                  "{activityInfo.socraticProvocation}"
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-2xs text-slate-500 dark:text-slate-400">
                  <span className="font-extrabold text-slate-700 dark:text-slate-300">Ponto de Atenção do Facilitador:</span>
                  <span>{activityInfo.facilitatorAttentionPoint}</span>
                </div>
              </div>

              {/* Botões de Ação do Facilitador */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                
                <div className="flex items-center gap-2">
                  <label className="text-2xs font-extrabold uppercase text-slate-400">Mudar Atividade:</label>
                  <select
                    value={canonicalCode}
                    onChange={(e) => handleUpdateTeamActivity(team.id, e.target.value)}
                    className="text-2xs font-bold py-1 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  >
                    {Object.keys(CANONICAL_ACTIVITIES_MAP).map((code) => (
                      <option key={code} value={code}>
                        {code} — {CANONICAL_ACTIVITIES_MAP[code].title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenObservationModal(canonicalCode)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5" />
                    <span>Anotar Intervenção</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveWebappTab('projeto');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Memória do Projeto</span>
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
