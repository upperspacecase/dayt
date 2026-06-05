import Link from "next/link";
import { MoonIcon } from "./icons";

export default function SiteFooter() {
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
          <Link href="/club">Sell a date</Link>
          <span>New York</span>
        </div>
      </div>
    </footer>
  );
}
