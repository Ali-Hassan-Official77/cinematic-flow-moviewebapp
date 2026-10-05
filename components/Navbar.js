 "use client";

import { useEffect, useState } from "react";
import { Bookmark, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  ["/", "Discover"],
  ["/genre/28", "Action"],
  ["/genre/18", "Drama"],
  ["/genre/27", "Horror"],
  ["/genre/35", "Comedy"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className={pathname === href ? "nav-link active" : "nav-link"}>{label}</Link>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="nav-search"><SearchBar /></div>
          <ThemeToggle />
          <Link href="/watchlist" className="watch-nav"><Bookmark size={16} /><span>Watchlist</span></Link>
        </div>

        <div className="mobile-actions">
          <ThemeToggle />
          <button className="menu-button" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          <SearchBar />
          <div className="mobile-nav-links">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="mobile-link">{label}<span>→</span></Link>
            ))}
            <Link href="/watchlist" className="mobile-link"><span>Watchlist</span><Bookmark size={15} /></Link>
          </div>
        </div>
      )}
    </header>
  );
}
