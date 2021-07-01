import React, { useEffect } from "react";
import { useParams } from "react-router";

import useHttp from "../../hooks/use-http";
import { searchMovies } from "../../lib/api";
import Movie from "../Browse/Movie";

import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./DisplaySearchResults.module.css";

const DisplaySearchResults = () => {
  const params = useParams();
  const searchQuery = params.query;
  const { sendRequest, status, data: searchResults } = useHttp(searchMovies);

  useEffect(() => {
    sendRequest(searchQuery);
  }, [searchQuery, sendRequest]);

  let movieList;

  if (status === "pending") {
    movieList = <LoadingSpinner />;
  }

  if (status === "completed" && searchResults) {
    //logic for displaying results
    movieList = searchResults.results.map((movie) => (
      <Movie key={movie.id} data={movie} />
    ));
    console.log("loading results completed");
  }
  return <div className={classes.browse}>{movieList}</div>;
};

export default DisplaySearchResults;
