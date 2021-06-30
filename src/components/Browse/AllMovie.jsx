import React, { useEffect } from "react";

import useHttp from "../../hooks/use-http";
import { fetchAllMovies } from "../../lib/api";
import { GENRE } from "../../data/genre";

import classes from './AllMovie.module.css';
import Movie from "./Movie";
import LoadingSpinner from "../UI/LoadingSpinner";

const AllMovie = () => {
  const genre = GENRE;
  const { sendRequest, status, data: loadedMovies } = useHttp(fetchAllMovies);

  useEffect(() => {
    for (const data of genre) {
      sendRequest(data.name);
    }
  }, [genre, sendRequest]);

  let movieList;

  if (status === "pending") {
    movieList = <LoadingSpinner />;
  }
  if (status === "completed" && loadedMovies) {
    movieList = loadedMovies.results.map((movie) => (
      <Movie key={movie.id} data={movie} />
    ));
    console.log("completed");

  }

  return <div className={classes.browse}>{movieList}</div>;
};
export default AllMovie;
