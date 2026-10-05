import { notFound } from "next/navigation";
import { Star, Clock, Calendar, Camera } from "lucide-react";
import { tmdb, tmdbImage } from "@/lib/tmdb";
import { formatYear, formatRuntime, formatRating, findTrailer, findCertification } from "@/lib/utils";
import MovieRow from "@/components/MovieRow";
import RatingBadge from "@/components/RatingBadge";
import TrailerButton from "@/components/TrailerButton";
import LikeButton from "@/components/LikeButton";
import Reveal from "@/components/Reveal";

export const revalidate = 1800;

export async function generateMetadata({ params }) {
  try {
    const m = await tmdb.details(params.id);
    return { title: `${m.title} — Cinematic Flow`, description: m.overview?.slice(0, 155) };
  } catch {
    return { title: "Cinematic Flow" };
  }
}

export default async function MovieDetailPage({ params }) {
  let movie;
  try { movie = await tmdb.details(params.id); } catch { notFound(); }

  const backdrop = tmdbImage(movie.backdrop_path, "original");
  const poster = tmdbImage(movie.poster_path, "w500");
  const cast = movie.credits?.cast?.slice(0, 8) || [];
  const director = movie.credits?.crew?.find(c => c.job === "Director");
  const trailerKey = findTrailer(movie.videos);
  const certification = findCertification(movie.release_dates);
  const screenshots = (movie.images?.backdrops || []).filter(x => x.file_path !== movie.backdrop_path).slice(0, 10);

  return (
    <div className="detail-page">
      <section className="detail-backdrop">{backdrop && <img src={backdrop} alt="" />}<div /></section>
      <div className="page-width" style={{marginTop: "-150px", position: "relative", zIndex: 10}}>
        <Reveal className="detail-main">
          <div className="detail-poster">{poster && <img src={poster} alt={`${movie.title} poster`} />}</div>
          <div className="detail-copy">
            {movie.tagline && <p className="detail-tagline">{movie.tagline}</p>}
            <h1>{movie.title}</h1>
            <div className="detail-meta">
              <RatingBadge value={movie.vote_average} />
              <span><Star size={13} fill="currentColor" /> {formatRating(movie.vote_average)}</span>
              <span><Calendar size={13} /> {formatYear(movie.release_date)}</span>
              {movie.runtime && <span><Clock size={13} /> {formatRuntime(movie.runtime)}</span>}
              {certification && <span>{certification}</span>}
            </div>
            <div className="genre-pills">{movie.genres?.map(g => <span key={g.id}>{g.name}</span>)}</div>
            <p className="detail-overview">{movie.overview || "No synopsis is available for this title yet."}</p>
            {director && <p className="director">Directed by <b>{director.name}</b></p>}
            <div className="detail-actions">
              <TrailerButton youtubeKey={trailerKey} />
              <LikeButton movie={movie} className="btn-hero-save"><span className="inline-heart">♡</span> <span>Add to watchlist</span></LikeButton>
            </div>
          </div>
        </Reveal>

        {screenshots.length > 0 && (
          <Reveal className="screenshots" delay={.05}>
            <div className="section-heading"><span><Camera size={15} /> VISUAL NOTES</span><p>Stills from {movie.title}</p></div>
            <div className="screenshot-grid">{screenshots.map((s, i) => <div className={`shot shot-${i % 4}`} key={s.file_path}><img src={tmdbImage(s.file_path, "w780")} alt={`${movie.title} still ${i + 1}`} loading="lazy" /></div>)}</div>
          </Reveal>
        )}

        {cast.length > 0 && (
          <Reveal className="cast-section">
            <div className="section-heading"><span>CAST</span><p>The people behind the story</p></div>
            <div className="cast-grid">{cast.map(p => <div key={p.credit_id}><div className="cast-img">{p.profile_path ? <img src={tmdbImage(p.profile_path, "w342")} alt={p.name} /> : <span>—</span>}</div><b>{p.name}</b><small>{p.character}</small></div>)}</div>
          </Reveal>
        )}
      </div>
      <MovieRow title="More like this" subtitle="Continue the flow with related stories" movies={movie.similar?.results} />
    </div>
  );
}
