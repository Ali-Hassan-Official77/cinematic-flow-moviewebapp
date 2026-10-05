import { tmdb } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";

export const revalidate = 3600;

export default async function GenrePage({ params }) {
  const [genreList, movies] = await Promise.all([tmdb.genres(), tmdb.byGenre(params.id, 1)]);
  const genreName = genreList?.genres?.find(g => String(g.id) === params.id)?.name || "Films";

  return (
    <div className="page-shell">
      <div className="page-width">
        <div className="page-kicker"><span /> Collection</div>
        <h1 className="page-title">{genreName}</h1>
        <p className="page-subtitle">A focused shelf of {genreName.toLowerCase()} films selected from the Cinematic Flow catalogue.</p>
        <MovieGrid initialMovies={movies.results} totalPages={movies.total_pages} fetchUrl={`/api/genre/${params.id}`} />
      </div>
    </div>
  );
}
