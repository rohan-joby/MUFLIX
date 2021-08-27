export const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_URL = `https://image.tmdb.org/t/p/`;

const API_KEY = process.env.REACT_APP_API_KEY;

export const ENDPOINTS = {
  sections: [
    // {
    //   title: 'Popular on Hotflix',
    //   endpoint: `/movie/popular?api_key=${API_KEY}&region=IN`,
    // },
    // {
    //   title: 'Trending Now',
    //   endpoint: `/trending/movie/day?api_key=${API_KEY}`,
    // },
    // {
    //   title: 'Upcoming',
    //   endpoint: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=IN`,
    // },
    {
      title: 'Sci-Fi',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=878&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'Drama',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=18&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'Fantasy',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=14&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'Crime',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=80&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'Mystery',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=9648&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'Action',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=28&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'Comedy',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=35&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'Animation',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=16&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'Adventure',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=12&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'Family',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=10751&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'TV Movie',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=10770&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'Documentary',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=99&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'War',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=10752&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'History',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=36&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'Western',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=37&with_watch_providers=8&watch_region=IN`,
    },
    {
      title: 'Thriller',
      endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=53&with_watch_providers=8&watch_region=IN`,
    },
  ],
  helpers: {
    searchMovie: `/search/movie?api_key=${API_KEY}&query=_query`,
    fetchMovieGenres: `genre/movie/list?api_key=${API_KEY}`,
    fetchMovieTrailers: `/movie/_id/videos?api_key=${API_KEY}`,
    fetchMovieDetails: `/movie/_id?api_key=${API_KEY}`,
    fetchMovieRecommendations: `/movie/_id/recommendations?api_key=${API_KEY}`,
    fetchMovieCredits: `/movie/_id/credits?api_key=${API_KEY}`,
  },
}


export const oneMovie = {
  adult: false,
  backdrop_path: "/x5EUEv1N9g4BCX9GQXKvv3nqMVo.jpg",
  genre_ids: [10752, 18, 28, 36],
  id: 429351,
  original_language: "en",
  original_title: "12 Strong",
  overview: "A team of CIA agents and special forces head into Afghanistan in the aftermath of the September 11th attacks in an attempt to dismantle the Taliban.",
  popularity: 57.836,
  poster_path: "/j18021qCeRi3yUBtqd2UFj1c0RQ.jpg",
  release_date: "2018-01-16",
  title: "12 Strong",
  vote_average: 6.1,
  }