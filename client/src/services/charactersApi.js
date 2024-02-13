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
          `/characters?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getCharacterDetails: builder.query({
      query: (characterId) =>
        createRequest(
          `/characters/${characterId}?&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getCharacterComics: builder.query({
      query: ({ characterId, orderBy, limit, offset }) =>
        createRequest(
          `/characters/${characterId}/comics?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getCharacterEvents: builder.query({
      query: ({ characterId, orderBy, limit, offset }) =>
        createRequest(
          `/characters/${characterId}/events?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getCharacterCreators: builder.query({
      query: ({ characterId, orderBy, limit, offset }) =>
        createRequest(
          `/characters/${characterId}/creators?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getCharacterSeries: builder.query({
      query: ({ characterId, orderBy, limit, offset }) =>
        createRequest(
          `/characters/${characterId}/series?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterDetailsQuery,
  useGetCharacterEventsQuery,
  useGetCharacterComicsQuery,
  useGetCharacterSeriesQuery,
} = charactersApi;
