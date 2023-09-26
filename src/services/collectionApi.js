import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://gateway.marvel.com/v1/public";

const createRequest = (url) => ({ url });

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCollectionCharacters: builder.query({
      query: ({ limit, offset, searchTerm }) =>
        createRequest(
          `/characters?nameStartsWith=${searchTerm}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getCollectionComics: builder.query({
      query: ({ limit, offset, searchTerm }) =>
        createRequest(
          `/comics?titleStartsWith=${searchTerm}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getCollectionEvents: builder.query({
      query: ({ limit, offset, searchTerm }) =>
        createRequest(
          `/events?nameStartsWith=${searchTerm}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getCollectionSeries: builder.query({
      query: ({ limit, offset, searchTerm }) =>
        createRequest(
          `/series?titleStartsWith=${searchTerm}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
  }),
});

export const {
  useGetCollectionCharactersQuery,
  useGetCollectionComicsQuery,
  useGetCollectionEventsQuery,
  useGetCollectionSeriesQuery,
} = collectionApi;
