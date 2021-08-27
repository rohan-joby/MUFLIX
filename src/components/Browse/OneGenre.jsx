import React, { useState, useEffect, useCallback, useRef } from "react";

import { useHistory, useParams } from "react-router-dom";

import { fetchAllMovies } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import Movie from "../Browse/Movie";

import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./OneGenre.module.css";
import useLazyLoad from "../../hooks/lazyLoad";

const OneGenre = () => {
  const { sendRequest, status, data: loadedMovies } = useHttp(fetchAllMovies);
  const history = useHistory();
  const params = useParams();
  const genre = params.genre;
  const page = 1;
  //const [page, setPage] = useState(1);
  //const loadMoreRef = useRef(null);

  useEffect(() => {
    genre === "all" && history.push("/");
    !(genre === "all") && sendRequest({ genre, page });
  }, [sendRequest, genre, page, history]);


  // const handleObserver = useCallback((entries) => {
  //   let target = entries[0];
  //   if (target.isIntersecting) {
  //     setPage((prev) => prev + 1);
  //   }
  // }, []);

  // useEffect(() => {
  //   const options = { root: null, threshold: 0, rootMargin: "50px" };
  //   if (status === "completed" && loadedMovies !== null) {
  //     totalPagesRef.current = loadedMovies.total_pages;

  //     const observer = new IntersectionObserver(handleObserver, options);
  //     if (loadMoreRef.current && page <= totalPagesRef.current) {
  //       console.log(page);
  //       observer.observe(loadMoreRef.current);
  //     } else {
  //       observer.unobserve(loadMoreRef.current);
  //     }
  //   }
  // }, [status, handleObserver, loadedMovies, page]);

  let results;
  if (status === "pending") {
    results = <LoadingSpinner />;
  }

  if (status === "completed" && loadedMovies) {
    results = loadedMovies.results.map((movie) => (
      <Movie key={movie.id} data={movie} />
    ));
  }

  // const handleLoadMore = () => setPage((page) => page + 1);
  // const [endPageRef] = useLazyLoad(handleLoadMore);

  return (
    <div>
      <h2 className={classes.header}>{genre}</h2>
      <div className={classes.genre}>{results}</div>
      {/* <div ref={endPageRef} /> */}
    </div>
  );
};

export default OneGenre;
