import React from "react";
import { NavLink } from "react-router-dom";

import useScroll from "../../hooks/useScroll";
import Search from "./Search";

import classes from "./Navigation.module.css";
import Muflix from "../../assets/Muflix-logo.PNG";

const Navigation = () => {
  const scrolled = useScroll(70);

  return (
    <nav className={classes[`${scrolled ? "nav__fixed" : "nav"}`]}>
      <div className={classes.primary__nav}>
        <NavLink to="/" exact>
          <img className={classes.logo} src={Muflix} alt="Logo" />
        </NavLink>
        <NavLink to="/" exact activeClassName={classes.active}>
          <h2>Movies</h2>
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
