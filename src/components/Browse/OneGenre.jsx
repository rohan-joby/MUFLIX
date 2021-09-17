import React, { useEffect } from "react";

import { useHistory, useParams } from "react-router-dom";

import { fetchAllMovies } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import Movie from "./Movie";

import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./OneGenre.module.css";

const OneGenre = () => {
  const {
    sendRequest,
    status,
    data: loadedMovies,
    error,
  } = useHttp(fetchAllMovies);
  const history = useHistory();
  const params = useParams();
  const genre = params.genre;
  const page = 1;

  useEffect(() => {
    genre === "all" && history.push("/");
    !(genre === "all") && sendRequest({ genre, page });
  }, [sendRequest, genre, page, history]);

  let results;
  if (status === "pending") {
    results = <LoadingSpinner />;
  }

  if (status === "completed" && error !== null) {
    return (
      <>
        <h3 className={classes.error}>{`No movies were found under the genre "${genre}"`}</h3>
      </>
    );
  }
  if (status === "completed" && loadedMovies) {
    results = loadedMovies.results.map((movie) => (
      <div className={classes.movie}>
        <Movie key={movie.id} data={movie} />
      </div>
    ));
  }
  return (
    <div>
      <h2 className={classes.header}>{genre}</h2>
      <div className={classes.genre}>{results}</div>
    </div>
  );
};

export default OneGenre;
