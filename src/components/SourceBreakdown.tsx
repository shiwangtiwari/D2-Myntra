"use client";

interface Props {
  sourceCounts: Record<string, number>;
  total: number;
}

const SOURCE_CONFIG: Record<string, { label: string; color: string; target: string }> = {
  playstore: { label: "Google Play Store", color: "#34A853", target: "1,500+" },
  appstore:  { label: "Apple App Store",   color: "#007AFF", target: "500+" },
  reddit:    { label: "Reddit",             color: "#FF4500", target: "200+" },
  youtube:   { label: "YouTube Comments",   color: "#FF0000", target: "100+" },
};

export default function SourceBreakdown({ sourceCounts, total }: Props) {
  if (total === 0) {
    return (
      <div style={{ color: "var(--ink-light)", fontSize: 14 }}>
        No data yet.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {Object.entries(SOURCE_CONFIG).map(([key, cfg]) => {
        const count = sourceCounts[key] || 0;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return (
          <div key={key}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>
                  {cfg.label}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-light)" }}>
                  Target: {cfg.target}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>
                  {count.toLocaleString("en-IN")}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-light)" }}>{pct}%</div>
              </div>
            </div>
            <div style={{
              height: 8,
              background: "var(--border)",
              borderRadius: 4,
              overflow: "hidden",
            }}>
              <div style={{
                width: `${pct}%`,
                height: "100%",
                background: cfg.color,
                borderRadius: 4,
              }} />
            </div>
          </div>
        );
      })}

      <div style={{
        marginTop: 8,
        padding: "10px 14px",
        background: "var(--bg)",
        borderRadius: "var(--radius-sm)",
        fontSize: 13,
        color: "var(--ink-mid)",
        borderLeft: "3px solid var(--pink)",
      }}>
        <strong>Deduplication:</strong> Near-duplicate texts removed using 12-word fingerprint matching before classification. Each item counted once regardless of source.
      </div>
    </div>
  );
}
