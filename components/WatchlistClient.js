 "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, ArrowRight } from "lucide-react";
import MovieCard from "@/components/MovieCard";
import { getWatchlist } from "@/components/LikeButton";

export default function WatchlistClient() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const sync = () => setMovies(getWatchlist());
    sync();
    window.addEventListener("cinematic-watchlist-change", sync);
    return () => window.removeEventListener("cinematic-watchlist-change", sync);
  }, []);

  return (
    <div className="page-shell">
      <div className="page-width">
        <div className="page-kicker"><span /> Your collection</div>
        <h1 className="page-title">Watchlist</h1>
        <p className="page-subtitle">{movies.length ? `${movies.length} film${movies.length === 1 ? "" : "s"} saved for later.` : "Keep the films you want to remember close."}</p>
        {movies.length ? (
          <div className="movie-grid">{movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}</div>
        ) : (
          <div className="empty-state">
            <span><Bookmark size={18} /></span>
            <h2>Your shelf is waiting.</h2>
            <p>Save a film from any poster or movie page and it will appear here on this device.</p>
            <Link href="/" className="btn-primary" style={{marginTop: 20}}>Discover films <ArrowRight size={15} /></Link>
          </div>
        )}
      </div>
    </div>
  );
}
