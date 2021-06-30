import React, { useEffect } from "react";

import useHttp from "../../../hooks/use-http";
import { fetchBanner } from "../../../lib/api";
import { IMAGE_URL } from "../../../data/endpoints";

import LoadingSpinner from "../../UI/LoadingSpinner";
import classes from "./Banner.module.css";

const Banner = () => {
  const { sendRequest, status, data: banner } = useHttp(fetchBanner);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  let loadedBanner;

  if (status === "pending") {
    return <LoadingSpinner />;
  }
  if (status === "completed" && banner) {
    const { backdrop_path, title, overview } = banner;
    //console.log(id, backdrop_path, title, overview );
    const imagePath = IMAGE_URL + "/w1280" + backdrop_path;

    return (
      <div className={classes.banner}>
        <img src={imagePath} alt={title} />
        <h1 className={classes.title}>{title}</h1>
        <p className={classes.summary}>{overview}</p>
        <div className={classes.actions}>
          <button type="button" className={`${classes.btn} ${classes["btn-primary"]}`}>➕  WishList</button>
          <button typ="button" className={`${classes.btn} ${classes["btn-secondary"]}`}>ℹ   More info</button>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default Banner;
// {classes["btn btn-primary"]}  {classes["btn btn-secondary"]}