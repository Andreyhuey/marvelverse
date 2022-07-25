import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://gateway.marvel.com";

const createRequest = (url) => ({ url });

export const CharacterApi = createApi({
  reducerPath: "fetchTotalApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: () =>
        createRequest(
          `/v1/public/characters?limit=100ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a`
        ),
    }),
    getCharacterId: builder.query({
      query: (characterId) =>
        createRequest(
          `/v1/pubic/characters/${characterId}?limit=100&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a`
        ),
    }),
    getCharactersStories: builder.query({
      query: () =>
        createRequest(
          `/v1/public/characters?limit=100&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a`
        ),
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterIdQuery,
  useGetCharactersStoriesQuery,
} = CharacterApi;
