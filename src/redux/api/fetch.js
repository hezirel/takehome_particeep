import {
	createApi, fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

import movies from "./movies";

export const api = createApi({
	reducerPath: "moviesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://www.omdbapi.com" }),
	endpoints: (build) => ({
		GetMovies: build.query({
			queryFn: () => movies,
			providesTags: ["movies"],
		}),
		GetPoster: build.query({
			query: (title) => ({
				url: "/",
				method: "GET",
				params: {
					apiKey: "c20c6e76",
					t: title
				}
			})
		})
	})
});

export const {
	useGetMoviesQuery,
	useGetPosterQuery
} = api;

export default api;