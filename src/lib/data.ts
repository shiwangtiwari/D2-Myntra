// Types only — no fs imports. Data is loaded via static JSON import in page.tsx.

export interface ClassifiedItem {
  id: string;
  source: string;
  text: string;
  theme: string;
  confidence: "high" | "medium" | "low";
  signal: string;
  score?: number;
  date?: string;
  subreddit?: string;
  model_used?: string;
}

export interface ThemeSummary {
  theme: string;
  count: number;
  pct: number;
}

export interface PipelineMeta {
  total: number;
  relevant: number;
  irrelevant: number;
  haikuClassified?: number;
  sonnetUpgraded?: number;
  classifiedAt: string;
}

export interface DashboardData {
  meta: PipelineMeta;
  summary: ThemeSummary[];
  items: ClassifiedItem[];
  validationRate?: number;
}

export const THEME_LABELS: Record<string, string> = {
  fit_size_uncertainty: "Fit & Size Uncertainty",
  style_occasion_doubt: "Style / Occasion Doubt",
  quality_authenticity_fear: "Quality & Authenticity Fear",
  wishlist_as_bookmarking: "Wishlist as Bookmarking",
  price_wait_behavior: "Price-Wait Behavior",
  social_validation_need: "Social Validation Need",
  comparison_paralysis: "Comparison Paralysis",
  return_policy_anxiety: "Return Policy Anxiety",
  missing_information: "Missing Information",
  habit_loop: "Habit Loop",
  irrelevant: "Irrelevant",
};

export function getThemeLabel(theme: string): string {
  return THEME_LABELS[theme] || theme;
}
