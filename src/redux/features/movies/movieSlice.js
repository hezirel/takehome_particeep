import {
	createSlice
} from "@reduxjs/toolkit";

import api from "../../api/fetch";

const initialState = {
	movies: false,
	tagsPool: false,
	tagsActive: [],
	likedMovies: [],
	dislikedMovies: [],
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

			const cat = state.movies.find(movie => movie.id === action.payload).category;
			state.movies = state.movies.filter(movie => movie.id !== action.payload);

			!state.movies.some(movie => movie.category === cat) &&
				(state.tagsPool.splice(state.tagsPool.indexOf(cat), 1),
				state.tagsActive.splice(state.tagsActive.indexOf(cat), 1));
		},
		toggleLike: (state, { payload }) => {
			const target = (id) => state.movies.find(movie => movie.id === id);

			if (state.likedMovies.includes(payload)) {
				state.likedMovies.splice(state.likedMovies.indexOf(payload), 1);
				target(payload).likes--;
			} else {
				state.likedMovies.push(payload);
				target(payload).likes++;
			}
		},
		toggleDislike: (state, {payload}) => {
			const target = (id) => state.movies.find(movie => movie.id === id);

			if (state.dislikedMovies.includes(payload)) {
				state.dislikedMovies.splice(state.dislikedMovies.indexOf(payload), 1);
				target(payload).dislikes--;
			} else {
				state.likedMovies.splice(state.likedMovies.indexOf(payload), 1);
				state.dislikedMovies.push(payload);
				target(payload).dislikes++;
			}
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
	filter,
	remove,
	toggleLike,
	toggleDislike
} = movieSlice.actions;

export default movieSlice.reducer;