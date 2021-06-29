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
      </div>
    );
  }

  return <div></div>;
};

export default Banner;
