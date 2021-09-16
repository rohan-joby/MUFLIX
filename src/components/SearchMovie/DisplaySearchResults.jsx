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
    const resultLength = searchResults.results.length;
    if (resultLength === 0){
      return <h2 className={classes.error}>Your search did not have any matches.</h2>
    }

    movieList = searchResults.results.map((movie) => (
      <div className={classes.movie}><Movie key={movie.id} data={movie} /></div>
    ));
    return (
      <>
        <div>
          <h3 className={classes.title}>search results:</h3>
          <div className={classes.query}>{searchQuery}</div>
        </div>
        <div className={classes.browse}>{movieList}</div>
      </>
    );
  }
  return (
    <div>hello</div>
  );
};

export default DisplaySearchResults;
