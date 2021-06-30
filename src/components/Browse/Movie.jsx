import React from "react";
import{ useHistory } from "react-router-dom";

import classes from "./Movie.module.css";
import { IMAGE_URL } from "../../data/endpoints";

import { getGenres } from "../../lib/api";

const Movie = (props) => {
  const history = useHistory();
  const {
    id,
    backdrop_path,
    genre_ids,
    title,
    overview,
    release_date,
    vote_average,
  } = props.data;

  const imagePath = IMAGE_URL + "/w500" + backdrop_path;
  const genres = getGenres(genre_ids);
  
  const reducedGenres = genres.slice(0,3);

  const clickHandler = () => {
    history.push(`/${id}`)
  }

  return (
    <div className={classes.movie} onClick={clickHandler}>
      <img className={classes.poster} src={imagePath} alt={title} />
      <div className={classes.details}>
        <h3>{title}</h3>
        <div className={classes.info}>
          <h4>
            {reducedGenres.map((element, index) => {
              return index === reducedGenres.length - 1 ? element : `${element} ◾ `;
            })}
          </h4>
          <h4 className={classes.average}>{vote_average}/10 Rated</h4>
        </div>
      </div>
    </div>
  );
};

export default Movie;
