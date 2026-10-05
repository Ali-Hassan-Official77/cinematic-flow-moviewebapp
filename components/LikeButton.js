 "use client";

import { useEffect, useState } from "react";

const KEY = "cinematic-flow-watchlist";

export function getWatchlist() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function isInWatchlist(id) {
  return getWatchlist().some(movie => String(movie.id) === String(id));
}

export function toggleWatchlist(movie) {
  const list = getWatchlist();
  const exists = list.some(item => String(item.id) === String(movie.id));
  const next = exists
    ? list.filter(item => String(item.id) !== String(movie.id))
    : [...list, {
        id: movie.id, title: movie.title, poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path, vote_average: movie.vote_average,
        release_date: movie.release_date, overview: movie.overview
      }];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("cinematic-watchlist-change"));
  window.dispatchEvent(new CustomEvent("cinematic-toast", {
    detail: { message: exists ? "Removed from your watchlist" : "Saved to your watchlist" }
  }));
  return !exists;
}

export default function LikeButton({ movie, className = "", children }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const sync = () => setLiked(isInWatchlist(movie.id));
    sync();
    window.addEventListener("cinematic-watchlist-change", sync);
    return () => window.removeEventListener("cinematic-watchlist-change", sync);
  }, [movie.id]);

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(toggleWatchlist(movie));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={liked ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
      className={`watch-heart ${liked ? "is-liked" : ""} ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} aria-hidden="true">
        <path d="M6 3.5C6 2.67 6.67 2 7.5 2h9c.83 0 1.5.67 1.5 1.5V21l-6-3.5L6 21V3.5Z" />
      </svg>
      {children}
    </button>
  );
}
