"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CONCEPTS, type Concept } from "../../dates";
import Plate from "../../plate";

const HEIGHTS = ["h-tall", "h-mid", "h-short", "h-mid", "h-tall", "h-short"];

export default function CreatorPage() {
  const params = useParams();
  const name = decodeURIComponent(String(params.name));
  const router = useRouter();
  const [list, setList] = useState<Concept[]>([]);

  useEffect(() => {
    fetch(`/api/concepts?creator=${encodeURIComponent(name)}`)
      .then((r) => r.json())
      .then((user: Concept[]) => {
        const staticMatches = CONCEPTS.filter(
          (c) => (c.creator || "").toLowerCase() === name.toLowerCase(),
        );
        setList([...(Array.isArray(user) ? user : []), ...staticMatches]);
      })
      .catch(() => setList([]));
  }, [name]);

  const credit = list.find((c) => c.credit)?.credit;

  return (
    <main className="club">
      <div className="wrap-wide">
        <div className="club-head">
          <div className="lockline">Creator</div>
          <h1 className="club-title">{name}</h1>
          <p className="club-sub">
            {list.length} date {list.length === 1 ? "concept" : "concepts"} on Dayt Knight.
            {credit ? (
              <>
                {" "}&middot;{" "}
                <a href={credit} target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>
                  their link
                </a>
              </>
            ) : null}
          </p>
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
            <div className="es-title">No concepts yet.</div>
            <p>This creator hasn&rsquo;t shared a date here yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
