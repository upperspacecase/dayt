"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoonIcon } from "./icons";

export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null; // landing is hero-only
  return (
    <footer className="site-foot">
      <div className="wrap-wide foot-grid">
        <div className="fbrand">
          <Link href="/" className="brand">
            <MoonIcon className="moon" />
            <span className="word">Dayt Knight</span>
          </Link>
          <div className="ftag">
            Three new ways to fall for someone, each day. Dating, without the admin.
          </div>
        </div>
        <div className="foot-links">
          <Link href="/">Today</Link>
          <Link href="/club">The Club</Link>
          <Link href="/create">Create</Link>
          <Link href="/about">About</Link>
          <Link href="/concierge">Concierge</Link>
          <Link href="/saved">Saved</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
