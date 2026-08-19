"use client";
import { getThemeLabel, ThemeSummary } from "@/lib/data";

interface Props {
  summary: ThemeSummary[];
  colors: Record<string, string>;
}

export default function ThemeBarChart({ summary, colors }: Props) {
  if (!summary?.length) {
    return (
      <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-muted)", fontSize: 14 }}>
        No data yet. Run the classifier to populate this dashboard.
      </div>
    );
  }

  const maxPct = summary[0]?.pct || 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {summary.map((row, i) => {
        const color = colors[row.theme] || "#94969F";
        const barWidth = (row.pct / maxPct) * 100;
        const isTop3 = i < 3;

        return (
          <div key={row.theme}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: color,
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: 13,
                fontWeight: isTop3 ? 700 : 500,
                color: isTop3 ? "var(--text-primary)" : "var(--text-secondary)",
                flex: 1,
              }}>
                {getThemeLabel(row.theme)}
              </span>
              <span style={{
                fontSize: 13,
                fontWeight: 700,
                color: isTop3 ? color : "var(--text-muted)",
                minWidth: 48,
                textAlign: "right",
              }}>
                {row.pct}%
              </span>
              <span style={{
                fontSize: 11,
                color: "var(--text-muted)",
                minWidth: 52,
                textAlign: "right",
              }}>
                n={row.count}
              </span>
            </div>
            <div style={{
              height: isTop3 ? 8 : 6,
              background: "var(--myntra-grey-light)",
              borderRadius: 4,
              overflow: "hidden",
            }}>
              <div style={{
                width: `${barWidth}%`,
                height: "100%",
                background: color,
                borderRadius: 4,
                transition: "width 0.6s ease",
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
