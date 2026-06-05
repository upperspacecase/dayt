export const metadata = { title: "Terms — Dayt Knight" };

const SECTIONS: [string, string][] = [
  ["The short version", "Dayt Knight gives you date ideas and plans for inspiration. We do our best to make them good, but we don't operate the venues and can't guarantee a place is open, available, or right for you. Check details before you go."],
  ["Concepts you create", "When you create and share a concept, you keep it as yours and you're responsible for what's in it. You give Dayt Knight permission to show it on the site and credit you. Don't post anything unlawful, hateful, or that isn't yours to share."],
  ["No warranty", "The site is provided as-is, free while we test. We're not liable for how a night goes, for venues, third parties, or anything beyond what the law requires."],
  ["Changes", "We're early and things will change. We'll update these terms as the product grows, including when paid membership and payouts arrive."],
  ["Contact", "Questions? Reply to any Dayt Knight email and we'll get back to you."],
];

export default function Terms() {
  return (
    <main className="detail">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <div className="club-head" style={{ paddingBottom: 8 }}>
          <div className="lockline">Terms</div>
          <h1 className="club-title" style={{ fontSize: "clamp(34px,4.5vw,56px)" }}>Terms of use</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 24 }}>
          {SECTIONS.map(([t, d]) => (
            <div key={t}>
              <h2 className="serif" style={{ fontSize: 24, margin: 0 }}>{t}</h2>
              <p style={{ color: "var(--ink-soft)", lineHeight: 1.65, marginTop: 8 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
