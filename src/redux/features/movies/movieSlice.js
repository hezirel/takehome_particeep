import {
	createSlice
} from "@reduxjs/toolkit";

import api from "../../api/fetch";

const initialState = {
	movies: false,
	filters: false
};

const movieSlice = createSlice({
	name: "movie",
	initialState,
	reducers: {
		filter: (state, action) => state.filters.push(action.payload),
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.GetMovies.matchFulfilled,
			(state, action) => {
				state.movies = action.payload;
				state.filters = Array.from(new Set(action.payload.map(movie => movie.category)));
			});
	}
});

export const {
	filter
} = movieSlice.actions;

export default movieSlice.reducer;