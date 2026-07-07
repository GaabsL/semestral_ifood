import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Instagram, Facebook, Video, Smartphone, Award, TrendingUp, Sparkles, ZoomIn, X } from "lucide-react";
import { socialMediaNetworks } from "../data";

export default function NetworkHighlights() {
  const [activeTabId, setActiveTabId] = useState("instagram-feed");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const activeNetwork = socialMediaNetworks.find((n) => n.id === activeTabId) || socialMediaNetworks[0];

  const getNetworkIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case "Instagram":
        return <Instagram className={className} />;
      case "Facebook":
        return <Facebook className={className} />;
      case "Video":
        return <Video className={className} />;
      case "Camera":
        return <Smartphone className={className} />;
      default:
        return <Instagram className={className} />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-red-100 transition-colors h-full flex flex-col justify-between">
      <div>
        {/* Section Title */}
        <div className="mb-4 pb-3 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-ifood">
              Destaques por Canal
            </span>
            <h2 className="font-display text-base font-bold text-slate-800 mt-0.5">
              Melhores Práticas e Posts Campeões
            </h2>
            <p className="text-[10px] text-slate-400 font-medium">
              Acompanhe as publicações de maior impacto e engajamento.
            </p>
          </div>
        </div>

        {/* Tabs navigation */}
        <div className="flex border-b border-slate-200 mb-4 overflow-x-auto scrollbar-none gap-1">
          {socialMediaNetworks.map((net) => {
            const isActive = net.id === activeTabId;
            return (
              <button
                key={net.id}
                onClick={() => setActiveTabId(net.id)}
                className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold whitespace-nowrap border-b-2 transition-all duration-300 ${
                  isActive
                    ? "border-ifood text-ifood font-bold bg-red-50/5"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                {getNetworkIcon(net.icon, `h-3.5 w-3.5 ${isActive ? "text-ifood" : "text-slate-400"}`)}
                <span>{net.name}</span>
              </button>
            );
          })}
        </div>

      {/* Tab Contents with Framer Motion animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTabId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {/* Summary Banner */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3.5 mb-4 flex items-start gap-2.5">
            <div className="p-1.5 rounded bg-white border border-slate-200/50 shadow-xs text-ifood shrink-0">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-800">Diretriz Estratégica do Canal</h4>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5 leading-relaxed">
                {activeNetwork.summary}
              </p>
            </div>
          </div>

          {/* Winner Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Top Engagement Card */}
            <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-4.5 flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-1 bg-red-50 text-ifood text-[9px] font-bold px-2 py-0.5 rounded-md">
                    <Award className="h-3 w-3" />
                    <span>Top Engajamento</span>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                    activeNetwork.topEngagement.status === "Impulsionado"
                      ? "bg-purple-50 text-purple-600 border border-purple-100"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  }`}>
                    {activeNetwork.topEngagement.status}
                  </span>
                </div>

                <span className="text-[9px] font-bold text-slate-400">
                  {activeNetwork.topEngagement.date}
                </span>
                <h3 className="font-display text-xs font-bold text-slate-800 mt-1 leading-snug">
                  {activeNetwork.topEngagement.title}
                </h3>
                <p className="text-[10px] text-slate-500 font-medium mt-2 leading-relaxed">
                  {activeNetwork.topEngagement.description}
                </p>
                {activeNetwork.topEngagement.image && (
                  <div
                    onClick={() => setSelectedImage(activeNetwork.topEngagement.image || null)}
                    className="group relative cursor-pointer aspect-video bg-white rounded-lg border border-slate-200 overflow-hidden mt-3 transition-all flex items-center justify-center max-h-[120px]"
                  >
                    <img
                      src={activeNetwork.topEngagement.image}
                      alt={activeNetwork.topEngagement.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="h-4 w-4 text-white opacity-90" />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/50">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-slate-900 tracking-tight font-display">
                    {activeNetwork.topEngagement.metricValue}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">
                    {activeNetwork.topEngagement.metricLabel}
                  </span>
                </div>

                {/* Secondary breakdown stats if present */}
                {(activeNetwork.topEngagement.reach || activeNetwork.topEngagement.interactions) && (
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-dashed border-slate-200/50">
                    {activeNetwork.topEngagement.reach && (
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase block">Alcance</span>
                        <span className="text-[10px] font-bold text-slate-600">
                          {activeNetwork.topEngagement.reach.toLocaleString("pt-BR")}
                        </span>
                      </div>
                    )}
                    {activeNetwork.topEngagement.interactions && (
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase block">Interações</span>
                        <span className="text-[10px] font-bold text-slate-600">
                          {activeNetwork.topEngagement.interactions.toLocaleString("pt-BR")}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Top Volume Card */}
            <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-4.5 flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-[9px] font-bold px-2 py-0.5 rounded-md">
                    <TrendingUp className="h-3 w-3" />
                    <span>Top Volume</span>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                    activeNetwork.topVolume.status === "Impulsionado"
                      ? "bg-purple-50 text-purple-600 border border-purple-100"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  }`}>
                    {activeNetwork.topVolume.status}
                  </span>
                </div>

                <span className="text-[9px] font-bold text-slate-400">
                  {activeNetwork.topVolume.date}
                </span>
                <h3 className="font-display text-xs font-bold text-slate-800 mt-1 leading-snug">
                  {activeNetwork.topVolume.title}
                </h3>
                <p className="text-[10px] text-slate-500 font-medium mt-2 leading-relaxed">
                  {activeNetwork.topVolume.description}
                </p>
                {activeNetwork.topVolume.image && (
                  <div
                    onClick={() => setSelectedImage(activeNetwork.topVolume.image || null)}
                    className="group relative cursor-pointer aspect-video bg-white rounded-lg border border-slate-200 overflow-hidden mt-3 transition-all flex items-center justify-center max-h-[120px]"
                  >
                    <img
                      src={activeNetwork.topVolume.image}
                      alt={activeNetwork.topVolume.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="h-4 w-4 text-white opacity-90" />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/50">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-slate-900 tracking-tight font-display">
                    {activeNetwork.topVolume.metricValue}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">
                    {activeNetwork.topVolume.metricLabel}
                  </span>
                </div>

                {/* Secondary breakdown stats if present */}
                {(activeNetwork.topVolume.reach || activeNetwork.topVolume.interactions) && (
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-dashed border-slate-200/50">
                    {activeNetwork.topVolume.reach && (
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase block">Alcance</span>
                        <span className="text-[10px] font-bold text-slate-600">
                          {activeNetwork.topVolume.reach.toLocaleString("pt-BR")}
                        </span>
                      </div>
                    )}
                    {activeNetwork.topVolume.interactions && (
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase block">Interações</span>
                        <span className="text-[10px] font-bold text-slate-600">
                          {activeNetwork.topVolume.interactions.toLocaleString("pt-BR")}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
      </div>

      {/* Lightbox Modal for Highlight Prints */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xs transition-all duration-300"
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
              alt="Print da Publicação"
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-inner bg-slate-900"
            />
            <div className="mt-2.5 text-center">
              <p className="text-[10px] text-slate-400 font-medium">
                Visualização do Print real da publicação selecionada
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
