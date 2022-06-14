import { configureStore } from "@reduxjs/toolkit";
import api from "./api/fetch";
import movieReducer from "./features/movies/movieSlice";

export const store = configureStore({
	reducer: {
		movieReducer,
		[api.reducerPath]: api.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
