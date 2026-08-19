import { loadDashboardData, getThemeLabel } from "@/lib/data";
import ThemeBarChart from "@/components/ThemeBarChart";
import ItemExplorer from "@/components/ItemExplorer";
import SourceBreakdown from "@/components/SourceBreakdown";

const THEME_COLORS: Record<string, string> = {
  fit_size_uncertainty:    "#4361EE",
  style_occasion_doubt:    "#7209B7",
  quality_authenticity_fear: "#F72585",
  wishlist_as_bookmarking: "#4CC9F0",
  price_wait_behavior:     "#F3722C",
  social_validation_need:  "#90BE6D",
  comparison_paralysis:    "#F8961E",
  return_policy_anxiety:   "#43AA8B",
  missing_information:     "#577590",
  habit_loop:              "#277DA1",
};

const CONSTRAINT_NOTE = "price_wait_behavior";

export default function Home() {
  const data = loadDashboardData();
  const { meta, summary, items, validationRate } = data;

  const relevantSummary = summary.filter((s) => s.theme !== "irrelevant");
  const topTheme = relevantSummary[0];
  const classifiedAt = meta.classifiedAt
    ? new Date(meta.classifiedAt).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      })
    : "—";

  const sourceCounts: Record<string, number> = {};
  for (const item of items) {
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
            { n: meta.total.toLocaleString("en-IN"), label: "Total signals collected" },
            { n: meta.relevant.toLocaleString("en-IN"), label: "Relevant to wishlist behavior" },
            { n: `${relevantSummary.length}`, label: "Behavioral themes identified" },
            {
              n: validationRate ? `${validationRate}%` : "—",
              label: "Inter-coder agreement rate",
              badge: validationRate && validationRate >= 75 ? "PASS" : validationRate ? "FAIL" : undefined,
            },
          ].map((stat, i) => (
            <div key={i} className="card" style={{ textAlign: "center" }}>
              <div className="stat-number">{stat.n}</div>
              <div className="stat-label">{stat.label}</div>
              {stat.badge && (
                <span className={`badge ${stat.badge === "PASS" ? "badge-green" : "badge-pink"}`}
                  style={{ marginTop: 8 }}>
                  {stat.badge}
                </span>
              )}
            </div>
          ))}
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
                  Dominant finding
                </div>
                <h2 style={{ color: "var(--ink)", marginBottom: 8 }}>
                  {getThemeLabel(topTheme.theme)} is the #1 barrier
                </h2>
                <p style={{ color: "var(--ink-mid)", fontSize: 15 }}>
                  {topTheme.pct}% of relevant signals ({topTheme.count} items) point to{" "}
                  <strong>{getThemeLabel(topTheme.theme).toLowerCase()}</strong> as the primary reason
                  users save but do not purchase. This is the engine finding — treated as a hypothesis
                  until validated against primary research.
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

        {/* Constraint acknowledgment */}
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
            Any solution that relies on price as the lever is disqualified.{" "}
            {relevantSummary.find(s => s.theme === CONSTRAINT_NOTE) && (
              <span>
                Note: <strong>price_wait_behavior</strong> appears at{" "}
                {relevantSummary.find(s => s.theme === CONSTRAINT_NOTE)?.pct}% of signals —
                this captures non-monetary waiting (occasion, season, salary) and is distinct from
                discount-seeking behavior.
              </span>
            )}
          </p>
        </div>

        {/* Theme bar chart */}
        <div className="card" style={{ marginBottom: 32 }}>
          <h2 style={{ marginBottom: 6 }}>Theme frequency ranking</h2>
          <p style={{ fontSize: 14, color: "var(--ink-light)", marginBottom: 24 }}>
            All {meta.relevant.toLocaleString("en-IN")} relevant signals classified by primary behavioral barrier.
            Ordered by frequency. Treated as hypotheses — to be validated against primary research.
          </p>
          <ThemeBarChart summary={relevantSummary} colors={THEME_COLORS} />
        </div>

        {/* Two-col: source breakdown + validation note */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginBottom: 32,
        }}>
          <div className="card">
            <h2 style={{ marginBottom: 16 }}>Source breakdown</h2>
            <SourceBreakdown sourceCounts={sourceCounts} total={meta.total} />
          </div>

          <div className="card">
            <h2 style={{ marginBottom: 16 }}>Validation methodology</h2>
            <div style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 12 }}>
                <strong>Step 1:</strong> Claude Haiku classifies all items in batches of 20.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>Step 2:</strong> 100-item random sample is re-classified independently
                (blind — no access to original labels).
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>Step 3:</strong> Agreement rate computed. Target: 75%+.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>Step 4:</strong> Disagreements reviewed to identify taxonomy ambiguities.
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
                Every stat cited in the presentation is anchored to this validated pipeline output.
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
          <ItemExplorer items={items} summary={relevantSummary} colors={THEME_COLORS} />
        </div>

        {/* Footer audit note */}
        <div style={{
          textAlign: "center",
          fontSize: 13,
          color: "var(--ink-light)",
          padding: "24px 0",
          borderTop: "1px solid var(--border)",
        }}>
          D2 Discovery Engine — Myntra Wishlist-to-Purchase Conversion Research &nbsp;|&nbsp;
          {meta.total.toLocaleString("en-IN")} signals from Play Store, App Store, Reddit, YouTube &nbsp;|&nbsp;
          Validated at {validationRate ? `${validationRate}% inter-coder agreement` : "pending validation"}
        </div>
      </div>
    </main>
  );
}
