import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

import classes from "./Search.module.css";

const Search = () => {
  const inputRef = useRef();
  const history = useHistory();
  let searchFormatted;

  const searchHandler = (event) => {
    event.preventDefault();
    const search = inputRef.current.value;
    searchFormatted = search.toLowerCase().split(" ").join("+");
    console.log(searchFormatted);
    inputRef.current.value = "";
    // <DisplaySearchResults  query={}/>
    history.replace(`/results/${searchFormatted}`);
  };

  return (
    <form onSubmit={searchHandler} className={classes.search}>
      <label htmlFor="query"></label>
      <input autoComplete="off" type="search" ref={inputRef} id="query" />
      <button className={classes.search__btn}>
        <BsSearch size={25} style={{ fill: "white" }} />
      </button>
    </form>
  );
};

export default Search;
