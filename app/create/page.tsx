"use client";

import { useState } from "react";
import Link from "next/link";
import ShareOverlay from "../share-overlay";
import { FILTERS, type Concept } from "../dates";

const TINTS = ["#E8A06A", "#C7553B", "#D98841", "#B06A7E", "#9A6B8A", "#7E9B5F", "#5E83A6", "#C98A53"];

function tintFor(seed: string) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return TINTS[h % TINTS.length];
}

function field(label: string, node: React.ReactNode, full = false) {
  return (
    <div className="flex flex-col gap-1.5" style={{ gridColumn: full ? "1 / -1" : undefined }}>
      <label className="kicker" style={{ letterSpacing: "0.14em" }}>{label}</label>
      {node}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  height: 46, padding: "0 14px", borderRadius: 10,
  background: "var(--surface)", border: "1px solid var(--line)",
  color: "var(--ink)", fontFamily: "var(--font-body)", fontSize: 15,
};
const areaStyle: React.CSSProperties = { ...inputStyle, height: "auto", padding: "12px 14px", resize: "vertical" };

export default function Create() {
  const [f, setF] = useState({
    title: "", hook: "", area: "", vibe: FILTERS.Vibe[0], budget: FILTERS.Budget[1],
    energy: FILTERS.Energy[0], stage: FILTERS.Stage[1], timing: "", arc: "",
    moment: "", spot: "", bring: "", backup: "", creator: "", credit: "",
  });
  const [made, setMade] = useState<Concept | null>(null);
  const [share, setShare] = useState<Concept | null>(null);

  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const id = "u_" + f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) + "-" + Date.now().toString(36);
    const arc = f.arc
      .split("\n").map((l) => l.trim()).filter(Boolean)
      .map((line) => {
        const m = line.match(/^(\d{1,2}[:.]?\d{0,2}\s*(?:am|pm)?)\s*[—\-|:]\s*(.+)$/i);
        return m ? { t: m[1], d: m[2] } : { t: "·", d: line };
      });
    const c: Concept = {
      id, title: f.title.trim(), area: f.area.trim() || "New York",
      vibe: f.vibe, budget: f.budget, energy: f.energy, stage: f.stage,
      tint: tintFor(f.title), timing: f.timing.trim() || "Anytime",
      hook: f.hook.trim(), arc: arc.length ? arc : [{ t: "·", d: "Add the steps of the night." }],
      spot: f.spot.trim() || "—", moment: f.moment.trim() || f.hook.trim(),
      bring: f.bring.trim() || "—", backup: f.backup.trim() || "—",
      creator: f.creator.trim() || "Anonymous",
      credit: f.credit.trim() || undefined,
    };
    const store = JSON.parse(localStorage.getItem("dk_concepts") || "[]");
    store.unshift(c);
    localStorage.setItem("dk_concepts", JSON.stringify(store));
    setMade(c);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="detail">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="club-head" style={{ paddingBottom: 0 }}>
          <div className="lockline">Create &amp; share</div>
          <h1 className="club-title" style={{ fontSize: "clamp(36px,5vw,64px)" }}>
            Make a date concept.
          </h1>
          <p className="club-sub">
            You know a night this city does well. Write it up &mdash; the place, the flow, the
            one moment &mdash; and share it. Your name stays on it.
          </p>
        </div>

        {made && (
          <div
            style={{
              margin: "24px 0", padding: "20px 22px", borderRadius: 14,
              background: "var(--surface)", border: "1px solid var(--line)",
              display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: 220 }}>
              <div className="kicker eyebrow-accent">Saved to your Club</div>
              <div className="serif" style={{ fontSize: 26, marginTop: 4 }}>{made.title}</div>
              <div style={{ color: "var(--ink-soft)", fontSize: 14, marginTop: 2 }}>
                by {made.creator}
              </div>
            </div>
            <button className="btn btn-accent" onClick={() => setShare(made)}>Share it</button>
            <Link className="btn btn-ghost" href="/club">See it in the Club</Link>
          </div>
        )}

        <form
          onSubmit={submit}
          style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
            margin: "28px 0 80px",
          }}
        >
          {field("Title", <input style={inputStyle} value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="The Last Light on the Water" required />, true)}
          {field("The hook (one line)", <input style={inputStyle} value={f.hook} onChange={(e) => set("hook", e.target.value)} placeholder="Oysters on a dock while the skyline catches fire." required />, true)}
          {field("Neighborhood", <input style={inputStyle} value={f.area} onChange={(e) => set("area", e.target.value)} placeholder="Greenpoint" />)}
          {field("When", <input style={inputStyle} value={f.timing} onChange={(e) => set("timing", e.target.value)} placeholder="Friday, by 7:10pm" />)}
          {field("Vibe", <select style={inputStyle} value={f.vibe} onChange={(e) => set("vibe", e.target.value)}>{FILTERS.Vibe.map((v) => <option key={v}>{v}</option>)}</select>)}
          {field("Budget", <select style={inputStyle} value={f.budget} onChange={(e) => set("budget", e.target.value)}>{FILTERS.Budget.map((v) => <option key={v}>{v}</option>)}</select>)}
          {field("Energy", <select style={inputStyle} value={f.energy} onChange={(e) => set("energy", e.target.value)}>{FILTERS.Energy.map((v) => <option key={v}>{v}</option>)}</select>)}
          {field("Stage", <select style={inputStyle} value={f.stage} onChange={(e) => set("stage", e.target.value)}>{FILTERS.Stage.map((v) => <option key={v}>{v}</option>)}</select>)}
          {field("The arc (one beat per line, optional \"7:10 — ...\")", <textarea style={areaStyle} rows={4} value={f.arc} onChange={(e) => set("arc", e.target.value)} placeholder={"7:10 — Oysters on the dock\n8:14 — Sunset goes molten\n9:00 — Nightcap two blocks in"} />, true)}
          {field("The one moment", <textarea style={areaStyle} rows={2} value={f.moment} onChange={(e) => set("moment", e.target.value)} placeholder="The beat that makes the night." />, true)}
          {field("The spot", <input style={inputStyle} value={f.spot} onChange={(e) => set("spot", e.target.value)} placeholder="The end of India Street" />)}
          {field("What to bring", <input style={inputStyle} value={f.bring} onChange={(e) => set("bring", e.target.value)} placeholder="A sweater and cash" />)}
          {field("If it rains", <input style={inputStyle} value={f.backup} onChange={(e) => set("backup", e.target.value)} placeholder="The wine bar two blocks in" />, true)}
          {field("Your name", <input style={inputStyle} value={f.creator} onChange={(e) => set("creator", e.target.value)} placeholder="So you get the credit" />)}
          {field("Your link (site / @handle)", <input style={inputStyle} value={f.credit} onChange={(e) => set("credit", e.target.value)} placeholder="https://…" />)}

          <div style={{ gridColumn: "1 / -1", marginTop: 8 }}>
            <button type="submit" className="btn btn-accent">Save &amp; share my concept</button>
          </div>
        </form>
      </div>

      {share && <ShareOverlay concept={share} onClose={() => setShare(null)} />}
    </main>
  );
}
