import { getThemeLabel, DashboardData } from "@/lib/data";
import ThemeBarChart from "@/components/ThemeBarChart";
import ItemExplorer from "@/components/ItemExplorer";

import classifiedRaw from "../../classified.json";

// Myntra brand color per theme — color-blind safe
export const THEME_COLORS: Record<string, string> = {
  return_policy_anxiety:     "#0066CC",
  quality_authenticity_fear: "#FF3F6C",
  price_wait_behavior:       "#FF8C00",
  missing_information:       "#6B4EFF",
  comparison_paralysis:      "#00897B",
  fit_size_uncertainty:      "#1565C0",
  style_occasion_doubt:      "#AD1457",
  wishlist_as_bookmarking:   "#558B2F",
  social_validation_need:    "#E65100",
  habit_loop:                "#37474F",
};

const SOURCE_MAP: Record<string, { label: string; color: string }> = {
  playstore:         { label: "Play Store (English)",  color: "#34A853" },
  reddit:            { label: "Play Store (Regional)", color: "#1565C0" },
  youtube:           { label: "YouTube Comments",      color: "#FF3F6C" },
};

export default function Home() {
  const data = classifiedRaw as unknown as DashboardData;
  const { meta, summary = [], items = [] } = data;

  const relevantSummary = summary.filter(s => s.theme !== "irrelevant");
  const topTheme = relevantSummary[0];
  const total = meta?.total || 0;
  const relevant = meta?.relevant || 0;
  const irrelevant = meta?.irrelevant || 0;

  const classifiedAt = meta?.classifiedAt
    ? new Date(meta.classifiedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "—";

  const sourceCounts: Record<string, number> = {};
  for (const item of items) {
    if (item.source) sourceCounts[item.source] = (sourceCounts[item.source] || 0) + 1;
  }

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 60, background: "var(--bg)" }}>

      {/* ── MYNTRA HEADER ─────────────────────────────────────────────── */}
      <header style={{
        background: "var(--myntra-pink)",
        padding: "0",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 8px rgba(255,63,108,0.3)",
      }}>
        <div className="container" style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          height: 56,
        }}>
          {/* Myntra wordmark */}
          <div style={{
            color: "white",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: "-0.02em",
            fontStyle: "italic",
          }}>
            myntra
          </div>
          <div style={{
            width: 1,
            height: 24,
            background: "rgba(255,255,255,0.3)",
          }} />
          <div style={{ color: "white", fontSize: 13, fontWeight: 500, opacity: 0.9 }}>
            D2 — Wishlist Behavior Discovery Engine
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
              padding: "3px 10px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
            }}>LIVE</span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>
              {classifiedAt}
            </span>
          </div>
        </div>
      </header>

      {/* ── PINK HERO BAND ────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #FF3F6C 0%, #D4174A 100%)",
        padding: "32px 0 40px",
        marginBottom: -20,
      }}>
        <div className="container">
          <div style={{ marginBottom: 8 }}>
            <span style={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
              padding: "3px 10px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}>
              PART 1 OF 7 — AI DISCOVERY ENGINE
            </span>
          </div>
          <h1 style={{
            color: "white",
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 8,
            letterSpacing: "-0.02em",
          }}>
            Why do Myntra users save but not buy?
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, maxWidth: 560 }}>
            Multi-source AI analysis of 1,458 signals across Play Store reviews (English + 8 regional languages)
            and YouTube comments — classified into 10 behavioral barrier themes.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 40 }}>

        {/* ── STAT CARDS ──────────────────────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}>
          {[
            { n: total.toLocaleString("en-IN"), label: "Total signals", sub: "Play Store + YouTube" },
            { n: relevant.toLocaleString("en-IN"), label: "Relevant signals", sub: `${((relevant/total)*100||0).toFixed(1)}% of total` },
            { n: "10", label: "Barrier themes", sub: "Adversarially audited" },
            { n: "52%", label: "Inter-coder agreement", sub: "Disclosed — below 75% target", pink: false, warn: true },
          ].map((s, i) => (
            <div key={i} className="card" style={{ textAlign: "center", padding: "20px 16px" }}>
              <div className="stat-number" style={{ color: s.warn ? "#FF8C00" : "var(--myntra-pink)" }}>
                {s.n}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginTop: 4 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* ── KEY FINDING BANNER ──────────────────────────────────────── */}
        {topTheme && (
          <div className="card" style={{
            marginBottom: 20,
            background: "var(--myntra-pink-light)",
            border: "1.5px solid var(--myntra-pink)",
            padding: "20px 24px",
          }}>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div className="label" style={{ color: "var(--myntra-pink)", marginBottom: 6 }}>
                  Engine finding — hypothesis
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "var(--myntra-charcoal)", marginBottom: 6 }}>
                  {getThemeLabel(topTheme.theme)} ({topTheme.pct}%) is the dominant signal on Play Store
                </div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  Primary research (N=48 survey) re-ranked this: <strong>timing barrier (#1, 37.5%)</strong> and{" "}
                  <strong>comparison paralysis (#2, 17.5%)</strong> are the top stated reasons.
                  Engine finding treated as directional — validated and re-ranked by primary research.
                </div>
              </div>
              <div style={{
                background: "var(--myntra-pink)",
                borderRadius: 12,
                padding: "20px 28px",
                textAlign: "center",
                minWidth: 100,
                flexShrink: 0,
              }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: "white", lineHeight: 1 }}>
                  {topTheme.pct}%
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>
                  of signals
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TWO COL: THEME CHART + SOURCE COVERAGE ──────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 16, marginBottom: 20 }}>

          {/* Theme chart */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div className="h2" style={{ marginBottom: 4 }}>Theme frequency ranking</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {relevant} relevant signals · classified by primary behavioral barrier
                </div>
              </div>
              <span className="badge badge-grey">AI classified</span>
            </div>
            <ThemeBarChart summary={relevantSummary} colors={THEME_COLORS} />
          </div>

          {/* Source + validation */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Source coverage */}
            <div className="card" style={{ flex: 1 }}>
              <div className="h3" style={{ marginBottom: 16 }}>Source coverage</div>
              {[
                { src: "Play Store (English)", n: sourceCounts["playstore"] || 0, status: true },
                { src: "Play Store (Regional, 8 langs)", n: sourceCounts["reddit"] || 0, status: true },
                { src: "YouTube comments", n: sourceCounts["youtube"] || 0, status: true, note: "partly off-topic" },
                { src: "App Store", n: 0, status: false, note: "API deprecated 2024" },
                { src: "Reddit", n: 0, status: false, note: "HTTP 403 since 2023" },
                { src: "Fashion communities", n: 0, status: false, note: "No public API" },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom: i < 5 ? "1px solid var(--border)" : "none",
                }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: s.status ? "#34A853" : "#94969F",
                    width: 16,
                    flexShrink: 0,
                  }}>
                    {s.status ? "✓" : "✗"}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: s.status ? "var(--text-primary)" : "var(--text-muted)" }}>
                      {s.src}
                    </div>
                    {s.note && <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.note}</div>}
                  </div>
                  {s.status && s.n > 0 && (
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--myntra-pink)" }}>
                      {s.n.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Constraint callout */}
            <div className="card" style={{
              background: "#FFF8F0",
              border: "1.5px solid #FF8C00",
              padding: "14px 16px",
            }}>
              <div className="label" style={{ color: "#E65100", marginBottom: 6 }}>
                Hard constraint
              </div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                No monetary incentives — no discounts, price alerts, cashback, or coupons.
                Any solution relying on price is disqualified.
              </div>
            </div>
          </div>
        </div>

        {/* ── SURVEY VS ENGINE COMPARISON ─────────────────────────────── */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="h2" style={{ marginBottom: 4 }}>Engine vs primary research — verdict table</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>
            Engine findings tested against N=48 survey. Verdicts shown with delta.
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--myntra-grey-light)" }}>
                  {["Engine finding", "Engine rank", "Survey finding", "Survey rank", "Verdict"].map(h => (
                    <th key={h} style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      borderBottom: "2px solid var(--border)",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    finding: "Return policy anxiety",
                    engineRank: "#1 (52.7%)",
                    survey: "Background fear — 82.5% say returns influence decisions",
                    surveyRank: "Not #1 stated",
                    verdict: "Re-ranked ↓",
                    verdictColor: "#FF8C00",
                  },
                  {
                    finding: "Quality / photo fear",
                    engineRank: "#2 (24.5%)",
                    survey: "Confirmed — 45% received wrong item, 80% worried",
                    surveyRank: "#4 stated, #1 solution need",
                    verdict: "Confirmed ✓",
                    verdictColor: "#34A853",
                  },
                  {
                    finding: "Price-wait behavior",
                    engineRank: "#3 (9.9%)",
                    survey: "Re-ranked to #1 stated barrier (37.5%) — it is TIMING not price",
                    surveyRank: "#1 stated (37.5%)",
                    verdict: "Re-ranked ↑",
                    verdictColor: "#6B4EFF",
                  },
                  {
                    finding: "Comparison paralysis",
                    engineRank: "Weak (#5)",
                    survey: "Emerged — 17.5% stated, 32.5% compare on other apps",
                    surveyRank: "#2 stated (17.5%)",
                    verdict: "Surfaced ↑",
                    verdictColor: "#6B4EFF",
                  },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px", fontWeight: 600, fontSize: 13 }}>{row.finding}</td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{row.engineRank}</td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)", maxWidth: 240 }}>{row.survey}</td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{row.surveyRank}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{
                        background: row.verdictColor + "18",
                        color: row.verdictColor,
                        padding: "3px 8px",
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 700,
                      }}>{row.verdict}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{
            marginTop: 16,
            padding: "12px 16px",
            background: "var(--myntra-grey-light)",
            borderRadius: "var(--radius-sm)",
            fontSize: 12,
            color: "var(--text-secondary)",
            fontWeight: 600,
          }}>
            No AI-generated percentage entered the deck. Every stat is anchored to validated pipeline output or primary research (N=48 survey).
          </div>
        </div>

        {/* ── SIGNAL EXPLORER ─────────────────────────────────────────── */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="h2" style={{ marginBottom: 4 }}>Signal explorer</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>
            Browse classified signals by theme. Raw evidence behind each engine finding.
          </div>
          <ItemExplorer items={items} summary={relevantSummary} colors={THEME_COLORS} />
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
        <div style={{
          textAlign: "center",
          fontSize: 12,
          color: "var(--text-muted)",
          padding: "20px 0",
          borderTop: "1px solid var(--border)",
        }}>
          Myntra Wishlist-to-Purchase Conversion — D2 Discovery Engine &nbsp;·&nbsp;
          {total.toLocaleString("en-IN")} signals from Play Store (English + 8 regional languages) + YouTube &nbsp;·&nbsp;
          Inter-coder agreement: 52% (disclosed) &nbsp;·&nbsp;
          Validated against primary research N=48
        </div>
      </div>
    </main>
  );
}
