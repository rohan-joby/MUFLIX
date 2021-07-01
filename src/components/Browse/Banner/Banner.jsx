import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IoMdInformationCircleOutline } from 'react-icons/io';

import useHttp from "../../../hooks/use-http";
import { fetchBanner, addToMyList } from "../../../lib/api";
import { IMAGE_URL } from "../../../data/endpoints";

import LoadingSpinner from "../../UI/LoadingSpinner";
import classes from "./Banner.module.css";

const Banner = () => {
  const history = useHistory();
  const { sendRequest, status, data: banner } = useHttp(fetchBanner);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  let loadedBanner;

  if (status === "pending") {
    return <LoadingSpinner />;
  }
  if (status === "completed" && banner) {
    const { id, backdrop_path, title, overview } = banner;

    const imagePath = IMAGE_URL + "/w1280" + backdrop_path;
    const overview_short = overview.slice(0,180) + "...";

    const clickHandler = () => {
      history.push(`/${id}`);
    };

    // const addToMyListHandler = () => {
    //   const details = {
    //     id: id,
    //     title: title,
    //     backdrop: backdrop_path,
    //     genre: genre_ids,
    //     rating: vote_average,
    //   };
    //   addToMyList(details);
    // };

    return (
      <div className={classes.banner}>
        <img src={imagePath} alt={title} />
        <h1 className={classes.title}>{title}</h1>
        <p className={classes.summary}>{overview_short}</p>
        <div className={classes.actions}>
          {/* <button
            type="button"
            disabled
            className={`${classes.btn} ${classes["btn-primary"]}`}
            onClick={addToMyListHandler}
          >
            ➕ My List
          </button> */}
          <button
            type="button"
            className={`${classes.btn} ${classes["btn-primary"]}`}
            onClick={clickHandler}
          >
            <span><IoMdInformationCircleOutline size={23}/></span> More info
          </button>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default Banner;
