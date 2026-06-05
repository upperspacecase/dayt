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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="create-field">
      <label>{label}</label>
      {children}
    </div>
  );
}

export default function Create() {
  const [f, setF] = useState({
    title: "", idea: "", area: "",
    vibe: FILTERS.Vibe[0], budget: FILTERS.Budget[1],
    energy: FILTERS.Energy[0], stage: FILTERS.Stage[1],
    creator: "", credit: "",
  });
  const [made, setMade] = useState<Concept | null>(null);
  const [share, setShare] = useState<Concept | null>(null);

  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const slug = f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
    const c: Concept = {
      id: `u_${slug}-${Date.now().toString(36)}`,
      title: f.title.trim(),
      area: f.area.trim() || "New York",
      vibe: f.vibe, budget: f.budget, energy: f.energy, stage: f.stage,
      tint: tintFor(f.title),
      timing: "", hook: f.idea.trim(),
      arc: [], spot: "", moment: "", bring: "", backup: "",
      creator: f.creator.trim() || "Anonymous",
      credit: f.credit.trim() || undefined,
    };
    await fetch("/api/concepts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(c),
    });
    setMade(c);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="detail">
      <div className="wrap" style={{ maxWidth: 620 }}>
        <div className="club-head" style={{ paddingBottom: 4 }}>
          <div className="lockline">Create &amp; share</div>
          <h1 className="club-title" style={{ fontSize: "clamp(34px,5vw,56px)" }}>
            Share a date idea.
          </h1>
          <p className="club-sub">
            One good idea is enough &mdash; the place, and what makes it. Your name stays on it.
          </p>
        </div>

        {made && (
          <div
            style={{
              margin: "22px 0", padding: "20px 22px", borderRadius: 14,
              background: "var(--surface)", border: "1px solid var(--line)",
              display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: 220 }}>
              <div className="kicker eyebrow-accent">Shared</div>
              <div className="serif" style={{ fontSize: 26, marginTop: 4 }}>{made.title}</div>
              <div style={{ color: "var(--ink-soft)", fontSize: 14, marginTop: 2 }}>by {made.creator}</div>
            </div>
            <button className="btn btn-accent" onClick={() => setShare(made)}>Send it to someone</button>
            <Link className="btn btn-ghost" href="/club">See it in the Club</Link>
          </div>
        )}

        <form onSubmit={submit} className="create-form">
          <Field label="Title">
            <input className="create-input" value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="Oysters at golden hour" required />
          </Field>
          <Field label="The idea">
            <textarea className="create-input" rows={3} value={f.idea} onChange={(e) => set("idea", e.target.value)} placeholder="Cold oysters on a Greenpoint dock while Manhattan catches fire across the river. A wine bar two blocks in for after." required />
          </Field>
          <Field label="Neighborhood">
            <input className="create-input" value={f.area} onChange={(e) => set("area", e.target.value)} placeholder="Greenpoint" />
          </Field>
          <div className="create-row">
            <Field label="Vibe">
              <select className="create-input" value={f.vibe} onChange={(e) => set("vibe", e.target.value)}>{FILTERS.Vibe.map((v) => <option key={v}>{v}</option>)}</select>
            </Field>
            <Field label="Budget">
              <select className="create-input" value={f.budget} onChange={(e) => set("budget", e.target.value)}>{FILTERS.Budget.map((v) => <option key={v}>{v}</option>)}</select>
            </Field>
          </div>
          <div className="create-row">
            <Field label="Energy">
              <select className="create-input" value={f.energy} onChange={(e) => set("energy", e.target.value)}>{FILTERS.Energy.map((v) => <option key={v}>{v}</option>)}</select>
            </Field>
            <Field label="Stage">
              <select className="create-input" value={f.stage} onChange={(e) => set("stage", e.target.value)}>{FILTERS.Stage.map((v) => <option key={v}>{v}</option>)}</select>
            </Field>
          </div>
          <div className="create-row">
            <Field label="Your name">
              <input className="create-input" value={f.creator} onChange={(e) => set("creator", e.target.value)} placeholder="So you get the credit" />
            </Field>
            <Field label="Your link (optional)">
              <input className="create-input" value={f.credit} onChange={(e) => set("credit", e.target.value)} placeholder="https://…" />
            </Field>
          </div>
          <button type="submit" className="btn btn-accent" style={{ marginTop: 4, alignSelf: "flex-start" }}>Share it</button>
        </form>
      </div>

      {share && <ShareOverlay concept={share} onClose={() => setShare(null)} />}
    </main>
  );
}
