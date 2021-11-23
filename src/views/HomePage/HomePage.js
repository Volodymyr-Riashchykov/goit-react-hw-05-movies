import { useState, useEffect } from "react";
// import {  useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import { trendingApi } from "../../components/Services/ServicesApi";
import Gallery from "../../components/Gallery/Gallery";
import s from "./HomePage.module.css"


export default function HomePage() {
  const [movies, setMovies] = useState([]);
  // const { url } = useRouteMatch();

  useEffect(() => {
    trendingApi()
      .then(({ data }) => {
        setMovies(data.results)
      })
      .catch((error) =>
        toast.error("Woops, something went wrong... Try again later.")
      );
  },[]);
  
  return (
    <>
      {movies && (
        <>
          <h1 className={s.title}>Trending today</h1>
          <Gallery movies={movies} myPath={'movies'}/>
          
        </>
      )}
    </>
  );
};
