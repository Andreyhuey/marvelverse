import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://gateway.marvel.com/v1/public";

const createRequest = (url) => ({ url });

export const charactersApi = createApi({
  reducerPath: "charactersApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({ orderBy, limit, offset }) =>
        createRequest(
          `/characters?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a`
        ),
    }),
    getCharacterDetails: builder.query({
      query: (characterId) =>
        createRequest(
          `/events/${characterId}?&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a`
        ),
    }),
    getCharacterComics: builder.query({
      query: ({ characterId, orderBy, limit, offset }) =>
        createRequest(
          `/events/${characterId}/comics?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a`
        ),
    }),
    getCharacterEvents: builder.query({
      query: ({ characterId, orderBy, limit, offset }) =>
        createRequest(
          `/events/${characterId}/characters?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a`
        ),
    }),
    getCharacterCreators: builder.query({
      query: ({ characterId, orderBy, limit, offset }) =>
        createRequest(
          `/events/${characterId}/creators?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a`
        ),
    }),
    getCharacterSeries: builder.query({
      query: ({ characterId, orderBy, limit, offset }) =>
        createRequest(
          `/events/${characterId}/series?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a`
        ),
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterDetailsQuery,
  useGetCharacterEventsQuery,
  useGetCharacterComicsQuery,
  useGetEventCreatorsQuery,
  useGetEventSeriesQuery,
} = charactersApi;
