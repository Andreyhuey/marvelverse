import { configureStore } from "@reduxjs/toolkit";

import { eventsApi } from "../services/eventsApi";

export default configureStore({
  reducer: {
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
});
