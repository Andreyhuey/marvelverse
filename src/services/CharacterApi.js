import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://gateway.marvel.com";

const createRequest = (url) => ({ url });

export const characterApi = createApi({
  reducerPath: "CharacterApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCharacter: builder.query({
      query: (searchTerm) =>
        createRequest(
          `/v1/public/characters?nameStartsWith=${searchTerm.toLowerCase()}limit=100&ts=1&apikey=${
            process.env.REACT_APP_API_KEY
          }&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getCharacterComics: builder.query({
      query: (characterId) =>
        createRequest(
          `/v1/public/characters/${characterId}/comics?limit=100&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
  }),
});

export const { useGetCharacterQuery, useGetCharacterComicsQuery } =
  characterApi;
