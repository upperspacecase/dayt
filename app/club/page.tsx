"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Plate from "../plate";
import ShareOverlay from "../share-overlay";
import { CONCEPTS, FILTERS, type Concept } from "../dates";
import { SendIcon, LockIcon } from "../icons";

const FIELD: Record<string, keyof Concept> = {
  Area: "area",
  Vibe: "vibe",
  Budget: "budget",
  Energy: "energy",
  Stage: "stage",
};
const HEIGHTS = ["h-tall", "h-mid", "h-short", "h-mid", "h-tall", "h-short"];

function GCard({
  c,
  h,
  onOpen,
  onShare,
}: {
  c: Concept;
  h: string;
  onOpen: () => void;
  onShare: () => void;
}) {
  return (
    <article className={"gcard " + h} onClick={onOpen}>
      <Plate tint={c.tint} scrim />
      <div className="gbody">
        <div className="gkicker">{c.area} &middot; {c.vibe}</div>
        <h3>{c.title}</h3>
        <div className="gfoot">
          <span className="gmeta">
            {c.creator ? `by ${c.creator}` : `${c.budget} · ${c.energy}`}
          </span>
          <button
            className="gshare"
            onClick={(e) => { e.stopPropagation(); onShare(); }}
            aria-label="Send"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Club() {
  const router = useRouter();
  const [member, setMember] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState<Record<string, string[]>>({});
  const [share, setShare] = useState<Concept | null>(null);
  const [userConcepts, setUserConcepts] = useState<Concept[]>([]);

  useEffect(() => {
    setMember(localStorage.getItem("dk_club") === "true");
    fetch("/api/concepts")
      .then((r) => r.json())
      .then((d) => setUserConcepts(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  function join() {
    localStorage.setItem("dk_club", "true");
    setMember(true);
    setShowModal(false);
  }

  function toggle(group: string, val: string) {
    setActive((prev) => {
      const cur = new Set(prev[group] || []);
      if (cur.has(val)) cur.delete(val);
      else cur.add(val);
      return { ...prev, [group]: [...cur] };
    });
  }
  const clearAll = () => setActive({});
  const activeCount = Object.values(active).reduce((s, a) => s + (a ? a.length : 0), 0);

  const library = [...userConcepts, ...CONCEPTS];
  const shown = library.filter((c) =>
    Object.keys(FIELD).every((group) => {
      const sel = active[group];
      if (!sel || !sel.length) return true;
      return sel.includes(c[FIELD[group]] as string);
    }),
  );

  const open = (c: Concept) =>
    router.push(c.id.startsWith("u_") ? `/concept/${c.id}` : `/dates/${c.id}`);

  if (!member) {
    return (
      <main className="club">
        <div className="wrap-wide">
          <div className="club-head">
            <div className="lockline"><LockIcon /> Members&rsquo; library</div>
            <h1 className="club-title">The whole library.</h1>
            <p className="club-sub">
              Each concept we&rsquo;ve dreamt up &mdash; unlimited, and filtered down to your
              neighborhood, your budget, your kind of night. Free while we&rsquo;re testing.
            </p>
            <button
              className="btn btn-accent"
              style={{ marginTop: 22 }}
              onClick={() => setShowModal(true)}
            >
              Join the Club &mdash; free while we test
            </button>
          </div>

          <div style={{ position: "relative" }}>
            <div
              className="club-grid"
              style={{ filter: "blur(7px)", opacity: 0.6, pointerEvents: "none", userSelect: "none" }}
            >
              {CONCEPTS.slice(0, 6).map((c, i) => (
                <div className={"gcard " + HEIGHTS[i % HEIGHTS.length]} key={c.id}>
                  <Plate tint={c.tint} scrim />
                  <div className="gbody">
                    <div className="gkicker">{c.area} &middot; {c.vibe}</div>
                    <h3>{c.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showModal && <JoinModal onJoin={join} onClose={() => setShowModal(false)} />}
      </main>
    );
  }

  return (
    <main className="club">
      <div className="wrap-wide club-head">
        <div className="lockline"><LockIcon /> Members&rsquo; library</div>
        <h1 className="club-title">The whole library, open.</h1>
        <p className="club-sub">
          Each concept we&rsquo;ve dreamt up &mdash; unlimited, and filtered down to your
          neighborhood, your budget, your kind of night. Pick a thread and pull.
        </p>
      </div>

      <div className="filters">
        <div className="wrap-wide frow">
          {Object.keys(FILTERS).map((group, gi) => (
            <span key={group} style={{ display: "contents" }}>
              {gi > 0 ? <span className="fdiv" /> : null}
              <div className="filter-group">
                <span className="glabel">{group}</span>
                {FILTERS[group].map((val) => {
                  const on = (active[group] || []).includes(val);
                  return (
                    <button
                      key={val}
                      className={"fchip" + (on ? " on" : "")}
                      onClick={() => toggle(group, val)}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </span>
          ))}
          {activeCount ? (
            <>
              <span className="fdiv" />
              <span className="clearf" onClick={clearAll}>Clear ({activeCount})</span>
            </>
          ) : null}
        </div>
      </div>

      <div className="wrap-wide">
        {shown.length ? (
          <div className="club-grid">
            {shown.map((c, i) => (
              <GCard
                key={c.id}
                c={c}
                h={HEIGHTS[i % HEIGHTS.length]}
                onOpen={() => open(c)}
                onShare={() => setShare(c)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="es-title">Nothing matches &mdash; yet.</div>
            <p>
              Loosen a filter, or{" "}
              <span style={{ color: "var(--accent)", cursor: "pointer" }} onClick={clearAll}>
                clear them all
              </span>{" "}
              and browse the full shelf.
            </p>
          </div>
        )}
      </div>

      {share && <ShareOverlay concept={share} onClose={() => setShare(null)} />}
    </main>
  );
}

function JoinModal({ onJoin, onClose }: { onJoin: () => void; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(8,5,3,0.6)", backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 440, background: "var(--surface)",
          border: "1px solid var(--line)", borderRadius: 14, padding: 34,
          boxShadow: "0 40px 90px -30px rgba(0,0,0,0.6)",
        }}
      >
        <h2
          className="serif"
          style={{ fontSize: 32, lineHeight: 1.04, letterSpacing: "var(--display-tight)", margin: 0 }}
        >
          This is where the Stripe checkout flow will be.
        </h2>
        <p style={{ color: "var(--ink-soft)", margin: "14px 0 26px", lineHeight: 1.5 }}>
          Free while we test. Click OK and come on in.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-accent" onClick={onJoin}>OK</button>
          <button className="btn btn-ghost" onClick={onClose}>Not yet</button>
        </div>
      </div>
    </div>
  );
}
