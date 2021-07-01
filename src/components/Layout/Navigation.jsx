import React from "react";
import { NavLink } from "react-router-dom";

import useScroll from "../../hooks/useScroll";
import classes from "./Navigation.module.css";
import Search from "./Search";

const Navigation = () => {
  const scrolled = useScroll(100);
  return (
    <nav className={classes[`${scrolled ? "nav__fixed" : "nav"}`]}>
      <div className={classes.primary__nav}>
        <NavLink to="/" exact activeClassName={classes.active}>
          <h2 className={classes.logo}>MUFLIX</h2>
        </NavLink>
        <NavLink to="/mylist" activeClassName={classes.active}>
          <h2>My list</h2>
        </NavLink>
      </div>
      <div>
        <Search className={classes.secondary__nav}/>
      </div>
    </nav>
  );
};

export default Navigation;
//{` ${scrolled ? "nav nav__fixed" : "nav"}`}

// `${scrolled ? "nav nav__fixed":"nav"}`
