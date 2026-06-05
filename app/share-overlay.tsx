"use client";

import { useEffect, useState } from "react";
import Plate from "./plate";
import { type Concept } from "./dates";
import { MoonIcon, MessageIcon, StoryIcon, LinkIcon, CloseIcon } from "./icons";

export default function ShareOverlay({
  concept,
  onClose,
}: {
  concept: Concept;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function copy() {
    const url = `https://daytknight.club/dates/${concept.id}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="share-back" onClick={onClose}>
      <button className="share-close" onClick={onClose} aria-label="Close">
        <CloseIcon />
      </button>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <div className="share-card">
          <Plate tint={concept.tint}>
            <div
              className="scrim-bottom"
              style={{
                background:
                  "linear-gradient(to top, rgba(12,8,5,0.9) 8%, rgba(12,8,5,0.25) 55%, rgba(12,8,5,0.45) 100%)",
              }}
            />
            <div className="sc-body">
              <div className="sc-brand">
                <MoonIcon className="moon" /> Dayt Knight
              </div>
              <div>
                <div className="sc-kicker">
                  {concept.area} &middot; {concept.vibe}
                </div>
                <h3 className="sc-title">{concept.title}</h3>
                <div className="sc-moment">{concept.hook}</div>
                <div className="sc-caption">
                  &ldquo;Send this to someone you&rsquo;d do it with.&rdquo;
                </div>
              </div>
            </div>
          </Plate>
        </div>
        <div className="share-actions">
          <div className="sa-eyebrow">The whole point</div>
          <h3>Send it to someone.</h3>
          <p>
            A night this good deserves a co-conspirator. Drop it in a DM and let the
            anticipation do the rest.
          </p>
          <div className="sa-list">
            <button className="sa-btn primary" onClick={copy}>
              <span className="ico"><MessageIcon /></span> Send in a message
            </button>
            <button className="sa-btn" onClick={copy}>
              <span className="ico"><StoryIcon /></span> Share to a story
            </button>
            <button className="sa-btn" onClick={copy}>
              <span className="ico"><LinkIcon /></span> Copy link
              {copied ? <span className="copied">Copied</span> : null}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
