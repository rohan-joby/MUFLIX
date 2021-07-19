import { BASE_URL, ENDPOINTS } from "../data/endpoints";
import { GENRE_ID } from "../data/genre";

const FIREBASE_URL =
  "https://muflix-db-default-rtdb.asia-southeast1.firebasedatabase.app/";

function getRandomItem(length) {
  return Math.floor(Math.random() * length);
}

export function getGenres(genre_ids) {
  const genres = [];

  for (const id of genre_ids) {
    const { name } = GENRE_ID.find((genre) => id === genre.id);
    genres.push(name);
  }
  return genres;
}

export function getGenreObjects(genre_ids) {
  const genres = [];

  for (const id of genre_ids) {
    const { name } = GENRE_ID.find((genre) => id === genre.id);
    genres.push({ id, name });
  }
  return genres;
}

export async function signIn(userInfo) {
  const { username, email, password } = userInfo;
  const url = process.env.REACT_APP_DB_AUTH_URL + "/register";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "could not register user");
  }

  const token = data.token;
  const expiresAt= data.expiresAt;

  return { token, expiresAt };
}

export async function fetchBanner() {
  const url = BASE_URL + ENDPOINTS.sections[0].endpoint;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "could not fetch movie data");
  }

  const randomNumber = getRandomItem(data.results.length);
  return data.results[randomNumber];
}

export async function fetchAllMovies(genre) {
  const endpoint = ENDPOINTS.sections.find((gen) => gen.title === genre);
  const url = BASE_URL + endpoint.endpoint;

  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);

  if (!response.ok) {
    throw new Error(data.message || "Movies not found!");
  }

  return data;
}

export async function fetchOneMovieDetails(id) {
  const detailsEndpoint = ENDPOINTS.helpers.fetchMovieDetails.replace(
    "_id",
    id
  );
  const url = BASE_URL + detailsEndpoint;

  const detailsResponse = await fetch(url);
  const detailsData = await detailsResponse.json();

  if (!detailsResponse.ok) {
    throw new Error("Details not found!");
  }
  console.log(detailsData);
  return detailsData;
}

export async function fetchOneMovieCredits(id) {
  const creditsEndpoint = ENDPOINTS.helpers.fetchMovieCredits.replace(
    "_id",
    id
  );
  const url = BASE_URL + creditsEndpoint;

  const creditsResponse = await fetch(url);
  const creditsData = await creditsResponse.json();

  if (!creditsResponse.ok) {
    throw new Error("Credits not found!");
  }

  return creditsData;
}

export async function searchMovies(query) {
  const searchEndpoint = ENDPOINTS.helpers.searchMovie.replace("_query", query);
  const url = BASE_URL + searchEndpoint;

  const searchResponse = await fetch(url);
  const searchData = await searchResponse.json();

  if (!searchResponse.ok) {
    throw new Error("search not found!");
  }

  return searchData;
}

export async function addToMyList({ id, title, backdrop, genre, rating }) {
  fetch(FIREBASE_URL + "/movies.json", {
    method: "POST",
    body: JSON.stringify({
      id: id,
      title: title,
      backdrop: backdrop,
      genre: genre,
      rating: rating,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getMyList() {
  const response = await fetch(FIREBASE_URL + "/movies.json");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Movies not found!");
  }
  const loadedMovies = [];
  for (const key in data) {
    const genreList = data[key].genre;
    const genres = genreList.map((genre) => genre.id);
    console.log(genres);

    loadedMovies.push({
      id: data[key].id,
      title: data[key].title,
      backdrop_path: data[key].backdrop,
      genre_ids: genres,
      vote_average: data[key].rating,
    });
  }
  //remove duplicates

  // const seen = new Set();
  // const uniqueMovies = loadedMovies.filter((el) => {
  //   const duplicate = seen.has(el.id);
  //   seen.add(el.id);
  //   return !duplicate;
  // });
  const uniqueMovies = Array.from(new Set(loadedMovies.map((a) => a.id))).map(
    (id) => {
      return loadedMovies.find((a) => a.id === id);
    }
  );

  console.log(uniqueMovies);
  return uniqueMovies;
}
