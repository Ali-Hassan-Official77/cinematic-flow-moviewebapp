export default function RatingBadge({ value = 0 }) {
  return <span className="rating-badge">{Number(value || 0).toFixed(1)} <small>/ 10</small></span>;
}
