import React, { useEffect } from "react";

import useHttp from "../../../hooks/use-http";
import { getMyList } from "../../../lib/api";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Movie from "../Movie";

import classes from "./ListPage.module.css";

const ListPage = () => {
  // const authCtx = useContext(AuthContext);
  // const token = authCtx.token;
  const { sendRequest, status, data: loadedMovies } = useHttp(getMyList);

  useEffect(() => {
    sendRequest();
  },[] );
//[sendRequest]
  let movieList;
  if (status === "pending") {
    return <LoadingSpinner />;
  }
  if (status === "completed" && loadedMovies) {
    movieList = loadedMovies.map((movie) => (
      <Movie key={movie.id} data={movie} mylist={true}/>
    ));
  }
  return (
    <div>
      <h2 className={classes.header}>My list</h2>
      <div className={classes.list}>{movieList}</div>
    </div>
  );
};

export default ListPage;
