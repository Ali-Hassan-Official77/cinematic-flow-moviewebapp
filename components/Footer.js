import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top page-width">
        <div className="footer-brand">
          <Logo />
          <p>Film discovery with a more cinematic point of view. Explore what is moving, memorable and worth your next two hours.</p>
          <div className="footer-location"><MapPin size={14} /> Independent film discovery platform</div>
        </div>
        <div>
          <div className="footer-label">Explore</div>
          <div className="footer-links"><Link href="/">Discover</Link><Link href="/watchlist">Watchlist</Link><Link href="/genre/28">Action</Link><Link href="/genre/18">Drama</Link></div>
        </div>
        <div>
          <div className="footer-label">Popular</div>
          <div className="footer-links"><Link href="/genre/35">Comedy</Link><Link href="/genre/27">Horror</Link><Link href="/genre/878">Science Fiction</Link><Link href="/genre/53">Thriller</Link></div>
        </div>
        <div>
          <div className="footer-label">Platform</div>
          <div className="footer-links">
            <span><Mail size={13} /> Film discovery</span>
            <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB data <ArrowUpRight size={13} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom page-width">
        <span>© {new Date().getFullYear()} Cinematic Flow. All rights reserved.</span>
        <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
      </div>
    </footer>
  );
}
