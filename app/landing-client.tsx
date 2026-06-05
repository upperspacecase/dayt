"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Plate from "./plate";
import ShareOverlay from "./share-overlay";
import { subscribe } from "./actions";
import { type Concept } from "./dates";
import { ArrowR, SendIcon } from "./icons";
import MetaChips from "./meta-chips";

export default function LandingClient({
  dailyThree,
  subscribed,
  errored,
  todayLabel,
}: {
  dailyThree: Concept[];
  subscribed: boolean;
  errored: boolean;
  todayLabel: string;
}) {
  const [share, setShare] = useState<Concept | null>(null);
  const router = useRouter();

  return (
    <main className="landing">
      <section className="wrap-wide masthead">
        <div className="today-line">
          <span className="kicker">New York</span>
          <span className="rule" />
          <span className="kicker">{todayLabel}</span>
        </div>

        {subscribed && (
          <div className="meta-chip" style={{ marginBottom: 20 }}>
            <span className="dot" /> You&rsquo;re in. Three fresh New York dates land in your inbox, starting tomorrow.
          </div>
        )}
        {errored && (
          <div className="meta-chip" style={{ marginBottom: 20 }}>
            <span className="dot" /> That didn&rsquo;t go through. Mind trying again?
          </div>
        )}

        <h1 className="hero-title">
          Three new ways<br />to <em>fall for someone</em>,<br />each day.
        </h1>
        <p className="hero-sub">
          We dream up the whole night &mdash; where, when, the one moment that makes it,
          what to bring, the backup if it rains. You show up and connect. No more
          &ldquo;what do you want to do?&rdquo;
        </p>
        <div className="hero-actions">
          <form className="email-cap" action={subscribe}>
            <input
              type="email"
              name="email"
              required
              placeholder="Your email for the daily three"
              aria-label="Email"
            />
            <button type="submit" className="btn btn-accent btn-sm">Send them</button>
          </form>
          <Link
            href="/club"
            className="arrow-link"
            style={{ color: "var(--ink-soft)" }}
          >
            or open the whole library{" "}
            <ArrowR className="ar" style={{ width: 15, height: 15 }} />
          </Link>
        </div>
      </section>

      <section className="wrap-wide" style={{ paddingBottom: "var(--pad-section)" }}>
        <div className="sec-head">
          <div>
            <span className="kicker eyebrow-accent">Today&rsquo;s three &middot; free</span>
            <h2 style={{ marginTop: 12 }}>On the table tonight</h2>
          </div>
          <div className="sub" style={{ maxWidth: "32ch", textAlign: "right" }}>
            Fresh at midnight. Gone tomorrow. Made for sending.
          </div>
        </div>

        <div className="index-list">
          {dailyThree.map((c, i) => (
            <article
              key={c.id}
              className="index-row"
              onClick={() => router.push(`/dates/${c.id}`)}
            >
              <div className="itext">
                <div className="num">
                  <span className="ln" />
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="ititle">{c.title}</h3>
                <p className="ihook">{c.hook}</p>
                <div className="imeta">
                  <MetaChips items={[c.area, c.vibe, c.budget]} />
                </div>
                <div className="iactions">
                  <span className="arrow-link">
                    The full night <ArrowR className="ar" />
                  </span>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShare(c);
                    }}
                  >
                    <SendIcon style={{ width: 15, height: 15 }} /> Send it
                  </button>
                </div>
              </div>
              <Plate tint={c.tint} tag={c.timing} />
            </article>
          ))}
        </div>
      </section>

      <section className="belief" style={{ background: "var(--bg-2)" }}>
        <div className="wrap-wide">
          <p className="line">
            The best part is the connection.<br />
            <span className="soft">The worst part is the planning.</span><br />
            We took the planning.
          </p>
          <div className="sig">
            <span
              className="rule"
              style={{ width: 44, height: 1, background: "var(--accent)", display: "inline-block" }}
            />
            Dating should feel like magic. The admin shouldn&rsquo;t get in the way.
          </div>
        </div>
      </section>

      {share && <ShareOverlay concept={share} onClose={() => setShare(null)} />}
    </main>
  );
}
