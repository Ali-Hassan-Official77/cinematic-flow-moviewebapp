 "use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, Sparkles } from "lucide-react";
import { tmdbImage } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";

export default function SearchBar({ autoFocus = false }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) { setResults([]); setLoading(false); return; }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setResults((data.results || []).slice(0, 6));
      } catch { setResults([]); }
      finally { setLoading(false); }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const outside = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  const submit = e => {
    e.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div ref={ref} className="search-wrap">
      <form onSubmit={submit}>
        <Search size={15} className="search-icon" />
        <input
          id="site-search"
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search films, actors, stories..."
          aria-label="Search films"
        />
        {loading ? <Loader2 size={14} className="search-loader spin" /> : <span className="search-key"><Sparkles size={11} /> K</span>}
      </form>

      {open && query.trim() && (
        <div className="search-dropdown">
          {loading && !results.length && <div className="search-status">Finding your next film…</div>}
          {!loading && !results.length && <div className="search-status">No films match “{query}”.</div>}
          {results.map(movie => (
            <button key={movie.id} type="button" className="search-result" onClick={() => { setOpen(false); setQuery(""); router.push(`/movie/${movie.id}`); }}>
              <span className="search-poster">{movie.poster_path && <img src={tmdbImage(movie.poster_path, "w92")} alt="" />}</span>
              <span className="search-result-copy"><b>{movie.title}</b><small>{formatYear(movie.release_date)}</small></span>
            </button>
          ))}
          {results.length > 0 && <button type="button" className="search-all" onClick={submit}>See all results <span>→</span></button>}
        </div>
      )}
    </div>
  );
}
