import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
//import MovieDetails from "./MovieDetails/MovieDetails";
import Lazyload from "react-lazyload";

import useWindowWidth from "../../hooks/useWindowWidth";
import Muflix from "../../assets/muflix.PNG";
import { IMAGE_URL } from "../../data/endpoints";
import { addToMyList, removeFromMyList } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import MylistContext from "../../store/mylist-context";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import classes from "./Movie.module.css";

import {
  getGenres,
  getMyListGenres,
  getGenreObjects,
  getMyListGenreObjects,
} from "../../lib/api";

const Movie = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const mylistCtx = useContext(MylistContext);
  const token = authCtx.token;
  const windowWidth = useWindowWidth();

  // const [detailsIsOpen, setDetailsIsOpen] = useState(false);

  const handleOpenDetails = () => {
    //setDetailsIsOpen(true);
    history.push(`/movie/${id}`);
    //console.log("detailsIsOpen",detailsIsOpen);
  };
  // const handleCloseDetails = () => {
  //   setDetailsIsOpen(false);
  //   history.goBack();
  //   console.log("detailsIsOpen",detailsIsOpen);

  // };
  const { id, backdrop_path, genre_ids, title, vote_average } = props.data;
  const isInValid = backdrop_path === null;
  const imagePath = isInValid ? Muflix : IMAGE_URL + "w500" + backdrop_path;
  const movieInList = mylistCtx.isInList(id);

  let genres, genreObjects;
  if (props.mylist) {
    genres = getMyListGenres(genre_ids);
    genreObjects = getMyListGenreObjects(genre_ids);
  } else {
    genres = getGenres(genre_ids);
    genreObjects = getGenreObjects(genre_ids);
  }
  const reducedGenres = genres.slice(0, 3);

  let shortTitle;
  if (windowWidth <480){
    shortTitle = title.length < 15 ? title : title.slice(0, 15) + "...";
  }
  else{
    shortTitle = title.length < 18 ? title : title.slice(0, 18) + "...";
  }
  const clickHandler = () => {
    history.push(`/movie/${id}`);
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
    mylistCtx.addToList(id);
  };

  const removeFromListHandler = () => {
    removeFromMyList(id);
    mylistCtx.removeFromList(id);
  };
  return (
    // <div className={classes.movie} style={{ backgroundImage: `url(${imagePath})` }} onClick={clickHandler}>
    <div className={classes.movie} onClick={windowWidth<500&& clickHandler}>
      {/* {detailsIsOpen && <MovieDetails onClose={handleCloseDetails}/>} */}
      <Lazyload height={170} once>
      <img
        className={classes.poster}
        onClick={clickHandler}
        src={imagePath}
        alt={title}
        loading="lazy"
        height={170}
        width={304}
      />
      </Lazyload>
      <div className={classes.details}>
        <h3>{shortTitle}</h3>
        <button className={classes[`list-handler`]}
          onClick={movieInList ? removeFromListHandler : addToListHandler}
        >
          {movieInList ? (
           <div onClick={props.refetch}><FaMinus style={{ fill: "white" }} /></div>
          ) : (
            <FaPlus style={{ fill: "white" }} />
          )}
        </button>
        {/* <button onClick={clickHandler}> */}
        <button className={classes[`load-more`]} onClick={handleOpenDetails}>
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
