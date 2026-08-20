"use client";
import { useState } from "react";
import { ClassifiedItem, ThemeSummary, getThemeLabel } from "@/lib/data";

interface Props { items: ClassifiedItem[]; summary: ThemeSummary[]; colors: Record<string, string>; }

const SRC: Record<string, string> = { playstore: "Play Store", reddit: "Regional", youtube: "YouTube" };
const PAGE = 10;

export default function ItemExplorer({ items, summary, colors }: Props) {
  const [theme, setTheme] = useState("all");
  const [page, setPage] = useState(0);

  const filtered = items.filter(i => i.theme !== "irrelevant" && (theme === "all" || i.theme === theme));
  const paged = filtered.slice(page * PAGE, (page + 1) * PAGE);
  const totalPages = Math.ceil(filtered.length / PAGE);

  if (!items?.length) return <div style={{ padding: 32, textAlign: "center", color: "var(--grey-mid)" }}>No signals.</div>;

  return (
    <div>
      {/* Filter pills — horizontal scroll on mobile */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 4 }}>
        <button onClick={() => { setTheme("all"); setPage(0); }}
          className={`pill ${theme === "all" ? "active" : ""}`}
          style={{ flexShrink: 0 }}>
          All ({items.filter(i => i.theme !== "irrelevant").length})
        </button>
        {summary.map(s => (
          <button key={s.theme} onClick={() => { setTheme(s.theme); setPage(0); }}
            style={{
              padding: "5px 12px", borderRadius: 14, fontSize: 12, fontWeight: 600, flexShrink: 0,
              border: `1px solid ${theme === s.theme ? colors[s.theme] || "#94969F" : "var(--border)"}`,
              background: theme === s.theme ? (colors[s.theme] || "#94969F") : "var(--surface)",
              color: theme === s.theme ? "white" : "var(--grey-dark)", cursor: "pointer",
            }}>
            {getThemeLabel(s.theme)} ({s.count})
          </button>
        ))}
      </div>

      <div style={{ fontSize: 12, color: "var(--grey-mid)", marginBottom: 10 }}>{filtered.length} signals</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {paged.map(item => {
          const color = colors[item.theme] || "#94969F";
          return (
            <div key={item.id} style={{
              border: "1px solid var(--border)", borderLeft: `3px solid ${color}`,
              borderRadius: "var(--radius-xs)", padding: "10px 12px", background: "var(--surface)",
            }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                <span style={{ background: color + "15", color, padding: "1px 7px", borderRadius: "var(--radius-xs)", fontSize: 11, fontWeight: 700 }}>
                  {getThemeLabel(item.theme)}
                </span>
                <span style={{ background: "var(--bg)", color: "var(--grey-mid)", padding: "1px 7px", borderRadius: "var(--radius-xs)", fontSize: 11 }}>
                  {SRC[item.source] || item.source}
                </span>
              </div>
              <p style={{ fontSize: 12, color: "var(--grey-dark)", lineHeight: 1.6, marginBottom: item.signal ? 4 : 0 }}>
                {item.text?.slice(0, 240)}{(item.text?.length || 0) > 240 ? "..." : ""}
              </p>
              {item.signal && !["parse_error","api_error","not_found"].includes(item.signal) && (
                <div style={{ fontSize: 11, color: "var(--grey-mid)" }}>
                  Signal: <em style={{ color: "var(--grey-dark)" }}>&ldquo;{item.signal}&rdquo;</em>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16, alignItems: "center" }}>
          <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}
            style={{
              padding: "7px 14px", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 600,
              border: "1px solid var(--border)",
              background: page === 0 ? "var(--bg)" : "var(--surface)",
              color: page === 0 ? "var(--grey-mid)" : "var(--charcoal)", cursor: page === 0 ? "default" : "pointer",
            }}>← Prev</button>
          <span style={{ fontSize: 13, color: "var(--grey-mid)" }}>{page + 1} / {totalPages}</span>
          <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1}
            style={{
              padding: "7px 14px", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 600,
              border: `1px solid var(--pink)`,
              background: page >= totalPages - 1 ? "var(--bg)" : "var(--pink)",
              color: page >= totalPages - 1 ? "var(--grey-mid)" : "white",
              cursor: page >= totalPages - 1 ? "default" : "pointer",
            }}>Next →</button>
        </div>
      )}
    </div>
  );
}
