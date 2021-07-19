import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsCaretDownFill } from "react-icons/bs";

import useScroll from "../../hooks/useScroll";
import Search from "./Search";

import classes from "./Navigation.module.css";
import Muflix from "../../assets/Muflix-logo.PNG";
import Avatar from "../../assets/Avatar.png"
import AuthContext from "../../store/auth-context";

const Navigation = () => {
  const scrolled = useScroll(70);
  const [profileOpen, setProfileOpen] = useState(false);
  const authCtx = useContext(AuthContext);

  const profileClickHandler = () => {
    setProfileOpen(prevValue => !prevValue);  
  }
  const classList = profileOpen ? `${classes.navprofile} ${classes.navprofile__active}` :`${classes.navprofile}`;

  const signoutHandler = () => {
    authCtx.logout();
  }

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
      <div className={classes.secondary__nav}>
        <Search />
        <div className={classList} onClick={profileClickHandler}>
          <img src={Avatar} alt="user profile" />
          {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>*/}
          <BsCaretDownFill /> 
          {profileOpen && <button type="button" onClick={signoutHandler} className={classes.signout__button}><Link to="/login">Sign Out</Link></button>}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
//{` ${scrolled ? "nav nav__fixed" : "nav"}`}

// `${scrolled ? "nav nav__fixed":"nav"}`
