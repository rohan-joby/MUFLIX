import React from 'react'
import { NavLink} from "react-router-dom";

import useScroll from "../../hooks/useScroll";
import classes from "./Navigation.module.css";

const Navigation = () => {
    const scrolled = useScroll(100);
    return (
        <nav className={classes[`${scrolled ? "nav__fixed" : "nav"}`]}>
            <NavLink to="/" exact activeClassName={classes.active}>
                <h2 className={classes.logo}>MUFLIX</h2>
            </NavLink>
            <NavLink to="/mylist" activeClassName={classes.active}>
                <h2>My List</h2>
            </NavLink>
        </nav>
    )
}

export default Navigation;
//{` ${scrolled ? "nav nav__fixed" : "nav"}`}

// `${scrolled ? "nav nav__fixed":"nav"}`