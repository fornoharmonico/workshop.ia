/**
 * Resources View Component V3
 * Aggregates the 4 support resources:
 * - Mapa de Problemas
 * - Biblioteca de Prompts
 * - Ementa Metodológica
 * - Caixa de Ferramentas
 */
import React, { useState } from 'react';
import { BookOpen, Compass, Layers, Lightbulb, Wrench } from 'lucide-react';
import { ProblemMapTab } from './ProblemMapTab.tsx';
import { PromptLibraryTab } from './PromptLibraryTab.tsx';
import { SyllabusTab } from './SyllabusTab.tsx';
import { ToolboxTab } from './ToolboxTab.tsx';

type ResourceSubTab = 'problems' | 'prompts' | 'syllabus' | 'toolbox';

export const ResourcesView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<ResourceSubTab>('problems');

  const tabs: { id: ResourceSubTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'problems',
      label: 'Mapa de Problemas',
      icon: <Lightbulb className="w-4 h-4" />,
    },
    {
      id: 'prompts',
      label: 'Biblioteca de Prompts',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'syllabus',
      label: 'Ementa Metodológica',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: 'toolbox',
      label: 'Caixa de Ferramentas',
      icon: <Wrench className="w-4 h-4" />,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 space-y-6">
      {/* Subtab Navigation Pills */}
      <div className="flex overflow-x-auto pb-1 space-x-2 border-b border-neutral-800 no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-500 text-neutral-950 shadow-sm shadow-amber-500/20'
                  : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Subtab */}
      <div>
        {activeSubTab === 'problems' && <ProblemMapTab />}
        {activeSubTab === 'prompts' && <PromptLibraryTab />}
        {activeSubTab === 'syllabus' && <SyllabusTab />}
        {activeSubTab === 'toolbox' && <ToolboxTab />}
      </div>
    </div>
  );
};
