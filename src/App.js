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
  console.log(isLoggedIn);

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

        <Route path="/mylist" exact>
          {console.log(isLoggedIn)};
          {isLoggedIn ? (
            <Fragment>
              <Header />
              <MyList />
            </Fragment>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/:movie" exact>
          {isLoggedIn ? (
            <Fragment>
              {/* <Header />
              <Banner />
              <AllGenre /> */}
              <MovieDetails />
            </Fragment>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        {isLoggedIn && (
          <Route path="/genre/:genre">
            {isLoggedIn ? (
              <Fragment>
                <Header />
                <GenreResults />
              </Fragment>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        )}

        <Route path="/results/:query">
          {isLoggedIn ? (
            <Fragment>
              <Header />
              <SearchResults />
            </Fragment>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
