import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import useWindowWidth from "../../hooks/useWindowWidth";

import classes from "./Search.module.css";

const Search = () => {
  const inputRef = useRef();
  const history = useHistory();
  let searchFormatted;
  const width=useWindowWidth() ;

  const focusInputHandler = () => {
    inputRef.current.focus();
  }
  const searchHandler = (event) => {
    event.preventDefault();
    const search = inputRef.current.value;
    searchFormatted = search.toLowerCase().split(" ").join("+");
    inputRef.current.value = "";
    history.replace(`/results/${searchFormatted}`);
  };

  return (
    <form onSubmit={searchHandler} className={classes.search}>
      <label htmlFor="query"></label>
      <input className={classes.input} autoComplete="off" type="search" ref={inputRef} id="query" placeholder="Search movies"/>
      <button onClick={focusInputHandler} className={classes.search__btn} type="button">
        <BsSearch size={width>425 ?21:16} style={{ fill: "white" }} />
      </button>
    </form>
  );
};

export default Search;
