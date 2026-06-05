"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Plate from "./plate";
import { subscribe } from "./actions";
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
          <Link href="/club" className="home-hero-join secondary">or join the club</Link>
        </div>

        {hero && (
          <article className="hero-card">
            <Plate tint={hero.tint} scrim />
            <div className="hero-card-inner">
              <div className="card-date" key={hero.id} onClick={() => router.push(`/dates/${hero.id}`)}>
                <div className="p-kicker">{hero.area} &middot; {hero.vibe}</div>
                <h3 className="ptitle">{hero.title}</h3>
                <p className="pmoment">{hero.hook}</p>
              </div>
              <form className="card-email" action={subscribe}>
                <span className="card-email-label">Three fresh ideas like this, every day</span>
                <div className="card-email-row">
                  <input type="email" name="email" required placeholder="Your email" aria-label="Email" />
                  <button type="submit" className="btn btn-accent btn-sm">Get them</button>
                </div>
              </form>
            </div>
          </article>
        )}
      </section>
    </main>
  );
}
