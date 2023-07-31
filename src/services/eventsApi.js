import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://gateway.marvel.com/v1/public";

const createRequest = (url) => ({ url });

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: ({ orderBy, limit }) =>
        createRequest(
          `/events?orderBy=${orderBy}&limit=${limit}&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a`
        ),
    }),
    getEventDetails: builder.query({
      query: (eventId) =>
        createRequest(
          `/events/${eventId}?&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a`
        ),
    }),
  }),
});

export const { useGetEventsQuery, useGetEventDetailsQuery } = eventsApi;
