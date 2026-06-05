"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Plate from "./plate";
import { type Concept } from "./dates";

export default function LandingClient({
  dailyThree,
  subscribed,
  errored,
}: {
  dailyThree: Concept[];
  subscribed: boolean;
  errored: boolean;
}) {
  const router = useRouter();
  const [idx, setIdx] = useState(0);

  // the hero card rotates through today's three
  useEffect(() => {
    if (dailyThree.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % dailyThree.length), 4500);
    return () => clearInterval(t);
  }, [dailyThree.length]);

  const hero = dailyThree[idx % (dailyThree.length || 1)];

  return (
    <main className="landing">
      <section className="home-hero">
        <div className="home-hero-bg" aria-hidden />
        <div className="home-hero-scrim" aria-hidden />
        <div className="home-hero-inner">
          {subscribed && (
            <div className="meta-chip" style={{ marginBottom: 18 }}>
              <span className="dot" /> You&rsquo;re in. Three fresh New York dates land in your inbox, starting tomorrow.
            </div>
          )}
          {errored && (
            <div className="meta-chip" style={{ marginBottom: 18 }}>
              <span className="dot" /> That didn&rsquo;t go through. Mind trying again?
            </div>
          )}
          <h1 className="home-hero-title">
            We deserve <em>awesome</em> dates.
          </h1>
          <Link href="/club" className="home-hero-join">Join the club</Link>
        </div>

        {hero && (
          <article className="hero-card" onClick={() => router.push(`/dates/${hero.id}`)}>
            <Plate tint={hero.tint} scrim />
            <div className="card-body" key={hero.id}>
              <div className="p-kicker">{hero.area} &middot; {hero.vibe}</div>
              <h3 className="ptitle">{hero.title}</h3>
              <p className="pmoment">{hero.hook}</p>
              <div className="pfoot">
                <span className="pmetaline">{hero.timing}</span>
              </div>
            </div>
          </article>
        )}
      </section>

      <section
        id="today"
        className="wrap-wide"
        style={{ paddingBottom: "var(--pad-section)", scrollMarginTop: 90 }}
      >
        <div className="sec-head">
          <div>
            <span className="kicker eyebrow-accent">Today&rsquo;s three &middot; free</span>
            <h2 style={{ marginTop: 12 }}>On the table tonight</h2>
          </div>
          <div className="sub" style={{ maxWidth: "32ch", textAlign: "right" }}>
            Fresh at midnight. Gone tomorrow.
          </div>
        </div>

        <div className="triptych">
          {dailyThree.map((c, i) => (
            <article
              key={c.id}
              className="poster"
              onClick={() => router.push(`/dates/${c.id}`)}
            >
              <Plate tint={c.tint} scrim />
              <div className="body">
                <div className="p-top">
                  <div className="p-kicker">{c.area} &middot; {c.vibe}</div>
                  <div className="p-num">{String(i + 1).padStart(2, "0")}</div>
                </div>
                <div>
                  <h3 className="ptitle">{c.title}</h3>
                  <p className="pmoment">{c.hook}</p>
                  <div className="pfoot">
                    <span className="pmetaline">{c.timing}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="belief" style={{ background: "var(--bg-2)" }}>
        <div className="wrap-wide belief-grid">
          <div className="belief-text">
            <p className="line">
              Dayt Knight helps you plan better dates<br />
              <span className="soft">without turning romance into admin.</span>
            </p>
            <div className="sig">
              <span
                className="rule"
                style={{ width: 44, height: 1, background: "var(--accent)", display: "inline-block" }}
              />
              Get inspired by fresh daily ideas, open the full plan, shape it to your person, and make it happen.
            </div>
          </div>
          <div className="belief-mascot">
            <img src="/dayt-hero-b.jpeg" alt="The Dayt Knight moon, holding a heart" />
          </div>
        </div>
      </section>
    </main>
  );
}
