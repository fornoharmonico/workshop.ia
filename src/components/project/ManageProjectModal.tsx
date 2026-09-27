/**
 * Manage Project Modal V3
 * Secondary operational menu inside Meu Projeto:
 * - Exportar Dossiê
 * - Exportar BackupV3 (JSON)
 * - Importar BackupV3 (JSON) with preview & validation
 * - Novo Projeto
 */
import React, { useState, useRef } from 'react';
import {
  AlertTriangle,
  Download,
  FileText,
  PlusCircle,
  RefreshCw,
  Upload,
  X,
} from 'lucide-react';
import { useProject } from '../../state/ProjectContext.tsx';
import { useSession } from '../../state/SessionContext.tsx';
import { useDraft } from '../../state/DraftContext.tsx';
import { createBackupJson, validateBackupJson, restoreProjectFromBackup } from '../../services/backupV3.ts';

interface ManageProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManageProjectModal: React.FC<ManageProjectModalProps> = ({ isOpen, onClose }) => {
  const { project, resetProject, importProjectState } = useProject();
  const { clearAllDrafts } = useDraft();
  const { addToast, setIsDossierModalOpen } = useSession();

  const [importPreview, setImportPreview] = useState<any | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [confirmNewProject, setConfirmNewProject] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // 1. Export Backup JSON
  const handleExportBackup = () => {
    const jsonStr = createBackupJson(project);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_fornologia_v3_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast('Backup V3 exportado com sucesso.', 'success');
  };

  // 2. Open Dossier Viewer
  const handleOpenDossier = () => {
    onClose();
    setIsDossierModalOpen(true);
  };

  // 3. File upload for Backup import
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const validation = validateBackupJson(content);
      if (!validation.valid || !validation.backup) {
        setImportError(validation.error || 'Arquivo de backup inválido.');
        setImportPreview(null);
      } else {
        setImportError(null);
        setImportPreview(validation);
      }
    };
    reader.readAsText(file);
  };

  // 4. Confirm Import
  const handleConfirmImport = () => {
    if (!importPreview?.backup) return;
    const restored = restoreProjectFromBackup(importPreview.backup);
    const writeResult = importProjectState(restored);
    if (!writeResult.success) {
      setImportError(writeResult.error || 'Falha ao importar estado.');
      return;
    }
    clearAllDrafts();
    addToast('Projeto V3 restaurado com sucesso!', 'success');
    setImportPreview(null);
    onClose();
  };

  // 5. New Project
  const handleNewProject = () => {
    resetProject('Novo Projeto', 'Equipe Alfa');
    clearAllDrafts();
    setConfirmNewProject(false);
    addToast('Novo projeto limpo iniciado.', 'info');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h2 className="text-base font-bold text-neutral-100">Gerenciar Projeto</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action List */}
        <div className="space-y-3">
          {/* Export Dossier */}
          <div className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <div>
              <h3 className="text-xs font-bold text-neutral-100 flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Exportar Dossiê do Projeto</span>
              </h3>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Gera documento formatado em Markdown ou HTML imprimível / PDF.
              </p>
            </div>
            <button
              onClick={handleOpenDossier}
              className="rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-3 py-1.5 text-xs transition-colors shrink-0 shadow-sm shadow-amber-500/20"
            >
              Abrir Dossiê
            </button>
          </div>

          {/* Export Backup JSON */}
          <div className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <div>
              <h3 className="text-xs font-bold text-neutral-100 flex items-center space-x-1.5">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Exportar BackupV3 (JSON)</span>
              </h3>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Arquivo estrito V3 para portabilidade e segurança contra perda de dados.
              </p>
            </div>
            <button
              onClick={handleExportBackup}
              className="rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold px-3 py-1.5 text-xs transition-colors shrink-0"
            >
              Baixar JSON
            </button>
          </div>

          {/* Import Backup JSON */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-neutral-100 flex items-center space-x-1.5">
                  <Upload className="w-4 h-4 text-sky-400" />
                  <span>Importar BackupV3 (JSON)</span>
                </h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Substitui atomicamente o projeto após validação de integridade.
                </p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold px-3 py-1.5 text-xs transition-colors shrink-0"
              >
                Selecionar
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json,application/json"
              className="hidden"
            />

            {importError && (
              <p className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded-lg border border-rose-800/40">
                {importError}
              </p>
            )}

            {importPreview && (
              <div className="rounded-lg border border-sky-500/30 bg-sky-950/20 p-3 space-y-2 text-xs text-sky-200">
                <p className="font-bold text-sky-300">Prévia do Backup V3:</p>
                <div className="space-y-0.5 text-[11px]">
                  <p>• Projeto: <strong>{importPreview.preview.projectName}</strong></p>
                  <p>• Equipe: <strong>{importPreview.preview.teamName}</strong></p>
                  <p>• Artefatos: <strong>{importPreview.preview.artifactCount} consolidados</strong> ({importPreview.preview.consolidatedArtifacts.join(', ') || 'Nenhum'})</p>
                  <p>• Exportado em: {new Date(importPreview.preview.exportedAt).toLocaleString('pt-BR')}</p>
                </div>
                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    onClick={() => setImportPreview(null)}
                    className="text-neutral-400 hover:text-neutral-200 px-2 py-1 text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmImport}
                    className="rounded bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold px-3 py-1 text-xs transition-colors"
                  >
                    Confirmar Restauração
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* New Project */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            {!confirmNewProject ? (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-neutral-100 flex items-center space-x-1.5">
                    <PlusCircle className="w-4 h-4 text-neutral-400" />
                    <span>Iniciar Novo Projeto Limpo</span>
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Zera os artefatos atuais deste navegador para começar do zero.
                  </p>
                </div>
                <button
                  onClick={() => setConfirmNewProject(true)}
                  className="rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-800/40 text-neutral-400 font-semibold px-3 py-1.5 text-xs transition-colors shrink-0"
                >
                  Novo Projeto
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start space-x-2 text-xs text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    Tem certeza? Isso apagará o projeto atual no navegador. Certifique-se de que exportou um backup se quiser manter os dados.
                  </span>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setConfirmNewProject(false)}
                    className="text-neutral-400 hover:text-neutral-200 px-3 py-1 text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleNewProject}
                    className="rounded bg-rose-600 hover:bg-rose-500 text-neutral-950 font-bold px-3 py-1 text-xs transition-colors"
                  >
                    Sim, Zerar e Iniciar Novo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
