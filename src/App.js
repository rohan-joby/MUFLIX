import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import HomePage from "./pages/HomePage";

import LoadingSpinner from "./components/UI/LoadingSpinner";

const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const MovieDetailsPage = React.lazy(() => import("./pages/MovieDetailsPage"));
const MyListPage = React.lazy(() => import("./pages/MyListPage"));
const SearchResultsPage = React.lazy(() => import("./pages/SearchResultsPage"));
const SingleGenrePage = React.lazy(() => import("./pages/SingleGenrePage"));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Switch>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <ProtectedRoute path="/mylist" exact>
          <MyListPage />
        </ProtectedRoute>
        <ProtectedRoute path="/movie/:movie" exact>
          <MovieDetailsPage />
        </ProtectedRoute>
        <ProtectedRoute path="/genre/:genre" exact>
          <SingleGenrePage />
        </ProtectedRoute>
        <ProtectedRoute path="/results/:query" exact>
          <SearchResultsPage />
        </ProtectedRoute>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default App;
