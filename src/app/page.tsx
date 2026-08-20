import { getThemeLabel, DashboardData } from "@/lib/data";
import ThemeBarChart from "@/components/ThemeBarChart";
import ItemExplorer from "@/components/ItemExplorer";
import Image from "next/image";
import classifiedRaw from "../../classified.json";

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

      {/* ── HEADER ── */}
      <header style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 1px 4px rgba(40,44,63,0.08)",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", height: 52, gap: 12 }}>
          {/* Real Myntra logo */}
          <Image
            src="/myntra-logo.webp"
            alt="Myntra"
            width={36}
            height={36}
            style={{ objectFit: "contain", flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--charcoal)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Wishlist Behavior · D2 Engine
            </div>
            <div style={{ fontSize: 11, color: "var(--grey-mid)", display: "none" }} className="header-sub">
              AI Discovery Engine
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <span className="badge badge-green">Live</span>
            <span style={{ fontSize: 11, color: "var(--grey-mid)" }}>{classifiedAt}</span>
          </div>
        </div>
      </header>

      {/* ── PAGE TITLE ── */}
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "16px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
            <Image
              src="/myntra-logo-full.png"
              alt="Myntra"
              width={100}
              height={36}
              style={{ objectFit: "contain", flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--pink)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                Part 1 of 7 · AI Discovery Engine
              </div>
              <h1 style={{ fontSize: 18, fontWeight: 800, color: "var(--charcoal)", marginBottom: 4, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                Why do Myntra users save but not buy?
              </h1>
              <p style={{ fontSize: 12, color: "var(--grey-dark)", lineHeight: 1.6 }}>
                {total.toLocaleString("en-IN")} signals across Play Store (English + 8 regional languages) and YouTube — classified into 10 behavioral barrier themes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 16, paddingBottom: 40 }}>

        {/* ── STAT CARDS ── */}
        <div className="grid-4" style={{ marginBottom: 16 }}>
          {[
            { n: total.toLocaleString("en-IN"), l: "Total signals", s: "Play Store + YouTube" },
            { n: relevant.toLocaleString("en-IN"), l: "Relevant signals", s: `${total ? ((relevant/total)*100).toFixed(1) : 0}% of total` },
            { n: "10", l: "Barrier themes", s: "Adversarially audited" },
            { n: "52%", l: "Inter-coder agreement", s: "Disclosed", warn: true },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: "14px 14px" }}>
              <div className="stat-n" style={{ color: s.warn ? "var(--warning)" : "var(--charcoal)" }}>{s.n}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--charcoal)", marginTop: 3 }}>{s.l}</div>
              <div className="stat-l">{s.s}</div>
            </div>
          ))}
        </div>

        {/* ── KEY FINDING ── */}
        {topTheme && (
          <div className="card" style={{
            marginBottom: 16,
            borderLeft: "3px solid var(--pink)",
            padding: "14px 16px",
          }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--pink)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 5 }}>
                  Engine finding · Hypothesis
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--charcoal)", marginBottom: 5 }}>
                  {getThemeLabel(topTheme.theme)} is the dominant signal ({topTheme.pct}%)
                </div>
                <div style={{ fontSize: 12, color: "var(--grey-dark)", lineHeight: 1.6 }}>
                  Primary research (N=60) re-ranked: <strong>timing barrier is #1</strong> stated reason (31.7%) and <strong>size/fit is #2</strong> (16.7%). Engine finding treated as directional.
                </div>
              </div>
              <div style={{
                border: "2px solid var(--pink)", borderRadius: "var(--radius-sm)",
                padding: "10px 18px", textAlign: "center", flexShrink: 0,
              }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "var(--pink)", lineHeight: 1 }}>{topTheme.pct}%</div>
                <div style={{ fontSize: 11, color: "var(--grey-mid)", marginTop: 3 }}>of signals</div>
              </div>
            </div>
          </div>
        )}

        {/* ── CONSTRAINT ── */}
        <div className="card" style={{ marginBottom: 16, borderLeft: "3px solid var(--warning)", padding: "12px 16px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--warning)", textTransform: "uppercase", letterSpacing: "0.06em", marginRight: 8 }}>
            Hard constraint
          </span>
          <span style={{ fontSize: 12, color: "var(--grey-dark)" }}>
            No monetary incentives — no discounts, price alerts, cashback, or coupons. Any solution relying on price is disqualified.
          </span>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid-2-1" style={{ marginBottom: 16 }}>

          {/* Theme chart */}
          <div className="card" style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--charcoal)" }}>Theme frequency ranking</div>
              <span className="badge badge-grey">AI classified</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--grey-mid)", marginBottom: 16 }}>
              {relevant} relevant signals · 10 themes · treated as hypotheses
            </div>
            <ThemeBarChart summary={relevantSummary} colors={THEME_HEX} />
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Source coverage */}
            <div className="card" style={{ padding: "14px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--charcoal)", marginBottom: 12 }}>Source coverage</div>
              {[
                { src: "Play Store (English)", n: sourceCounts["playstore"] || 0, ok: true },
                { src: "Play Store (8 regional langs)", n: sourceCounts["reddit"] || 0, ok: true },
                { src: "YouTube comments", n: sourceCounts["youtube"] || 0, ok: true, note: "partially off-topic" },
                { src: "App Store", n: 0, ok: false, note: "API deprecated 2024" },
                { src: "Reddit", n: 0, ok: false, note: "HTTP 403 since 2023" },
                { src: "Fashion communities", n: 0, ok: false, note: "No public API" },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "6px 0",
                  borderBottom: i < 5 ? "1px solid var(--border)" : "none",
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: s.ok ? "var(--success)" : "var(--grey-light)", width: 14, flexShrink: 0 }}>
                    {s.ok ? "✓" : "✗"}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: s.ok ? "var(--charcoal)" : "var(--grey-mid)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.src}</div>
                    {s.note && <div style={{ fontSize: 11, color: "var(--grey-mid)" }}>{s.note}</div>}
                  </div>
                  {s.ok && s.n > 0 && (
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--grey-dark)", flexShrink: 0 }}>
                      {s.n.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Validation */}
            <div className="card" style={{ padding: "14px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--charcoal)", marginBottom: 8 }}>Validation</div>
              <div style={{ fontSize: 12, color: "var(--grey-dark)", lineHeight: 1.7 }}>
                100-item blind re-classification. Agreement: <strong style={{ color: "var(--warning)" }}>52%</strong> (target 75%+). Root cause: Play Store reviews are general app feedback, not wishlist-specific signals. Findings treated as directional.
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
        <div className="card" style={{ padding: "16px 18px", marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--charcoal)", marginBottom: 4 }}>Engine vs primary research — verdict table</div>
          <div style={{ fontSize: 12, color: "var(--grey-mid)", marginBottom: 14 }}>
            Engine findings tested against N=60 survey. Verdicts with re-ranking delta.
          </div>
          <div className="table-wrap">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 560 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border)" }}>
                  {["Engine finding", "Engine rank", "Survey finding", "Survey rank", "Verdict"].map(h => (
                    <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "var(--grey-mid)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "Return policy anxiety", er: "#1 (52.7%)", sf: "Background fear — 82% say returns influence decisions but not #1 stated barrier", sr: "Not #1 stated", v: "Re-ranked ↓", vc: "#F57C00" },
                  { f: "Quality / photo fear", er: "#2 (24.5%)", sf: "Confirmed — 80% worried or experienced mismatch. #1 solution need: real photos (51.7%)", sr: "#4 stated, #1 solution need", v: "Confirmed ✓", vc: "#388E3C" },
                  { f: "Price-wait behavior", er: "#3 (9.9%)", sf: "Re-ranked to #1 stated (31.7%) — it is TIMING not price. Users wait for occasion, salary, season", sr: "#1 stated (31.7%)", v: "Re-ranked ↑", vc: "#303F9F" },
                  { f: "Comparison paralysis", er: "Weak (#5)", sf: "Emerged — 13.3% stated, 33.3% compare on other apps as workaround", sr: "#4 stated (13.3%)", v: "Surfaced ↑", vc: "#303F9F" },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "10px 10px", fontWeight: 600, fontSize: 12 }}>{row.f}</td>
                    <td style={{ padding: "10px 10px", color: "var(--grey-dark)", fontSize: 12 }}>{row.er}</td>
                    <td style={{ padding: "10px 10px", color: "var(--grey-dark)", fontSize: 12, maxWidth: 200 }}>{row.sf}</td>
                    <td style={{ padding: "10px 10px", color: "var(--grey-dark)", fontSize: 12 }}>{row.sr}</td>
                    <td style={{ padding: "10px 10px" }}>
                      <span style={{ background: row.vc + "18", color: row.vc, padding: "2px 8px", borderRadius: "var(--radius-xs)", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
                        {row.v}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── SIGNAL EXPLORER ── */}
        <div className="card" style={{ padding: "16px 18px", marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--charcoal)", marginBottom: 4 }}>Signal explorer</div>
          <div style={{ fontSize: 12, color: "var(--grey-mid)", marginBottom: 16 }}>
            Browse classified signals by theme. Raw evidence behind each engine finding.
          </div>
          <ItemExplorer items={items} summary={relevantSummary} colors={THEME_HEX} />
        </div>

        {/* ── FOOTER ── */}
        <div style={{ textAlign: "center", fontSize: 11, color: "var(--grey-mid)", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
          Myntra Wishlist-to-Purchase Conversion · D2 Discovery Engine ·{" "}
          {total.toLocaleString("en-IN")} signals · Inter-coder agreement 52% (disclosed) · Validated against N=60 primary survey
        </div>
      </div>
    </main>
  );
}
