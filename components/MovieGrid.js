 "use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import MovieCard from "@/components/MovieCard";

export default function MovieGrid({ initialMovies = [], totalPages = 1, fetchUrl }) {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadMore() {
    if (loading || page >= totalPages) return;
    setLoading(true);
    setError("");
    try {
      const nextPage = page + 1;
      const separator = fetchUrl.includes("?") ? "&" : "?";
      const res = await fetch(`${fetchUrl}${separator}page=${nextPage}`);
      if (!res.ok) throw new Error("Unable to load more films");
      const data = await res.json();
      setMovies(prev => [...prev, ...(data.results || [])]);
      setPage(nextPage);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!movies.length) {
    return <div className="empty-state"><span>CF</span><h2>No films found</h2><p>Try a broader title, another genre, or come back with a fresh search.</p></div>;
  }

  return (
    <div>
      <div className="movie-grid">
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      {error && <p className="load-error">{error}</p>}
      {page < totalPages && (
        <div className="load-more-wrap">
          <button type="button" onClick={loadMore} disabled={loading} className="load-more">
            {loading ? <Loader2 size={15} className="spin" /> : null}
            {loading ? "Loading collection" : "Load more films"}
          </button>
        </div>
      )}
    </div>
  );
}
