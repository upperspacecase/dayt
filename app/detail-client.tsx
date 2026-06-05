"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Plate from "./plate";
import ShareOverlay from "./share-overlay";
import MetaChips from "./meta-chips";
import { type Concept } from "./dates";
import { ArrowL, ArrowR, SendIcon, HeartIcon } from "./icons";

export default function DetailClient({
  concept: c,
  related,
}: {
  concept: Concept;
  related: Concept[];
}) {
  const [share, setShare] = useState<Concept | null>(null);
  const router = useRouter();

  return (
    <main className="detail">
      <div className="wrap">
        <span className="back-link" onClick={() => router.push("/")}>
          <ArrowL className="ar" /> Back to today
        </span>
      </div>

      <div className="wrap">
        <div className="detail-masthead">
          <div className="d-kicker">
            <span className="kicker eyebrow-accent">{c.area}</span>
            <span className="kicker" style={{ color: "var(--ink-faint)" }}>{c.vibe}</span>
            <span className="kicker" style={{ color: "var(--ink-faint)" }}>{c.timing}</span>
          </div>
          <h1 className="detail-title">{c.title}</h1>
          <p className="detail-hook">{c.hook}</p>
        </div>
      </div>

      <div className="wrap">
        <Plate tint={c.tint} className="detail-hero" tag={c.area} />
      </div>

      <div className="wrap">
        <div className="detail-grid">
          <div className="detail-main">
            <section className="arc">
              <h3>The arc of the night</h3>
              {c.arc.map((step, i) => (
                <div className="arc-step" key={i}>
                  <div className="time">{step.t}</div>
                  <div className="desc">{step.d}</div>
                </div>
              ))}
            </section>

            <section className="moment-block">
              <span className="quote">&rdquo;</span>
              <div className="lbl">The one moment</div>
              <p className="mtext">{c.moment}</p>
            </section>
          </div>

          <aside className="facts">
            <div className="fact"><div className="ft">When</div><div className="fv">{c.timing}</div></div>
            <div className="fact"><div className="ft">The spot</div><div className="fv">{c.spot}</div></div>
            <div className="fact"><div className="ft">What to bring</div><div className="fv">{c.bring}</div></div>
            <div className="fact"><div className="ft">If it rains</div><div className="fv">{c.backup}</div></div>
            <div className="fact">
              <div className="ft">The shape of it</div>
              <div className="fv" style={{ marginTop: 10 }}>
                <MetaChips items={[c.budget, c.energy, c.stage]} />
              </div>
            </div>
            <div className="send-cta">
              <button
                className="btn btn-accent"
                onClick={() => setShare(c)}
                style={{ justifyContent: "center" }}
              >
                <SendIcon style={{ width: 16, height: 16 }} /> Send this to someone
              </button>
              <button className="btn btn-ghost" style={{ justifyContent: "center" }}>
                <HeartIcon style={{ width: 16, height: 16 }} /> Save for later
              </button>
            </div>
          </aside>
        </div>

        {related && related.length ? (
          <section className="related">
            <div className="sec-head">
              <h2>More like this</h2>
              <span className="arrow-link" onClick={() => router.push("/club")}>
                See the whole library <ArrowR className="ar" />
              </span>
            </div>
            <div className="related-grid">
              {related.map((r) => (
                <article
                  className="mini-card"
                  key={r.id}
                  onClick={() => router.push(`/dates/${r.id}`)}
                >
                  <Plate tint={r.tint} />
                  <h4>{r.title}</h4>
                  <div className="mc-meta">{r.area} &middot; {r.vibe}</div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {share && <ShareOverlay concept={share} onClose={() => setShare(null)} />}
    </main>
  );
}
