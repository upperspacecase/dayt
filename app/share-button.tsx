"use client";

import { useState } from "react";

export default function ShareButton({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onShare() {
    const url = `https://daytknight.club/dates/${slug}`;
    const shareData = {
      title: `${title} — Dayt Knight`,
      text: `${title}. Want to do this with me?`,
      url,
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // fell through to clipboard
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={onShare}
      className="h-14 px-8 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors text-base"
    >
      {copied ? "Link copied" : "Send to someone you'd do it with"}
    </button>
  );
}
