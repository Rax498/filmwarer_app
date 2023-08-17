import React, { useState, useEffect } from "react";
import SeacrhIcon from "./search.svg";
import MovieCard from "./MovieCard";
import fetchAPI from "../utils/FetchApi";

const Feed = () => {
  const [movies, setMovies] = useState([]);
  const [searchterm, setSearchterm] = useState("");
  const [testdata, setTestdata] = useState([]);
  const [counter, setCounter] = useState(1);
  const [nextpage, setNextpage] = useState(false);

  const [type, setType] = useState("most_pop_movies");
  const [genre, setGenre] = useState("Action");
  const [rating, setRating] = useState(null);
  const [year, setYear] = useState(2020);

  // ------ api test ------
  const testApi = () => {
    fetchAPI(`titles/utils/titleTypes`).then((data) => setTestdata(data));
    console.log(testdata);
  };

  // --------------initial page loading ------------
  useEffect(() => {
    fetchMovies(type, genre, year, rating);
    testApi();
  }, [counter]);

  // ---------- Fetch/Filter functions --------
  const fetchMovies = (type, genre, year, rating) => {
    fetchAPI(
      `titles?list=${type}&genre=${genre}&year=${year}&info=base_info&page=${counter}`
    ).then((data) => {
      const ratingData = data.results.filter(
        (movie) => movie.ratingsSummary.aggregateRating >= rating
      );
      // console.log("rating", ratingData);
      setMovies(ratingData);
      data.next != null ? setNextpage(true) : setNextpage(false);
    });
  };
  // console.log("this is movie", movies);

  // ------------- Handling the filter ---------
  const handleFilter = () => {
    fetchMovies(type, genre, year, rating);
  };

  // ------------- Search function ---------
  const searchMovie = () => {
    if (searchterm.trim() !== "") {
      fetchAPI(`titles/search/keyword/${searchterm}`).then((data) => {
        setMovies(data.results);
        setCounter(1);
      });
    }
  };

  const handlePreviousClick = () => {};

  return (
    <div className="app">
      <h1 onClick={() => setCounter(1)}>Film Ware</h1>

      <div className="search">
        <input
          type="text"
          value={searchterm}
          onChange={(e) => setSearchterm(e.target.value)}
          placeholder="add movie Title"
        />
        <img src={SeacrhIcon} alt="magnifying glass" onClick={searchMovie} />
      </div>

      {/* // search parameters ---- */}
      <div className="search_Parameters">
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <label htmlFor="searchType">
            Type
            <select
              className="selection"
              id="searchType"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="most_pop_movies">Movie</option>
              <option value="most_pop_series">Series</option>
            </select>
          </label>

          <label htmlFor="genreSelect">
            Genre
            <select
              className="selection"
              id="genreSelect"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
            </select>
          </label>

          <label htmlFor="rating">
            Rating
            <input
              className="selection"
              id="rating"
              type="number"
              value={rating}
              min={1}
              max={10}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>

          <label htmlFor="year">
            Year
            <input
              className="selection"
              id="year"
              type="number"
              value={year}
              max={2023}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
        </div>
        <button className="btn" onClick={() => handleFilter()}>
          search
        </button>
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard movie={movie} key={index} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      {/* ----------- Bottom_Navigation ---------- */}
      {nextpage === true && (
        <div className="pagination">
          <button
            className="btn"
            onClick={() => setCounter((prevCount) => prevCount - 1)}
          >
            PREVIOUS
          </button>
          <div style={{ color: "white", textAlign: "center" }}>{counter}</div>
          <button
            className="btn"
            onClick={() => setCounter((prevCount) => prevCount + 1)}
          >
            NEXT
          </button>
        </div>
      )}
    </div>
  );
};

export default Feed;
