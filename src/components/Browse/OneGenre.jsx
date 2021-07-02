import React, { useEffect } from "react";

import { useHistory, useParams } from "react-router-dom";

import { fetchAllMovies } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import Movie from "../Browse/Movie";

import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./OneGenre.module.css";

const OneGenre = () => {
  const { sendRequest, status, data: loadedMovies } = useHttp(fetchAllMovies);
  const history = useHistory();
  const params = useParams();
  const genre = params.genre;

  useEffect(() => {
    genre === "all" && history.push("/");
    !(genre === "all") && sendRequest(genre);
  }, [sendRequest, genre, history]);

  let results;
  if (status === "pending") {
    results = <LoadingSpinner />;
  }
  if (status === "completed" && loadedMovies) {
    results = loadedMovies.results.map((movie) => (
      <Movie key={movie.id} data={movie} />
    ));
    console.log("loading results completed");
  }

  return (
    <div>
      <h2 className={classes.header}>{genre}</h2>
      <div className={classes.genre}>{results}</div>
    </div>
  );
};

export default OneGenre;
