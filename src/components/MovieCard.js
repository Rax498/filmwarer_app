import React from "react";

const MovieCard = ({ movie }) => {
  const {
    id,
    originalTitleText,
    primaryImage: imag,
    releaseYear,
    titleType,
  } = movie;
  return (
    <div className="movie" key={id}>
      <a target="_main" href={`https://www.imdb.com/title/${id}`}>
        <div>
          <p>{releaseYear.year}</p>
        </div>

        <div>
          <img
            src={imag == null ? "https://via.placeholder.com/400" : imag.url}
            alt="thubnail"
          />
        </div>

        <div>
          <span>{titleType.text}</span>
          <h3>{originalTitleText.text}</h3>
        </div>
      </a>
    </div>
  );
};
export default MovieCard;
