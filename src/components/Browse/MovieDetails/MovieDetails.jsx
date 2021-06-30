import React, { useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { addToMyList } from "../../../lib/api";
import { fetchOneMovieDetails, fetchOneMovieCredits } from "../../../lib/api";
import { IMAGE_URL } from "../../../data/endpoints";

import LoadingSpinner from "../../UI/LoadingSpinner";
import classes from "./MovieDetails.module.css";

const MovieDetails = () => {
  const history = useHistory();
  const params = useParams();

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
  }, [getDetails, getCredits,id]);

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

    const imagePath = IMAGE_URL + "/w780" + backdrop_path;
    const date = new Date(release_date).getFullYear();

    const actors = cast.slice(0, 4).map((actor, index) => {
      return index === 3 ? actor.name : `${actor.name},  `;
    });

    // const director = crew.find((member) => member.job === "Director");
    // const writer = crew.find((member) => member.job === "Screenplay");
    
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

    const closePageHandler = () => {
      history.push("/");
    }

    return (
      <div className={classes.container}>
        <img className={classes.poster} src={imagePath} alt={title} />
        <button className={`${classes[`close-button`]}`} onClick={closePageHandler}>❌</button>
        <button className={classes.wishlist} onClick={addToMyListHandler}>➕ My List</button>
        <div className={classes.details}>
          <div className={classes.about}>
            <h2 className={classes.title}>{title}</h2>
            <p className={classes.rating}>{vote_average} /10</p>
            <p>{date}</p>
            <p>{runtime} mins</p>
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
        </div>{" "}
        {/* <h4>{director.name}</h4>
                <h4>{writer.name}</h4> */}
      </div>
    );
  }
  return <div></div>;
};

export default MovieDetails;

//793723
