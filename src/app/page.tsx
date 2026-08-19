import { getThemeLabel, DashboardData } from "@/lib/data";
import ThemeBarChart from "@/components/ThemeBarChart";
import ItemExplorer from "@/components/ItemExplorer";
import classifiedRaw from "../../classified.json";

export const THEME_COLORS: Record<string, string> = {
  return_policy_anxiety:     "var(--c1)",
  quality_authenticity_fear: "var(--c2)",
  price_wait_behavior:       "var(--c3)",
  missing_information:       "var(--c4)",
  comparison_paralysis:      "var(--c5)",
  fit_size_uncertainty:      "var(--c6)",
  style_occasion_doubt:      "var(--c7)",
  wishlist_as_bookmarking:   "var(--c8)",
  social_validation_need:    "var(--c9)",
  habit_loop:                "var(--c10)",
};

// Hex values for client components that need real hex not CSS vars
export const THEME_HEX: Record<string, string> = {
  return_policy_anxiety:     "#1976D2",
  quality_authenticity_fear: "#7B1FA2",
  price_wait_behavior:       "#F57C00",
  missing_information:       "#0097A7",
  comparison_paralysis:      "#388E3C",
  fit_size_uncertainty:      "#303F9F",
  style_occasion_doubt:      "#C2185B",
  wishlist_as_bookmarking:   "#5D4037",
  social_validation_need:    "#E64A19",
  habit_loop:                "#455A64",
};

