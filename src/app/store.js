import { configureStore } from "@reduxjs/toolkit";

import { eventsApi } from "../services/eventsApi";

export default configureStore({
  reducer: {
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(eventsApi.middleware),
});
