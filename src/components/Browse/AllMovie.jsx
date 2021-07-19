import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import { fetchAllMovies } from "../../lib/api";

import classes from "./AllMovie.module.css";
import Movie from "./Movie";
import LoadingSpinner from "../UI/LoadingSpinner";

const AllMovie = (props) => {
  const genre = props.type;
  const { sendRequest, status, data: loadedMovies } = useHttp(fetchAllMovies);
  //console.log(genre);

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
    // console.log("completed");
  }
  const link = `/genre/${genre}`;
  return (
    <div>
      <h3 className={classes.genre}>{genre}</h3>
      <Link className={classes.link} to={link}>Show all  {">"} </Link>
      <div className={classes.browse}>{movieList}</div>
    </div>
  );
};
export default AllMovie;
