import React, { Fragment, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./pages/Header";
import AllGenre from "./components/Browse/AllGenre";
import Banner from "./components/Browse/Banner/Banner";
import MovieDetails from "./components/Browse/MovieDetails/MovieDetails";
import MyList from "./pages/MyList";
import GenreResults from "./pages/GenreResults";
import SearchResults from "./pages/SearchResults";

import AuthContext from "./store/auth-context";

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Fragment>
      <Switch>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/" exact>
          <Header />
          <Banner />
          <AllGenre />
        </Route>
        {isLoggedIn && (
          <Route path="/mylist" exact>
            <Header />
            <MyList />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/:movie" exact>
            <MovieDetails />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/genre/:genre">
            <Header />
            <GenreResults />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/results/:query">
            <Header />
            <SearchResults />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
