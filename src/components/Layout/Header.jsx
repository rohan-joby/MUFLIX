import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import classes from "./Header.module.css";

const Header = () => {
  const [genre, setGenre] = useState("All");
  const history = useHistory();


  const changeHandler = (event) => {
    !(event.target.value === "All") && setGenre(event.target.value);
    console.log(event.target.value);
    console.log(genre);
  };
  useEffect(()=>{!(genre=== "All") && history.push(`/genre/${genre}`)
})

  return (
    <header>
      <h2 className={classes.heading}>Movies</h2>
      <select
        value={genre}
        onChange={changeHandler}
        name="genre"
        id="genre-selector"
        className={classes.genre}
        size="1"
      >
        <option className={classes.opt} value="all">
          Choose a genre
        </option>
        <option value="Action">Action</option>
        <option value="Mystery">Mystery</option>
        <option value="Adventure">Adventure</option>
        <option value="Comedy">Comedy</option>
        <option value="Animation">Animation</option>
        <option value="Crime">Crime</option>
        <option value="Documentary">Documentary</option>
        <option value="Family">Family</option>
        <option value="Drama">Drama</option>
        <option value="History">History</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="TV Movie">TV Movie</option>
        <option value="Thriller">Thriller</option>
        <option value="Fantasy">Fantasy</option>
        <option value=">War">War</option>
        <option value="Western">Western</option>
      </select>
    </header>
  );
};

export default Header;
