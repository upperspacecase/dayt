import Link from "next/link";

export const metadata = { title: "Account — Dayt Knight" };

export default function Account() {
  return (
    <main className="detail">
      <div className="wrap" style={{ maxWidth: 560 }}>
        <div className="club-head" style={{ paddingBottom: 8 }}>
          <div className="lockline">Account</div>
          <h1 className="club-title" style={{ fontSize: "clamp(34px,4.5vw,56px)" }}>
            Accounts are on the way.
          </h1>
          <p className="club-sub">
            Sign-in is coming so your saved dates and the concepts you create follow you
            across devices. For now, the Club is open and free while we test &mdash; no account
            needed.
          </p>
        </div>
        <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn btn-accent" href="/club">Open the Club</Link>
          <Link className="btn btn-ghost" href="/create">Create a date</Link>
        </div>
      </div>
    </main>
  );
}
