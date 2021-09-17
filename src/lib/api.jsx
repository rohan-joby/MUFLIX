import { BASE_URL, ENDPOINTS } from "../data/endpoints";
import { GENRE_ID } from "../data/genre";

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

export function getMyListGenres(genre_ids) {
  const genres = [];
  for (const genreItem in genre_ids) {
    const { name } = GENRE_ID.find(
      (genre) => genre_ids[genreItem].id === genre.id
    );
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

export function getMyListGenreObjects(genre_ids) {
  const genres = [];
  for (const genreItem in genre_ids) {
    const { name } = GENRE_ID.find(
      (genre) => genre_ids[genreItem].id === genre.id
    );
    const id = genre_ids[genreItem].id;
    genres.push({ id, name });
  }
  return genres;
}

export async function signUp(userInfo) {
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
  const expiresAt = data.expiresAt;

  return { token, expiresAt };
}

export async function logIn(userInfo) {
  const { email, password } = userInfo;
  const url = process.env.REACT_APP_DB_AUTH_URL + "/login";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid credentials!");
  }

  const token = data.token;
  const expiresAt = data.expiresAt;

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

export async function fetchAllMovies({genre,page=1}) {
  const endpoint = ENDPOINTS.sections.find((gen) => gen.title === genre);
  const url = BASE_URL + endpoint.endpoint + `&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();

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

export async function addToMyList({
  id,
  title,
  backdrop,
  genre,
  rating,
  token,
}) {
  const url = process.env.REACT_APP_DB_MYLIST_URL;
  const response = await fetch(url, {
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
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Movie could not be added!");
  }
}

export async function getMyList() {
  const token = localStorage.getItem("authTokenMUFLIX");
  const url = process.env.REACT_APP_DB_MYLIST_URL;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Movies not found!");
  }
  const loadedMovies = [];
  for (const key in data.movies) {
    const genreList = data.movies[key].genre;

    loadedMovies.push({
      id: data.movies[key].id,
      title: data.movies[key].title,
      backdrop_path: data.movies[key].backdrop,
      genre_ids: genreList,
      vote_average: data.movies[key].rating,
    });
  }

  const uniqueMovies = Array.from(new Set(loadedMovies.map((a) => a.id))).map(
    (id) => {
      return loadedMovies.find((a) => a.id === id);
    }
  );

  return uniqueMovies;
}

export async function removeFromMyList(id){
  const token = localStorage.getItem("authTokenMUFLIX");
  const url = process.env.REACT_APP_DB_MYLIST_URL + `/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}