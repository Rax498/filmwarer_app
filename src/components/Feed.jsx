import React from "react";
import SeacrhIcon from "./search.svg";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";

import fetchAPI from "../utils/FetchApi";

const Feed = () => {
  const [movies, setMovies] = useState([]);
  const [searchterm, setSearchterm] = useState("");
  const [counter, setCounter] = useState("");

  // -----------------------------------Fetching Movie from API ------------------------
  const searchMovie = (searchterm) => {
    fetchAPI(`titles/search/keyword/${searchterm}`).then((data) =>
      setMovies(data.results)
    );
  };

  // ________________________________Preloading movie during start___________________
  useEffect(() => {
    fetchAPI(
      `titles?list=most_pop_movies&genre=Drama&year=2020&page=${counter}`
    ).then((data) => setMovies(data.results));
    // searchMovie('batman')
  }, [counter]);
  // console.log(movies)

  return (
    <div className="app">
      <h1>Film Ware</h1>

      <div className="search">
        <input
          type="text"
          value={searchterm}
          onChange={(e) => {
            setSearchterm(e.target.value);
          }}
          placeholder="add movie Title"
        />
        <img
          src={SeacrhIcon}
          alt="magnifying glass"
          onClick={() => {
            searchMovie(searchterm);
          }}
        />
      </div>
      {/* interactiom------ */}
      <div style={{ textAlign: "center", paddingBottom: "2vh" }}>
        <button
          onClick={() =>
            setCounter((preCount) => preCount < 100 && preCount + 1)
          }
        >
          NEXT
        </button>{" "}
        <br />
        <input type="number" value={counter} readOnly />
        <br />
        <button
          onClick={() => setCounter((preCount) => preCount > 0 && preCount - 1)}
        >
          PREVIOUS
        </button>{" "}
        <br />
        <input
          type="number"
          onChange={(e) => e.target.value > 0 && setCounter(e.target.value)}
          placeholder="page number"
        />
        <br />
      </div>

      {/* ---------------------Loading Movie aCard--------------------- */}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          {" "}
          <h2>No movies found</h2>{" "}
        </div>
      )}
    </div>
  );
};

export default Feed;
