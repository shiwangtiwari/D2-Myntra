import { getThemeLabel, DashboardData } from "@/lib/data";
import ThemeBarChart from "@/components/ThemeBarChart";
import ItemExplorer from "@/components/ItemExplorer";
import SourceBreakdown from "@/components/SourceBreakdown";

// Static import — bundled at build time, no fs needed
import classifiedRaw from "../../classified.json";

const THEME_COLORS: Record<string, string> = {
  fit_size_uncertainty:      "#4361EE",
  style_occasion_doubt:      "#7209B7",
  quality_authenticity_fear: "#F72585",
  wishlist_as_bookmarking:   "#4CC9F0",
  price_wait_behavior:       "#F3722C",
  social_validation_need:    "#90BE6D",
  comparison_paralysis:      "#F8961E",
  return_policy_anxiety:     "#43AA8B",
  missing_information:       "#577590",
  habit_loop:                "#277DA1",
};

export default function Home() {
  // Cast the imported JSON to our type
  const data = classifiedRaw as unknown as DashboardData;
  const { meta, summary, items } = data;

  // Filter out irrelevant from summary
  const relevantSummary = (summary || []).filter((s) => s.theme !== "irrelevant");
  const topTheme = relevantSummary[0];

  const classifiedAt = meta?.classifiedAt
    ? new Date(meta.classifiedAt).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      })
    : "—";

  const sourceCounts: Record<string, number> = {};
  for (const item of (items || [])) {
    if (item.source) sourceCounts[item.source] = (sourceCounts[item.source] || 0) + 1;
  }

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 60 }}>
      {/* Header */}
      <header style={{
        background: "var(--white)",
        borderBottom: "1px solid var(--border)",
        padding: "16px 0",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            background: "var(--pink)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            padding: "6px 14px",
            borderRadius: "var(--radius-sm)",
            letterSpacing: "0.04em",
          }}>
            D2
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>
              Myntra Wishlist Behavior
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-light)" }}>
              AI Discovery Engine — Multi-source behavioral analysis
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            <span className="badge badge-pink">Live</span>
            <span style={{ fontSize: 13, color: "var(--ink-light)" }}>
              Updated {classifiedAt}
            </span>
          </div>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 32 }}>
        {/* Hero stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}>
          {[
            { n: (meta?.total || 0).toLocaleString("en-IN"), label: "Total signals collected" },
            { n: (meta?.relevant || 0).toLocaleString("en-IN"), label: "Relevant to wishlist behavior" },
            { n: `${relevantSummary.length}`, label: "Behavioral themes identified" },
            { n: "52%", label: "Inter-coder agreement (Phase 1)", badge: "DISCLOSED" },
          ].map((stat, i) => (
            <div key={i} className="card" style={{ textAlign: "center" }}>
              <div className="stat-number">{stat.n}</div>
              <div className="stat-label">{stat.label}</div>
              {stat.badge && (
                <span className="badge badge-blue" style={{ marginTop: 8 }}>
                  {stat.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Source coverage note */}
        <div className="card" style={{
          marginBottom: 32,
          borderLeft: "4px solid #577590",
          background: "#F5F7FA",
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#577590", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Source coverage — honest disclosure
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8, fontSize: 13, color: "var(--ink-mid)" }}>
            {[
              { src: "Play Store (English)", status: "✓", n: "1,181 items" },
              { src: "Play Store (Regional — 8 languages)", status: "✓", n: "360 items" },
              { src: "YouTube comments", status: "✓", n: "363 items (partially off-topic)" },
              { src: "App Store", status: "✗", n: "iTunes RSS API deprecated 2024" },
              { src: "Reddit", status: "✗", n: "API access removed 2023 (HTTP 403)" },
              { src: "Fashion communities", status: "✗", n: "No public API available" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: s.status === "✓" ? "#065F46" : "#991B1B", fontWeight: 700 }}>{s.status}</span>
                <span><strong>{s.src}</strong> — {s.n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key finding callout */}
        {topTheme && (
          <div className="card" style={{
            marginBottom: 32,
            borderLeft: "4px solid var(--pink)",
            background: "var(--pink-light)",
          }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--pink-dark)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Engine finding (hypothesis — validated by primary research)
                </div>
                <h2 style={{ color: "var(--ink)", marginBottom: 8 }}>
                  {getThemeLabel(topTheme.theme)} is the dominant signal
                </h2>
                <p style={{ color: "var(--ink-mid)", fontSize: 15 }}>
                  {topTheme.pct}% of relevant signals ({topTheme.count} items) show{" "}
                  <strong>{getThemeLabel(topTheme.theme).toLowerCase()}</strong> as the primary behavioral barrier.
                  Primary research (N=48 survey) re-ranked this — timing barrier is the #1 stated reason at 37.5%.
                  Engine finding treated as directional, not definitive.
                </p>
              </div>
              <div style={{
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "16px 24px",
                textAlign: "center",
                minWidth: 120,
              }}>
                <div style={{ fontSize: 42, fontWeight: 700, color: "var(--pink)" }}>
                  {topTheme.pct}%
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-light)" }}>of signals</div>
              </div>
            </div>
          </div>
        )}

        {/* No-discount constraint */}
        <div className="card" style={{
          marginBottom: 32,
          borderLeft: "4px solid #F3722C",
          background: "#FFF8F5",
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#C04A10", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Hard constraint — acknowledged explicitly
          </div>
          <p style={{ color: "var(--ink-mid)", fontSize: 15 }}>
            No monetary incentives. No discounts, price drop alerts, cashback, or coupons.
            Any solution that relies on price as the lever is disqualified.
            The engine finding that price-wait behavior appears at{" "}
            {relevantSummary.find(s => s.theme === "price_wait_behavior")?.pct || "~10"}% of signals
            captures non-monetary timing barriers (occasion, season, salary) — not discount-seeking.
          </p>
        </div>

        {/* Theme bar chart */}
        <div className="card" style={{ marginBottom: 32 }}>
          <h2 style={{ marginBottom: 6 }}>Theme frequency ranking</h2>
          <p style={{ fontSize: 14, color: "var(--ink-light)", marginBottom: 24 }}>
            {(meta?.relevant || 0).toLocaleString("en-IN")} relevant signals classified across 10 behavioral themes.
            Treated as hypotheses — validated against primary research (N=48 survey, 6 depth respondents).
          </p>
          <ThemeBarChart summary={relevantSummary} colors={THEME_COLORS} />
        </div>

        {/* Two-col: source + validation */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginBottom: 32,
        }}>
          <div className="card">
            <h2 style={{ marginBottom: 16 }}>Source breakdown</h2>
            <SourceBreakdown sourceCounts={sourceCounts} total={meta?.total || 0} />
          </div>

          <div className="card">
            <h2 style={{ marginBottom: 16 }}>Validation methodology</h2>
            <div style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 12 }}>
                <strong>Tier 1 — Haiku:</strong> Classified all 1,458 items in batches of 20.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>Tier 2 — Sonnet:</strong> Re-classified low-confidence items independently.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>Blind validation:</strong> 100-item random sample re-classified. Agreement rate: 52%.
                Below 75% target — acknowledged. Root cause: Play Store reviews are general app feedback,
                not wishlist-specific behavioral signals.
              </p>
              <div style={{
                background: "#F0FFF4",
                border: "1px solid #A7F3D0",
                borderRadius: "var(--radius-sm)",
                padding: "10px 14px",
                marginTop: 8,
                fontSize: 13,
                color: "#065F46",
                fontWeight: 600,
              }}>
                No AI-generated percentage entered the deck.
                Every stat cited is anchored to validated pipeline output or primary research (N=48).
              </div>
            </div>
          </div>
        </div>

        {/* Item explorer */}
        <div className="card" style={{ marginBottom: 32 }}>
          <h2 style={{ marginBottom: 6 }}>Signal explorer</h2>
          <p style={{ fontSize: 14, color: "var(--ink-light)", marginBottom: 20 }}>
            Browse classified signals by theme. Filter to see the raw evidence behind each finding.
          </p>
          <ItemExplorer items={items || []} summary={relevantSummary} colors={THEME_COLORS} />
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          fontSize: 13,
          color: "var(--ink-light)",
          padding: "24px 0",
          borderTop: "1px solid var(--border)",
        }}>
          Myntra Wishlist-to-Purchase Conversion — D2 Discovery Engine &nbsp;|&nbsp;
          {(meta?.total || 0).toLocaleString("en-IN")} signals from Play Store (English + 8 regional languages) + YouTube &nbsp;|&nbsp;
          Validation: 52% inter-coder agreement (disclosed)
        </div>
      </div>
    </main>
  );
}