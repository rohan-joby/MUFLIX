import React from "react";

import classes from "./ExtraMovieDetails.module.css";

const ExtraMovieDetails = ({ title, cast, crew, genre }) => {
  const director = crew.find((member) => member.job === "Director");
  const directorName = director ? director.name: "unavailable";

  const writer = crew.find((member) =>(member.job === "Screenplay"|| member.job ==="Writer"));
  const writerName = writer ? writer.name: "unavailable";
  
  let actors = cast.length > 0 ? cast.slice(0,15).map((actor, index) => {
    return index === 14 ? actor.name : `${actor.name},  `;
  }): "unavailable";
  let genreList = genre.map((element, index) => {
    return index === genre.length - 1 ? element.name : `${element.name},  `;
  });
  if(genreList.length === 0){
    genreList="unavailable"
  }; 

  return <div className={classes.container}>
      <h2><span className={classes.label__title}>About  </span> {title}</h2>
      <h3><span className={classes.label}>Director:</span> {directorName}</h3>
      <h3><span className={classes.label}>Cast:</span> {actors}</h3>
      <h3><span className={classes.label}>Writer:</span> {writerName}</h3>
      <h3><span className={classes.label}>Genres:</span> {genreList}</h3>
  </div>;
};

export default ExtraMovieDetails;
