import { useEffect, useState, lazy, Suspense } from "react";
import {
    NavLink,
    useHistory,
    useLocation,
    useParams,
    useRouteMatch,
    Route,
} from "react-router-dom";
import { movieApiByID } from "../../components/Services/ServicesApi";
import noMovie from "../../images/noMovie.png"
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import s from "./MovieDetailsPage.module.css"

const Cast = lazy(() => import("../Cast/Cast" /* webpackChunkName: "Cast" */));
const Reviews = lazy(() => import("../Reviews/Reviews" /* webpackChunkName: "Reviews" */));

export default function MovieDetailsPage(prop) {
    const [movies, setMovies] = useState([]);
    const [pathBack,setPathBack] = useState('/')
    const { movieId } = useParams();
    const history = useHistory();
    const location = useLocation();
    const { url } = useRouteMatch();

    useEffect(() => {
        movieApiByID(movieId)
        .then(({ data }) => {
            setMovies(data);
        })
        .catch((error) =>
            toast.error("Woops, something went wrong... Try again later.")
        );
    }, [movieId]);

    useEffect(() => {
        if(!location.state) return
        setPathBack(location.state.from.location.pathname +
            location.state.from.location.search);
    }, [location])

    return (
        <>
            <button
                className={s.btn}
                type="button"
                onClick={() => history.push(pathBack)}
            >
                Go Back
            </button>
            <div className={s.card}>
                <img
                    className={s.img}
                    src={
                    movies.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movies.poster_path}`
                        : noMovie
                    }
                    alt={movies.title}
                    width="420"
                />
                <div className={s.content}>
                    <h1>{movies.title}</h1>
                    {movies.genres && (
                        <>
                        <h3>Genres</h3>
                        <ul className={s.list}>
                            {movies.genres.map((genre) => (
                                <li key={genre.id} className={s.item}>
                                    {genre.name}
                                </li>
                            ))}
                        </ul>
                        </>
                    )}
                    <p>Vote average: {movies.vote_average}</p>
                    <h3>Overview</h3>
                    <p className={s.over}>{movies.overview}</p>
                </div>
            </div>
            <hr />
            
            <h3 className={s.title}>Additional information</h3>
            <div className={s.info}>
                <NavLink to={{pathname: `${url}/cast`}} className={s.link} activeClassName={s.link_active}>Cast</NavLink>
                
            <NavLink to={{ pathname: `${url}/reviews` }} className={s.link} activeClassName={s.link_active}>Reviews</NavLink>
            </div>
            <hr />
            <Suspense fallback={<Spinner />}> 
                <Route path="/movies/:movieId/cast">
                    <Cast movieId={movieId} />
                </Route>
                <Route path="/movies/:movieId/reviews">
                <Reviews movieId={movieId} />
                </Route>
            </Suspense>
        </>
    )
}