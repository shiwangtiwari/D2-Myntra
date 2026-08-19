"use client";

import { useState } from "react";
import { ClassifiedItem, ThemeSummary, getThemeLabel } from "@/lib/data";

interface Props {
  items: ClassifiedItem[];
  summary: ThemeSummary[];
  colors: Record<string, string>;
}

const SOURCE_LABELS: Record<string, string> = {
  playstore: "Play Store",
  appstore: "App Store",
  reddit: "Reddit",
  youtube: "YouTube",
};

export default function ItemExplorer({ items, summary, colors }: Props) {
  const [activeTheme, setActiveTheme] = useState<string>("all");
  const [activeConfidence, setActiveConfidence] = useState<string>("all");
  const [page, setPage] = useState(0);

  const PAGE_SIZE = 15;

  const filtered = items.filter((item) => {
    if (item.theme === "irrelevant") return false;
    if (activeTheme !== "all" && item.theme !== activeTheme) return false;
    if (activeConfidence !== "all" && item.confidence !== activeConfidence) return false;
    return true;
  });

  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  function handleTheme(t: string) {
    setActiveTheme(t);
    setPage(0);
  }

  if (items.length === 0) {
    return (
      <div style={{ padding: "40px 0", textAlign: "center", color: "var(--ink-light)", fontSize: 15 }}>
        No signals loaded. Run the pipeline first.
      </div>
    );
  }

  return (
    <div>
      {/* Theme filter pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        <button
          onClick={() => handleTheme("all")}
          style={{
            padding: "6px 14px",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 500,
            background: activeTheme === "all" ? "var(--ink)" : "var(--border)",
            color: activeTheme === "all" ? "#fff" : "var(--ink)",
            border: "none",
            cursor: "pointer",
          }}
        >
          All themes ({items.filter(i => i.theme !== "irrelevant").length})
        </button>
        {summary.map((s) => (
          <button
            key={s.theme}
            onClick={() => handleTheme(s.theme)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 500,
              background: activeTheme === s.theme ? (colors[s.theme] || "#888") : "var(--border)",
              color: activeTheme === s.theme ? "#fff" : "var(--ink)",
              border: "none",
              cursor: "pointer",
            }}
          >
            {getThemeLabel(s.theme)} ({s.count})
          </button>
        ))}
      </div>

      {/* Confidence filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["all", "high", "medium", "low"].map((c) => (
          <button
            key={c}
            onClick={() => { setActiveConfidence(c); setPage(0); }}
            style={{
              padding: "4px 12px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              background: activeConfidence === c ? "var(--ink-mid)" : "transparent",
              color: activeConfidence === c ? "#fff" : "var(--ink-light)",
              border: "1px solid var(--border)",
              cursor: "pointer",
            }}
          >
            {c === "all" ? "All confidence" : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-light)", lineHeight: "28px" }}>
          {filtered.length} signals
        </span>
      </div>

      {/* Item list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {paginated.map((item) => {
          const color = colors[item.theme] || "#888";
          return (
            <div key={item.id} style={{
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "14px 16px",
              borderLeft: `3px solid ${color}`,
            }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{
                  background: color + "22",
                  color: color,
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 600,
                }}>
                  {getThemeLabel(item.theme)}
                </span>
                <span style={{
                  background: "var(--border)",
                  color: "var(--ink-light)",
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontSize: 12,
                }}>
                  {SOURCE_LABELS[item.source] || item.source}
                </span>
                <span style={{
                  background: item.confidence === "high" ? "#ECFDF5" : item.confidence === "medium" ? "#FFF8F0" : "#FFF1F1",
                  color: item.confidence === "high" ? "#065F46" : item.confidence === "medium" ? "#92400E" : "#991B1B",
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontSize: 12,
                }}>
                  {item.confidence} confidence
                </span>
              </div>
              <p style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.6, marginBottom: 6 }}>
                {item.text.slice(0, 300)}{item.text.length > 300 ? "..." : ""}
              </p>
              {item.signal && item.signal !== "parse_error" && item.signal !== "api_error" && (
                <div style={{ fontSize: 13, color: "var(--ink-light)" }}>
                  Key signal: <em style={{ color: "var(--ink-mid)" }}>"{item.signal}"</em>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            style={{
              padding: "8px 16px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: "var(--white)",
              color: page === 0 ? "var(--ink-light)" : "var(--ink)",
              cursor: page === 0 ? "default" : "pointer",
              fontSize: 14,
            }}
          >
            Previous
          </button>
          <span style={{ lineHeight: "36px", fontSize: 14, color: "var(--ink-light)" }}>
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            style={{
              padding: "8px 16px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: "var(--white)",
              color: page >= totalPages - 1 ? "var(--ink-light)" : "var(--ink)",
              cursor: page >= totalPages - 1 ? "default" : "pointer",
              fontSize: 14,
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
