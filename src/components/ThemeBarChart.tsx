"use client";
import { getThemeLabel, ThemeSummary } from "@/lib/data";

interface Props { summary: ThemeSummary[]; colors: Record<string, string>; }

export default function ThemeBarChart({ summary, colors }: Props) {
  if (!summary?.length) {
    return <div style={{ padding: 32, textAlign: "center", color: "var(--grey-mid)", fontSize: 13 }}>No data loaded.</div>;
  }
  const maxPct = summary[0]?.pct || 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {summary.map((row, i) => {
        const color = colors[row.theme] || "#94969F";
        const isTop = i < 3;
        return (
          <div key={row.theme}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 12, fontWeight: isTop ? 700 : 500, color: "var(--charcoal)", lineHeight: 1.3 }}>
                {getThemeLabel(row.theme)}
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: isTop ? color : "var(--grey-mid)", minWidth: 38, textAlign: "right", flexShrink: 0 }}>
                {row.pct}%
              </span>
              <span style={{ fontSize: 11, color: "var(--grey-mid)", minWidth: 44, textAlign: "right", flexShrink: 0 }}>
                n={row.count}
              </span>
            </div>
            <div style={{ height: isTop ? 7 : 5, background: "var(--bg)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${(row.pct / maxPct) * 100}%`, height: "100%", background: color, borderRadius: 3 }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
