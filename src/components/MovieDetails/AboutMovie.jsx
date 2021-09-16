import React from "react";
import classes from "./MovieDetails.module.css";

const AboutMovie = (props) => {
    const {title,vote_average,date,runtime,overview,actors,cast,genres} = props;
    return (
        <>
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
    </>
    )
}

export default AboutMovie
