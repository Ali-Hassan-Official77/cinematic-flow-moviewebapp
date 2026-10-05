 "use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookmarkPlus, ChevronRight, Play, Star, Sparkles } from "lucide-react";
import { tmdbImage } from "@/lib/tmdb";
import { formatRating, formatYear } from "@/lib/utils";
import LikeButton from "@/components/LikeButton";

export default function Hero({ movies = [] }) {
  const slides = useMemo(
    () => movies.filter(m => m?.backdrop_path && m?.poster_path).slice(0, 7),
    [movies]
  );
  const [active, setActive] = useState(0);
  const movie = slides[active];

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => setActive(v => (v + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!movie) return <section className="hero-shell hero-empty"><div className="hero-loading-mark" /></section>;

  return (
    <section className="hero-shell">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          className="hero-media"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .8, ease: [0.22, 1, .36, 1] }}
        >
          <img src={tmdbImage(movie.backdrop_path, "original")} alt="" className="hero-bg" />
          <div className="hero-vignette" />
          <div className="hero-grid" />
        </motion.div>
      </AnimatePresence>

      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />

      <div className="hero-inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            className="hero-copy-wrap"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: .55 }}
          >
            <div className="hero-kicker"><span className="live-dot" /> Curated tonight <i /></div>
            <div className="hero-index">CF / 0{active + 1}</div>
            <h1 className="hero-title">{movie.title}</h1>
            <div className="hero-meta-row">
              <span>{formatYear(movie.release_date)}</span>
              <span><Star size={13} fill="currentColor" /> {formatRating(movie.vote_average)}</span>
              <span>FEATURE FILM</span>
            </div>
            <p className="hero-copy">{movie.overview || "A story worth making room for."}</p>
            <div className="hero-actions">
              <Link href={`/movie/${movie.id}`} className="btn-primary">
                <Play size={15} fill="currentColor" /> Explore film <ArrowRight size={15} />
              </Link>
              <LikeButton movie={movie} className="btn-hero-save">
                <BookmarkPlus size={16} /> Save to watchlist
              </LikeButton>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="hero-side">
          <div className="hero-side-label"><Sparkles size={13} /> CINEMATIC FLOW / FEATURED</div>
          <div className="hero-poster-card">
            <img src={tmdbImage(movie.poster_path, "w500")} alt="" />
            <div className="hero-poster-overlay">
              <span>NOW DISCOVERING</span>
              <strong>{movie.title}</strong>
            </div>
          </div>
          <div className="hero-side-foot">
            <span>Flow score</span>
            <strong>{Math.round((movie.vote_average || 0) * 10)}<small>/100</small></strong>
          </div>
        </div>
      </div>

      <div className="hero-bottom">
        <div className="hero-counter"><b>0{active + 1}</b><span>/ 0{Math.max(slides.length, 1)}</span></div>
        <div className="hero-progress">
          {slides.map((item, i) => (
            <button key={item.id} onClick={() => setActive(i)} aria-label={`Show ${item.title}`} className={i === active ? "active" : ""}>
              <span />
            </button>
          ))}
        </div>
        <div className="hero-scroll-note">DISCOVER / SCROLL <ChevronRight size={14} /></div>
      </div>
    </section>
  );
}
