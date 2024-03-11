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
      query: (seriesId) =>
        createRequest(
          `/series/${seriesId}?&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getSeriesCharacters: builder.query({
      query: ({ seriesId, orderBy, limit, offset }) =>
        createRequest(
          `/series/${seriesId}/characters?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getSeriesComics: builder.query({
      query: ({ seriesId, orderBy, limit, offset }) =>
        createRequest(
          `/series/${seriesId}/comics?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getSeriesCreators: builder.query({
      query: ({ seriesId, orderBy, limit, offset }) =>
        createRequest(
          `/series/${seriesId}/creators?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
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
