import { configureStore } from "@reduxjs/toolkit";

import { CharacterApi } from "../services/CharacterApi";

export default configureStore({
  reducer: {
    [CharacterApi.reducerPath]: CharacterApi.reducer,
  },
});
