import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FaPlus, FaChevronDown } from "react-icons/fa";

import Muflix from "../../assets/muflix.PNG";
import classes from "./Movie.module.css";
import { IMAGE_URL } from "../../data/endpoints";
import { addToMyList } from "../../lib/api";
import AuthContext from "../../store/auth-context";

import {
  getGenres,
  getMyListGenres,
  getGenreObjects,
  getMyListGenreObjects,
} from "../../lib/api";

const Movie = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const { id, backdrop_path, genre_ids, title, vote_average } = props.data;
  const isInValid = backdrop_path === null;
  const imagePath = isInValid ? Muflix : IMAGE_URL + "w500" + backdrop_path;

  let genres, genreObjects;
  if (props.mylist) {
    genres = getMyListGenres(genre_ids);
    genreObjects = getMyListGenreObjects(genre_ids);
  } else {
    genres = getGenres(genre_ids);
    genreObjects = getGenreObjects(genre_ids);
  }
  const reducedGenres = genres.slice(0, 3);

  const shortTitle = title.length < 18 ? title : title.slice(0, 18) + "...";

  const clickHandler = () => {
    history.push(`/${id}`);
  };

  const addToListHandler = () => {
    const details = {
      id: id,
      title: title,
      backdrop: backdrop_path,
      genre: genreObjects,
      rating: vote_average,
      token: token,
    };
    addToMyList(details);
  };

  return (
    <div className={classes.movie} >
      <img className={classes.poster} onClick={clickHandler} src={imagePath} alt={title} />
      <div className={classes.details}>
        <h3>{shortTitle}</h3>
        <button onClick={addToListHandler}>
          <FaPlus style={{ fill: "white" }} />
        </button>
        <button onClick={clickHandler}>
          <FaChevronDown style={{ fill: "white" }} />
        </button>
        <div className={classes.info}>
          <h4>
            {reducedGenres.map((element, index) => {
              return index === reducedGenres.length - 1
                ? element
                : `${element} ◾ `;
            })}
          </h4>
          <h4 className={classes.average}>{vote_average}/10 Rated</h4>
        </div>
      </div>
    </div>
  );
};

export default Movie;
