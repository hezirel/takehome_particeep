import {
	createSlice,
} from "@reduxjs/toolkit";

import api from "../../api/fetch";

const initialState = {
	movies: false,
	tagsPool: false,
	tagsActive: [],
	likedMovies: [],
	dislikedMovies: [],
	pageSize: 4,
	page: 0,
	pages: 1,
};

/* const pagesListSelector = createSelector(
	state => state.movies,
	state => state.movies.pageSize,
	(movies, pageSize) => Math.ceil(movies.length / pageSize)
);

const moviesSelector = createSelector(
	state => state.movies,
	state => state.movies.tagsActive,
	(movies, tagsActive) => {
		if (tagsActive.length) {
			return movies.filter(movie => tagsActive.includes(movie.category));
		} else {
			return movies;
		}
	}); */

const movieSlice = createSlice({
	name: "movie",
	initialState,
	reducers: {
		filter: (state, action) => {
			state.tagsActive.includes(action.payload) ? 
				state.tagsActive.splice(state.tagsActive.indexOf(action.payload), 1) :
				state.tagsActive.push(action.payload);

			state.pages = state.tagsActive.length ?
				Math.ceil(state.movies.filter(movie => state.tagsActive.includes(movie.category)).length / state.pageSize) :
				Math.ceil(state.movies.length / state.pageSize);
			state.page = state.page > state.pages - 1 ? state.pages - 1 : state.page;
		},
		remove: (state, action) => {

			const cat = state.movies.find(movie => movie.id === action.payload).category;
			state.movies = state.movies.filter(movie => movie.id !== action.payload);

			!state.movies.some(movie => movie.category === cat) &&
				(state.tagsPool.splice(state.tagsPool.indexOf(cat), 1),
				state.tagsActive.splice(state.tagsActive.indexOf(cat), 1));

			state.pages = state.tagsActive.length ?
				Math.ceil(state.movies.filter(movie => state.tagsActive.includes(movie.category)).length / state.pageSize) :
				Math.ceil(state.movies.length / state.pageSize);
			state.page = state.page > state.pages - 1 ? state.pages - 1 : state.page;
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
		},
		setPage: (state, {payload}) => {
			state.page = payload;
		},
		setPageSize: (state, {payload}) => {
			state.pageSize = payload;
			state.pages = state.tagsActive.length ?
				Math.ceil(state.movies.filter(movie => state.tagsActive.includes(movie.category)).length / state.pageSize) :
				Math.ceil(state.movies.length / state.pageSize);
		},
		setPagesList: (state, {payload}) => {
			state.pages = payload;
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.GetMovies.matchFulfilled,
			(state, action) => {
				state.movies = action.payload;
				state.tagsPool = Array.from(new Set(action.payload.map(movie => movie.category)));
				state.pages = Math.ceil(state.movies.length / state.pageSize);
			});
	}
});

export const {
	filter,
	remove,
	toggleLike,
	toggleDislike,
	setPage,
	setPageSize,
	setPagesList
} = movieSlice.actions;

export default movieSlice.reducer;