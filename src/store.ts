import { configureStore } from "@reduxjs/toolkit";
import filmsReducer from "./store/filmsSlice";
import uiReducer from "./store/uiSlice";

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    ui: uiReducer,
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
