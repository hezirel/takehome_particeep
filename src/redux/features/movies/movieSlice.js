import {
	createSlice,
	createSelector
} from "@reduxjs/toolkit";

import api from "../../api/fetch";

const initialState = {
	movies: false,
	cursor: false,
	tagsPool: false,
	tagsActive: [],
	likedMovies: [],
	dislikedMovies: [],
	pageSize: 4,
	page: 0,
	pages: 1,
};

const selectPageSize = state => state.pageSize;
const selectActivePage = state => state.page;
const selectActiveFilters = state => state.tagsActive;
const selectMovies = state => state.movies;

const computePagination = createSelector(
	selectPageSize,
	selectActiveFilters,
	selectMovies,
	(pageSize, tagsActive, movies) => {
		return tagsActive.length ?
			Math.ceil(movies.filter(movie => tagsActive.includes(movie.category)).length / pageSize)
			: Math.ceil(movies.length / pageSize);
	}
);

const computeCursor = createSelector(
	selectPageSize,
	selectActivePage,
	selectMovies,
	selectActiveFilters,
	(pageSize, activePage, movies, activeFilters) => {
		return (
			movies.filter(m => activeFilters.length ? activeFilters.includes(m.category) : true)
				.slice(activePage * pageSize, (activePage + 1) * pageSize)
		);
	}
);

const movieSlice = createSlice({
	name: "movie",
	initialState,
	reducers: {
		filter: (state, action) => {
			state.tagsActive.includes(action.payload) ? 
				state.tagsActive.splice(state.tagsActive.indexOf(action.payload), 1) :
				state.tagsActive.push(action.payload);

			state.pages = computePagination(state);
			state.page = state.page > state.pages - 1 ? state.pages - 1 : state.page;
			state.cursor = computeCursor(state);
		},
		remove: (state, action) => {

			const cat = state.movies.find(movie => movie.id === action.payload).category;
			state.movies = state.movies.filter(movie => movie.id !== action.payload);

			!state.movies.some(movie => movie.category === cat) &&
				(state.tagsPool.splice(state.tagsPool.indexOf(cat), 1),
				state.tagsActive.splice(state.tagsActive.indexOf(cat), 1));

			state.pages = computePagination(state);
			state.page = state.page > state.pages - 1 ? state.pages - 1 : state.page;
			state.cursor = computeCursor(state);
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
			state.cursor = computeCursor(state);
		},
		setPageSize: (state, {payload}) => {
			state.pageSize = payload;
			state.pages = computePagination(state);
			state.cursor = computeCursor(state);
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.GetMovies.matchFulfilled,
			(state, action) => {
				state.movies = action.payload;
				state.tagsPool = Array.from(new Set(action.payload.map(movie => movie.category)));
				state.pages = computePagination(state);
				state.cursor = computeCursor(state);
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