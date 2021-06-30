import React from 'react'
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

const Navigation = () => {
    return (
        <nav className={classes.nav}>
            <NavLink to="/" activeClassName={classes.active}>
                <h2 className={classes.logo}>MUFLIX</h2>
            </NavLink>
            <NavLink to="/my-list" activeClassName={classes.active}>
                <h2>MY LIST</h2>
            </NavLink>
        </nav>
    )
}

export default Navigation;
