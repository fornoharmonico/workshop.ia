import React from 'react';
import { X, ExternalLink, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BrandPreviewModal: React.FC = () => {
  const { brandModal, closeBrandModal } = useApp();

  if (!brandModal || !brandModal.isOpen) return null;

  const defaultCtaUrl = 'https://ofornoapp.netlify.app/';
  const defaultCtaText = "Confira o que tem n'O Forno!";

  const ctaUrl = brandModal.ctaUrl || defaultCtaUrl;
  const ctaText = brandModal.ctaLabel || defaultCtaText;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeBrandModal}
    >
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-center overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeBrandModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
          title="Fechar visualização"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 mb-5 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-bold text-xs mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>O FORNO</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {brandModal.title || 'O Forno'}
          </h3>
          {brandModal.subtitle && (
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              {brandModal.subtitle}
            </p>
          )}
        </div>

        {/* Image Preview Box */}
        <div className="relative my-2 py-2 flex items-center justify-center min-h-[200px] max-h-[360px] overflow-hidden group">
          <img
            src={brandModal.imageUrl}
            alt={brandModal.title || 'Imagem ampliada'}
            referrerPolicy="no-referrer"
            className="max-h-[320px] w-auto max-w-full object-contain rounded-2xl transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* CTA Button */}
        <div className="mt-6 pt-2 space-y-3">
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35 transition-all duration-200 active:scale-[0.98] group"
          >
            <span>{ctaText}</span>
            <ExternalLink className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            Clique acima para visitar o ecossistema O Forno
          </p>
        </div>
      </div>
    </div>
  );
};
