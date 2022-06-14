import {
	createSlice
} from "@reduxjs/toolkit";

import api from "../../api/fetch";

const initialState = {
	movies: false,
	tagsPool: false,
	tagsActive: [],
};

const movieSlice = createSlice({
	name: "movie",
	initialState,
	reducers: {
		filter: (state, action) => {
			state.tagsActive.includes(action.payload) ? 
				state.tagsActive.splice(state.tagsActive.indexOf(action.payload), 1) :
				state.tagsActive.push(action.payload);
		},
		remove: (state, action) => {
			state.movies = state.movies.filter(movie => movie.id !== action.payload);
		},
		toggleLike: (state, action) => {
			state.movies.find(movie => movie.id === action.payload).likes++;
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.GetMovies.matchFulfilled,
			(state, action) => {
				state.movies = action.payload;
				state.tagsPool = Array.from(new Set(action.payload.map(movie => movie.category)));
			});
	}
});

export const {
	filter
} = movieSlice.actions;

export default movieSlice.reducer;