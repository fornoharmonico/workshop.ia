/**
 * Dossier Modal Component V3
 * Visualizes the full project dossier, allowing copying Markdown or opening printable HTML / print dialog.
 */
import React, { useState } from 'react';
import { Copy, Download, FileText, Printer, X, Check } from 'lucide-react';
import { useProject } from '../../state/ProjectContext.tsx';
import { useSession } from '../../state/SessionContext.tsx';
import { generateDossierMarkdown, generatePrintableHtml } from '../../services/dossierExporter.ts';

export const DossierModal: React.FC = () => {
  const { project } = useProject();
  const { isDossierModalOpen, setIsDossierModalOpen, addToast } = useSession();
  const [copied, setCopied] = useState(false);

  if (!isDossierModalOpen) return null;

  const markdownContent = generateDossierMarkdown(project);

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      addToast('Dossiê em Markdown copiado com sucesso!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      addToast('Falha ao copiar automaticamente.', 'error');
    }
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dossie_${project.project.name || 'projeto'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast('Arquivo Markdown baixado.', 'success');
  };

  const handlePrint = () => {
    const html = generatePrintableHtml(project);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    } else {
      addToast('Permita popups para abrir a janela de impressão.', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex flex-col h-[90vh] w-full max-w-4xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 bg-neutral-950/60">
          <div className="flex items-center space-x-2.5">
            <FileText className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold text-neutral-100">
                Dossiê Completo do Projeto
              </h2>
              <p className="text-xs text-neutral-400">
                {project.project.name || 'Projeto'} — {project.project.teamName || 'Equipe'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition-colors"
              title="Imprimir ou salvar como PDF no navegador"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center space-x-1.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition-colors"
              title="Baixar arquivo Markdown"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Baixar .MD</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                copied
                  ? 'bg-emerald-500 text-neutral-950'
                  : 'bg-amber-500 text-neutral-950 hover:bg-amber-400'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>

            <button
              onClick={() => setIsDossierModalOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-neutral-100 transition-colors rounded-lg hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Markdown Content Viewer */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed bg-neutral-950/80 selection:bg-amber-500/20">
          {markdownContent}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800 px-6 py-3 bg-neutral-950/60 flex items-center justify-between text-xs text-neutral-400">
          <span>Exportação determinística sem inventar dados adicionais.</span>
          <button
            onClick={() => setIsDossierModalOpen(false)}
            className="text-neutral-300 hover:text-neutral-100 font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
