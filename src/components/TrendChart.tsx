import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Award, Zap, HelpCircle, Eye, MousePointer } from "lucide-react";
import { monthlyData } from "../data";
import { MonthlyMetric } from "../types";

interface TrendChartProps {
  activeMetric: string;
  setActiveMetric: (metric: string) => void;
}

export default function TrendChart({ activeMetric, setActiveMetric }: TrendChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(4); // Default to Maio/Abril to show active state on load
  
  // Format numbers to Portuguese standard (e.g. 1.234.567 or 12.34%)
  const formatValue = (val: number, metric: string) => {
    if (metric === "engagementRate") {
      return `${val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
    }
    return val.toLocaleString("pt-BR");
  };

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case "reach":
        return "Alcance (Visualizações)";
      case "interactions":
        return "Interações";
      case "posts":
        return "Publicações (Posts)";
      case "engagementRate":
        return "Taxa de Engajamento";
      default:
        return "";
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "reach":
        return <Eye className="h-4 w-4 text-ifood" />;
      case "interactions":
        return <TrendingUp className="h-4 w-4 text-ifood" />;
      default:
        return null;
    }
  };

  // Dimensions for SVG Coordinate Space
  const svgWidth = 720;
  const svgHeight = 260;
  const paddingX = 50;
  const paddingY = 30;

  // Key configurations
  const metricKey = activeMetric as keyof MonthlyMetric;
  const dataPoints = monthlyData.map((d) => d[metricKey] as number);
  const maxVal = Math.max(...dataPoints, 1);
  const minVal = 0; // standard baseline for clean bars/lines

  // Math to map data values to SVG pixels
  const getX = (index: number) => {
    const usableWidth = svgWidth - paddingX * 2;
    return paddingX + (index * usableWidth) / (monthlyData.length - 1);
  };

  const getY = (val: number) => {
    const usableHeight = svgHeight - paddingY * 2;
    const valueRatio = maxVal === 0 ? 0 : (val - minVal) / (maxVal - minVal);
    // SVG 0,0 is top-left, so we subtract from height
    return svgHeight - paddingY - valueRatio * usableHeight;
  };

  // Generate SVG path for the area gradient and the stroke line
  let linePath = "";
  let areaPath = "";

  monthlyData.forEach((d, i) => {
    const x = getX(i);
    const y = getY(d[metricKey] as number);

    if (i === 0) {
      linePath = `M ${x} ${y}`;
      areaPath = `M ${x} ${svgHeight - paddingY} L ${x} ${y}`;
    } else {
      // Create a smooth curve (curveto) instead of harsh lines for a premium aesthetic
      const prevX = getX(i - 1);
      const prevY = getY(monthlyData[i - 1][metricKey] as number);
      const cpX1 = prevX + (x - prevX) / 2;
      const cpY1 = prevY;
      const cpX2 = prevX + (x - prevX) / 2;
      const cpY2 = y;
      
      linePath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
      areaPath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
    }

    if (i === monthlyData.length - 1) {
      areaPath += ` L ${x} ${svgHeight - paddingY} Z`;
    }
  });

  // Highlight points
  const getPointAnnotation = (month: string) => {
    if (month === "Março") {
      return {
        label: "Pico de Visibilidade",
        desc: "24 posts impulsionaram o alcance para 844K+",
        color: "bg-red-500",
        icon: <Award className="h-3 w-3 text-white" />,
      };
    }
    if (month === "Abril") {
      return {
        label: "Pico de Eficiência",
        desc: "Engajamento recorde de 4,27%",
        color: "bg-emerald-500",
        icon: <Zap className="h-3 w-3 text-white" />,
      };
    }
    return null;
  };

  const metricSelectors = [
    { key: "reach", label: "Alcance", desc: "Volume de público" },
    { key: "interactions", label: "Interações", desc: "Ações de engajamento" },
    { key: "posts", label: "Posts", desc: "Produção editorial" },
    { key: "engagementRate", label: "Engajamento", desc: "Eficiência do feed" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-red-100 transition-colors h-full flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-ifood">
            Análise Temporal H1 2026
          </span>
          <h3 className="font-display text-base font-bold text-slate-800 mt-0.5">
            Métricas Evolutivas Mensais
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">
            Selecione uma métrica para analisar de Janeiro a Junho.
          </p>
        </div>

        {/* Dynamic selectors style pill */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
          {metricSelectors.map((item) => {
            const isSelected = activeMetric === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveMetric(item.key)}
                className={`cursor-pointer px-2.5 py-1 rounded text-[10px] font-bold transition-all duration-300 ${
                  isSelected
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200/50"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* SVG Chart Area */}
        <div className="xl:col-span-2 flex flex-col justify-between">
          <div className="relative w-full overflow-x-auto pb-2 scrollbar-none">
            {/* The responsive wrapper */}
            <div className="min-w-[640px] h-[260px] relative">
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                preserveAspectRatio="none"
                className="overflow-visible"
              >
                <defs>
                  {/* Elegant Red Gradient for Area Chart */}
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EA1D2C" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#EA1D2C" stopOpacity="0.00" />
                  </linearGradient>
                  {/* Active highlight dot drop shadow */}
                  <filter id="dotShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#EA1D2C" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* Y-Axis Horizontal Grid Lines (5 partitions) */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                  const usableHeight = svgHeight - paddingY * 2;
                  const yVal = paddingY + ratio * usableHeight;
                  const labelVal = maxVal - ratio * (maxVal - minVal);

                  return (
                    <g key={i} className="opacity-40">
                      <line
                        x1={paddingX}
                        y1={yVal}
                        x2={svgWidth - paddingX}
                        y2={yVal}
                        stroke="#E2E8F0"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={paddingX - 10}
                        y={yVal + 3}
                        className="text-[10px] font-mono fill-slate-400 font-medium text-right"
                        textAnchor="end"
                      >
                        {formatValue(labelVal, activeMetric)}
                      </text>
                    </g>
                  );
                })}

                {/* X-Axis Horizontal Baseline */}
                <line
                  x1={paddingX}
                  y1={svgHeight - paddingY}
                  x2={svgWidth - paddingX}
                  y2={svgHeight - paddingY}
                  stroke="#CBD5E1"
                  strokeWidth="1"
                />

                {/* Gradient Fill under Curve */}
                <path d={areaPath} fill="url(#chartGradient)" />

                {/* Beautiful smooth curved stroke line */}
                <path d={linePath} fill="none" stroke="#EA1D2C" strokeWidth="2.5" />

                {/* Vertical hover guidance line */}
                {hoveredIndex !== null && (
                  <line
                    x1={getX(hoveredIndex)}
                    y1={paddingY}
                    x2={getX(hoveredIndex)}
                    y2={svgHeight - paddingY}
                    stroke="#EA1D2C"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    className="opacity-70"
                  />
                )}

                {/* Data point circles and click zones */}
                {monthlyData.map((d, i) => {
                  const x = getX(i);
                  const y = getY(d[metricKey] as number);
                  const isHovered = hoveredIndex === i;
                  const hasAnnotation = getPointAnnotation(d.monthName);

                  return (
                    <g key={i} className="cursor-pointer">
                      {/* Interactive click zone rectangle */}
                      <rect
                        x={x - 35}
                        y={paddingY}
                        width="70"
                        height={svgHeight - paddingY * 2}
                        fill="transparent"
                        onMouseEnter={() => setHoveredIndex(i)}
                      />

                      {/* Accent highlight rings */}
                      {hasAnnotation && (
                        <circle
                          cx={x}
                          cy={y}
                          r="9"
                          fill="none"
                          stroke={d.monthName === "Março" ? "#FCA5A5" : "#6EE7B7"}
                          strokeWidth="1.5"
                          className="animate-ping"
                          style={{ animationDuration: "3s" }}
                        />
                      )}

                      {/* Main Node Point */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? "6" : "4.5"}
                        fill={isHovered ? "#EA1D2C" : "white"}
                        stroke="#EA1D2C"
                        strokeWidth={isHovered ? "3" : "2"}
                        filter={isHovered ? "url(#dotShadow)" : ""}
                        className="transition-all duration-200"
                      />

                      {/* Month Text Label on X-Axis */}
                      <text
                        x={x}
                        y={svgHeight - paddingY + 18}
                        className={`text-[11px] font-semibold text-center ${
                          isHovered ? "fill-slate-900 font-bold" : "fill-slate-400"
                        }`}
                        textAnchor="middle"
                      >
                        {d.monthName}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2 bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-100 self-start text-[10px] font-semibold text-slate-500">
            <MousePointer className="h-3 w-3 text-slate-400" />
            <span>Passe o mouse sobre os pontos do gráfico para detalhar o mês</span>
          </div>
        </div>

        {/* Contextual Executive Panel */}
        <div className="bg-slate-50/50 rounded-xl border border-slate-200/60 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Métricas e Contexto
              </span>
              <span className="h-2 w-2 rounded-full bg-ifood animate-pulse" />
            </div>

            <AnimatePresence mode="wait">
              {hoveredIndex !== null ? (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-xs font-bold text-ifood bg-red-50 px-2 py-0.5 rounded-md">
                    {monthlyData[hoveredIndex].monthName}
                  </span>

                  {/* Highlight main selected metric */}
                  <div className="mt-4">
                    <span className="text-[10px] font-semibold text-slate-400">
                      {getMetricLabel(activeMetric)}
                    </span>
                    <div className="text-2xl font-extrabold text-slate-900 mt-0.5 font-display flex items-center gap-1">
                      {formatValue(monthlyData[hoveredIndex][metricKey] as number, activeMetric)}
                      {getMetricIcon(activeMetric)}
                    </div>
                  </div>

                  {/* Secondary stats */}
                  <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-200/50">
                    <div>
                      <span className="text-[9px] font-semibold text-slate-400 block uppercase">
                        Posts
                      </span>
                      <span className="text-sm font-bold text-slate-700">
                        {monthlyData[hoveredIndex].posts} {monthlyData[hoveredIndex].posts === 1 ? "post" : "posts"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-semibold text-slate-400 block uppercase">
                        Taxa de Engajamento
                      </span>
                      <span className="text-sm font-bold text-slate-700">
                        {monthlyData[hoveredIndex].engagementRate}%
                      </span>
                    </div>
                  </div>

                  {/* Custom strategic annotation */}
                  {getPointAnnotation(monthlyData[hoveredIndex].monthName) && (
                    <div className="mt-5 p-3 rounded-xl bg-white border border-slate-100 shadow-xs">
                      <div className="flex items-center gap-1.5">
                        <div className={`p-1 rounded-md ${
                          monthlyData[hoveredIndex].monthName === "Março" ? "bg-red-500" : "bg-emerald-500"
                        }`}>
                          {getPointAnnotation(monthlyData[hoveredIndex].monthName)?.icon}
                        </div>
                        <span className="text-[10px] font-bold text-slate-800">
                          {getPointAnnotation(monthlyData[hoveredIndex].monthName)?.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium mt-1.5 leading-relaxed">
                        {getPointAnnotation(monthlyData[hoveredIndex].monthName)?.desc}
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs font-medium">
                  Selecione um mês no gráfico para ver as métricas estratégicas.
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-[10px] font-medium text-slate-400 leading-relaxed">
            *Dados auditados e consolidados pela equipe de inteligência de mercado em 2026.
          </div>
        </div>
      </div>
    </div>
  );
}
