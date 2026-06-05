"use client";

import { useEffect, useState } from "react";
import { type Concept } from "../dates";
import GoogleSignIn, { GOOGLE_CLIENT_ID, decodeToken } from "../google-signin";

const GOOGLE_ON = !!GOOGLE_CLIENT_ID;
const ADMIN_EMAIL = "taytoddpattison@gmail.com";

function Head() {
  return (
    <div className="club-head">
      <div className="lockline">The engine</div>
      <h1 className="club-title">Review queue.</h1>
      <p className="club-sub">
        Concepts the engine drafted overnight, sourced and credited. Approve the good
        ones and they go live in the Club. Pass on the rest.
      </p>
    </div>
  );
}

// Loads + renders the drafts. google = a Google ID token; keyToken = the editor-key.
function Queue({ google, keyToken }: { google?: string; keyToken?: string }) {
  const [drafts, setDrafts] = useState<Concept[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const url = keyToken ? `/api/admin/concepts?token=${encodeURIComponent(keyToken)}` : "/api/admin/concepts";
    const headers: HeadersInit = google ? { Authorization: `Bearer ${google}` } : {};
    fetch(url, { headers })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setDrafts)
      .catch((s) => setError(s === 401 ? "That account isn't allowed." : "Could not load the queue."));
  }, [google, keyToken]);

  async function act(id: string, action: "publish" | "reject") {
    setDrafts((d) => (d ? d.filter((c) => c.id !== id) : d));
    await fetch("/api/admin/concepts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action, googleToken: google, token: keyToken }),
    });
  }

  if (error) return <p style={{ color: "var(--accent)", marginTop: 16 }}>{error}</p>;
  if (!drafts) return <p style={{ color: "var(--ink-soft)", marginTop: 16 }}>Loading&hellip;</p>;
  if (!drafts.length) {
    return (
      <div className="empty-state">
        <div className="es-title">Queue&rsquo;s empty.</div>
        <p>The engine refills it overnight.</p>
      </div>
    );
  }
  return (
    <div style={{ display: "grid", gap: 16, margin: "20px 0 80px" }}>
      {drafts.map((c) => (
        <article key={c.id} style={{ padding: "22px 24px", borderRadius: 14, background: "var(--surface)", border: "1px solid var(--line)" }}>
          <div className="gkicker">{c.area} &middot; {c.vibe} &middot; {c.budget} &middot; {c.energy} &middot; {c.stage}</div>
          <h3 className="serif" style={{ fontSize: 28, margin: "6px 0 4px", letterSpacing: "var(--display-tight)" }}>{c.title}</h3>
          <p style={{ color: "var(--ink-soft)", margin: "0 0 12px", lineHeight: 1.5 }}>{c.hook}</p>
          {c.arc.length ? (
            <ol style={{ margin: "0 0 14px", paddingLeft: 0, listStyle: "none", display: "grid", gap: 6 }}>
              {c.arc.map((s, i) => (
                <li key={i} style={{ fontSize: 14, color: "var(--ink-soft)" }}>
                  <strong style={{ color: "var(--ink)" }}>{s.t}</strong> &nbsp;{s.d}
                </li>
              ))}
            </ol>
          ) : null}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn btn-accent" onClick={() => act(c.id, "publish")}>Publish</button>
            <button className="btn btn-ghost" onClick={() => act(c.id, "reject")}>Pass</button>
            {c.credit ? (
              <a href={c.credit} target="_blank" rel="noreferrer" style={{ marginLeft: "auto", fontSize: 13, color: "var(--accent)" }}>inspiration source</a>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

// Google path: One Tap / sign-in, then only the allowed email sees the queue.
function GoogleInner() {
  const [token, setToken] = useState("");
  if (token) {
    const email = decodeToken(token).email?.toLowerCase();
    if (email && email !== ADMIN_EMAIL) {
      return <p style={{ color: "var(--accent)", marginTop: 16 }}>Signed in as {email} &mdash; this queue is {ADMIN_EMAIL} only.</p>;
    }
    return <Queue google={token} />;
  }
  return (
    <div style={{ marginTop: 22 }}>
      <GoogleSignIn onToken={setToken} />
    </div>
  );
}

// Editor-key fallback (used until the Google client ID is set).
function KeyGate() {
  const [key, setKey] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const s = localStorage.getItem("dk_admin_key") || "";
    if (s) { setKey(s); setOpen(true); }
  }, []);
  function go() {
    localStorage.setItem("dk_admin_key", key);
    setOpen(true);
  }
  if (open) return <Queue keyToken={key} />;
  return (
    <div style={{ display: "flex", gap: 10, maxWidth: 460, marginTop: 22 }}>
      <input
        type="password" value={key} onChange={(e) => setKey(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && go()} placeholder="Editor key"
        style={{ flex: 1, height: 46, padding: "0 14px", borderRadius: 10, background: "var(--surface)", border: "1px solid var(--line)", color: "var(--ink)", fontFamily: "var(--font-body)", fontSize: 15 }}
      />
      <button className="btn btn-accent" onClick={go}>Open</button>
    </div>
  );
}

export default function Admin() {
  return (
    <main className="club">
      <div className="wrap-wide">
        <Head />
        {GOOGLE_ON ? <GoogleInner /> : <KeyGate />}
      </div>
    </main>
  );
}
