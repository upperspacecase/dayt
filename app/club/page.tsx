"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { dates } from "../dates";
import ConceptCard from "../concept-card";

const ENERGY = ["Low-key", "Active", "Hands-on"];
const STAGE = ["New", "Together a while", "Either"];

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 h-9 rounded-full text-sm border transition-colors ${
        active
          ? "bg-foreground text-background border-foreground"
          : "border-foreground/20 text-foreground/75 hover:border-foreground/40"
      }`}
    >
      {label}
    </button>
  );
}

export default function Club() {
  const [member, setMember] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [q, setQ] = useState("");
  const [energy, setEnergy] = useState<string[]>([]);
  const [stage, setStage] = useState<string[]>([]);

  useEffect(() => {
    setMember(localStorage.getItem("dk_club") === "true");
  }, []);

  function join() {
    localStorage.setItem("dk_club", "true");
    setMember(true);
    setShowModal(false);
  }

  function toggle(
    list: string[],
    setList: (v: string[]) => void,
    v: string,
  ) {
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return dates.filter((d) => {
      const hay =
        `${d.title} ${d.desc} ${d.location} ${d.tags.join(" ")}`.toLowerCase();
      if (needle && !hay.includes(needle)) return false;
      if (energy.length && !energy.includes(d.energy)) return false;
      if (stage.length && !stage.includes(d.stage)) return false;
      return true;
    });
  }, [q, energy, stage]);

  return (
    <div className="flex flex-col flex-1 bg-background text-foreground">
      <header className="px-8 sm:px-14 pt-8 sm:pt-10">
        <Link
          href="/"
          className="inline-block text-3xl sm:text-4xl tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Dayt Knight
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 sm:px-12 mt-12 sm:mt-16 w-full">
        {!member ? (
          <div className="w-full max-w-3xl text-center">
            <h1
              className="text-4xl sm:text-6xl tracking-tight leading-[1.05]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The whole library.
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              Unlimited dates, filtered to your neighborhood, your energy, your
              moment. The daily three are the taste. This is the rest.
            </p>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="mt-8 h-14 px-8 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors text-base"
            >
              Join the Club — free while we test
            </button>

            <div className="relative mt-14">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 blur-[6px] opacity-70 pointer-events-none select-none">
                {dates.slice(0, 6).map((c) => (
                  <ConceptCard key={c.slug} c={c} />
                ))}
              </div>
              <div className="absolute inset-0 flex items-start justify-center pt-16">
                <p className="text-foreground/70 text-base bg-background/70 rounded-md px-4 py-2">
                  Join to open all {dates.length} and filter.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-6xl">
            <div className="max-w-2xl">
              <h1
                className="text-4xl sm:text-6xl tracking-tight leading-[1.05]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                The whole library
              </h1>
              <p className="mt-3 text-foreground/70 text-base sm:text-lg">
                Filter to what tonight needs.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search a neighborhood, a vibe, a word…"
                className="h-12 px-4 rounded-md bg-transparent border border-foreground/15 placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors max-w-xl"
              />
              <div className="flex flex-wrap gap-2">
                {ENERGY.map((e) => (
                  <Chip
                    key={e}
                    label={e}
                    active={energy.includes(e)}
                    onClick={() => toggle(energy, setEnergy, e)}
                  />
                ))}
                <span className="w-px h-9 bg-foreground/10 mx-1" />
                {STAGE.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    active={stage.includes(s)}
                    onClick={() => toggle(stage, setStage, s)}
                  />
                ))}
              </div>
              <p className="text-sm text-foreground/55">
                Showing {filtered.length} of {dates.length}.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {filtered.map((c) => (
                <ConceptCard key={c.slug} c={c} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="mt-10 text-foreground/60">
                Nothing matches that yet. Loosen a filter.
              </p>
            )}
          </div>
        )}
      </main>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-6"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md rounded-md bg-background p-7 sm:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="text-2xl sm:text-3xl tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              This is where the Stripe checkout flow will be.
            </h2>
            <p className="mt-3 text-foreground/70 leading-relaxed">
              Free while we test. Click OK and come on in.
            </p>
            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={join}
                className="h-12 px-7 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
              >
                OK
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="h-12 px-5 rounded-md border border-foreground/20 text-foreground/75 hover:border-foreground/40 transition-colors"
              >
                Not yet
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-16 sm:mt-24 border-t border-foreground/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-7 flex justify-center gap-14">
          <Link
            href="/"
            className="text-foreground/85 hover:text-foreground transition-colors"
          >
            Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
