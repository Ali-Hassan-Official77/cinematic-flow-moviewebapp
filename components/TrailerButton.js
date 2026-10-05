 "use client";

import { Play } from "lucide-react";

export default function TrailerButton({ youtubeKey }) {
  if (!youtubeKey) return null;
  return (
    <a className="btn-primary" href={`https://www.youtube.com/watch?v=${youtubeKey}`} target="_blank" rel="noreferrer">
      <Play size={14} fill="currentColor" /> Watch trailer
    </a>
  );
}
