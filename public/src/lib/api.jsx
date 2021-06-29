import { BASE_URL, ENDPOINTS } from "../data/endpoints";

export async function fetchMovies(genre){
    const endpoint =  ENDPOINTS.section.find((genre) => genre.title === genre);
    const url = BASE_URL + endpoint.endpoint;

    const response = await fetch(url);
    const data = await response.json();

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