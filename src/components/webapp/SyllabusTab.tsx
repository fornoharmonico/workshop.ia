import React from 'react';
import { WORKSHOP_METADATA, METHOD_TOOLS, EXPECTED_DELIVERABLES } from '../../data/syllabus';
import { BookOpen, Target, CheckCircle2, ShieldCheck, Cpu, Clock, Users, Flame, PackageCheck } from 'lucide-react';

export const SyllabusTab: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      
      {/* Title & Metadata Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs border border-amber-500/30">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>EMENTA OFICIAL DO WORKSHOP</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">Revisão Oficial • O Forno</span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {WORKSHOP_METADATA.title}
          </h1>
          <p className="text-amber-400 text-sm sm:text-base font-semibold mt-1">
            {WORKSHOP_METADATA.subtitle}
          </p>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed max-w-4xl">
          {WORKSHOP_METADATA.headlineDescription}
        </p>

        {/* Quick Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-700/80 text-xs sm:text-sm">
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <p className="text-slate-400 text-[11px] font-bold uppercase">Carga Horária</p>
            <p className="font-bold text-white mt-0.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              {WORKSHOP_METADATA.totalDuration} ({WORKSHOP_METADATA.encountersCount} encontros)
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <p className="text-slate-400 text-[11px] font-bold uppercase">Público-Alvo</p>
            <p className="font-bold text-white mt-0.5 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              {WORKSHOP_METADATA.targetAudience}
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <p className="text-slate-400 text-[11px] font-bold uppercase">Estrutura</p>
            <p className="font-bold text-white mt-0.5">
              {WORKSHOP_METADATA.capacity}
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <p className="text-slate-400 text-[11px] font-bold uppercase">Modalidade</p>
            <p className="font-bold text-white mt-0.5">
              {WORKSHOP_METADATA.modality}
            </p>
          </div>
        </div>
      </div>

      {/* Deliverables Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <PackageCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Entregas Esperadas por Encontro</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Artefatos concretos gerados pelas equipes ao longo da oficina</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPECTED_DELIVERABLES.map((item) => (
            <div key={item.encounterId} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                  {item.encounterId}
                </span>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                  {item.title}
                </h3>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {item.deliverables.map((del, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Objectives & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Objectives */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Objetivo Geral</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Capacitação prática em solução de problemas com IA</p>
            </div>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            {WORKSHOP_METADATA.objective}
          </p>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Resultados Esperados ({WORKSHOP_METADATA.expectedResults.length})
            </h3>
            <div className="space-y-2.5">
              {WORKSHOP_METADATA.expectedResults.map((res, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy & Ethical Pact */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Diretriz de Privacidade</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Pacto de Confiança e Proteção de Dados</p>
            </div>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-amber-50/60 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 text-amber-950 dark:text-amber-200 font-medium">
            O mapeamento de desafios individuais é estritamente íntimo e privado (não recolhido nem avaliado). Reforçamos o compromisso ético de não inserir dados sensíveis ou informações privadas de terceiros nas plataformas de Inteligência Artificial Generativa.
          </p>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Ferramentas Metodológicas Recomendadas
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {METHOD_TOOLS.map((tool) => (
                <div key={tool.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{tool.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{tool.orientingQuestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
