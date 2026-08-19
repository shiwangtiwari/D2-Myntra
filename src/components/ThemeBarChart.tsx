"use client";

import { getThemeLabel, ThemeSummary } from "@/lib/data";

interface Props {
  summary: ThemeSummary[];
  colors: Record<string, string>;
}

export default function ThemeBarChart({ summary, colors }: Props) {
  const maxPct = summary[0]?.pct || 1;

  if (summary.length === 0) {
    return (
      <div style={{ padding: "40px 0", textAlign: "center", color: "var(--ink-light)", fontSize: 15 }}>
        No data yet. Run the scraper and classifier to populate this dashboard.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {summary.map((row, i) => {
        const color = colors[row.theme] || "#888";
        const barWidth = (row.pct / maxPct) * 100;

        return (
          <div key={row.theme}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                background: color,
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 14, color: "var(--ink)", fontWeight: i < 3 ? 600 : 400, flex: 1 }}>
                {getThemeLabel(row.theme)}
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", minWidth: 50, textAlign: "right" }}>
                {row.pct}%
              </span>
              <span style={{ fontSize: 13, color: "var(--ink-light)", minWidth: 60, textAlign: "right" }}>
                n={row.count}
              </span>
            </div>
            <div style={{
              height: 10,
              background: "var(--border)",
              borderRadius: 5,
              overflow: "hidden",
            }}>
              <div style={{
                width: `${barWidth}%`,
                height: "100%",
                background: color,
                borderRadius: 5,
                transition: "width 0.6s ease",
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
