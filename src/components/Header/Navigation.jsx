import React, { useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";

import { BsCaretDownFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

import useWindowWidth from "../../hooks/useWindowWidth";
import useScroll from "../../hooks/useScroll";
import Search from "./Search";
import { useAuth } from "../../store/auth-context";

import classes from "./Navigation.module.css";
import Muflix from "../../assets/Muflix-logo.PNG";
import MuflixSmall from "../../assets/Muflix-small.PNG";
import Avatar from "../../assets/Avatar.png";

const Navigation = React.memo(() => {
  const history = useHistory();
  const scrolled = useScroll(70);
  const width = useWindowWidth();
  const { isLoggedIn, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);

  const profileClickHandler = () => {
    setProfileOpen((prevValue) => !prevValue);
  };
  const classList = profileOpen
    ? `${classes.navprofile} ${classes.navprofile__active}`
    : `${classes.navprofile}`;

  const signoutHandler = () => {
    logout();
  };
  const signInHandler = () => {
    history.push("/login");
  };

  return (
    <nav className={classes[`${scrolled ? "nav__fixed" : "nav"}`]}>
      <div className={classes.primary__nav}>
        {width > 400 && (
          <NavLink to="/" exact>
            <img
              className={classes.logo}
              src={width > 768 ? Muflix : MuflixSmall}
              alt="Logo"
            />
          </NavLink>
        )}
        <NavLink to="/" exact activeClassName={classes.active}>
          <h2>Movies</h2>
        </NavLink>
        <NavLink to="/mylist" activeClassName={classes.active}>
          <h2>My list</h2>
        </NavLink>
      </div>
      <div className={classes.secondary__nav}>
        {width > 100 ? (
          <Search />
        ) : (
          <div className={classes.search}>
            <BsSearch size={23} />
          </div>
        )}
        <div className={classList} onClick={profileClickHandler}>
          <img src={Avatar} alt="user profile" />
          {width > 600 && <BsCaretDownFill />}
          {profileOpen && (
            <button
              type="button"
              onClick={isLoggedIn ? signoutHandler : signInHandler}
              className={classes.signout__button}
            >
              <Link to="/login">{isLoggedIn ? "Sign Out" : "Log In"}</Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
});

export default Navigation;
