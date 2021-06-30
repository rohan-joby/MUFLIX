import React, { Fragment } from "react";

import AllMovie from "./components/Browse/AllMovie";
import Banner from "./components/Browse/Banner/Banner";
import MovieDetails from "./components/Browse/MovieDetails/MovieDetails";

const App = () => {
  return <Fragment>
    {/* <Banner />
    <AllMovie /> */}
    <MovieDetails />
  </Fragment>;
};

export default App;
