/**
 * Types and interfaces for the iFood H1 2026 Executive Dashboard
 */

export interface MonthlyMetric {
  monthName: string;
  reach: number;
  interactions: number;
  posts: number;
  engagementRate: number; // e.g. 3.01 for 3.01%
}

export interface PostHighlight {
  date: string;
  title: string;
  metricLabel: string;
  metricValue: string;
  reach?: number;
  interactions?: number;
  status: "Impulsionado" | "Orgânico";
  type: "engagement" | "volume";
  description: string;
  image?: string;
}

export interface SocialMediaData {
  id: string;
  name: string;
  icon: string;
  topEngagement: PostHighlight;
  topVolume: PostHighlight;
  summary: string;
}

export interface CrisisDetail {
  topic: string;
  description: string;
  status: "Monitorado" | "Mitigado" | "Sob Controle";
  sentiment: "Negativo" | "Neutro" | "Positivo";
  volume: string;
}

export interface CrisisManagement {
  context: string;
  detectedIssues: CrisisDetail[];
  strategicResponse: {
    title: string;
    description: string;
    actions: string[];
  };
}

export interface ExecutiveInsight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "Conversão" | "Conteúdo" | "Mídia Paga" | "Reputação";
}
