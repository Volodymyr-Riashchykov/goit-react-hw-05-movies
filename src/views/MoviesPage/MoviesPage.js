import { useState, useEffect } from "react";
import {
  // Link,
  useHistory,
  useLocation,
  // useRouteMatch,
} from "react-router-dom";
import { toast } from "react-toastify";
import { searchApi } from "../../components/Services/ServicesApi";
import Form from "../../components/Form/Form";
import Gallery from "../../components/Gallery/Gallery";

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  // const { url } = useRouteMatch();

  const searchQuery = new URLSearchParams(location.search).get("query") ?? "";

  const onChangeQuery = (query) => {
    history.push({ ...location, search: `query=${query}` });
  };

    useEffect(() => {
      if (!searchQuery) { return; }
      
      searchApi(searchQuery)
        .then(({ data }) => {
        setMovies(data.results);
      })
      .catch((error) =>
        toast.error("Woops, something went wrong... Try again later.")
      );
    }, [searchQuery]);
  
  
  return (
    <>
      <Form searh={onChangeQuery} />
      <Gallery movies={movies} myPath={''}/>
      
    </>
  );
};

// export default MoviesPage;