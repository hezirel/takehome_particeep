import {
	createApi
} from "@reduxjs/toolkit/query/react";

import movies from "./movies";

export const api = createApi({
	reducerPath: "moviesApi",
	endpoints: (build) => ({
		GetMovies: build.query({
			queryFn: () => movies,
			providesTags: ["movies"],
		})
	})
});

export const {
	useGetMoviesQuery
} = api;

export default api;