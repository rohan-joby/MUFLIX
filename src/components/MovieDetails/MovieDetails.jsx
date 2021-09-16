import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Modal from "../UI/Modal";

import { FaPlus } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

import useHttp from "../../hooks/use-http";
import { addToMyList, removeFromMyList } from "../../lib/api";
import { fetchOneMovieDetails, fetchOneMovieCredits } from "../../lib/api";
import { IMAGE_URL } from "../../data/endpoints";
import AuthContext from "../../store/auth-context";
import MylistContext from "../../store/mylist-context";

import ExtraMovieDetails from "./ExtraMovieDetails";

import Muflix from "../../assets/muflix.PNG";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./MovieDetails.module.css";

const MovieDetails = (props) => {
  const params = useParams();

  const authCtx = useContext(AuthContext);
  const mylistCtx = useContext(MylistContext);
  const token = authCtx.token;
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
    const {
      id,
      backdrop_path,
      title,
      overview,
      release_date,
      genres,
      runtime,
      vote_average,
    } = loadedDetails;
    const { cast, crew } = loadedCredits;
    const movieInList = mylistCtx.isInList(id);

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
      const details = {
        id: id,
        title: title,
        backdrop: backdrop_path,
        genre: genres,
        rating: vote_average,
        token: token,
      };
      addToMyList(details);
      mylistCtx.addToList(id);
    };
    const removeFromMyListHandler = () => {
      removeFromMyList(id);
      mylistCtx.removeFromList(id);
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
          {movieInList ? `From My List` : `My List`}
        </button>
        <div className={classes.details}>
          <div className={classes.wrapper}>
            <div className={classes.about}>
              <h2 className={classes.title}>{title}</h2>
              <div className={classes.about__extra}>
                <p className={classes.rating}>{vote_average} /10</p>
                {date && <p>{date}</p>}
                {runtime > 0 && <p>{runtime} mins</p>}
              </div>
            </div>
            <h3 className={classes.summary}>{overview}</h3>
          </div>
          <div className={classes.crew}>
            <h4>
              <span>Cast: </span>
              {actors} {cast.length > 0 ? <em>more</em> : ""}
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
