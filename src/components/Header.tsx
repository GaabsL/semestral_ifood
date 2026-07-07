import React from "react";
import { Download, Calendar } from "lucide-react";

interface HeaderProps {
  onExport: () => void;
  presentationMode: boolean;
  setPresentationMode: (mode: boolean) => void;
}

export default function Header({ onExport, presentationMode, setPresentationMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.imgur.com/OGIS6wu.png"
            alt="iFood Logo"
            referrerPolicy="no-referrer"
            className="h-9 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-lg font-bold text-slate-900 tracking-tight">
                iFood Executive Dashboard
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-ifood">
                H1 2026
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Relatório de Fechamento de Resultados & Gestão de Reputação
            </p>
          </div>
        </div>

        {/* Filters, Actions & Partner Logos */}
        <div className="flex flex-wrap items-center gap-4 md:gap-5">
          {/* Partner Logos */}
          <div className="flex items-center gap-3 md:border-r md:border-slate-200 md:pr-4">
            <img
              src="https://i.imgur.com/ihchsJt.png"
              alt="Logo Empresa"
              referrerPolicy="no-referrer"
              className="h-10 w-10 object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
            <div className="h-4 w-[1px] bg-slate-200" />
            <img
              src="https://i.imgur.com/lAyMWKF.png"
              alt="Logo Agência"
              referrerPolicy="no-referrer"
              className="h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Calendar Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-xs">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>Janeiro - Junho 2026</span>
            </div>

            {/* Export Button */}
            <button
              onClick={onExport}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-ifood hover:bg-ifood-hover text-white px-4 py-1.5 text-xs font-semibold transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-red-500/10"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Exportar Relatório</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

