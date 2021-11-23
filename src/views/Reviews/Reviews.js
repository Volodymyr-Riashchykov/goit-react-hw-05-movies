import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { movieApiByIDReviews } from "../../components/Services/ServicesApi";
import noMovie from "../../images/noMovie.png"
import s from "./Reviews.module.css"


export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    movieApiByIDReviews(movieId)
      .then(({ data }) => {
        if (data.results.length === 0) {
          return
        }
        setReviews(data.results);
      })
      .catch((error) =>
        toast.error("Woops, something went wrong... Try again later.")
      );
  }, [movieId]);

  return (
    <>
      {reviews.length>0 ? (
        <ul>
              {reviews.map((author) => (
                  
                  <li key={author.id} className={s.item}>
                      <img className={s.img}
                          src={author.author_details.avatar_path
                              ? (!(`${author.author_details.avatar_path}`.indexOf("https") + 1) ?
                                  `https://image.tmdb.org/t/p/w500/${author.author_details.avatar_path}` :
                                  (`${author.author_details.avatar_path}`).slice(1))
                              : noMovie}
                    alt={author.author} width="240" />
                  <div className={s.title}>
                    <h3>{author.author}</h3>
                    {/* <p>popularity: {author.popularity}</p> */}
                      <p>{author.content.substr(0,100)}...</p>
                    
                  </div>
                  </li>
              ))}
          </ul>
      ):(<h3>We don't have any reviews for this movie</h3>)}
    </>
  );
};
