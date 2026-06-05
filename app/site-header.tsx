"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoonIcon } from "./icons";

export default function SiteHeader() {
  const pathname = usePathname();
  const onLanding = pathname === "/";
  const onClub = pathname === "/club";

  return (
    <header className="site-head">
      <div className="wrap-wide bar">
        <Link href="/" className="brand">
          <MoonIcon className="moon" />
          <span className="word">Dayt Knight</span>
        </Link>
        <nav className="nav">
          <Link href="/" className={onLanding ? "active" : ""}>Today</Link>
          <Link href="/club" className={onClub ? "active" : ""}>The Club</Link>
          <Link href="/create" className="nav-hide">Create a date</Link>
          <Link href="/club" className="btn btn-accent btn-sm" style={{ marginLeft: 8 }}>
            Join the Club
          </Link>
        </nav>
      </div>
    </header>
  );
}
