"use client";

import { useEffect, useState } from "react";
import { type Concept } from "../dates";

export default function Admin() {
  const [key, setKey] = useState("");
  const [drafts, setDrafts] = useState<Concept[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("dk_admin_key") || "";
    setKey(saved);
    if (saved) load(saved);
  }, []);

  async function load(k: string) {
    setError("");
    const r = await fetch(`/api/admin/concepts?token=${encodeURIComponent(k)}`);
    if (!r.ok) {
      setError(r.status === 401 ? "Wrong key." : "Could not load the queue.");
      setDrafts(null);
      return;
    }
    localStorage.setItem("dk_admin_key", k);
    setDrafts(await r.json());
  }

  async function act(id: string, action: "publish" | "reject") {
    setDrafts((d) => (d ? d.filter((c) => c.id !== id) : d));
    await fetch("/api/admin/concepts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: key, id, action }),
    });
  }

  return (
    <main className="club">
      <div className="wrap-wide">
        <div className="club-head">
          <div className="lockline">The engine</div>
          <h1 className="club-title">Review queue.</h1>
          <p className="club-sub">
            Concepts the engine drafted overnight, sourced and credited. Approve the good
            ones and they go live in the Club. Pass on the rest.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 20, maxWidth: 460 }}>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && load(key)}
              placeholder="Editor key"
              style={{
                flex: 1, height: 46, padding: "0 14px", borderRadius: 10,
                background: "var(--surface)", border: "1px solid var(--line)",
                color: "var(--ink)", fontFamily: "var(--font-body)", fontSize: 15,
              }}
            />
            <button className="btn btn-accent" onClick={() => load(key)}>Open</button>
          </div>
          {error ? <p style={{ color: "var(--accent)", marginTop: 12 }}>{error}</p> : null}
        </div>

        {drafts && (
          drafts.length ? (
            <div style={{ display: "grid", gap: 16, margin: "8px 0 80px" }}>
              {drafts.map((c) => (
                <article
                  key={c.id}
                  style={{
                    padding: "22px 24px", borderRadius: 14,
                    background: "var(--surface)", border: "1px solid var(--line)",
                  }}
                >
                  <div className="gkicker">{c.area} &middot; {c.vibe} &middot; {c.budget} &middot; {c.energy} &middot; {c.stage}</div>
                  <h3 className="serif" style={{ fontSize: 28, margin: "6px 0 4px", letterSpacing: "var(--display-tight)" }}>{c.title}</h3>
                  <p style={{ color: "var(--ink-soft)", margin: "0 0 12px", lineHeight: 1.5 }}>{c.hook}</p>
                  <ol style={{ margin: "0 0 14px", paddingLeft: 0, listStyle: "none", display: "grid", gap: 6 }}>
                    {c.arc.map((s, i) => (
                      <li key={i} style={{ fontSize: 14, color: "var(--ink-soft)" }}>
                        <strong style={{ color: "var(--ink)" }}>{s.t}</strong> &nbsp;{s.d}
                      </li>
                    ))}
                  </ol>
                  <p style={{ fontSize: 13.5, color: "var(--ink-faint)", margin: "0 0 16px" }}>
                    The moment: {c.moment}
                  </p>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <button className="btn btn-accent" onClick={() => act(c.id, "publish")}>Publish</button>
                    <button className="btn btn-ghost" onClick={() => act(c.id, "reject")}>Pass</button>
                    {c.credit ? (
                      <a href={c.credit} target="_blank" rel="noreferrer" style={{ marginLeft: "auto", fontSize: 13, color: "var(--accent)" }}>
                        inspiration source
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="es-title">Queue&rsquo;s empty.</div>
              <p>Run the engine to draft a fresh batch.</p>
            </div>
          )
        )}
      </div>
    </main>
  );
}
