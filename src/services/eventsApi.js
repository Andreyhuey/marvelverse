import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://gateway.marvel.com/v1/public";

const createRequest = (url) => ({ url });

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: ({ orderBy, limit, offset }) =>
        createRequest(
          `/events?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getEventDetails: builder.query({
      query: (eventId) =>
        createRequest(
          `/events/${eventId}?&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getEventCharacters: builder.query({
      query: ({ eventId, orderBy, limit, offset }) =>
        createRequest(
          `/events/${eventId}/characters?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getEventComics: builder.query({
      query: ({ eventId, orderBy, limit, offset }) =>
        createRequest(
          `/events/${eventId}/comics?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getEventCreators: builder.query({
      query: ({ eventId, orderBy, limit, offset }) =>
        createRequest(
          `/events/${eventId}/creators?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getEventSeries: builder.query({
      query: ({ eventId, orderBy, limit, offset }) =>
        createRequest(
          `/events/${eventId}/series?orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventDetailsQuery,
  useGetEventCharactersQuery,
  useGetEventComicsQuery,
  useGetEventCreatorsQuery,
  useGetEventSeriesQuery,
} = eventsApi;
