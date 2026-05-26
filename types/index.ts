export interface Lead {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message?: string;
  source: "hero" | "marketplace" | "cta" | "dashboard" | "contact" | "ai-agent";
  createdAt?: string;
}

export interface AutomationAssessment {
  process: string;
  product: string;
  weight: number;
  cadence: number;
  shifts: 1 | 2 | 3;
  budget: "low" | "medium" | "high" | "enterprise";
  modality: "raas" | "purchase" | "poc";
  hasVideo?: boolean;
  notes?: string;
}

export interface MarketplaceInquiry {
  solutionId: string;
  solutionName: string;
  company: string;
  email: string;
  modality: "raas_monthly" | "raas_annual" | "poc" | "purchase";
  notes?: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  company: string;
  message: string;
  urgency: "low" | "medium" | "high";
  phone?: string;
}

export interface PoCRequest {
  process: string;
  description: string;
  company: string;
  timeline: "1_month" | "3_months" | "6_months" | "flexible";
  contactEmail: string;
}

export interface MetricSnapshot {
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;
  trend: "up" | "down" | "flat";
}

export interface AssetStatus {
  id: string;
  name: string;
  type: string;
  status: "active" | "maintenance" | "idle" | "alert";
  uptimePercent: number;
  cyclesTotal: number;
  lastActivity: string;
}

export interface ServiceEvent {
  id: string;
  date: string;
  type: "installation" | "maintenance" | "upgrade" | "incident" | "optimization";
  description: string;
  technician?: string;
  resolved: boolean;
}

export interface SolutionCard {
  id: string;
  title: string;
  category: string;
  description: string;
  industries: string[];
  modalities: string[];
  components: string[];
  benefits: string[];
  icon: string;
  gradient: string;
}

export interface ProcessCard {
  id: string;
  title: string;
  problem: string;
  solution: string;
  benefit: string;
  icon: string;
}
