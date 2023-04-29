import React, { useEffect, useState } from "react";
import axios from "../axiosSetup";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

function Row({ title, url, isLarge = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function getData() {
      const req = await axios.get(url);
      setMovies(req.data.results);
      return req;
    }
    getData();
  }, [url]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(null, { tmdbId: movie.id })
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="each_row">
        {movies.map(
          (movie) =>
            ((isLarge && movie.poster_path) ||
              (!isLarge && movie.backdrop_path)) && (
              <img
                onClick={() => handleClick(movie)}
                className={`row_image ${isLarge && "row_large_image"}`}
                src={`${BASE_IMAGE_URL}${
                  isLarge ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                key={movie.id}
              />
            )
        )}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
