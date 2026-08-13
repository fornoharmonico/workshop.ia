import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Download, Upload, Printer, FileText, CheckCircle2, Loader2, AlertCircle, RotateCcw, ShieldCheck, Save, HardDrive } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConfirmModal } from '../ConfirmModal';

export const ExportTab: React.FC = () => {
  const { appState, setAppState, resetProjectData, restoreSafetyBackup, hasSafetyBackup, lastSavedTime } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pendingImportData, setPendingImportData] = useState<any | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleRestoreSafetyBackup = () => {
    const success = restoreSafetyBackup();
    if (success) {
      setStatusMessage({ type: 'success', text: 'Backup de segurança pré-reset restaurado com sucesso!' });
    } else {
      setStatusMessage({ type: 'error', text: 'Nenhum snapshot de segurança válido foi encontrado no navegador.' });
    }
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleExportJson = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `oforno_ia_workshop_backup_${timestamp}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          if (event.target?.result) {
            const parsed = JSON.parse(event.target.result as string);
            if (parsed && typeof parsed === 'object') {
              setPendingImportData(parsed);
            }
          }
        } catch (err) {
          setStatusMessage({ type: 'error', text: "Erro ao carregar e analisar arquivo JSON de backup." });
        }
      };
    }
  };

  const confirmImport = () => {
    if (pendingImportData) {
      setAppState(pendingImportData);
      setPendingImportData(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setStatusMessage({ type: 'success', text: "Dados do backup importados e restaurados com sucesso!" });
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const confirmResetData = () => {
    resetProjectData();
    setShowResetModal(false);
    setStatusMessage({ type: 'success', text: "Todos os dados do projeto foram resetados para os padrões iniciais." });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    setIsGeneratingPdf(true);
    setStatusMessage(null);

    try {
      const element = reportRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`relatorio_workshop_ia_oforno_${new Date().toISOString().slice(0, 10)}.pdf`);
      setStatusMessage({ type: 'success', text: "Relatório PDF gerado e baixado com sucesso!" });
      setTimeout(() => setStatusMessage(null), 5000);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      setStatusMessage({ type: 'error', text: "Abrindo janela de impressão alternativa..." });
      handlePrintReport();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrintReport = () => {
    if (!reportRef.current) {
      window.print();
      return;
    }

    const reportHtml = reportRef.current.outerHTML;

    // Attempt popup print window
    const printWindow = window.open('', '_blank', 'width=900,height=800');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
            <title>Relatório Consolidado - Workshop IA O Forno</title>
            <meta charset="utf-8" />
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              body { font-family: system-ui, -apple-system, sans-serif; background: #ffffff; color: #0f172a; padding: 24px; }
              @media print {
                body { padding: 0; margin: 0; background: white !important; color: black !important; }
                .no-print { display: none !important; }
              }
            </style>
          </head>
          <body>
            <div style="max-width: 900px; margin: 0 auto;">
              ${reportHtml}
            </div>
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      // Fallback iframe printing for sandbox environments
      try {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow?.document;
        if (doc && iframe.contentWindow) {
          doc.open();
          doc.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Relatório</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                  body { font-family: sans-serif; padding: 20px; background: white; color: black; }
                </style>
              </head>
              <body>
                ${reportHtml}
              </body>
            </html>
          `);
          doc.close();
          setTimeout(() => {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
            setTimeout(() => iframe.remove(), 3000);
          }, 500);
        } else {
          window.print();
        }
      } catch (e) {
        window.print();
      }
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Confirmation Modal for Import JSON Backup */}
      <ConfirmModal
        isOpen={!!pendingImportData}
        title="Restaurar Dados do Backup?"
        message="Atenção: A restauração de backup irá substituir todas as equipes, anotações e progresso atuais pelos dados do arquivo. Esta ação não poderá ser desfeita."
        confirmLabel="Sim, Restaurar Backup"
        cancelLabel="Cancelar"
        variant="warning"
        onConfirm={confirmImport}
        onCancel={() => {
          setPendingImportData(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }}
      />

      {/* Confirmation Modal for Resetting All Data */}
      <ConfirmModal
        isOpen={showResetModal}
        title="Resetar Todos os Dados do Workshop?"
        message="Esta é uma ação crítica. Todos os cadastros de equipes, diagnósticos, anotações de facilitação e seleções do mapa de problemas serão apagados permanentemente e restaurados ao estado original do workshop."
        confirmLabel="Sim, Resetar Tudo"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={confirmResetData}
        onCancel={() => setShowResetModal(false)}
      />

      {/* Local-First Hardening Status Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950 text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Persistência Local-First Ativa & Protegida</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase border border-emerald-500/30">
                  V2.2 Hardened
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                O estado do seu workshop é mantido com redundância dupla em tempo real no seu dispositivo.
              </p>
            </div>
          </div>

          {hasSafetyBackup && (
            <button
              onClick={handleRestoreSafetyBackup}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              title="Restaurar backup feito antes do último reset ou alteração crítica"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Restaurar Snapshot Pré-Reset</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 pt-1">
          <div className="flex items-center gap-2.5 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
            <Save className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Salvamento Automático</p>
              <p className="text-[11px] text-slate-400">Em tempo real ({lastSavedTime || 'Ativo'})</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
            <HardDrive className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Cópia Sombra Espelhada</p>
              <p className="text-[11px] text-slate-400">Redundância de chave de backup</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Proteção Anti-Refresh</p>
              <p className="text-[11px] text-slate-400">Gestos de saída & recarga bloqueados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback status banner */}
      {statusMessage && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 border ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
        }`}>
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-semibold">{statusMessage.text}</span>
        </div>
      )}

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Export JSON */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 w-fit">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Exportar Backup</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Baixe equipes, anotações e progresso em formato JSON para backup.
              </p>
            </div>
          </div>
          <button
            onClick={handleExportJson}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Baixar JSON</span>
          </button>
        </div>

        {/* Import JSON */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 w-fit">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Restaurar Backup</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Carregue um arquivo de backup previamente exportado.
              </p>
            </div>
          </div>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportJson}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Carregar Backup</span>
            </button>
          </div>
        </div>

        {/* Print Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 w-fit">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Relatório / PDF</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Gere o PDF ou imprima o relatório consolidado do workshop.
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/60 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Gerando...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Baixar PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrintReport}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>

        {/* Reset Workshop Data Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-rose-200 dark:border-rose-950/60 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-3 rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-400 w-fit">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Resetar Dados</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Restaura todas as configurações, equipes e notas para o estado inicial.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowResetModal(true)}
            className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer border border-rose-500/20"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Resetar Projeto</span>
          </button>
        </div>

      </div>

      {/* Printable Report Summary Container */}
      <div 
        ref={reportRef}
        id="printable-report"
        className="printable-area bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-slate-900 dark:text-slate-100"
      >
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              RELATÓRIO CONSOLIDADO DO WORKSHOP
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              IA Aplicada: do Problema ao Protótipo
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Facilitação: Pedro Lago • O Forno
            </p>
          </div>
          <div className="text-right text-xs text-slate-400 font-medium">
            Gerado em: {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>

        {/* Summary Teams Grid */}
        <div className="space-y-6">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            Resumo das Equipes ({appState.teams.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appState.teams.map((team, idx) => (
              <div
                key={team.id}
                className="printable-card p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-2">
                  <span className="font-bold text-amber-600 dark:text-amber-400 uppercase">
                    EQUIPE {idx + 1}: {team.name}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-bold uppercase text-[10px]">
                    {team.stage}
                  </span>
                </div>

                <div>
                  <p className="font-bold text-slate-700 dark:text-slate-300">Membros:</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {team.members.filter(Boolean).join(', ') || 'Nenhum participante listado'}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-700 dark:text-slate-300">Problema Diagnosticado:</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {team.problemStatement || 'Ainda não preenchido'}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-700 dark:text-slate-300">Conceito da Solução:</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {team.solutionConcept || 'Ainda não preenchido'}
                  </p>
                </div>

                {team.prototypeUrl && (
                  <div>
                    <p className="font-bold text-slate-700 dark:text-slate-300">Link do Protótipo:</p>
                    <a href={team.prototypeUrl} target="_blank" rel="noreferrer" className="text-amber-600 dark:text-amber-400 font-semibold underline truncate block">
                      {team.prototypeUrl}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

