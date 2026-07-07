import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";
import { crisisManagement } from "../data";

interface MitigationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MitigationModal({ isOpen, onClose }: MitigationModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        {/* Modal container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-slate-100 z-10 max-h-[90vh] flex flex-col"
        >
          {/* Top colored accent line */}
          <div className="h-1.5 w-full bg-ifood" />

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-red-50 text-ifood">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-slate-800 leading-tight">
                  {crisisManagement.strategicResponse.title}
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                  Ações Direcionadas H1 2026
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal body */}
          <div className="p-6 overflow-y-auto space-y-5">
            <p className="text-xs text-slate-500 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {crisisManagement.strategicResponse.description}
            </p>

            {/* Checklist items */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Linhas de Ação e Procedimentos
              </h4>

              {crisisManagement.strategicResponse.actions.map((action, idx) => {
                // Highlighting specific terms for professional look
                const parts = action.split(":");
                const hasTitle = parts.length > 1;

                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-50 bg-slate-50/20 hover:bg-slate-50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>

                    <div className="space-y-1">
                      {hasTitle ? (
                        <>
                          <h5 className="text-xs font-bold text-slate-800">
                            {parts[0]}
                          </h5>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            {parts.slice(1).join(":")}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {action}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
              <HelpCircle className="h-4 w-4" />
              <span>Dúvidas ou atualizações? Contatar o time de CX & Brand PR.</span>
            </div>

            <button
              onClick={onClose}
              className="cursor-pointer w-full sm:w-auto text-center px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold transition-all duration-200 shadow-xs"
            >
              Concluir Revisão
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
