import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { movieApiByIDCast } from "../../components/Services/ServicesApi";
import noMovie from "../../images/noMovie.png";
import s from "./Cast.module.css"

const old = [{ name: "Sorry, cast is not available" }]

export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    movieApiByIDCast(movieId)
      .then(({ data }) => {
        if (data.cast.length === 0) {
          setCast(old);
          toast.info("Sorry, cast is not available");
        }
        setCast(data.cast);
      })
      .catch((error) =>
        toast.error("Woops, something went wrong... Try again later.")
      );
  }, [movieId]);

  return (
    <>
      {cast && (
          <ul className={s.list}>
              {cast.map((person) => (
                  <li key={person.id} className={s.item}>
                  <img
                    className={s.img}
                          src={person.profile_path
                              ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                              : noMovie}
                          alt={person.name} />
                      <h3>{person.name}</h3>
                      {/* <p>{person.gender===1?"women":"men"}</p> */}
                      <p>popularity: {person.popularity}</p>
                  </li>
              ))}
          </ul>
      )}
    </>
  );
};

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};
