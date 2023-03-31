import { configureStore } from "@reduxjs/toolkit";
import { characterApi } from "../services/characterApi";

const store = configureStore({
  reducer: {
    [characterApi.reducerPath]: characterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterApi.middleware),
});

export default store;
