import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Film {
  episode_id: number;
  title: string;
  release_date: string;
  director: string;
  opening_crawl: string;
}

interface FilmsState {
  films: Film[];
  selectedFilm: Film | null;
}

const initialState: FilmsState = {
  films: [],
  selectedFilm: null,
};

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setFilms(state, action: PayloadAction<Film[]>) {
      state.films = action.payload;
      state.selectedFilm = action.payload[0];
    },
    selectFilm(state, action: PayloadAction<Film>) {
      state.selectedFilm = action.payload;
    },
  },
});

export const { setFilms, selectFilm } = filmsSlice.actions;
export default filmsSlice.reducer;
