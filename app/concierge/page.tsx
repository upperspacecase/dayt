import Link from "next/link";

export const metadata = { title: "Concierge — Dayt Knight" };

export default function Concierge() {
  return (
    <main className="detail">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="club-head" style={{ paddingBottom: 8 }}>
          <div className="lockline">Concierge &middot; coming soon</div>
          <h1 className="club-title" style={{ fontSize: "clamp(36px,5vw,64px)" }}>
            Have the whole night handled.
          </h1>
          <p className="club-sub">
            For the anniversaries, the make-up nights, the proposals &mdash; a real person plans
            it, books it, and times it. You show up. Done by the locals whose taste you
            already trust here.
          </p>
        </div>

        <div style={{ color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.7, marginTop: 26 }}>
          <p>
            Concierge nights are curated and booked by hand, so there are only so many a week.
            It&rsquo;s the premium tier &mdash; not built yet. Leave your email on the daily three
            and you&rsquo;ll be first to know when it opens.
          </p>
        </div>

        <div style={{ marginTop: 30, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn btn-accent" href="/">Get the daily three</Link>
          <Link className="btn btn-ghost" href="/club">Browse the library</Link>
        </div>
      </div>
    </main>
  );
}
