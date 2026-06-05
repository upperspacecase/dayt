"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoonIcon, CloseIcon } from "./icons";

const Hamburger = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="20" height="20">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onLanding = pathname === "/";
  const onClub = pathname === "/club";

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-head">
      <div className="wrap-wide bar">
        <Link href="/" className="brand">
          <MoonIcon className="moon" />
          <span className="word">Dayt Knight</span>
        </Link>
        <button
          className="nav-toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <Hamburger />}
        </button>
        <nav className={"nav" + (open ? " open" : "")}>
          <Link href="/" className={onLanding ? "active" : ""}>Today</Link>
          <Link href="/club" className={onClub ? "active" : ""}>The Club</Link>
          <Link href="/create">Create a date</Link>
          <Link href="/club" className="btn btn-accent btn-sm" style={{ marginLeft: 8 }}>
            Join the Club
          </Link>
        </nav>
      </div>
    </header>
  );
}
