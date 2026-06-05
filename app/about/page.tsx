import Link from "next/link";

export const metadata = { title: "About — Dayt Knight" };

export default function About() {
  return (
    <main className="detail">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="club-head" style={{ paddingBottom: 8 }}>
          <div className="lockline">About</div>
          <h1 className="club-title" style={{ fontSize: "clamp(36px,5vw,64px)" }}>
            Dating, without the admin.
          </h1>
          <p className="club-sub">
            The best part of a date is the connection. The worst part is the planning &mdash;
            the &ldquo;what do you want to do?&rdquo; that quietly kills date night. Dayt Knight
            takes the planning, so the magic can happen.
          </p>
        </div>

        <div style={{ color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.7, display: "flex", flexDirection: "column", gap: 18, marginTop: 28 }}>
          <p>
            We dream up complete date concepts &mdash; the place, the flow, the one moment that
            makes the night, what to bring, and the backup if it rains. Three fresh ones land
            free each day. Open the full plan, shape it to your person, and make it happen.
          </p>
          <p>
            Join the Club and the whole library opens &mdash; unlimited, filtered to your
            neighborhood, your budget, your kind of night. And you can build your own concepts
            and share them. We always credit the people whose taste made a night worth having.
          </p>
          <p className="serif" style={{ color: "var(--ink)", fontSize: 24, lineHeight: 1.3 }}>
            Dating should feel like magic. The admin shouldn&rsquo;t get in the way.
          </p>
        </div>

        <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn btn-accent" href="/">See today&rsquo;s ideas</Link>
          <Link className="btn btn-ghost" href="/create">Create a date</Link>
        </div>
      </div>
    </main>
  );
}
