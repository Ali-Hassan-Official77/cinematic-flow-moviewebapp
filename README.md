# Cinematic Flow

Premium TMDB-powered movie discovery frontend built with Next.js 14.

## Environment

Create `.env.local`:

```env
TMDB_API_KEY=
TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
API_ACCESS_TOKEN=
```

The server prefers `API_ACCESS_TOKEN` when supplied and falls back to `TMDB_API_KEY`.

## Run

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm start
```

## Included

- Cinematic Flow brand treatment and responsive navigation
- Dark / light theme toggle with persistence
- Premium hero carousel using TMDB trending films
- Search with live suggestions
- Genre pages, search results, movie details and watchlist
- Responsive movie rows and grids
- Skeleton loading state
- Watchlist toasts and interaction feedback
- Reduced-motion support
- TMDB attribution
