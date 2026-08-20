import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Download, Upload, Printer, FileText, CheckCircle2, Loader2, AlertCircle, RotateCcw, ShieldCheck, Save, HardDrive } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConfirmModal } from '../ConfirmModal';

export const ExportTab: React.FC = () => {
  const { 
    appState, 
    setAppState, 
    resetProjectData, 
    restoreSafetyBackup, 
    hasSafetyBackup, 
    lastSavedTime,
    lastManualSaveTime,
    triggerManualSave,
    saveStatus,
    hasUnsavedChanges
  } = useApp();
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

      // Tailwind v4 uses modern CSS color formats (oklch) which html2canvas 1.4.1 doesn't support natively.
      // We pass an onclone handler that converts modern color functions to standard RGB/hex on the cloned DOM.
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc, clonedElement) => {
          // Remove any dark mode classes from clone so output is pure clean print-ready white
          clonedElement.classList.remove('dark');
          
          // Traverse all elements in the clone to convert any oklch/color values in inline styles
          const allElements = clonedElement.querySelectorAll('*');
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const computed = window.getComputedStyle(el);
            
            // Force basic styles on cards to avoid modern unsupported CSS functions in canvas parser
            if (htmlEl.style) {
              const bg = computed.backgroundColor;
              const color = computed.color;
              const border = computed.borderColor;
              
              if (bg && (bg.includes('oklch') || bg.includes('color('))) {
                htmlEl.style.backgroundColor = '#ffffff';
              }
              if (color && (color.includes('oklch') || color.includes('color('))) {
                htmlEl.style.color = '#0f172a';
              }
              if (border && (border.includes('oklch') || border.includes('color('))) {
                htmlEl.style.borderColor = '#e2e8f0';
              }
            }
          });
        }
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
      
      // Fallback: Build a clean printable PDF directly using jsPDF text API
      try {
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(180, 83, 9); // Amber-700
        doc.text("WORKSHOP INTELIGÊNCIA ARTIFICIAL APLICADA", 14, 20);

        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42); // Slate-900
        doc.text("Relatório Consolidado • O Forno", 14, 28);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`Data de geração: ${new Date().toLocaleDateString('pt-BR')} • Facilitação: Pedro Lago`, 14, 34);

        doc.setDrawColor(226, 232, 240);
        doc.line(14, 38, 196, 38);

        let y = 46;

        // Teams section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);
        doc.text(`1. Resumo das Equipes (${appState.teams.length})`, 14, y);
        y += 8;

        appState.teams.forEach((t, i) => {
          if (y > 260) {
            doc.addPage();
            y = 20;
          }
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(180, 83, 9);
          doc.text(`Equipe ${i + 1}: ${t.name} [${t.stage}]`, 14, y);
          y += 5;

          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(51, 65, 85);
          
          const membersText = `Membros: ${t.members.filter(Boolean).join(', ') || 'Nenhum listado'}`;
          doc.text(membersText, 16, y);
          y += 5;

          if (t.problemStatement) {
            const probLines = doc.splitTextToSize(`Problema: ${t.problemStatement}`, 176);
            doc.text(probLines, 16, y);
            y += probLines.length * 4.5;
          }

          if (t.solutionConcept) {
            const solLines = doc.splitTextToSize(`Solução: ${t.solutionConcept}`, 176);
            doc.text(solLines, 16, y);
            y += solLines.length * 4.5;
          }

          if (t.prototypeUrl) {
            doc.text(`Protótipo: ${t.prototypeUrl}`, 16, y);
            y += 5;
          }

          y += 3;
        });

        // Project Artifacts Section
        if (appState.projectData) {
          if (y > 240) {
            doc.addPage();
            y = 20;
          }

          y += 6;
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.setTextColor(15, 23, 42);
          doc.text(`2. Artefatos do Projeto: ${appState.projectData.projectName || 'Projeto'}`, 14, y);
          y += 8;

          const artifactsList = [
            { label: 'Diagnóstico do Problema', val: appState.projectData.v3ProblemDiagnosis || appState.projectData.phdProblems },
            { label: 'Golden Circle', val: appState.projectData.v3GoldenCircle || appState.projectData.goldenCircleWhy },
            { label: 'Briefing V0 / V1', val: appState.projectData.v3BriefingV1 || appState.projectData.v3BriefingV0 },
            { label: 'PRD V0', val: appState.projectData.v3PrdV0 || appState.projectData.prdRequirements },
            { label: 'Definição do MVP', val: appState.projectData.v3Mvp || appState.projectData.mvpSmallestTestableVersion },
            { label: 'Protótipo V0', val: appState.projectData.v3PrototypeV0 || appState.projectData.prototypeLinkOrDescription },
            { label: 'Plano de Teste', val: appState.projectData.v3TestPlan },
            { label: 'Evidências Brutas de Teste', val: appState.projectData.v3RawEvidence || appState.projectData.v3RawFeedbacks },
            { label: 'Síntese de Evidências', val: appState.projectData.v3EvidenceSummary || appState.projectData.v3FeedbackSynthesis },
            { label: 'Modelo de Sustentabilidade (BMC)', val: appState.projectData.v3Bmc || appState.projectData.bmcValueProposition },
            { label: 'Roadmap (Agora, Depois, Futuro)', val: appState.projectData.v3Roadmap || appState.projectData.roadmapNow },
            { label: 'Registro de Evolução V0 → V1', val: appState.projectData.v3EvolutionRecord },
            { label: 'Protótipo V1', val: appState.projectData.v3PrototypeV1 },
            { label: 'Estrutura do Pitch', val: appState.projectData.v3PitchStructure },
            { label: 'Pitch Integral', val: appState.projectData.v3PitchScript || appState.projectData.pitchScriptText },
            { label: 'Síntese do Pitch', val: appState.projectData.v3PitchSummary },
            { label: 'Roteiro Visual da Apresentação', val: appState.projectData.v3PitchPresentation },
            { label: 'Pitch Revisado & Síntese Crítica', val: appState.projectData.v3PitchRevised || appState.projectData.v3RehearsalNotes }
          ];

          artifactsList.forEach((art) => {
            if (art.val) {
              if (y > 255) {
                doc.addPage();
                y = 20;
              }
              doc.setFont("helvetica", "bold");
              doc.setFontSize(9.5);
              doc.setTextColor(180, 83, 9);
              doc.text(`• ${art.label}:`, 14, y);
              y += 4.5;

              doc.setFont("helvetica", "normal");
              doc.setFontSize(8.5);
              doc.setTextColor(51, 65, 85);
              const lines = doc.splitTextToSize(art.val, 178);
              doc.text(lines, 16, y);
              y += lines.length * 4 + 4;
            }
          });
        }

        doc.save(`relatorio_workshop_ia_oforno_${new Date().toISOString().slice(0, 10)}.pdf`);
        setStatusMessage({ type: 'success', text: "Relatório PDF gerado via exportador vetorial com sucesso!" });
        setTimeout(() => setStatusMessage(null), 5000);
      } catch (fallbackError) {
        console.error("Erro no fallback de PDF:", fallbackError);
        setStatusMessage({ type: 'error', text: "Não foi possível gerar o arquivo direto. Abrindo assistente de impressão..." });
        handlePrintReport();
      }
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

      {/* Local Persistence & Backup Status Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-black text-white">Seu Progresso Está Seguro</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Salvo Automaticamente
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Toda alteração de texto, checklist ou artefato é gravada de imediato neste aparelho. Você pode recarregar ou fechar o navegador sem perder nada.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                const ok = triggerManualSave();
                if (ok) {
                  setStatusMessage({ type: 'success', text: 'Progresso salvo manualmente com sucesso neste navegador!' });
                  setTimeout(() => setStatusMessage(null), 3500);
                }
              }}
              className={`px-4 py-2 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                saveStatus === 'just_saved'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : hasUnsavedChanges
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-400/50'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
              }`}
              title="Forçar salvamento manual agora"
            >
              <Save className="w-4 h-4" />
              <span>{saveStatus === 'just_saved' ? 'Salvo com Sucesso!' : hasUnsavedChanges ? 'Salvar Alterações Agora' : 'Salvar Manualmente'}</span>
            </button>

            {hasSafetyBackup && (
              <button
                onClick={handleRestoreSafetyBackup}
                className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                title="Restaurar backup feito antes do último reset ou alteração crítica"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Restaurar Cópia Prévia</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Pillars of Persistence */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Save className="w-4 h-4" />
              <span>Quando é salvo?</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Em tempo real. {lastSavedTime ? `Última gravação realizada às ${lastSavedTime}.` : 'Salvamento contínuo ativo.'}
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <HardDrive className="w-4 h-4" />
              <span>Como mudar de computador?</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              O salvamento ocorre <strong>neste aparelho</strong>. Para continuar em outro dispositivo, clique em <strong>Exportar Backup</strong> e depois em <strong>Restaurar Backup</strong> no novo computador.
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Privacidade & LGPD</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Nenhum dado é enviado a servidores externos ou exposto publicamente. Todos os dados permanecem sob o controle do seu grupo.
            </p>
          </div>
        </div>

        {/* Step by Step Guide */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <span className="font-extrabold text-amber-300 uppercase tracking-wider text-[11px] block">
              💡 Guia Rápido de Backup para o Final do Encontro
            </span>
            <p className="text-slate-300 leading-relaxed">
              <strong>1. Exportar:</strong> Ao terminar a oficina do dia, clique em <em>Baixar JSON</em> e guarde o arquivo no seu pendrive ou e-mail. <br />
              <strong>2. Restaurar:</strong> No próximo encontro ou em outro computador, abra este webapp, venha nesta tela e clique em <em>Carregar Backup</em>.
            </p>
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

        {/* V3.2 Project Artifacts Section */}
        {appState.projectData && (
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Artefatos do Projeto V3.2: {appState.projectData.projectName || 'Projeto da Equipe'} ({appState.projectData.teamName || 'Equipe'})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {(appState.projectData.v3ProblemDiagnosis || appState.projectData.phdProblems) && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">1. Diagnóstico do Problema</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3ProblemDiagnosis || appState.projectData.phdProblems}</p>
                </div>
              )}

              {(appState.projectData.v3GoldenCircle || appState.projectData.goldenCircleWhy) && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">2. Golden Circle</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3GoldenCircle || `POR QUÊ: ${appState.projectData.goldenCircleWhy}\nCOMO: ${appState.projectData.goldenCircleHow}\nO QUÊ: ${appState.projectData.goldenCircleWhat}`}</p>
                </div>
              )}

              {(appState.projectData.v3BriefingV1 || appState.projectData.v3BriefingV0) && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">3. Briefing V0 / V1</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3BriefingV1 || appState.projectData.v3BriefingV0}</p>
                </div>
              )}

              {(appState.projectData.v3PrdV0 || appState.projectData.prdRequirements) && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">4. PRD V0</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3PrdV0 || appState.projectData.prdRequirements}</p>
                </div>
              )}

              {(appState.projectData.v3Mvp || appState.projectData.mvpSmallestTestableVersion) && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">5. Definição do MVP</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3Mvp || appState.projectData.mvpSmallestTestableVersion}</p>
                </div>
              )}

              {(appState.projectData.v3PrototypeV0 || appState.projectData.prototypeLinkOrDescription) && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">6. Protótipo V0</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3PrototypeV0 || appState.projectData.prototypeLinkOrDescription}</p>
                </div>
              )}

              {appState.projectData.v3TestPlan && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">7. Plano de Teste</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3TestPlan}</p>
                </div>
              )}

              {(appState.projectData.v3RawEvidence || appState.projectData.v3RawFeedbacks) && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">8. Evidências Brutas de Teste</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3RawEvidence || appState.projectData.v3RawFeedbacks}</p>
                </div>
              )}

              {(appState.projectData.v3EvidenceSummary || appState.projectData.v3FeedbackSynthesis) && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">9. Síntese de Evidências</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3EvidenceSummary || appState.projectData.v3FeedbackSynthesis}</p>
                </div>
              )}

              {(appState.projectData.v3Bmc || appState.projectData.bmcValueProposition) && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">10. Modelo de Sustentabilidade (BMC)</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3Bmc || appState.projectData.bmcValueProposition}</p>
                </div>
              )}

              {(appState.projectData.v3Roadmap || appState.projectData.roadmapNow) && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">11. Roadmap</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3Roadmap || appState.projectData.roadmapNow}</p>
                </div>
              )}

              {appState.projectData.v3EvolutionRecord && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">12. Registro de Evolução V0 → V1</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3EvolutionRecord}</p>
                </div>
              )}

              {appState.projectData.v3PrototypeV1 && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">13. Protótipo V1</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3PrototypeV1}</p>
                </div>
              )}

              {(appState.projectData.v3PitchScript || appState.projectData.pitchScriptText) && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">14. Pitch Integral</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3PitchScript || appState.projectData.pitchScriptText}</p>
                </div>
              )}

              {appState.projectData.v3PitchPresentation && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">15. Roteiro Visual da Apresentação</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3PitchPresentation}</p>
                </div>
              )}

              {(appState.projectData.v3PitchRevised || appState.projectData.v3RehearsalNotes) && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">16. Pitch Revisado & Síntese Crítica</span>
                  <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">{appState.projectData.v3PitchRevised || appState.projectData.v3RehearsalNotes}</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

