import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";
import { tmdb } from "@/lib/tmdb";

export const revalidate = 1800;

export default async function HomePage() {
  const [trending, popular, topRated, upcoming, nowPlaying] = await Promise.all([
    tmdb.trending("week"),
    tmdb.popular(),
    tmdb.topRated(),
    tmdb.upcoming(),
    tmdb.nowPlaying(),
  ]);

  return (
    <>
      <Hero movies={trending?.results || []} />
      <div className="home-content">
        <section className="intro-strip page-width">
          <div><span className="section-eyebrow"><span /> THE CINEMATIC INDEX</span><h2>Less scrolling.<br /><em>Better watching.</em></h2></div>
          <p>We turn a huge movie universe into a smaller, smarter selection — fresh releases, enduring favorites and stories that deserve your attention.</p>
        </section>
        <MovieRow title="Trending this week" subtitle="The films currently creating the most momentum" movies={trending?.results} priority />
        <MovieRow title="In cinemas now" subtitle="Fresh releases for your next big-screen mood" movies={nowPlaying?.results} />
        <MovieRow title="Highest rated" subtitle="Audience favorites with staying power" movies={topRated?.results} />
        <MovieRow title="Popular right now" subtitle="The titles people keep coming back to" movies={popular?.results} />
        <MovieRow title="Coming soon" subtitle="Keep an eye on what lands next" movies={upcoming?.results} />
      </div>
    </>
  );
}
