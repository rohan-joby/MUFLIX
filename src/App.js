import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./pages/Header";
import AllGenre from "./components/Browse/AllGenre";
import Banner from "./components/Browse/Banner/Banner";
import MovieDetails from "./components/Browse/MovieDetails/MovieDetails";
import MyList from "./pages/MyList";

const App = () => {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Banner />
          <AllGenre />
        </Route>
        <Route path="/mylist" exact>
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
