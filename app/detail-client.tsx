"use client";

import { useState } from "react";
import Link from "next/link";
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
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const has = (v?: string) => !!v && v.trim() !== "" && v !== "—";
  const hasArc = Array.isArray(c.arc) && c.arc.length > 0;
  const hasMoment = has(c.moment);
  const simple = !hasArc && !hasMoment; // a plain idea, not a full itinerary

  function save() {
    try {
      const list: Concept[] = JSON.parse(localStorage.getItem("dk_saved") || "[]");
      if (!list.find((x) => x.id === c.id)) {
        list.unshift(c);
        localStorage.setItem("dk_saved", JSON.stringify(list));
      }
      setSaved(true);
    } catch {}
  }

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
            {has(c.timing) ? <span className="kicker" style={{ color: "var(--ink-faint)" }}>{c.timing}</span> : null}
          </div>
          <h1 className="detail-title">{c.title}</h1>
          <p className="detail-hook">{c.hook}</p>
        </div>
      </div>

      <div className="wrap">
        <Plate tint={c.tint} className="detail-hero" tag={c.area} />
      </div>

      <div className="wrap">
        <div className={"detail-grid" + (simple ? " simple" : "")}>
          {!simple && (
            <div className="detail-main">
              {hasArc ? (
                <section className="arc">
                  <h3>The arc of the night</h3>
                  {c.arc.map((step, i) => (
                    <div className="arc-step" key={i}>
                      <div className="time">{step.t}</div>
                      <div className="desc">{step.d}</div>
                    </div>
                  ))}
                </section>
              ) : null}

              {hasMoment ? (
                <section className="moment-block">
                  <span className="quote">&rdquo;</span>
                  <div className="lbl">The one moment</div>
                  <p className="mtext">{c.moment}</p>
                </section>
              ) : null}
            </div>
          )}

          <aside className="facts">
            {has(c.timing) ? <div className="fact"><div className="ft">When</div><div className="fv">{c.timing}</div></div> : null}
            {has(c.spot) ? <div className="fact"><div className="ft">The spot</div><div className="fv">{c.spot}</div></div> : null}
            {has(c.bring) ? <div className="fact"><div className="ft">What to bring</div><div className="fv">{c.bring}</div></div> : null}
            {has(c.backup) ? <div className="fact"><div className="ft">If it rains</div><div className="fv">{c.backup}</div></div> : null}
            <div className="fact">
              <div className="ft">The shape of it</div>
              <div className="fv" style={{ marginTop: 10 }}>
                <MetaChips items={[c.budget, c.energy, c.stage]} />
              </div>
            </div>
            {c.creator ? (
              <div className="fact">
                <div className="ft">By</div>
                <div className="fv">
                  <Link href={`/creator/${encodeURIComponent(c.creator)}`} style={{ color: "var(--accent)" }}>
                    {c.creator}
                  </Link>
                  {c.credit ? (
                    <>
                      {" "}&middot;{" "}
                      <a href={c.credit} target="_blank" rel="noreferrer" style={{ color: "var(--ink-soft)" }}>
                        their link
                      </a>
                    </>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div className="send-cta">
              <button
                className="btn btn-accent"
                onClick={() => setShare(c)}
                style={{ justifyContent: "center" }}
              >
                <SendIcon style={{ width: 16, height: 16 }} /> Send this to someone
              </button>
              <button className="btn btn-ghost" onClick={save} style={{ justifyContent: "center" }}>
                <HeartIcon style={{ width: 16, height: 16 }} /> {saved ? "Saved" : "Save for later"}
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
