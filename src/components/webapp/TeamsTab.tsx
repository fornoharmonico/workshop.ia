import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TeamProject } from '../../types/workshop';
import { ConfirmModal } from '../ConfirmModal';
import {
  Users,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Bot,
  FileCode,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Code
} from 'lucide-react';

export const TeamsTab: React.FC = () => {
  const { appState, updateTeam, addTeam, removeTeam } = useApp();
  const [selectedTeamId, setSelectedTeamId] = useState<string>(
    appState.teams[0]?.id || ''
  );
  const [teamToDelete, setTeamToDelete] = useState<{ id: string; name: string } | null>(null);

  const activeTeam = appState.teams.find((t) => t.id === selectedTeamId) || appState.teams[0];

  const handleMemberChange = (index: number, name: string) => {
    if (!activeTeam) return;
    const updatedMembers = [...activeTeam.members];
    updatedMembers[index] = name;
    updateTeam(activeTeam.id, { members: updatedMembers });
  };

  const handleAddMember = () => {
    if (!activeTeam || activeTeam.members.length >= 5) return;
    updateTeam(activeTeam.id, { members: [...activeTeam.members, ''] });
  };

  const handleRemoveMember = (index: number) => {
    if (!activeTeam) return;
    const updatedMembers = activeTeam.members.filter((_, i) => i !== index);
    updateTeam(activeTeam.id, { members: updatedMembers });
  };

  const handleAddAiTool = (toolName: string) => {
    if (!activeTeam || !toolName.trim()) return;
    if (activeTeam.aiToolsUsed.includes(toolName.trim())) return;
    updateTeam(activeTeam.id, {
      aiToolsUsed: [...activeTeam.aiToolsUsed, toolName.trim()]
    });
  };

  const handleRemoveAiTool = (toolName: string) => {
    if (!activeTeam) return;
    updateTeam(activeTeam.id, {
      aiToolsUsed: activeTeam.aiToolsUsed.filter((t) => t !== toolName)
    });
  };

  const [newToolInput, setNewToolInput] = useState('');

  const confirmDeleteTeam = () => {
    if (!teamToDelete) return;
    const deletedId = teamToDelete.id;
    removeTeam(deletedId);
    if (selectedTeamId === deletedId) {
      const remaining = appState.teams.filter((t) => t.id !== deletedId);
      setSelectedTeamId(remaining[0]?.id || '');
    }
    setTeamToDelete(null);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={!!teamToDelete}
        title={`Apagar Equipe "${teamToDelete?.name}"?`}
        message="Esta ação é crítica e irreversível. Todos os dados, diagnósticos, membros e links registrados para esta equipe serão apagados permanentemente."
        confirmLabel="Sim, Apagar Equipe"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={confirmDeleteTeam}
        onCancel={() => setTeamToDelete(null)}
      />

      {/* Header & Team Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" />
            <span>Gestão de Equipes e Projetos (Até 4 Equipes)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Cada equipe pode registrar até 5 participantes, seu diagnóstico de problema e links do protótipo
          </p>
        </div>

        {appState.teams.length < 4 && (
          <button
            onClick={addTeam}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-colors flex items-center gap-2 shrink-0 self-start sm:self-center shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Equipe</span>
          </button>
        )}
      </div>

      {/* Team Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {appState.teams.map((team, idx) => {
          const isSelected = team.id === selectedTeamId;
          const filledMembers = team.members.filter((m) => m.trim().length > 0).length;

          return (
            <div
              key={team.id}
              onClick={() => setSelectedTeamId(team.id)}
              className={`p-5 rounded-3xl border cursor-pointer transition-all space-y-3 ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500 dark:bg-amber-500/10 shadow-md ring-2 ring-amber-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  EQUIPE {idx + 1}
                </span>
                {appState.teams.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTeamToDelete({ id: team.id, name: team.name });
                    }}
                    className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                    title="Excluir / Apagar equipe"
                    aria-label={`Excluir equipe ${team.name}`}
                  >
                    <Trash2 className="w-4 h-4 text-rose-500" />
                  </button>
                )}
              </div>

              <h3 className="font-extrabold text-slate-900 dark:text-white text-base truncate">
                {team.name}
              </h3>

              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                <span>{filledMembers}/5 participantes</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Team Form & Documentation */}
      {activeTeam && (
        <div className="space-y-8">
          
          {/* Main Info */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1 flex-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Nome da Equipe / Projeto
                </label>
                <input
                  type="text"
                  value={activeTeam.name}
                  onChange={(e) => updateTeam(activeTeam.id, { name: e.target.value })}
                  className="w-full text-xl sm:text-2xl font-black text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="Ex: Equipe Alfa - EcoGuia"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Etapa:</span>
                  <select
                    value={activeTeam.stage}
                    onChange={(e) => updateTeam(activeTeam.id, { stage: e.target.value as any })}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs text-amber-700 dark:text-amber-300 focus:outline-none"
                  >
                    <option value="diagnostico">1. Diagnóstico</option>
                    <option value="briefing">2. Briefing / PRD</option>
                    <option value="prototipo">3. Protótipo V1</option>
                    <option value="pitch">4. Pitch Final</option>
                  </select>
                </div>

                {appState.teams.length > 1 && (
                  <button
                    onClick={() => setTeamToDelete({ id: activeTeam.id, name: activeTeam.name })}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs transition-colors flex items-center gap-1.5"
                    title="Apagar esta equipe"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Apagar Equipe</span>
                  </button>
                )}
              </div>
            </div>

            {/* Roster of 5 Members */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Membros da Equipe ({activeTeam.members.length}/5)
                </h4>
                {activeTeam.members.length < 5 && (
                  <button
                    onClick={handleAddMember}
                    className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Adicionar Membro
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeTeam.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80"
                  >
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 font-black text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={member}
                      onChange={(e) => handleMemberChange(idx, e.target.value)}
                      placeholder={`Nome do participante ${idx + 1}`}
                      className="w-full bg-transparent text-base sm:text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none py-1"
                    />
                    {activeTeam.members.length > 1 && (
                      <button
                        onClick={() => handleRemoveMember(idx)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Remover"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Diagnostic & Solution Specification */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Problem & Users */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>Diagnóstico do Problema & Público</span>
              </h3>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Declaração do Problema Real
                </label>
                <textarea
                  value={activeTeam.problemStatement}
                  onChange={(e) => updateTeam(activeTeam.id, { problemStatement: e.target.value })}
                  placeholder="Descreva em detalhes o problema identificado, o contexto em que ele ocorre e as dores vivenciadas..."
                  rows={6}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed min-h-[150px] resize-y"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Público-Alvo / Usuários Afetados
                </label>
                <textarea
                  value={activeTeam.targetUsers}
                  onChange={(e) => updateTeam(activeTeam.id, { targetUsers: e.target.value })}
                  placeholder="Quem são as pessoas diretamente afetadas por esse problema? Descreva o perfil, necessidades ou grupo beneficiado..."
                  rows={3}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed min-h-[90px] resize-y"
                />
              </div>
            </div>

            {/* Solution Concept & Prototype Link */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-amber-500" />
                <span>Conceito da Solução & Protótipo (MVP)</span>
              </h3>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Conceito do Protótipo
                </label>
                <textarea
                  value={activeTeam.solutionConcept}
                  onChange={(e) => updateTeam(activeTeam.id, { solutionConcept: e.target.value })}
                  placeholder="Como a inteligência artificial ajuda a resolver este problema? Descreva o conceito da solução..."
                  rows={4}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed min-h-[110px] resize-y"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Link do Protótipo (v0, Bolt, Figma ou URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={activeTeam.prototypeUrl || ''}
                    onChange={(e) => updateTeam(activeTeam.id, { prototypeUrl: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-base sm:text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  {activeTeam.prototypeUrl && (
                    <a
                      href={activeTeam.prototypeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center shrink-0 transition-colors min-h-[44px]"
                      title="Abrir Protótipo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* AI Tools Used Tracker */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Bot className="w-4 h-4 text-amber-500" />
              <span>Ferramentas de IA Utilizadas por esta Equipe</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {activeTeam.aiToolsUsed.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 font-bold text-xs flex items-center gap-2"
                >
                  <span>{tool}</span>
                  <button
                    onClick={() => handleRemoveAiTool(tool)}
                    className="text-amber-700 dark:text-amber-400 hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 max-w-md pt-2">
              <input
                type="text"
                value={newToolInput}
                onChange={(e) => setNewToolInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAiTool(newToolInput);
                    setNewToolInput('');
                  }
                }}
                placeholder="Ex: ChatGPT, v0, Bolt, Midjourney..."
                className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              />
              <button
                onClick={() => {
                  handleAddAiTool(newToolInput);
                  setNewToolInput('');
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Adicionar
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
