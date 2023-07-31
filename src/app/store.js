import { configureStore } from "@reduxjs/toolkit";
import { CharacterApi } from "../services/characterApi";

const store = configureStore({
  reducer: {
    [CharacterApi.reducerPath]: CharacterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CharacterApi.middleware),
});

export default store;
