import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AnalyticsData } from '../interfaces'

export const shortUrlApi = createApi({
  reducerPath: 'shortUrlApi',
  baseQuery: fetchBaseQuery({ baseUrl:`${import.meta.env.VITE_BASE_URL}/api/ `}),
  endpoints: (builder) => ({
    createShortUrl: builder.mutation({
      query: (body) => ({
        url: 'shorten',
        method: 'POST',
        body,
      }),
    }),
    getUrlInfo: builder.query({
      query: (shortUrl) => `info/${shortUrl}`,
    }),
    getAnalytics: builder.query<AnalyticsData, string>({
  query: (shortUrl) => `/analytics/${shortUrl}`,
}),
    deleteShortUrl: builder.mutation({
      query: (shortUrl) => ({
        url: `delete/${shortUrl}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useCreateShortUrlMutation,
  useGetUrlInfoQuery,
  useGetAnalyticsQuery,
  useDeleteShortUrlMutation,
} = shortUrlApi
