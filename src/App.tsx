import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, Download, Check, AlertCircle, X, ExternalLink } from "lucide-react";
import Header from "./components/Header";
import BigNumbers from "./components/BigNumbers";
import TrendChart from "./components/TrendChart";
import NetworkHighlights from "./components/NetworkHighlights";
import CrisisControl from "./components/CrisisControl";
import ExecutiveInsights from "./components/ExecutiveInsights";
import MitigationModal from "./components/MitigationModal";

export default function App() {
  const [activeMetric, setActiveMetric] = useState<string>("reach");
  const [isMitigationModalOpen, setIsMitigationModalOpen] = useState<boolean>(false);
  const [presentationMode, setPresentationMode] = useState<boolean>(false);
  const [showExportToast, setShowExportToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "loading">("success");

  // Trigger export flow
  const handleExport = () => {
    setToastType("loading");
    setToastMessage("Consolidando dados auditados e gerando PDF Executivo...");
    setShowExportToast(true);

    setTimeout(() => {
      setToastType("success");
      setToastMessage("Relatório Executivo H1 2026 exportado com sucesso em formato PDF!");
      setTimeout(() => {
        setShowExportToast(false);
      }, 4000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col selection:bg-red-150 selection:text-ifood font-sans text-slate-800 antialiased overflow-x-hidden">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 h-[350px] w-[350px] rounded-full bg-red-500/3 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-slate-500/2 blur-[140px] pointer-events-none" />

      {/* Corporate Header */}
      <Header
        onExport={handleExport}
        presentationMode={presentationMode}
        setPresentationMode={setPresentationMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 relative z-10">
        
        {/* Presentation Mode Warning Banner */}
        {presentationMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between text-xs font-semibold shadow-md"
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-ifood" />
              <span>
                <b>Modo Executivo Ativo</b>: Ocultando painéis operacionais secundários para maior clareza em reuniões de diretoria.
              </span>
            </div>
            <button
              onClick={() => setPresentationMode(false)}
              className="cursor-pointer text-[10px] uppercase font-bold text-slate-400 hover:text-white"
            >
              Desativar
            </button>
          </motion.div>
        )}

        {/* Dashboard Title & Quick Meta Info */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              iFood Corporate Relations & Branding
            </span>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Fechamento do 1º Semestre de 2026
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Consolidado de mídias digitais, taxas de engajamento global e análise preventiva de crises institucionais.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white border border-slate-100 rounded-xl p-3 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Dados Auditados: <b>Julho 2026</b></span>
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. Big Numbers Summary cards (Full Width) */}
          <div className="lg:col-span-3">
            <BigNumbers activeMetric={activeMetric} setActiveMetric={setActiveMetric} />
          </div>

          {/* 2. Interactive SVG Trend Chart (col-span-2) */}
          <div className="lg:col-span-2">
            <TrendChart activeMetric={activeMetric} setActiveMetric={setActiveMetric} />
          </div>

          {/* 3. Crisis Management Monitor & Simulator (col-span-1) */}
          <div className="lg:col-span-1">
            <CrisisControl onOpenModal={() => setIsMitigationModalOpen(true)} />
          </div>

          {/* 4. Tabbed Highlights per Channel (col-span-2) */}
          <div className="lg:col-span-2">
            <NetworkHighlights />
          </div>

          {/* 5. Executive Strategic Insights (col-span-1) */}
          <div className="lg:col-span-1">
            <ExecutiveInsights />
          </div>
        </div>

        {/* Custom Presentation Mode Focus Area */}
        {presentationMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden mb-8 shadow-xl"
          >
            {/* Soft backdrop glow */}
            <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />
            
            <span className="text-[10px] font-bold text-ifood uppercase tracking-widest block mb-1">
              Foco Estratégico H1
            </span>
            <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight mb-4">
              Síntese Executiva para o Conselho de Administração
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed font-medium">
              <div className="space-y-2 border-l-2 border-slate-700 pl-4">
                <h4 className="font-bold text-white text-sm">Resiliência Operacional</h4>
                <p>
                  Mesmo diante de flutuações operacionais detectadas na entrega de parceiros, as taxas de reputação mantiveram-se blindadas com SLA médio de 8 minutos.
                </p>
              </div>
              <div className="space-y-2 border-l-2 border-slate-700 pl-4">
                <h4 className="font-bold text-white text-sm">Eficiência em Mídia</h4>
                <p>
                  Abril registrou pico histórico de eficiência com 4,27% de engajamento médio global, corroborando a tese de otimização de bids automáticos.
                </p>
              </div>
              <div className="space-y-2 border-l-2 border-slate-700 pl-4">
                <h4 className="font-bold text-white text-sm">Próximos Passos (H2)</h4>
                <p>
                  Expandir parcerias com micro-influenciadores locais para amortecer ruídos logísticos regionais e focar na distribuição nativa via Reels e TikTok.
                </p>
              </div>
            </div>
          </motion.div>
        )}

      </main>

      {/* Modern Dashboard Footer */}
      <footer className="w-full bg-white border-t border-slate-100 py-8 px-6 mt-12 text-center text-xs text-slate-400 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-display font-black text-slate-900 tracking-tight">iFood</span>
            <span className="h-4 w-[1px] bg-slate-200" />
            <span>Executive Report Panel © 2026</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-slate-400">
            <a href="#" className="hover:text-ifood transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-ifood transition-colors">Privacidade</a>
            <a href="#" className="hover:text-ifood transition-colors">Suporte PR</a>
          </div>
        </div>
      </footer>

      {/* Mitigation details modal */}
      <MitigationModal
        isOpen={isMitigationModalOpen}
        onClose={() => setIsMitigationModalOpen(false)}
      />

      {/* Dynamic Toast Notification for Report Export */}
      <AnimatePresence>
        {showExportToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl p-4 shadow-2xl flex items-start gap-3 border border-slate-800"
          >
            {toastType === "loading" ? (
              <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-ifood animate-spin shrink-0 mt-0.5" />
            ) : (
              <div className="h-5 w-5 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white">
                <Check className="h-3 w-3" />
              </div>
            )}
            
            <div className="flex-1">
              <h4 className="text-xs font-bold">Relatório Executivo</h4>
              <p className="text-[11px] text-slate-300 font-medium mt-1 leading-relaxed">
                {toastMessage}
              </p>
            </div>

            <button
              onClick={() => setShowExportToast(false)}
              className="cursor-pointer text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
