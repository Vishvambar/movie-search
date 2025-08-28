import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { searchmovies, getmovies } from '../../../server/src/services/omdb.js';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    endpoints: (builder) => ({
        searchmovies: builder.query({
            query: ({ q, page = 1 }) => `/movies/search?q=${encodeURIComponent(q)}&page=${page}`,
        }),
        getmovies: builder.query({
            query: (id) => `/movies/${id}`,
        })
    })
});


export const { useSearchMoviesQuery, useGetMovieQuery } = apiSlice;



