import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://gateway.marvel.com/v1/public";

const createRequest = (url) => ({ url, headers: eventsApiHeaders });

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (orderBy) =>
        createRequest(
          `/events?orderBy=${orderBy}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
    getEventDetails: builder.query({
      query: (eventId) =>
        createRequest(
          `/events/${eventId}?ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
  }),
});

export const { useGetEventsQuery, useGetEventDetailsQuery } = eventsApi;
