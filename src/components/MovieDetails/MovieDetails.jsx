import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "../UI/Modal";

import { FaPlus } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

import Navigation from "../Header/Navigation";
import AboutMovie from "./AboutMovie";
import useHttp from "../../hooks/use-http";
import { addToMyList, removeFromMyList } from "../../lib/api";
import { fetchOneMovieDetails, fetchOneMovieCredits } from "../../lib/api";
import { IMAGE_URL } from "../../data/endpoints";
import { useAuth } from "../../store/auth-context";
import { useMylist } from "../../store/mylist-context";

import ExtraMovieDetails from "./ExtraMovieDetails";

import Muflix from "../../assets/muflix.PNG";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./MovieDetails.module.css";

const MovieDetails = (props) => {
  const params = useParams();

  const { token } = useAuth();
  const { addToList, removeFromList, isInList } = useMylist();
  const [loadMore, setLoadMore] = useState(false);

  const {
    sendRequest: getDetails,
    status: detailsStatus,
    data: loadedDetails,
    error: detailsError
  } = useHttp(fetchOneMovieDetails);
  const {
    sendRequest: getCredits,
    status: creditsStatus,
    data: loadedCredits,
    error: creditsError
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
    creditsError!==null &&  detailsError!==null
  ) {
    return (
      <>
        <Navigation/>
        <h3 className={classes.error}>No details regarding the movie are available.Please try again!</h3>
      </>
    );
  }


  if (
    detailsStatus === "completed" &&
    creditsStatus === "completed" &&
    loadedDetails &&
    loadedCredits
  ) {
    const { id, backdrop_path, title, overview, release_date, genres, runtime, vote_average} = loadedDetails;
    const { cast, crew } = loadedCredits;

    console.log("loadedDetails ",loadedDetails );
    console.log("loadedCredits",loadedCredits);
    const movieInList = isInList(id);
    const isInValid = backdrop_path === null;
    const imagePath = isInValid ? Muflix : IMAGE_URL + "w780" + backdrop_path;

    const date = release_date
      ? new Date(release_date).getFullYear()
      : "unavailable";

    const actors =
      cast.length > 0
        ? cast.slice(0, 4).map((actor, index) => {
            return index === 3 ? actor.name : `${actor.name},  `;
          })
        : "unavailable";

    const addToMyListHandler = () => {
      const details = { id: id, title: title, backdrop: backdrop_path, genre: genres, rating: vote_average, token: token};
      addToMyList(details);
      addToList(id);
    };
    const removeFromMyListHandler = () => {
      removeFromMyList(id);
      removeFromList(id);
    };

    const loadMoreHandler = () => {
      setLoadMore((prev) => !prev);
    };

    return (
      <Modal>
        <div className={classes.container}>
          <img className={classes.poster} width={600} height={450} src={imagePath} alt={title} />
          <button
            className={classes.wishlist}
            onClick={movieInList ? removeFromMyListHandler : addToMyListHandler}
          >
            <span>
              {movieInList ? <FaMinus size={17} /> : <FaPlus size={17} />}
            </span>{" "}
            {movieInList ? `My List` : `My List`}
          </button>
          <div className={classes.details}>
            <AboutMovie title={title} vote_average={vote_average} date={date} runtime={runtime} overview={overview} cast={cast} actors={actors} genres={genres}
            />
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
          {loadMore && (
            <ExtraMovieDetails
              title={title}
              cast={cast}
              crew={crew}
              genre={genres}
            />
          )}
        </div>
      </Modal>
    );
  }
  return <div></div>;
};

export default MovieDetails;
