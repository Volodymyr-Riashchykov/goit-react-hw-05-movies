import noMovie from "../../images/noMovie.png"
import {
  Link,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import s from "./Gallery.module.css"

export default function Gallery({ movies,myPath }) {
    const { url } = useRouteMatch();
     const location = useLocation();
    return (
        <>
        {movies && (
        <ul className={s.list}>
          {movies.map((movie) => (
            <li key={movie.id} className={s.item}>
                  <Link
                      className={s.card}
                to={{
                  pathname: `${url}${myPath}/${movie.id}`,
                  state: { from: { location } },
                }}
              >
                <img className={s.img}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : noMovie
                  }
                  alt={movie.title}
                //   width="240"
                />
                <p className={s.title}>{movie.title}</p>
              </Link>
            </li>
          ))}
        </ul>
            )}
            </>
    )
}