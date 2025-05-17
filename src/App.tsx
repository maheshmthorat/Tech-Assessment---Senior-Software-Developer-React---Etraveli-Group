import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [filter, setFilter] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") ?? "false"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    axios
      .get("https://swapi.py4e.com/api/films/?format=json")
      .then((response) => {
        const sorted = response.data.results.sort(
          (a, b) => a.episode_id - b.episode_id
        );
        setFilms(sorted);
        setSelectedFilm(sorted[0]);
      });
  }, []);

  const getStars = (count) => "★".repeat(count) + "☆".repeat(10 - count);

  const filmRatings = {
    1: 5,
    2: 6,
    3: 7,
    4: 8,
    5: 9,
    6: 7,
  };

  const filteredFilms = films.filter((f) =>
    f.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={`app ${darkMode == "true" ? "dark-mode" : ""}`}>
      <div className="controls">
        <button>Sort by...</button>
        <button
          onClick={() => setDarkMode(darkMode == "false" ? "true" : "false")}
        >
          {darkMode == "true" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <input
          type="text"
          placeholder="Type to search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="movieList">
        <div className="sidebar">
          <table className="film-list">
            <tbody>
              {filteredFilms.map((film) => (
                <tr
                  key={film.episode_id}
                  className={
                    selectedFilm?.episode_id === film.episode_id
                      ? "selected"
                      : ""
                  }
                  onClick={() => setSelectedFilm(film)}
                >
                  <td>
                    <strong>EPISODE {film.episode_id}</strong>
                  </td>
                  <td>
                    <div>{film.title}</div>
                  </td>
                  <td>
                    <span className="stars">
                      {getStars(filmRatings[film.episode_id] || 6)}
                    </span>
                  </td>
                  <td>
                    <div>{film.release_date}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="details">
          {selectedFilm && (
            <div className="film-details">
              <h2>{selectedFilm.title}</h2>
              <div className="poster-placeholder">Poster</div>
              <p>{selectedFilm.opening_crawl.substring(0, 400)}...</p>
              <p>
                <strong>Directed by:</strong> {selectedFilm.director}
              </p>
              <p>
                <strong>Average rating:</strong>{" "}
                <span className="stars">
                  {getStars(filmRatings[selectedFilm.episode_id] || 6)}
                </span>
              </p>
              <div className="badges">
                <span>Internet Movie Database: 76%</span>
                <span>Rotten Tomatoes: 79%</span>
                <span>Metacritic: 68%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
