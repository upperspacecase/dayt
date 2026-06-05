"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { type Concept } from "../dates";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function Admin() {
  const [gtoken, setGtoken] = useState("");
  const [key, setKey] = useState("");
  const [drafts, setDrafts] = useState<Concept[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (CLIENT_ID) return; // Google configured -> Google only
    const saved = localStorage.getItem("dk_admin_key") || "";
    setKey(saved);
    if (saved) loadWithKey(saved);
  }, []);

  function initGoogle() {
    const g = (window as unknown as { google?: any }).google;
    if (!g || !CLIENT_ID) return;
    g.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: (resp: { credential: string }) => {
        setGtoken(resp.credential);
        loadWithGoogle(resp.credential);
      },
    });
    const el = document.getElementById("gbtn");
    if (el) g.accounts.id.renderButton(el, { theme: "outline", size: "large", text: "signin_with", shape: "pill" });
    g.accounts.id.prompt(); // One Tap
  }

  function handle(ok: boolean, status: number, data: Concept[] | null) {
    if (!ok) {
      setError(status === 401 ? "Not you — that account isn't allowed." : "Could not load the queue.");
      setDrafts(null);
      return;
    }
    setError("");
    setDrafts(data);
  }

  async function loadWithGoogle(token: string) {
    const r = await fetch("/api/admin/concepts", { headers: { Authorization: `Bearer ${token}` } });
    handle(r.ok, r.status, r.ok ? await r.json() : null);
  }

  async function loadWithKey(k: string) {
    const r = await fetch(`/api/admin/concepts?token=${encodeURIComponent(k)}`);
    if (r.ok) localStorage.setItem("dk_admin_key", k);
    handle(r.ok, r.status, r.ok ? await r.json() : null);
  }

  async function act(id: string, action: "publish" | "reject") {
    setDrafts((d) => (d ? d.filter((c) => c.id !== id) : d));
    await fetch("/api/admin/concepts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ googleToken: gtoken || undefined, token: key || undefined, id, action }),
    });
  }

  return (
    <main className="club">
      {CLIENT_ID && (
        <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={initGoogle} />
      )}
      <div className="wrap-wide">
        <div className="club-head">
          <div className="lockline">The engine</div>
          <h1 className="club-title">Review queue.</h1>
          <p className="club-sub">
            Concepts the engine drafted overnight, sourced and credited. Approve the good
            ones and they go live in the Club. Pass on the rest.
          </p>

          {!drafts && (
            <div style={{ marginTop: 22 }}>
              {CLIENT_ID ? (
                <div id="gbtn" />
              ) : (
                <div style={{ display: "flex", gap: 10, maxWidth: 460 }}>
                  <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && loadWithKey(key)}
                    placeholder="Editor key"
                    style={{
                      flex: 1, height: 46, padding: "0 14px", borderRadius: 10,
                      background: "var(--surface)", border: "1px solid var(--line)",
                      color: "var(--ink)", fontFamily: "var(--font-body)", fontSize: 15,
                    }}
                  />
                  <button className="btn btn-accent" onClick={() => loadWithKey(key)}>Open</button>
                </div>
              )}
              {error ? <p style={{ color: "var(--accent)", marginTop: 12 }}>{error}</p> : null}
            </div>
          )}
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
              <p>The engine refills it overnight.</p>
            </div>
          )
        )}
      </div>
    </main>
  );
}
