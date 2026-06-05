"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type Concept } from "../dates";
import Plate from "../plate";

const HEIGHTS = ["h-tall", "h-mid", "h-short", "h-mid", "h-tall", "h-short"];

export default function Saved() {
  const router = useRouter();
  const [list, setList] = useState<Concept[]>([]);

  useEffect(() => {
    try {
      setList(JSON.parse(localStorage.getItem("dk_saved") || "[]"));
    } catch {}
  }, []);

  return (
    <main className="club">
      <div className="wrap-wide">
        <div className="club-head">
          <div className="lockline">Saved</div>
          <h1 className="club-title">Your saved dates.</h1>
          <p className="club-sub">The nights you bookmarked for later.</p>
        </div>

        {list.length ? (
          <div className="club-grid">
            {list.map((c, i) => (
              <article
                key={c.id}
                className={"gcard " + HEIGHTS[i % HEIGHTS.length]}
                onClick={() => router.push(c.id.startsWith("u_") ? `/concept/${c.id}` : `/dates/${c.id}`)}
              >
                <Plate tint={c.tint} scrim />
                <div className="gbody">
                  <div className="gkicker">{c.area} &middot; {c.vibe}</div>
                  <h3>{c.title}</h3>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="es-title">Nothing saved yet.</div>
            <p>Open a date and tap &ldquo;Save for later&rdquo; to keep it here.</p>
          </div>
        )}
      </div>
    </main>
  );
}
