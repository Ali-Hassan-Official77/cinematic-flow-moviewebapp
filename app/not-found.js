import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell">
      <div className="page-width empty-state">
        <span>CF</span>
        <p className="page-kicker" style={{justifyContent:"center", marginTop:18}}>Intermission</p>
        <h1 style={{marginTop:10}}>Scene not found</h1>
        <p>The film you are looking for is not available on this reel. The link may be outdated or the title may have been removed.</p>
        <Link href="/" className="btn-primary" style={{marginTop:20}}>Back to Cinematic Flow →</Link>
      </div>
    </div>
  );
}
