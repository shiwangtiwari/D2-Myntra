"use client";
import { useState } from "react";
import { ClassifiedItem, ThemeSummary, getThemeLabel } from "@/lib/data";

interface Props {
  items: ClassifiedItem[];
  summary: ThemeSummary[];
  colors: Record<string, string>;
}

const SOURCE_LABELS: Record<string, string> = {
  playstore: "Play Store (EN)",
  reddit:    "Regional",
  youtube:   "YouTube",
};

const CONF_COLORS: Record<string, string> = {
  high:   "#34A853",
  medium: "#FF8C00",
  low:    "#94969F",
};

const PAGE_SIZE = 12;

export default function ItemExplorer({ items, summary, colors }: Props) {
  const [activeTheme, setActiveTheme] = useState("all");
  const [page, setPage] = useState(0);

  const filtered = items.filter(item => {
    if (item.theme === "irrelevant") return false;
    if (activeTheme !== "all" && item.theme !== activeTheme) return false;
    return true;
  });

  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  function setTheme(t: string) {
    setActiveTheme(t);
    setPage(0);
  }

  if (!items?.length) {
    return <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>No signals loaded.</div>;
  }

  return (
    <div>
      {/* Filter pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        <button
          onClick={() => setTheme("all")}
          className={`pill-tab ${activeTheme === "all" ? "active" : ""}`}
        >
          All ({items.filter(i => i.theme !== "irrelevant").length})
        </button>
        {summary.map(s => (
          <button
            key={s.theme}
            onClick={() => setTheme(s.theme)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: activeTheme === s.theme ? (colors[s.theme] || "#94969F") : "var(--myntra-grey-light)",
              color: activeTheme === s.theme ? "white" : "var(--text-secondary)",
            }}
          >
            {getThemeLabel(s.theme)} ({s.count})
          </button>
        ))}
      </div>

      {/* Count */}
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>
        Showing {filtered.length} signals
      </div>

      {/* Signal cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {paginated.map(item => {
          const color = colors[item.theme] || "#94969F";
          return (
            <div key={item.id} style={{
              border: "1px solid var(--border)",
              borderLeft: `3px solid ${color}`,
              borderRadius: "var(--radius-sm)",
              padding: "12px 14px",
              background: "var(--surface)",
            }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{
                  background: color + "18",
                  color: color,
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 700,
                }}>
                  {getThemeLabel(item.theme)}
                </span>
                <span style={{
                  background: "var(--myntra-grey-light)",
                  color: "var(--text-secondary)",
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontSize: 11,
                }}>
                  {SOURCE_LABELS[item.source] || item.source}
                </span>
                {item.confidence && (
                  <span style={{
                    color: CONF_COLORS[item.confidence] || "#94969F",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "2px 6px",
                  }}>
                    {item.confidence} confidence
                  </span>
                )}
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 4 }}>
                {item.text?.slice(0, 280)}{(item.text?.length || 0) > 280 ? "..." : ""}
              </p>
              {item.signal && !["parse_error","api_error","not_found"].includes(item.signal) && (
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  Key signal: <em style={{ color: "var(--text-secondary)" }}>&ldquo;{item.signal}&rdquo;</em>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20, alignItems: "center" }}>
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            style={{
              padding: "8px 16px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: page === 0 ? "var(--myntra-grey-light)" : "var(--myntra-pink)",
              color: page === 0 ? "var(--text-muted)" : "white",
              cursor: page === 0 ? "default" : "pointer",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            ← Previous
          </button>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            style={{
              padding: "8px 16px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: page >= totalPages - 1 ? "var(--myntra-grey-light)" : "var(--myntra-pink)",
              color: page >= totalPages - 1 ? "var(--text-muted)" : "white",
              cursor: page >= totalPages - 1 ? "default" : "pointer",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
