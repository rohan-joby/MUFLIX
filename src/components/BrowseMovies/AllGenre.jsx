import React from "react";

import {GENRE } from "../../data/genre";
import AllMovie from "./AllMovie";

const AllGenre = () => {

  return (
    <>
      {GENRE.map((genre) => (
        <AllMovie key={genre.id} type={genre.name} />
      ))}
    </>
  );
};

export default AllGenre;
