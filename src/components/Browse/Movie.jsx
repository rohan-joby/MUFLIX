import React from "react";
import{ useHistory } from "react-router-dom";
import { FaPlus, FaChevronDown } from "react-icons/fa";

import Muflix from "../../assets/muflix.PNG"
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
    vote_average,
  } = props.data;

  const isInValid = backdrop_path === null;
  const imagePath = isInValid ? Muflix : IMAGE_URL + "w500" + backdrop_path;

  const genres = getGenres(genre_ids);
  const reducedGenres = genres.slice(0,3);

  const shortTitle = title.length < 18 ? title : title.slice(0,18) + "...";

  const clickHandler = () => {
    history.push(`/${id}`)
  }

  return (
    <div className={classes.movie} onClick={clickHandler}>
      
      <img className={classes.poster} src={imagePath} alt={title} />
      <div className={classes.details}>
        <h3>{shortTitle}</h3>
        <button><FaPlus style={{ fill: 'white' }}/></button>
        <button><FaChevronDown style={{ fill: 'white' }}/></button>
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
