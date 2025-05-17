import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { setFilms, selectFilm } from "./store/filmsSlice";
import { toggleDarkMode, setFilter } from "./store/uiSlice";

const filmRatings: Record<number, number> = {
  1: 5,
  2: 6,
  3: 7,
  4: 8,
  5: 9,
  6: 7,
};

const getStars = (count: number) => "★".repeat(count) + "☆".repeat(10 - count);

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { films, selectedFilm } = useSelector(
    (state: RootState) => state.films
  );
  const { darkMode, filter } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    axios
      .get("https://swapi.py4e.com/api/films/?format=json")
      .then((response) => {
        const sorted = response.data.results.sort(
          (a: any, b: any) => a.episode_id - b.episode_id
        );
        dispatch(setFilms(sorted));
      });
  }, [dispatch]);

  const filteredFilms = films.filter((f) =>
    f.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <div className="controls">
        <button>Sort by...</button>
        <button onClick={() => dispatch(toggleDarkMode())}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <input
          type="text"
          placeholder="Type to search..."
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
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
                  onClick={() => dispatch(selectFilm(film))}
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
