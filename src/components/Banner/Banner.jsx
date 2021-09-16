import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import Header from "../Header/Header";
import useHttp from "../../hooks/use-http";
import { fetchBanner, getGenreObjects, addToMyList, removeFromMyList } from "../../lib/api";
import { useAuth } from "../../store/auth-context";
import { useMylist } from "../../store/mylist-context";
import { IMAGE_URL } from "../../data/endpoints";

import LoadingSpinner from "../UI/LoadingSpinner";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import classes from "./Banner.module.css";

const Banner = () => {
  const history = useHistory();
  
  const { sendRequest, status, data: banner } = useHttp(fetchBanner);
  const {token} = useAuth();
  const {addToList, removeFromList, isInList} = useMylist();

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return <LoadingSpinner />;
  }
  if (status === "completed" && banner) {
    const { id, backdrop_path, title, genre_ids, overview, vote_average } =
      banner;

    const movieInList = isInList(id);
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
      addToList(id);
    };
    const removeFromListHandler = () => {
      removeFromMyList(id);
      removeFromList(id);
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
            className={`${classes.btn} ${classes["btn-primary"]}`}
            onClick={movieInList ? removeFromListHandler : addToMyListHandler}
          >
            <span>{movieInList ? <FaMinus size={18}/> : <FaPlus size={18} />}</span>{" "}
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
