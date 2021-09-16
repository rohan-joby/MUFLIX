import React, { Fragment } from "react";

import {GENRE } from "../../data/genre";
import AllMovie from "./AllMovie";

const AllGenre = () => {

  return (
    <Fragment>
      {GENRE.map((genre) => (
        <AllMovie key={genre.id} type={genre.name} />
      ))}
    </Fragment>
  );
};

export default AllGenre;
