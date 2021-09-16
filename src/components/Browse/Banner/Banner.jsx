import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

import Header from "../../Layout/Header";
import useHttp from "../../../hooks/use-http";
import { fetchBanner, getGenreObjects, addToMyList } from "../../../lib/api";
import { IMAGE_URL } from "../../../data/endpoints";

import LoadingSpinner from "../../UI/LoadingSpinner";
import classes from "./Banner.module.css";
import AuthContext from "../../../store/auth-context";
import MylistContext from "../../../store/mylist-context";

const Banner = () => {
  const history = useHistory();
  
  const { sendRequest, status, data: banner } = useHttp(fetchBanner);
  const authCtx = useContext(AuthContext);
  const mylistCtx = useContext(MylistContext);

  const token = authCtx.token;

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return <LoadingSpinner />;
  }
  if (status === "completed" && banner) {
    const { id, backdrop_path, title, genre_ids, overview, vote_average } =
      banner;

    const movieInList = mylistCtx.isInList(id);
    const imagePath = IMAGE_URL + "/w1280" + backdrop_path;
    const shortOverview = overview.slice(0, 180) + "...";

    const genreObjects = getGenreObjects(genre_ids);

    const clickHandler = () => {
      history.push(`/movie/${id}`);
    };
    const addToMyListHandler = () => {
      const details = {
        id: id,
        title: title,
        backdrop: backdrop_path,
        genre: genreObjects,
        rating: vote_average,
        token: token,
      };
      addToMyList(details);
      mylistCtx.addToList(id);
    };

    return (
      <div className={classes.banner}>
        <div className={classes.banner__image}>
          <div className={classes.shadow} />
          <img src={imagePath} alt={title} />
        </div>
        <Header />
        <h1 className={classes.title}>{title}</h1>
        <p className={classes.summary}>{shortOverview}</p>
        <div className={classes.actions}>
          <button
            type="button"
            disabled={movieInList}
            className={`${classes.btn} ${classes["btn-primary"]}`}
            onClick={movieInList ? null : addToMyListHandler}
          >
            <span>{movieInList ? <FaCheck size={18}/> : <FaPlus size={18} />}</span>{" "}
            {movieInList ? `In My List` : `My List`}
          </button>
        </div>

        <div className={classes.actions}>
          <button
            type="button"
            className={`${classes.btn} ${classes["btn-secondary"]}`}
            onClick={clickHandler}
          >
            <span>
              <IoMdInformationCircleOutline size={23} />
            </span>
            More info
          </button>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default Banner;
