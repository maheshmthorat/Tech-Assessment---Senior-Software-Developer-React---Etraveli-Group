import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  darkMode: boolean;
  filter: string;
}

const initialState: UIState = {
  darkMode: localStorage.getItem("darkMode") === "true",
  filter: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", String(state.darkMode));
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
  },
});

export const { toggleDarkMode, setFilter } = uiSlice.actions;
export default uiSlice.reducer;
