import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { getMyList } from "../../../lib/api";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Movie from "../Movie";

import classes from "./ListPage.module.css";

const ListPage = () => {
  const { sendRequest, status, data: loadedMovies, error } = useHttp(getMyList);
  const [refetch, setRefetch] = useState(false);
  const refetchHandler = () => {
    setRefetch(true);
  }
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    refetch && sendRequest();
    setRefetch(false);
  }, [sendRequest,refetch]);

  let movieList;
  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (status === "completed" && error !== null) {
    return <p>{error.message}</p>;
  }
  if (status === "completed" && loadedMovies.length === 0) {
    return (
      <div className={classes[`empty-list`]}>
        <h3>No movies in Your List so far!</h3>{" "}
        <h4>
          Add movies now <Link to="/">Home</Link>
        </h4>
      </div>
    );
  }
  if (status === "completed" && loadedMovies) {
    movieList = loadedMovies.map((movie) => (
      <div className={classes.movie}>
        <Movie key={movie.id} data={movie} mylist={true} refetch={refetchHandler}/>
      </div>
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
