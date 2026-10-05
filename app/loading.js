export default function Loading() {
  return (
    <div className="loading-page">
      <div className="skeleton-hero">
        <div className="skeleton skeleton-kicker" />
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-title short" />
        <div className="skeleton skeleton-copy" />
        <div className="skeleton skeleton-button" />
      </div>
      <div className="skeleton-rows page-width">
        {[1,2,3].map(row => (
          <div key={row} className="skeleton-row">
            <div className="skeleton-heading" />
            <div className="skeleton-posters">{[1,2,3,4,5].map(i => <div className="skeleton poster" key={i} />)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