export default function Home() {
  const data = classifiedRaw as unknown as DashboardData;
  const { meta, summary = [], items = [] } = data;
  const relevantSummary = summary.filter(s => s.theme !== "irrelevant");
  const topTheme = relevantSummary[0];
  const total = meta?.total || 0;
  const relevant = meta?.relevant || 0;

  const classifiedAt = meta?.classifiedAt
    ? new Date(meta.classifiedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "—";

  const sourceCounts: Record<string, number> = {};
  for (const item of items) {
    if (item.source) sourceCounts[item.source] = (sourceCounts[item.source] || 0) + 1;
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* ── HEADER — clean white, pink logo only ── */}
      <header style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 1px 4px rgba(40,44,63,0.08)",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", height: 52, gap: 16 }}>
          {/* Myntra wordmark — pink italic, exact match */}
          <span style={{
            color: "var(--pink)",
            fontWeight: 800,
            fontSize: 20,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
            fontFamily: "Assistant, sans-serif",
          }}>myntra</span>
          <span style={{ width: 1, height: 18, background: "var(--border)" }} />
          <span style={{ fontSize: 13, color: "var(--grey-dark)", fontWeight: 500 }}>
            D2 — Wishlist Behavior Discovery Engine
          </span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            <span className="badge badge-green">Live</span>
            <span style={{ fontSize: 12, color: "var(--grey-mid)" }}>Updated {classifiedAt}</span>
          </div>
        </div>
      </header>

      {/* ── PAGE TITLE — white card, no pink background ── */}
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "20px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--pink)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                Part 1 of 7 · AI Discovery Engine
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--charcoal)", marginBottom: 6, letterSpacing: "-0.01em" }}>
                Why do Myntra users save but not buy?
              </h1>
              <p style={{ fontSize: 13, color: "var(--grey-dark)", maxWidth: 560, lineHeight: 1.6 }}>
                Multi-source AI analysis of {total.toLocaleString("en-IN")} signals — Play Store reviews (English + 8 regional languages)
                and YouTube comments — classified into 10 behavioral barrier themes.
              </p>
            </div>
            <div style={{ flexShrink: 0, textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "var(--grey-mid)", marginBottom: 4 }}>Survey: N=48 responses</div>
              <div style={{ fontSize: 11, color: "var(--grey-mid)" }}>Pipeline: {total.toLocaleString("en-IN")} signals classified</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 20, paddingBottom: 40 }}>

        {/* ── STAT ROW ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
          {[
            { n: total.toLocaleString("en-IN"), l: "Total signals", s: "Play Store + YouTube" },
            { n: relevant.toLocaleString("en-IN"), l: "Relevant signals", s: `${total ? ((relevant/total)*100).toFixed(1) : 0}% of total` },
            { n: "10", l: "Barrier themes", s: "Adversarially audited taxonomy" },
            { n: "52%", l: "Inter-coder agreement", s: "Disclosed — below 75% target", warn: true },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: "16px 18px" }}>
              <div className="stat-n" style={{ color: s.warn ? "var(--warning)" : "var(--charcoal)" }}>{s.n}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--charcoal)", marginTop: 4 }}>{s.l}</div>
              <div className="stat-l">{s.s}</div>
            </div>
          ))}
        </div>

        {/* ── KEY FINDING — thin pink left border, mostly white ── */}
        {topTheme && (
          <div className="card" style={{
            marginBottom: 16,
            borderLeft: "3px solid var(--pink)",
            padding: "16px 20px",
            display: "flex", alignItems: "center", gap: 20,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--pink)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                Engine finding · Hypothesis (validated by primary research)
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--charcoal)", marginBottom: 6 }}>
                {getThemeLabel(topTheme.theme)} is the dominant signal on Play Store ({topTheme.pct}%)
              </div>
              <div style={{ fontSize: 13, color: "var(--grey-dark)", lineHeight: 1.6 }}>
                Primary research (N=48) re-ranked: <strong>timing barrier</strong> is #1 stated reason (37.5%) and{" "}
                <strong>comparison paralysis</strong> is #2 (17.5%). Engine finding treated as directional — not definitive.
              </div>
            </div>
            <div style={{
              border: "2px solid var(--pink)",
              borderRadius: "var(--radius-sm)",
              padding: "12px 20px",
              textAlign: "center",
              flexShrink: 0,
            }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "var(--pink)", lineHeight: 1 }}>{topTheme.pct}%</div>
              <div style={{ fontSize: 11, color: "var(--grey-mid)", marginTop: 4 }}>of signals</div>
            </div>
          </div>
        )}

        {/* ── CONSTRAINT CALLOUT ── */}
        <div className="card" style={{
          marginBottom: 16,
          borderLeft: "3px solid var(--warning)",
          padding: "12px 20px",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--warning)", textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0 }}>
            Hard constraint
          </span>
          <span style={{ fontSize: 13, color: "var(--grey-dark)" }}>
            No monetary incentives — no discounts, price alerts, cashback, or coupons. Any solution relying on price is disqualified.
          </span>
        </div>

        {/* ── MAIN TWO-COL ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, marginBottom: 16 }}>

          {/* Theme chart */}
          <div className="card" style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--charcoal)" }}>Theme frequency ranking</div>
              <span className="badge badge-grey">AI classified · Haiku + Sonnet</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--grey-mid)", marginBottom: 20 }}>
              {relevant} relevant signals · 10 behavioral themes · treated as hypotheses
            </div>
            <ThemeBarChart summary={relevantSummary} colors={THEME_HEX} />
          </div>

          {/* Source + validation sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Source coverage */}
            <div className="card" style={{ padding: "16px 18px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--charcoal)", marginBottom: 12 }}>Source coverage</div>
              {[
                { src: "Play Store — English", n: sourceCounts["playstore"] || 0, ok: true },
                { src: "Play Store — Regional (8 langs)", n: sourceCounts["reddit"] || 0, ok: true },
                { src: "YouTube comments", n: sourceCounts["youtube"] || 0, ok: true, note: "partially off-topic" },
                { src: "App Store", n: 0, ok: false, note: "API deprecated 2024" },
                { src: "Reddit", n: 0, ok: false, note: "HTTP 403 since 2023" },
                { src: "Fashion communities", n: 0, ok: false, note: "No public API" },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "7px 0",
                  borderBottom: i < 5 ? "1px solid var(--border)" : "none",
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: s.ok ? "var(--success)" : "var(--grey-light)", width: 14, flexShrink: 0 }}>
                    {s.ok ? "✓" : "✗"}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: s.ok ? "var(--charcoal)" : "var(--grey-mid)" }}>{s.src}</div>
                    {s.note && <div style={{ fontSize: 11, color: "var(--grey-mid)" }}>{s.note}</div>}
                  </div>
                  {s.ok && s.n > 0 && (
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--grey-dark)" }}>
                      {s.n.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Validation note */}
            <div className="card" style={{ padding: "14px 18px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--charcoal)", marginBottom: 8 }}>Validation</div>
              <div style={{ fontSize: 12, color: "var(--grey-dark)", lineHeight: 1.6 }}>
                100-item blind re-classification. Agreement: <strong style={{ color: "var(--warning)" }}>52%</strong> (target 75%+).
                Root cause: Play Store reviews are general app feedback, not wishlist-specific signals.
                Engine findings treated as directional — validated by N=48 primary survey.
              </div>
              <div style={{
                marginTop: 10, padding: "8px 12px",
                background: "var(--pink-light)", border: "1px solid var(--pink-border)",
                borderRadius: "var(--radius-xs)", fontSize: 11, fontWeight: 700, color: "var(--pink)",
              }}>
                No AI-generated percentage entered the deck without primary research validation.
              </div>
            </div>
          </div>
        </div>

        {/* ── VERDICT TABLE ── */}
        <div className="card" style={{ padding: "20px 24px", marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--charcoal)", marginBottom: 4 }}>Engine vs primary research — verdict table</div>
          <div style={{ fontSize: 12, color: "var(--grey-mid)", marginBottom: 16 }}>
            Engine findings tested against N=48 survey. Verdicts with re-ranking delta.
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                {["Engine finding", "Engine rank", "Survey finding", "Survey rank", "Verdict"].map(h => (
                  <th key={h} style={{
                    padding: "8px 12px", textAlign: "left",
                    fontSize: 11, fontWeight: 700, color: "var(--grey-mid)",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { f: "Return policy anxiety", er: "#1 (52.7%)", sf: "Background fear — 82.5% say returns influence decisions", sr: "Not #1 stated", v: "Re-ranked ↓", vc: "#F57C00" },
                { f: "Quality / photo fear",   er: "#2 (24.5%)", sf: "Confirmed — 45% received wrong item, 80% worried",     sr: "#4 stated, #1 solution need", v: "Confirmed ✓", vc: "#388E3C" },
                { f: "Price-wait behavior",    er: "#3 (9.9%)",  sf: "Re-ranked to #1 stated (37.5%) — timing, not price",   sr: "#1 stated (37.5%)", v: "Re-ranked ↑", vc: "#303F9F" },
                { f: "Comparison paralysis",   er: "Weak (#5)",  sf: "Emerged — 17.5% stated, 32.5% compare on other apps",  sr: "#2 stated (17.5%)", v: "Surfaced ↑",  vc: "#303F9F" },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "11px 12px", fontWeight: 600 }}>{row.f}</td>
                  <td style={{ padding: "11px 12px", color: "var(--grey-dark)" }}>{row.er}</td>
                  <td style={{ padding: "11px 12px", color: "var(--grey-dark)", maxWidth: 240 }}>{row.sf}</td>
                  <td style={{ padding: "11px 12px", color: "var(--grey-dark)" }}>{row.sr}</td>
                  <td style={{ padding: "11px 12px" }}>
                    <span style={{ background: row.vc + "18", color: row.vc, padding: "2px 8px", borderRadius: "var(--radius-xs)", fontSize: 11, fontWeight: 700 }}>
                      {row.v}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── SIGNAL EXPLORER ── */}
        <div className="card" style={{ padding: "20px 24px", marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--charcoal)", marginBottom: 4 }}>Signal explorer</div>
          <div style={{ fontSize: 12, color: "var(--grey-mid)", marginBottom: 16 }}>
            Browse classified signals by theme. Raw evidence behind each engine finding.
          </div>
          <ItemExplorer items={items} summary={relevantSummary} colors={THEME_HEX} />
        </div>

        {/* ── FOOTER ── */}
        <div style={{ textAlign: "center", fontSize: 12, color: "var(--grey-mid)", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
          Myntra Wishlist-to-Purchase Conversion · D2 Discovery Engine ·{" "}
          {total.toLocaleString("en-IN")} signals · Inter-coder agreement 52% (disclosed) · Validated against N=48 primary survey
        </div>
      </div>
    </main>
  );
}