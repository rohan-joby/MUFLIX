import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

import { FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";

import useHttp from "../../../hooks/use-http";
import { addToMyList } from "../../../lib/api";
import { fetchOneMovieDetails, fetchOneMovieCredits } from "../../../lib/api";
import { IMAGE_URL } from "../../../data/endpoints";

import ExtraMovieDetails from "./ExtraMovieDetails";

import Muflix from "../../../assets/muflix.PNG";
import LoadingSpinner from "../../UI/LoadingSpinner";
import classes from "./MovieDetails.module.css";

const MovieDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const [loadMore, setLoadMore] = useState(false);
  const {
    sendRequest: getDetails,
    status: detailsStatus,
    data: loadedDetails,
  } = useHttp(fetchOneMovieDetails);
  const {
    sendRequest: getCredits,
    status: creditsStatus,
    data: loadedCredits,
  } = useHttp(fetchOneMovieCredits);

  const id = params.movie;

  useEffect(() => {
    getDetails(id);
    getCredits(id);
  }, [getDetails, getCredits, id]);

  if (detailsStatus === "pending" || creditsStatus === "pending") {
    return <LoadingSpinner />;
  }
  if (
    detailsStatus === "completed" &&
    creditsStatus === "completed" &&
    loadedDetails &&
    loadedCredits
  ) {
    console.log(loadedCredits);
    const {
      backdrop_path,
      title,
      overview,
      release_date,
      genres,
      runtime,
      vote_average,
    } = loadedDetails;
    const { cast, crew } = loadedCredits;

    const isInValid = backdrop_path === null;
    const imagePath = isInValid ? Muflix : IMAGE_URL + "w780" + backdrop_path;

    const date = new Date(release_date).getFullYear();

    const actors = cast.slice(0, 4).map((actor, index) => {
      return index === 3 ? actor.name : `${actor.name},  `;
    });



    const addToMyListHandler = () => {
      const details = {
        id: id,
        title: title,
        backdrop: backdrop_path,
        genre: genres,
        rating: vote_average,
      };
      addToMyList(details);
    };

    const loadMoreHandler = () => {
      setLoadMore((prev) => !prev);
    };

    const closePageHandler = () => {
      history.goBack();
    };

    return (
      <div className={classes.container}>
        <img className={classes.poster} src={imagePath} alt={title} />
        <button
          className={`${classes[`close-button`]}`}
          onClick={closePageHandler}
        >
          <VscChromeClose size={20} style={{ fill: "white" }} />
        </button>
        <button className={classes.wishlist} onClick={addToMyListHandler}>
          <span>
            <FaPlus size={17} />
          </span>{" "}
          My List
        </button>
        <div className={classes.details}>
          <div>
            <div className={classes.about}>
              <h2 className={classes.title}>{title}</h2>
              <div className={classes.about__extra}>
                <p className={classes.rating}>{vote_average} /10</p>
                <p>{date}</p>
                <p>{runtime} mins</p>
              </div>
            </div>
            <h3 className={classes.summary}>{overview}</h3>
          </div>
          <div className={classes.crew}>
            <h4>
              <span>Cast: </span>
              {actors} <em>more</em>
            </h4>
            <h4>
              <span>Genres: </span>
              {genres.map((element, index) => {
                return index === genres.length - 1
                  ? element.name
                  : `${element.name} ◾ `;
              })}
            </h4>
          </div>
        </div>
        <button
          type="button"
          className={classes.load}
          onClick={loadMoreHandler}
        >
          {!loadMore ? (
            <FaChevronDown size={30} style={{ fill: "white" }} />
          ) : (
            <FaChevronUp size={30} style={{ fill: "white" }} />
          )}
        </button>
        {loadMore && <ExtraMovieDetails title={title} cast={cast} crew={crew} genre={genres}/>}

        {/* <h4>{director.name}</h4>
                <h4>{writer.name}</h4> */}
      </div>
    );
  }
  return <div></div>;
};

export default MovieDetails;

//793723
