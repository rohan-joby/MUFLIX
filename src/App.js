import React, { Fragment } from "react";

import AllMovie from "./components/Browse/AllMovie";
import Banner from "./components/Browse/Banner/Banner";

const App = () => {
  return <Fragment>
    <Banner />
    <AllMovie />
  </Fragment>;
};

export default App;
