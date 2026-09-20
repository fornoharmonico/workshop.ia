import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Download, 
  Upload, 
  Printer, 
  FileText, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  RotateCcw, 
  ShieldCheck, 
  Save, 
  HardDrive,
  Copy,
  FileCode,
  FileSpreadsheet,
  Layers,
  Sparkles,
  FlaskConical,
  Compass,
  Presentation
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConfirmModal } from '../ConfirmModal';
import { 
  generateMasterDocumentMarkdown, 
  generateMasterDocumentPlainText, 
  downloadFile,
  buildExportFileName
} from '../../utils/exportMasterDocument';
import { migrateStateToV1_4_1 } from '../../utils/migrationV1_4_1';
import { resolveAllAuthoritativeArtifacts } from '../../utils/artifactStore';

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
    hasUnsavedChanges,
    ensureProjectIdentification,
    isProjectIdentified,
    openProjectIdentModal,
    updateProjectData
  } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pendingImportData, setPendingImportData] = useState<any | null>(null);
  const [importSummary, setImportSummary] = useState<{ projectName: string; teamName: string; artifactsCount: number } | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isCopiedMd, setIsCopiedMd] = useState(false);

  const canonicalArtifacts = resolveAllAuthoritativeArtifacts(appState.projectData, appState.projectStateV1_4_1);

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
    ensureProjectIdentification(() => {
      const filename = buildExportFileName(
        'backup',
        appState.projectData?.projectName,
        appState.projectData?.teamName,
        'json'
      );
      const jsonStr = JSON.stringify(appState, null, 2);
      downloadFile(filename, jsonStr, 'application/json');
      setStatusMessage({ type: 'success', text: `Backup completo (JSON) exportado com sucesso: ${filename}` });
      setTimeout(() => setStatusMessage(null), 4000);
    }, 'exportar o backup do projeto (JSON)');
  };

  const handleExportMasterMarkdown = () => {
    ensureProjectIdentification(() => {
      const filename = buildExportFileName(
        'documento_mestre',
        appState.projectData?.projectName,
        appState.projectData?.teamName,
        'md'
      );
      const md = generateMasterDocumentMarkdown(appState);
      downloadFile(filename, md, 'text/markdown');
      setStatusMessage({ type: 'success', text: `Documento Mestre em Markdown (.md) exportado com sucesso: ${filename}` });
      setTimeout(() => setStatusMessage(null), 4000);
    }, 'exportar o Documento Mestre (.md)');
  };

  const handleExportMasterPlainText = () => {
    ensureProjectIdentification(() => {
      const filename = buildExportFileName(
        'documento_mestre',
        appState.projectData?.projectName,
        appState.projectData?.teamName,
        'txt'
      );
      const txt = generateMasterDocumentPlainText(appState);
      downloadFile(filename, txt, 'text/plain');
      setStatusMessage({ type: 'success', text: `Documento Mestre em Texto (.txt) exportado com sucesso: ${filename}` });
      setTimeout(() => setStatusMessage(null), 4000);
    }, 'exportar o Documento Mestre (.txt)');
  };

  const handleCopyMasterMarkdown = async () => {
    ensureProjectIdentification(async () => {
      try {
        const md = generateMasterDocumentMarkdown(appState);
        await navigator.clipboard.writeText(md);
        setIsCopiedMd(true);
        setStatusMessage({ type: 'success', text: 'Documento Mestre copiado para a área de transferência!' });
        setTimeout(() => {
          setIsCopiedMd(false);
          setStatusMessage(null);
        }, 3500);
      } catch (e) {
        console.error('Failed to copy Markdown', e);
        setStatusMessage({ type: 'error', text: 'Não foi possível copiar automaticamente para a área de transferência.' });
      }
    }, 'copiar o Documento Mestre');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (event) => {
        try {
          if (event.target?.result) {
            const parsed = JSON.parse(event.target.result as string);
            
            // Validation: Ensure parsed item is an object and contains workshop signals
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
              throw new Error('Estrutura de arquivo inválida');
            }

            // Check for plausible workshop signatures (legacy or current)
            const hasWorkshopSignatures = 
              parsed.projectStateV1_4_1 !== undefined ||
              parsed.projectData !== undefined ||
              parsed.teams !== undefined ||
              parsed.completedActivityIds !== undefined ||
              parsed.activityProgress !== undefined;

            if (!hasWorkshopSignatures) {
              throw new Error('O arquivo JSON não corresponde a um backup do workshop O Forno.');
            }

            // Normalize through migration to guarantee zero data loss and compatibility
            const normalized = migrateStateToV1_4_1(parsed);
            setPendingImportData(normalized);

            const pName = normalized.projectData?.projectName || normalized.projectStateV1_4_1?.projectName || 'Projeto sem nome';
            const tName = normalized.projectData?.teamName || normalized.projectStateV1_4_1?.teamName || 'Equipe sem nome';
            
            // Count filled canonical artifacts
            const artifactsObj = normalized.projectStateV1_4_1?.artifacts || {};
            const filledCount = Object.values(artifactsObj).filter((a: any) => {
              if (a?.content && a.content.trim().length > 0) return true;
              if (a?.v0Content || a?.v1Content) return true;
              return false;
            }).length;

            setImportSummary({
              projectName: pName,
              teamName: tName,
              artifactsCount: filledCount,
            });
          }
        } catch (err: any) {
          console.error('[Import Error]', err);
          setStatusMessage({ 
            type: 'error', 
            text: `Arquivo de backup inválido ou incompatível. Seu projeto atual permaneceu 100% seguro e intacto.` 
          });
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
    }
  };

  const confirmImport = () => {
    if (pendingImportData) {
      setAppState(pendingImportData);
      setPendingImportData(null);
      setImportSummary(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setStatusMessage({ type: 'success', text: "Dados do backup importados e sincronizados com sucesso!" });
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const confirmResetData = () => {
    resetProjectData();
    setShowResetModal(false);
    setStatusMessage({ type: 'success', text: "Todos os dados do projeto e o Documento Mestre foram resetados com sucesso!" });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleDownloadPdf = () => {
    ensureProjectIdentification(async () => {
      if (!reportRef.current) return;
      setIsGeneratingPdf(true);
      setStatusMessage(null);

      const pdfFilename = buildExportFileName(
        'relatorio',
        appState.projectData?.projectName,
        appState.projectData?.teamName,
        'pdf'
      );

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

        pdf.save(pdfFilename);
        setStatusMessage({ type: 'success', text: `Relatório PDF gerado e baixado com sucesso: ${pdfFilename}` });
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
            { label: 'Diagnóstico do Problema', val: canonicalArtifacts.AF02?.content || appState.projectData.v3ProblemDiagnosis || appState.projectData.phdProblems },
            { label: 'Propósito e Direção', val: canonicalArtifacts.AF04?.content || appState.projectData.v3GoldenCircle || appState.projectData.goldenCircleWhy },
            { label: 'Briefing V0 / V1', val: canonicalArtifacts.AF06?.content || canonicalArtifacts.AF05?.content || appState.projectData.v3BriefingV1 || appState.projectData.v3BriefingV0 },
            { label: 'Especificação / PRD', val: canonicalArtifacts.AF07?.content || appState.projectData.v3PrdV0 || appState.projectData.prdRequirements },
            { label: 'Definição do MVP', val: canonicalArtifacts.AF08?.content || appState.projectData.v3Mvp || appState.projectData.mvpSmallestTestableVersion },
            { label: 'Protótipo V0', val: canonicalArtifacts.AF08?.content || appState.projectData.v3PrototypeV0 || appState.projectData.prototypeLinkOrDescription },
            { label: 'Plano de Teste e Aprendizados', val: canonicalArtifacts.AF09?.content || appState.projectData.v3TestPlan },
            { label: 'Evidências Brutas de Teste', val: appState.projectData.v3RawEvidence || appState.projectData.v3RawFeedbacks },
            { label: 'Síntese de Evidências', val: canonicalArtifacts.AF09?.content || appState.projectData.v3EvidenceSummary || appState.projectData.v3FeedbackSynthesis },
            { label: 'Modelo de Sustentabilidade', val: canonicalArtifacts.AF10?.content || appState.projectData.v3Bmc || appState.projectData.bmcValueProposition },
            { label: 'Roadmap + Linha do Tempo', val: canonicalArtifacts.AF11?.content || appState.projectData.v3Roadmap || appState.projectData.roadmapNow },
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

        doc.save(pdfFilename);
        setStatusMessage({ type: 'success', text: `Relatório PDF gerado via exportador vetorial com sucesso: ${pdfFilename}` });
        setTimeout(() => setStatusMessage(null), 5000);
      } catch (fallbackError) {
        console.error("Erro no fallback de PDF:", fallbackError);
        setStatusMessage({ type: 'error', text: "Não foi possível gerar o arquivo direto. Abrindo assistente de impressão..." });
        handlePrintReport();
      }
    } finally {
      setIsGeneratingPdf(false);
    }
  }, 'gerar e baixar o relatório PDF');
};

  const handlePrintReport = () => {
    ensureProjectIdentification(() => {
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
    }, 'imprimir o relatório do projeto');
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Confirmation Modal for Import JSON Backup */}
      <ConfirmModal
        isOpen={!!pendingImportData}
        title="Restaurar Dados do Backup?"
        message={
          importSummary
            ? `Deseja restaurar o backup do projeto "${importSummary.projectName}" (Equipe: "${importSummary.teamName}" com ${importSummary.artifactsCount} artefatos preenchidos)? Isso sincronizará todas as notas, equipes e progresso atuais.`
            : "Atenção: A restauração de backup irá substituir todas as equipes, anotações e progresso atuais pelos dados do arquivo. Esta ação não poderá ser desfeita."
        }
        confirmLabel="Sim, Restaurar Backup"
        cancelLabel="Cancelar"
        variant="warning"
        onConfirm={confirmImport}
        onCancel={() => {
          setPendingImportData(null);
          setImportSummary(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }}
      />

      {/* Confirmation Modal for Resetting All Data */}
      <ConfirmModal
        isOpen={showResetModal}
        title="Resetar Todos os Dados do Workshop?"
        message="Esta é uma ação crítica. Todos os cadastros de equipes, diagnósticos, artefatos consolidados no Documento Mestre, anotações de facilitação e seleções serão apagados permanentemente e restaurados ao estado inicial. Uma cópia de segurança pré-reset será salva automaticamente."
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
                ensureProjectIdentification(() => {
                  const ok = triggerManualSave();
                  if (ok) {
                    setStatusMessage({ type: 'success', text: 'Progresso salvo manualmente com sucesso neste navegador!' });
                    setTimeout(() => setStatusMessage(null), 3500);
                  }
                }, 'salvar o projeto manualmente');
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

      {/* Requisito Mandatório: Identificação do Projeto para Salvar e Exportar */}
      {!isProjectIdentified ? (
        <div className="bg-amber-500/10 dark:bg-amber-500/15 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-800 dark:text-amber-300 px-2.5 py-0.5 rounded-full inline-block">
                Requisito Obrigatório para Salvar e Exportar
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                Identificação do Projeto Obrigatória
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                O preenchimento dos campos <strong>Nome do Projeto</strong> e <strong>Seu Nome ou Nome da Equipe</strong> é obrigatório para salvar ou exportar em qualquer formato (.json, .md, .txt, .pdf). Esses dados serão inseridos no cabeçalho e comporão o nome dos arquivos exportados junto com a data e hora.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
                Nome do Projeto *
              </label>
              <input
                type="text"
                value={appState.projectData?.projectName || ''}
                onChange={(e) => updateProjectData({ projectName: e.target.value })}
                placeholder="Ex: Horta Comunitária Inteligente..."
                className="w-full text-xs font-bold bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
                Seu Nome ou Nome da Equipe *
              </label>
              <input
                type="text"
                value={appState.projectData?.teamName || ''}
                onChange={(e) => updateProjectData({ teamName: e.target.value })}
                placeholder="Ex: Seu Nome (individual) ou Nome da Equipe..."
                className="w-full text-xs font-bold bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                Válido tanto para o seu próprio nome (trabalho individual) quanto para o nome do grupo/equipe.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="text-slate-500 dark:text-slate-400">Identificação ativa: </span>
              <strong className="text-slate-900 dark:text-white font-bold">{appState.projectData?.projectName}</strong>
              <span className="text-slate-400 mx-2">•</span>
              <span className="text-slate-500 dark:text-slate-400">Autor / Equipe: </span>
              <strong className="text-slate-900 dark:text-white font-bold">{appState.projectData?.teamName}</strong>
            </div>
          </div>
          <button
            type="button"
            onClick={() => openProjectIdentModal('alterar os dados de identificação')}
            className="text-2xs font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
          >
            Alterar dados de identificação
          </button>
        </div>
      )}

      {/* Primary Exporter Hub: Documento Mestre & Formatos Executivos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-amber-500" />
              Formatos de Exportação & Dossiê Executivo
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Baixe o Documento Mestre consolidado com os 14 artefatos e evidências de teste, sem ruídos transitórios.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Documento Mestre Markdown */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-500/50 transition-colors">
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 w-fit">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Documento Mestre (.md)</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Dossiê estruturado em Markdown com os 4 movimentos, 14 artefatos e evidências reais.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleExportMasterMarkdown}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Markdown (.md)</span>
              </button>
              <button
                type="button"
                onClick={handleCopyMasterMarkdown}
                className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{isCopiedMd ? 'Copiado!' : 'Copiar Texto'}</span>
              </button>
            </div>
          </div>

          {/* Documento Mestre TXT */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-500/50 transition-colors">
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 w-fit">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Documento Mestre (.txt)</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Versão em texto puro sem marcações, ideal para envio por e-mail ou leitura rápida.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleExportMasterPlainText}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Texto (.txt)</span>
            </button>
          </div>

          {/* Relatório PDF & Impressão */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-500/50 transition-colors">
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 w-fit">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Relatório / PDF</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Documento formatado para apresentação ou impressão com design limpo A4.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/60 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Gerando PDF...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-3.5 h-3.5" />
                    <span>Baixar PDF</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handlePrintReport}
                className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir</span>
              </button>
            </div>
          </div>

          {/* Backup Integral JSON */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-500/50 transition-colors">
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 w-fit">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Backup JSON</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Arquivo completo de restauração com histórico, notas e configurações de todas as equipes.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleExportJson}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar JSON</span>
              </button>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImportJson}
                  accept=".json"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Restaurar JSON</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Diretrizes de Ética & LGPD • Uso Responsável da IA */}
      <div id="secao-etica-lgpd" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 flex-wrap">
              <span>Uso Responsável & Seguro da IA</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[10px] font-black uppercase">
                Ética & LGPD
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Diretrizes fundamentais para o trabalho de investigação, prototipação e manipulação segura de dados no workshop O FORNO.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
              🔒 1. Proteção de Dados Pessoais (LGPD)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Nunca insira nomes completos, CPF, telefones, fotos pessoais ou dados confidenciais de colegas e moradores nos prompts. Trate a IA como um ambiente público.
            </p>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
              ✍️ 2. Autoria & Decisão da Equipe
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A IA é um copiloto de raciocínio, não a autora do seu projeto. Nenhuma resposta da IA deve entrar no projeto sem a validação crítica da equipe no Checkpoint.
            </p>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
              🔍 3. Verificação de Alucinações
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Modelos de linguagem podem inventar dados ou dados estatísticos ("alucinações"). Sempre distinga entre fatos observados e suposições da IA.
            </p>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
              🤝 4. Colaboração Transparente
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Documente de forma transparente quais ferramentas de IA foram utilizadas (por exemplo: ChatGPT, Claude, v0) e para quais finalidades.
            </p>
          </div>
        </div>
      </div>

      {/* Action Row: Reset & Safety Snapshot */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <RotateCcw className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Precisa reiniciar para uma nova turma? O reset limpa o projeto e o Documento Mestre (com cópia de segurança prévia).</span>
        </div>
        <button
          type="button"
          onClick={() => setShowResetModal(true)}
          className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer border border-rose-500/20"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Resetar Dados do Projeto</span>
        </button>
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
              DOCUMENTO MESTRE • RELATÓRIO CONSOLIDADO V1.4.1
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {appState.projectData?.projectName || appState.projectStateV1_4_1?.projectName || 'Workshop IA Aplicada'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Equipe: {appState.projectData?.teamName || appState.projectStateV1_4_1?.teamName || 'Equipe Geral'} • Facilitação: Pedro Lago • O Forno
            </p>
          </div>
          <div className="text-right text-xs text-slate-400 font-medium">
            Gerado em: {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>

        {/* Strategic Overview Pill Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-300 block uppercase text-[10px]">Problema / Desafio Central</span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {appState.projectStateV1_4_1?.problemSelected || appState.projectData?.collectiveChallenge || appState.projectData?.phdProblems || 'Não definido'}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-300 block uppercase text-[10px]">Público Beneficiário / Alvo</span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {appState.projectStateV1_4_1?.targetAudience || appState.projectData?.solutionTargetAudience || 'Não definido'}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-300 block uppercase text-[10px]">Propósito Central e Direção</span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {canonicalArtifacts.AF04?.content || appState.projectStateV1_4_1?.purpose || 'Não definido'}
            </p>
          </div>
        </div>

        {/* 12 Canonical Artifacts Dossier (AF01 a AF12) */}
        <div className="space-y-6">
          
          {/* Agrupamento 1: Investigar e Direcionar */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Agrupamento 1: Investigar e Direcionar (AF01 a AF04)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">AF01 • Mapa de Problemas + Problema Escolhido</span>
                <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">
                  {canonicalArtifacts.AF01?.content || 'Pendente de preenchimento.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">AF02 • Diagnóstico do Problema</span>
                <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">
                  {canonicalArtifacts.AF02?.content || 'Pendente de preenchimento.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">AF03 • Mapa de Recursos</span>
                <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">
                  {canonicalArtifacts.AF03?.content || 'Pendente de preenchimento.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">AF04 • Propósito e Direção</span>
                <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">
                  {canonicalArtifacts.AF04?.content || 'Pendente de preenchimento.'}
                </p>
              </div>
            </div>
          </div>

          {/* Agrupamento 2: Definir e Materializar */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Agrupamento 2: Definir e Materializar (AF05 a AF08)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">AF05 • Briefing V0 (Minuta de Trabalho)</span>
                <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">
                  {canonicalArtifacts.AF05?.content || 'Pendente de preenchimento.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">AF06 • Briefing V1 (Versão Autoritativa)</span>
                <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">
                  {canonicalArtifacts.AF06?.content || 'Pendente de preenchimento.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">AF07 • Especificação de Funcionamento / PRD</span>
                <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">
                  {canonicalArtifacts.AF07?.content || 'Pendente de preenchimento.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">AF08 • MVP + Protótipo V0</span>
                <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">
                  {canonicalArtifacts.AF08?.content || 'Pendente de preenchimento.'}
                </p>
              </div>
            </div>
          </div>

          {/* Agrupamento 3: Testar, Aprender e Planejar */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Agrupamento 3: Testar, Aprender e Planejar (AF09 a AF11)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">AF09 • Testes, Aprendizados e Evolução V0→V1</span>
                <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">
                  {canonicalArtifacts.AF09?.content || 'Pendente de preenchimento.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">AF10 • Modelo de Sustentabilidade</span>
                <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">
                  {canonicalArtifacts.AF10?.content || 'Pendente de preenchimento.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">AF11 • Roadmap + Linha do Tempo em 7 Etapas</span>
                <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">
                  {canonicalArtifacts.AF11?.content || 'Pendente de preenchimento.'}
                </p>
              </div>
            </div>
          </div>

          {/* Agrupamento 4: Comunicar e Celebrar */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Agrupamento 4: Comunicar e Celebrar (AF12)
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">AF12 • Kit de Comunicação Final (Pitch V1 + Roteiro Visual + Roteiro de Ensaio/Simulação)</span>
                <p className="text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap line-clamp-6">
                  {canonicalArtifacts.AF12?.content || 'Pendente de preenchimento.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

