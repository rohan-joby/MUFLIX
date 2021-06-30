import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./pages/Header";
import AllMovie from "./components/Browse/AllMovie";
import Banner from "./components/Browse/Banner/Banner";
import MovieDetails from "./components/Browse/MovieDetails/MovieDetails";
import MyList from "./pages/MyList";

const App = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Header />
          <Banner />
          <AllMovie />
        </Route>
        <Route path="/my-list" exact>
          <MyList />
        </Route>
        <Route path="/:movie" exact>
          <MovieDetails />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
