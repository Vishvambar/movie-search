import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = '/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl}), // e.g. http://localhost:5000/api
  endpoints: (builder) => ({
    searchMovies: builder.query({
      query: ({ q, page = 1 }) =>
        `/movies/search?q=${encodeURIComponent(q)}&page=${page}`,
    }),
    getMovie: builder.query({
      query: (id) => `/movies/${id}`,
    }),
  }),
});

// ✅ Auto-generated hooks
export const { useSearchMoviesQuery, useGetMovieQuery } = apiSlice;
