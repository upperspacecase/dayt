"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { type Concept } from "../../dates";
import DetailClient from "../../detail-client";

export default function ConceptPage() {
  const params = useParams();
  const id = String(params.id);
  const [c, setC] = useState<Concept | null | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/concepts/${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setC(d ?? null))
      .catch(() => setC(null));
  }, [id]);

  if (c === undefined) {
    return (
      <main className="detail">
        <div className="wrap" style={{ padding: "80px 0", color: "var(--ink-soft)" }}>Loading…</div>
      </main>
    );
  }
  if (c === null) {
    return (
      <main className="detail">
        <div className="wrap" style={{ maxWidth: 640 }}>
          <div className="club-head">
            <div className="lockline">Concept</div>
            <h1 className="club-title" style={{ fontSize: "clamp(30px,4vw,52px)" }}>
              This one lives on another device.
            </h1>
            <p className="club-sub">
              Concepts people create are saved locally for now. Once accounts land, any
              shared link will open anywhere.
            </p>
          </div>
        </div>
      </main>
    );
  }
  return <DetailClient concept={c} related={[]} />;
}
