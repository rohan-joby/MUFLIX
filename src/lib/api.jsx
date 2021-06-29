import { BASE_URL, ENDPOINTS } from "../data/endpoints";
import { GENRE_ID } from "../data/genre";

export async function fetchAllMovies(genre){
    const endpoint =  ENDPOINTS.sections.find((gen) => gen.title === genre);
    const url = BASE_URL + endpoint.endpoint;

    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);

    if (!response.ok){
        throw new Error(data.message || "Movies not found!");
    }

    return data;
}

export async function fetchOneMovieDetails(id){
    const detailsEndpoint = ENDPOINTS.helpers.fetchMovieDetails;

    const detailsResponse = await fetch(detailsEndpoint);
    const detailsData = await detailsResponse.json();

    if (!detailsResponse.ok){
        throw new Error("Details not found!");
    }

    return detailsData;
}

export async function fetchOneMovieCredits(id){
    const creditsEndpoint  = ENDPOINTS.helpers.fetchMovieCredits;

    const creditsResponse = await fetch(creditsEndpoint);
    const creditsData = await creditsResponse.json();

    if (!creditsResponse.ok){
        throw new Error("Credits not found!");
    }

    return creditsData;
}

export function getGenres(genre_ids){
    const genres = [];

    for (const id of genre_ids){
        const { name } = GENRE_ID.find((genre) => id === genre.id);
        genres.push(name);
    }
    return genres;
}