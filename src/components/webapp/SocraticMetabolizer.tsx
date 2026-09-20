import React, { useState } from 'react';
import {
  BrainCircuit,
  MessageSquare,
  CheckSquare,
  Square,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  ArrowDown,
  Copy,
  Check,
  Scale
} from 'lucide-react';

interface SocraticMetabolizerProps {
  activityId: string;
  activityTitle: string;
  outputArtifactId?: string;
  onApplyDebriefingToOutput?: (notesText: string) => void;
  savedNotes?: string;
  onSaveNotes?: (notes: string) => void;
}

export const SocraticMetabolizer: React.FC<SocraticMetabolizerProps> = ({
  activityId,
  activityTitle,
  outputArtifactId,
  onApplyDebriefingToOutput,
  savedNotes = '',
  onSaveNotes
}) => {
  const [notes, setNotes] = useState<string>(savedNotes);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    debated: false,
    hallucinationRemoved: false,
    localized: false
  });
  const [appliedRecently, setAppliedRecently] = useState(false);

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNotesChange = (val: string) => {
    setNotes(val);
    if (onSaveNotes) {
      onSaveNotes(val);
    }
  };

  const handleApplyToOutput = () => {
    if (onApplyDebriefingToOutput) {
      const formattedNotes = `\n\n[ANOTAÇÕES E DECISÕES DA EQUIPE]\n${notes || 'Equipe revisou as sugestões e confirmou as decisões acordadas.'}`;
      onApplyDebriefingToOutput(formattedNotes);
      setAppliedRecently(true);
      setTimeout(() => setAppliedRecently(false), 2500);
    }
  };

  const allChecked = checkedItems.debated && checkedItems.hallucinationRemoved && checkedItems.localized;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-900 text-slate-100 rounded-3xl p-5 sm:p-7 border border-indigo-500/30 shadow-xl space-y-6">
      
      {/* Header: Conversa em equipe */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xs font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 uppercase tracking-wider font-mono">
                REVISE ANTES DE DECIDIR
              </span>
              <span className="text-2xs text-indigo-200/70 font-medium">A decisão final é sempre da equipe</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
              A IA traz sugestões; quem decide o que vale é você e seu grupo
            </h3>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-2xs font-bold shrink-0 self-start sm:self-auto">
          <Scale className="w-3.5 h-3.5" />
          <span>Conversa em equipe</span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-indigo-100/80 leading-relaxed">
        Antes de aproveitar qualquer texto sugerido pela inteligência artificial, leiam juntos e conversem. A máquina não conhece de verdade a realidade do bairro, as pessoas com quem vocês convivem nem o que é possível fazer na prática.
      </p>

      {/* 3 Perguntas Naturais de Validação */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        {/* Pergunta 1 */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/20 space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-black flex items-center justify-center">1</span>
            <span>Realidade Local</span>
          </div>
          <p className="text-xs font-bold text-white">
            O que faz sentido para vocês?
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            O que da sugestão realmente combina com o território e ajuda o projeto a avançar de verdade?
          </p>
        </div>

        {/* Pergunta 2 */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/20 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-black flex items-center justify-center">2</span>
            <span>Sem Enrolação</span>
          </div>
          <p className="text-xs font-bold text-white">
            O que parece genérico ou não combina com vocês?
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            O que parece papo genérico, coisas que ninguém no território faz ou ideias que não funcionam aqui?
          </p>
        </div>

        {/* Pergunta 3 */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/20 space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-black flex items-center justify-center">3</span>
            <span>Decisão Própria</span>
          </div>
          <p className="text-xs font-bold text-white">
            O que vocês mudariam antes de bater o martelo?
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Quais alterações, cortes e palavras próprias o grupo quer colocar antes de seguir?
          </p>
        </div>

      </div>

      {/* Checklist de Alinhamento */}
      <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/25 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Checklist de alinhamento da equipe</span>
          </span>
          <span className={`text-2xs font-extrabold px-2 py-0.5 rounded-full ${
            allChecked ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
          }`}>
            {allChecked ? 'Alinhamento concluído!' : 'Em conversa'}
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <label 
            onClick={() => toggleCheck('debated')}
            className="flex items-start gap-2.5 cursor-pointer select-none text-slate-200 hover:text-white transition-colors"
          >
            <span className="mt-0.5 text-indigo-400">
              {checkedItems.debated ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4" />}
            </span>
            <span>Lemos a sugestão juntos e conversamos abertamente sobre o que concordamos e discordamos.</span>
          </label>

          <label 
            onClick={() => toggleCheck('hallucinationRemoved')}
            className="flex items-start gap-2.5 cursor-pointer select-none text-slate-200 hover:text-white transition-colors"
          >
            <span className="mt-0.5 text-indigo-400">
              {checkedItems.hallucinationRemoved ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4" />}
            </span>
            <span>Cortamos o que parecia enrolação, suposições sem fundamento ou palavras difíceis demais.</span>
          </label>

          <label 
            onClick={() => toggleCheck('localized')}
            className="flex items-start gap-2.5 cursor-pointer select-none text-slate-200 hover:text-white transition-colors"
          >
            <span className="mt-0.5 text-indigo-400">
              {checkedItems.localized ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4" />}
            </span>
            <span>Reescrevemos com o nosso próprio jeito de falar e garantimos que funciona no nosso território.</span>
          </label>
        </div>
      </div>

      {/* Caixa de Anotações da Equipe */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Nossas decisões e ajustes da conversa:</span>
          </label>
          <span className="text-2xs text-slate-400">O que a equipe decidiu mudar ou complementar</span>
        </div>

        <textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          rows={3}
          placeholder="Ex: Não gostamos da ideia de usar aplicativo porque muitos moradores não têm internet boa; preferimos combinar no boca a boca e nos murais locais..."
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 p-3.5 font-sans text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
        />

        {onApplyDebriefingToOutput && (
          <div className="flex justify-end pt-1">
            <button
              onClick={handleApplyToOutput}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                appliedRecently
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md active:scale-95'
              }`}
            >
              {appliedRecently ? <Check className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
              <span>{appliedRecently ? 'Anotações adicionadas ao registro!' : 'Adicionar anotações ao registro desta etapa'}</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
