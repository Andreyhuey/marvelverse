import { configureStore } from "@reduxjs/toolkit";

import { eventsApi } from "../services/eventsApi";
import { charactersApi } from "../services/charactersApi";
import { comicsApi } from "../services/comicsApi";
import { seriesApi } from "../services/seriesApi";
import { collectionApi } from "../services/collectionApi";
import { searchApi } from "../services/searchApi";

export default configureStore({
  reducer: {
    [eventsApi.reducerPath]: eventsApi.reducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
    [comicsApi.reducerPath]: comicsApi.reducer,
    [seriesApi.reducerPath]: seriesApi.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      eventsApi.middleware,
      charactersApi.middleware,
      comicsApi.middleware,
      collectionApi.middleware,
      seriesApi.middleware,
      searchApi.middleware
    ),
});
