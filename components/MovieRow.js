 "use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "@/components/MovieCard";
import Reveal from "@/components/Reveal";

export default function MovieRow({ title, subtitle, movies, priority = false }) {
  const ref = useRef(null);
  if (!movies?.length) return null;

  const move = dir => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * .78, behavior: "smooth" });

  return (
    <section className="movie-row">
      <Reveal className="row-head page-width">
        <div>
          <div className="section-eyebrow"><span /> Curated collection</div>
          <h2 className="row-title">{title}</h2>
          {subtitle && <p className="row-subtitle">{subtitle}</p>}
        </div>
        <div className="row-controls">
          <button onClick={() => move(-1)} aria-label="Previous movies"><ChevronLeft size={17} /></button>
          <button onClick={() => move(1)} aria-label="Next movies"><ChevronRight size={17} /></button>
        </div>
      </Reveal>
      <div ref={ref} className="row-scroll">
        {movies.map((m, i) => <div key={m.id} className="row-item"><MovieCard movie={m} priority={priority && i < 4} /></div>)}
      </div>
    </section>
  );
}
