import fs from "fs";
import path from "path";

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
  classifiedAt: string;
}

export interface DashboardData {
  meta: PipelineMeta;
  summary: ThemeSummary[];
  items: ClassifiedItem[];
  validationRate?: number;
}

const THEME_LABELS: Record<string, string> = {
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

export function loadDashboardData(): DashboardData {
  const dataPath = path.resolve(process.cwd(), "..", "data", "classified.json");

  if (!fs.existsSync(dataPath)) {
    return getMockData();
  }

  try {
    const raw = fs.readFileSync(dataPath, "utf-8");
    const parsed = JSON.parse(raw);

    let validationRate: number | undefined;
    const validationPath = path.resolve(process.cwd(), "..", "data", "validation_report.json");
    if (fs.existsSync(validationPath)) {
      const vRaw = fs.readFileSync(validationPath, "utf-8");
      const vParsed = JSON.parse(vRaw);
      validationRate = vParsed.agreementRate;
    }

    return { ...parsed, validationRate };
  } catch (err) {
    console.error("Failed to load classified.json:", err);
    return getMockData();
  }
}

function getMockData(): DashboardData {
  return {
    meta: {
      total: 0,
      relevant: 0,
      irrelevant: 0,
      classifiedAt: new Date().toISOString(),
    },
    summary: [],
    items: [],
  };
}
