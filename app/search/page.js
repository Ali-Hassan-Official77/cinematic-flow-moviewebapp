import { tmdb } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";

export const revalidate = 0;

export async function generateMetadata({ searchParams }) {
  const q = searchParams?.q || "";
  return { title: q ? `"${q}" — Cinematic Flow` : "Search — Cinematic Flow" };
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q?.trim() || "";
  const data = query ? await tmdb.search(query, 1) : { results: [], total_pages: 0, total_results: 0 };

  return (
    <div className="page-shell">
      <div className="page-width">
        <div className="page-kicker"><span /> Film search</div>
        <h1 className="page-title">{query ? `“${query}”` : "Find your next film"}</h1>
        <p className="page-subtitle">{query ? `${data.total_results ?? data.results?.length ?? 0} films found in TMDB` : "Search titles, characters, genres and stories from the navigation bar."}</p>
        {query && <MovieGrid initialMovies={data.results} totalPages={data.total_pages} fetchUrl={`/api/search?q=${encodeURIComponent(query)}`} />}
      </div>
    </div>
  );
}
