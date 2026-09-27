/**
 * Syllabus Tab Component V3
 * Master Dossier V3 - Anexo 03: Ementa Metodológica.
 */
import React from 'react';
import { Award, BookOpen, Calendar, CheckCircle2, Clock, Sparkles, Users } from 'lucide-react';
import { SYLLABUS_INFO } from '../../domain/v3/syllabusRegistry.ts';

export const SyllabusTab: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 shadow-xl space-y-4">
        <div className="border-b border-neutral-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
            Ementa Oficial V3
          </span>
          <h1 className="text-xl font-bold text-neutral-100 mt-1">
            {SYLLABUS_INFO.title}
          </h1>
          <p className="text-xs text-neutral-300 leading-relaxed mt-2">
            {SYLLABUS_INFO.centralObjective}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800">
            <span className="text-neutral-500 block text-[11px]">Carga Horária</span>
            <span className="font-semibold text-neutral-200 mt-0.5 block flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>12 horas (4 encontros)</span>
            </span>
          </div>
          <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800">
            <span className="text-neutral-500 block text-[11px]">Público Alvo</span>
            <span className="font-semibold text-neutral-200 mt-0.5 block flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>A partir de 13 anos</span>
            </span>
          </div>
          <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800">
            <span className="text-neutral-500 block text-[11px]">Macroarco</span>
            <span className="font-semibold text-amber-300 mt-0.5 block">
              {SYLLABUS_INFO.macroArc}
            </span>
          </div>
          <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800">
            <span className="text-neutral-500 block text-[11px]">Metodologia</span>
            <span className="font-semibold text-neutral-200 mt-0.5 block">
              Fornologia
            </span>
          </div>
        </div>
      </div>

      {/* 4 Meetings Detail */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-200 flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>Estrutura dos 4 Encontros Presenciais ou Híbridos</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SYLLABUS_INFO.meetings.map((m) => (
            <div
              key={m.meetingNumber}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2.5">
                <span className="font-mono text-xs font-bold text-amber-400">
                  Encontro {m.meetingNumber} (180 min)
                </span>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">
                  {m.movementName}
                </span>
              </div>

              <h3 className="text-sm font-bold text-neutral-100">{m.title}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">{m.objective}</p>

              <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800 text-[11px] space-y-1">
                <p className="text-neutral-400">
                  <strong className="text-neutral-300">Cronograma de referência:</strong> {m.scheduleReference}
                </p>
                <p className="text-emerald-400 font-medium">
                  <strong>Entregas:</strong> {m.deliverables}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 16 Principles */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-200 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>16 Princípios da Metodologia Fornologia</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SYLLABUS_INFO.principles.map((p) => (
            <div
              key={p.number}
              className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-3.5 space-y-1.5"
            >
              <div className="flex items-center space-x-1.5 font-mono text-[11px] font-bold text-amber-400">
                <span>{p.number < 10 ? `0${p.number}` : p.number}</span>
                <span className="text-neutral-500">•</span>
                <span className="truncate">{p.title}</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 18 Learning Outcomes */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4 shadow-xl">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-200 flex items-center space-x-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>18 Resultados de Aprendizagem</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-300">
          {SYLLABUS_INFO.learningOutcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{outcome}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
