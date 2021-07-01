import React, { useEffect } from "react";

import useHttp from "../../hooks/use-http";
import { fetchAllMovies } from "../../lib/api";
import { GENRE } from "../../data/genre";

import classes from "./AllMovie.module.css";
import Movie from "./Movie";
import LoadingSpinner from "../UI/LoadingSpinner";

const AllMovie = (props) => {
  const genre = props.type;
  const { sendRequest, status, data: loadedMovies } = useHttp(fetchAllMovies);
  console.log(genre);
  useEffect(() => {
    sendRequest(genre);
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

  return (
    <div>
      <h3 className={classes.genre}>{genre}</h3>
      <div className={classes.browse}>{movieList}</div>
    </div>
  );
};
export default AllMovie;
