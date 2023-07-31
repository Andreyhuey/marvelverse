import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface eventsApiHeaders {
  apikey: string;
  ts: number;
  hash: string;
}

const eventsApiHeaders = {
  apikey: process.env.REACT_APP_API_KEY,
  ts: 1,
  hash: process.env.REACT_APP_HASH,
};

const baseUrl = "https://gateway.marvel.com/v1/public";

const createRequest = (url: string) => ({ url, headers: eventsApiHeaders });

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], void>({
      query: (modified) => createRequest(`/events?orderBy=${modified}`),
    }),
  }),
});
