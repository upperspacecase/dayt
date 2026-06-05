import Link from "next/link";

export const metadata = { title: "Join the Club — Dayt Knight" };

const PERKS = [
  ["Unlimited", "The whole library, not only today's three. Open any plan, any time."],
  ["Filtered to you", "Narrow by neighborhood, vibe, budget, energy, and stage. Pull a thread."],
  ["Build & share", "Make your own concepts, share them, and get the credit when people use them."],
  ["First in line", "New concepts, seasonal nights, and the concierge when it lands."],
];

export default function Join() {
  return (
    <main className="detail">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <div className="club-head" style={{ paddingBottom: 8, textAlign: "center" }}>
          <div className="lockline" style={{ justifyContent: "center", display: "inline-flex" }}>
            The Club
          </div>
          <h1 className="club-title" style={{ fontSize: "clamp(38px,5.5vw,72px)" }}>
            Never plan a boring date again.
          </h1>
          <p className="club-sub" style={{ marginInline: "auto" }}>
            Free while we&rsquo;re testing. Join now and the whole library is yours.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link className="btn btn-accent" href="/club">Join the Club &mdash; free while we test</Link>
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          {PERKS.map(([t, d]) => (
            <div key={t} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: "22px 24px" }}>
              <div className="serif" style={{ fontSize: 24 }}>{t}</div>
              <p style={{ color: "var(--ink-soft)", marginTop: 8, lineHeight: 1.55 }}>{d}</p>
            </div>
          ))}
        </div>

        <p style={{ color: "var(--ink-faint)", fontSize: 13.5, marginTop: 26, textAlign: "center" }}>
          Pricing arrives when we leave testing. Members who join now keep early access.
        </p>
      </div>
    </main>
  );
}
