import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Dropdown from "./Dropdown";
import { GENRE } from "../../data/genre";

import classes from "./Header.module.css";

const Header = ({label}) => {
  const [genre, setGenre] = useState("All");
  const history = useHistory();

  const handleClick = (name) => {
    setGenre(name);
    console.log(genre);
  }
  useEffect(()=>{!(genre=== "All") && history.push(`/genre/${genre}`)
})

  return (
    <header>
      <h2 className={classes.heading}>Movies</h2>
      <Dropdown items={[...GENRE]} title={label||`Choose a genre`} onClick={handleClick}/>
    </header>
  );
};

export default Header;
