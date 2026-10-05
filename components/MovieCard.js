 "use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { tmdbImage } from "@/lib/tmdb";
import { formatYear, formatRating } from "@/lib/utils";
import LikeButton from "@/components/LikeButton";

export default function MovieCard({ movie, priority = false, className = "" }) {
  const reduced = useReducedMotion();
  const poster = tmdbImage(movie.poster_path, "w500");
  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -8 }}
      transition={{ duration: .3, ease: [0.22, 1, .36, 1] }}
      className={`movie-card ${className}`}
    >
      <Link href={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-poster">
          {poster ? <img src={poster} alt={`${movie.title} poster`} loading={priority ? "eager" : "lazy"} /> : <div className="poster-fallback">CF</div>}
          <div className="poster-shade" />
          <div className="poster-topline"><span><Star size={10} fill="currentColor" /> {formatRating(movie.vote_average)}</span><em>{formatYear(movie.release_date)}</em></div>
          <div className="poster-action"><ArrowUpRight size={16} /></div>
          <LikeButton movie={movie} className="card-heart" />
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p><span>{formatYear(movie.release_date)}</span><i /> <span>Film</span></p>
        </div>
      </Link>
    </motion.article>
  );
}
