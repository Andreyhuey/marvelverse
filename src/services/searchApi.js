import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://gateway.marvel.com/v1/public";

const createRequest = (url) => ({ url });

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getSearchCharacters: builder.query({
      query: ({ orderBy, limit, offset }) =>
        createRequest(
          `/characters?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getSearchComics: builder.query({
      query: ({ orderBy, limit, offset }) =>
        createRequest(
          `/comics?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getSearchEvents: builder.query({
      query: ({ orderBy, limit, offset }) =>
        createRequest(
          `/events?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getSearchSeries: builder.query({
      query: ({ orderBy, limit, offset }) =>
        createRequest(
          `/series?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getComicSeries: builder.query({
      query: ({ orderBy, limit, offset, searchTerm }) =>
        createRequest(
          `/series?orderBy=${orderBy}&limit=${limit}&offset=${offset}&titleStartsWith=${searchTerm}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
  }),
});

export const {
  useGetSearchCharactersQuery,
  useGetSearchComicsQuery,
  useGetSearchEventsQuery,
  useGetSearchSeriesQuery,
  useGetComicSeriesQuery,
} = searchApi;
