import { configureStore } from "@reduxjs/toolkit";
import api from "./api/fetch";
import movies from "./features/movies/movieSlice";

export const store = configureStore({
	reducer: {
		movies,
		[api.reducerPath]: api.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
