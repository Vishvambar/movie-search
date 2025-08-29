import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = '/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    // Add error handling for failed requests
    prepareHeaders: (headers) => {
      headers.set('Cache-Control', 'no-cache');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    searchMovies: builder.query({
      query: ({ q, page = 1 }) =>
        `/movies/search?q=${encodeURIComponent(q)}&page=${page}`,
      transformResponse: (response) => {
        if (!response) return { Search: [], totalResults: "0" };
        // Handle potential error responses
        if (response.Error) return { Search: [], totalResults: "0", Error: response.Error };
        return response;
      },
      // Add error handling
      transformErrorResponse: (error) => {
        console.error("API Error:", error);
        return { error: error.status, message: error.data?.message || "Failed to fetch movies" };
      }
    }),
    getMovie: builder.query({
      query: (id) => `/movies/${id}`,
      transformResponse: (response) => {
        return response || {};
      },
      // Add error handling
      transformErrorResponse: (error) => {
        console.error("API Error:", error);
        return { error: error.status, message: error.data?.message || "Failed to fetch movie details" };
      }
    }),
  }),
});

// ✅ Auto-generated hooks
export const { useSearchMoviesQuery, useGetMovieQuery } = apiSlice;
