import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://gateway.marvel.com";

const createRequest = (url) => ({ url });

export const CharacterApi = createApi({
  reducerPath: "CharacterApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: () =>
        createRequest(
          `/v1/public/characters?limit=100&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
  }),
});

export const { useGetCharactersQuery } = CharacterApi;
