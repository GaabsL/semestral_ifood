import React, { useState } from "react";
import { ShieldAlert, AlertTriangle, ChevronRight, X, ZoomIn } from "lucide-react";
import { crisisManagement } from "../data";

interface CrisisControlProps {
  onOpenModal: () => void;
}

const negativeCommentPrints = [
  "https://i.imgur.com/WMlO90v.png",
  "https://i.imgur.com/8mJS2ip.png",
  "https://i.imgur.com/LLY7KF2.png",
  "https://i.imgur.com/iEIXUlV.png",
  "https://i.imgur.com/pr87JWG.png",
  "https://i.imgur.com/i7pweEs.png",
];

export default function CrisisControl({ onOpenModal }: CrisisControlProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-slate-900 text-slate-100 border border-slate-800 rounded-xl p-5 shadow-sm h-full flex flex-col justify-between hover:border-slate-700 transition-colors">
      <div>
        {/* Header inside the card */}
        <div className="mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-ifood">
              Gestão de Reputação
            </span>
            <h2 className="font-display text-base font-bold text-white mt-0.5">
              Monitor de Crises & Riscos
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Ativo</span>
          </div>
        </div>

        {/* Tab Content Area - Monitor de Ruídos */}
        <div className="space-y-3">
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
            {crisisManagement.context}
          </p>

          <div className="space-y-2">
            {crisisManagement.detectedIssues.map((issue, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between gap-2.5 hover:border-slate-700 transition-colors"
              >
                <div className="flex gap-2">
                  <div className="p-1 rounded bg-red-950/50 text-ifood shrink-0 mt-0.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-200">{issue.topic}</h4>
                    <p className="text-[9px] text-slate-500 font-medium leading-tight mt-0.5">
                      {issue.description}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 flex flex-col items-end gap-1">
                  {issue.volume && (
                    <span className="text-[8px] font-bold text-slate-400 px-1 rounded bg-slate-900 border border-slate-800">
                      {issue.volume}
                    </span>
                  )}
                  <span className="text-[8px] font-extrabold text-red-400 px-1 py-0.2 rounded bg-red-950/40 border border-red-900/30">
                    {issue.sentiment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Negative Comments Prints Section */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Evidências de Menções (Prints Reais)
          </span>
          <div className="grid grid-cols-3 gap-2">
            {negativeCommentPrints.map((url, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(url)}
                className="group relative cursor-pointer aspect-video bg-slate-950 rounded border border-slate-800 hover:border-red-500 overflow-hidden transition-all flex items-center justify-center"
              >
                <img
                  src={url}
                  alt={`Comentário negativo ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="h-3.5 w-3.5 text-white opacity-85 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Button at the bottom */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5 text-slate-400">
          <ShieldAlert className="h-4 w-4 text-ifood shrink-0" />
          <span className="text-[9px] font-semibold leading-none">
            Time integrado ao Manual de Crise
          </span>
        </div>

        <button
          onClick={onOpenModal}
          className="cursor-pointer inline-flex items-center gap-0.5 text-[10px] font-bold text-white hover:text-white bg-ifood hover:bg-red-600 px-3 py-1.5 rounded-lg transition-all duration-200"
        >
          <span>Plano PR</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Lightbox Modal for Prints */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xs transition-all duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-lg w-full bg-slate-950 border border-slate-800 rounded-xl p-2 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow-md border border-red-500 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={selectedImage}
              alt="Print de Comentário Reclamação"
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto object-contain rounded-lg shadow-inner bg-slate-900"
            />
            <div className="mt-2.5 text-center">
              <p className="text-[10px] text-slate-400 font-medium">
                Evidência de menção negativa detectada nas redes sociais
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
