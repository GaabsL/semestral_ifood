import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smartphone, Smile, PiggyBank, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { executiveInsights } from "../data";

export default function ExecutiveInsights() {
  const [expandedId, setExpandedId] = useState<string | null>("insight-stories");

  const getInsightIcon = (category: string) => {
    switch (category) {
      case "Conversão":
        return <Smartphone className="h-4 w-4 text-blue-600" />;
      case "Conteúdo":
        return <Smile className="h-4 w-4 text-purple-600" />;
      case "Mídia Paga":
        return <PiggyBank className="h-4 w-4 text-amber-600" />;
      case "Reputação":
        return <ShieldCheck className="h-4 w-4 text-emerald-600" />;
      default:
        return <Smartphone className="h-4 w-4 text-slate-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Conversão":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Conteúdo":
        return "bg-purple-50 text-purple-600 border-purple-100";
      case "Mídia Paga":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "Reputação":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-red-100 transition-colors h-full flex flex-col justify-between">
      <div>
        {/* Section Title */}
        <div className="mb-4 pb-3 border-b border-slate-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-ifood">
            Recomendações H1 2026
          </span>
          <h2 className="font-display text-base font-bold text-slate-800 mt-0.5">
            Insights Estratégicos & Próximos Passos
          </h2>
          <p className="text-[10px] text-slate-400 font-medium">
            Diretrizes acionáveis baseadas em inteligência de dados.
          </p>
        </div>

        {/* Vertical Accordion Stack */}
        <div className="space-y-2.5">
          {executiveInsights.map((insight, index) => {
            const isExpanded = expandedId === insight.id;

            return (
              <div
                key={insight.id}
                onClick={() => toggleExpand(insight.id)}
                className={`cursor-pointer rounded-lg border transition-all duration-300 p-3.5 ${
                  isExpanded
                    ? "bg-slate-50/70 border-slate-300"
                    : "bg-white border-slate-150 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded border ${getCategoryColor(insight.category).split(" ")[0]} ${getCategoryColor(insight.category).split(" ")[2]}`}>
                      {getInsightIcon(insight.category)}
                    </div>
                    <div>
                      <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded ${getCategoryColor(insight.category)}`}>
                        {insight.category}
                      </span>
                      <h3 className="font-display text-xs font-bold text-slate-800 mt-1 leading-tight">
                        {insight.title}
                      </h3>
                    </div>
                  </div>
                  <div className="text-slate-400 mt-1">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <span className="text-[9px] font-bold text-slate-400 block tracking-wide uppercase mb-1">
                        {insight.subtitle}
                      </span>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                        {insight.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 text-[9px] font-bold text-slate-400 tracking-wider uppercase flex justify-between items-center">
        <span>Diretriz Executiva iFood</span>
        <span className="text-ifood font-black">H1 2026</span>
      </div>
    </div>
  );
}
