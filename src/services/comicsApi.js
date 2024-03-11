import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://gateway.marvel.com/v1/public";

const createRequest = (url) => ({ url });

export const comicsApi = createApi({
  reducerPath: "comicsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getComics: builder.query({
      query: ({ orderBy, limit, offset }) =>
        createRequest(
          `/comics?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getComicDetails: builder.query({
      query: (comicId) =>
        createRequest(
          `/comics/${comicId}?&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getComicCharacters: builder.query({
      query: ({ comicId, orderBy, limit, offset }) =>
        createRequest(
          `/comics/${comicId}/characters?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getComicEvents: builder.query({
      query: ({ comicId, orderBy, limit, offset }) =>
        createRequest(
          `/comics/${comicId}/events?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getComicCreators: builder.query({
      query: ({ comicId, orderBy, limit, offset }) =>
        createRequest(
          `/comics/${comicId}/creators?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getComicSeries: builder.query({
      query: ({ comicId, orderBy, limit, offset }) =>
        createRequest(
          `/comics/${comicId}/series?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
  }),
});

export const {
  useGetComicsQuery,
  useGetComicDetailsQuery,
  useGetComicCharactersQuery,
  useGetComicEventsQuery,
  useGetComicCreatorsQuery,
  useGetComicSeriesQuery,
} = comicsApi;
