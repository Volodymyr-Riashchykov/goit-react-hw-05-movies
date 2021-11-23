import { lazy, Suspense } from "react";
import {Switch,Route} from "react-router-dom"
import { ToastContainer } from "react-toastify";
import Navigation from "../Navigation/Navigation";
import Spinner from "../Spinner/Spinner";
import './App.css';

const HomePage = lazy(() =>
  import("../../views/HomePage/HomePage" /* webpackChunkName: "HomePage" */)
);
const MoviesPage = lazy(() =>
  import("../../views/MoviesPage/MoviesPage" /* webpackChunkName: "MoviesPage" */)
);
const MoviesDetailsPage = lazy(() =>
  import("../../views/MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: "MovieDetailsPage" */)
);

export default function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MoviesDetailsPage />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer />
    </>
  );
}

