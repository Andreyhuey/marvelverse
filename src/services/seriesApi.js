import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://gateway.marvel.com/v1/public";

const createRequest = (url) => ({ url });

export const seriesApi = createApi({
  reducerPath: "seriesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getSeries: builder.query({
      query: ({ orderBy, limit, offset }) =>
        createRequest(
          `/series?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getSeriesDetails: builder.query({
      query: (eventId) =>
        createRequest(
          `/series/${eventId}?&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getSeriesCharacters: builder.query({
      query: ({ eventId, orderBy, limit, offset }) =>
        createRequest(
          `/series/${eventId}/characters?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getSeriesComics: builder.query({
      query: ({ eventId, orderBy, limit, offset }) =>
        createRequest(
          `/series/${eventId}/comics?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getSeriesCreators: builder.query({
      query: ({ eventId, orderBy, limit, offset }) =>
        createRequest(
          `/series/${eventId}/creators?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getSeriesSeries: builder.query({
      query: ({ eventId, orderBy, limit, offset }) =>
        createRequest(
          `/series/${eventId}/series?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
  }),
});

export const {
  useGetSeriesQuery,
  useGetSeriesDetailsQuery,
  useGetSeriesCharactersQuery,
  useGetSeriesComicsQuery,
  useGetSeriesCreatorsQuery,
} = seriesApi;
