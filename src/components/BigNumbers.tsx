import React from "react";
import { motion } from "motion/react";
import { FileText, Users, Heart, Percent, TrendingUp } from "lucide-react";
import { bigNumbers } from "../data";

interface BigNumbersProps {
  activeMetric: string;
  setActiveMetric: (metric: string) => void;
}

export default function BigNumbers({ activeMetric, setActiveMetric }: BigNumbersProps) {
  // Map standard metric IDs to matching lucide icons
  const getIcon = (id: string, colorClass: string) => {
    switch (id) {
      case "publications":
        return <FileText className={`h-5 w-5 ${colorClass}`} />;
      case "reach":
        return <Users className={`h-5 w-5 ${colorClass}`} />;
      case "interactions":
        return <Heart className={`h-5 w-5 ${colorClass}`} />;
      case "engagement":
        return <Percent className={`h-5 w-5 ${colorClass}`} />;
      default:
        return <TrendingUp className={`h-5 w-5 ${colorClass}`} />;
    }
  };

  // Map metric ID to chart filter keys
  const metricMapping: { [key: string]: string } = {
    publications: "posts",
    reach: "reach",
    interactions: "interactions",
    engagement: "engagementRate",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {bigNumbers.map((item, index) => {
        const isSelected = metricMapping[item.id] === activeMetric;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            onClick={() => setActiveMetric(metricMapping[item.id])}
            className={`cursor-pointer relative overflow-hidden rounded-xl p-5 transition-all duration-300 ${
              isSelected
                ? "bg-white border-2 border-ifood shadow-sm"
                : "bg-white border border-slate-200 hover:border-red-200 shadow-xs hover:shadow-sm"
            }`}
          >
            {/* Soft decorative background glow for selected card */}
            {isSelected && (
              <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-red-500/5 blur-lg pointer-events-none" />
            )}

            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                isSelected ? "text-ifood" : "text-slate-400"
              }`}>
                {item.label}
              </span>
              <div className={`p-2 rounded-lg transition-colors duration-200 ${
                isSelected ? "bg-red-50" : "bg-slate-50"
              }`}>
                {getIcon(item.id, isSelected ? "text-ifood" : "text-slate-500")}
              </div>
            </div>

            <div className="flex items-baseline gap-1 mb-0.5">
              <span className="font-display text-2xl font-bold text-slate-800 tracking-tight">
                {item.value}
              </span>
              <span className="text-[10px] font-medium text-slate-400">{item.suffix}</span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 font-medium leading-normal">
                {item.description}
              </p>
            </div>

            {/* Bottom active line bar */}
            {isSelected && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-ifood" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
