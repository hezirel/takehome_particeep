import {
	createSlice,
} from "@reduxjs/toolkit";

import api from "../../api/fetch";

const initialState = {
	movies: false,
	cursor: false,
	tagsPool: false,
	tagsActive: [],
	likedMovies: [],
	dislikedMovies: [],
	pageSize: 12,
	page: 0,
	pages: 1,
};

const pageCheck = (page, pages) => page > pages - 1 ? pages - 1 : page;
const filterCheck = (cat, tags) => tags.length ? tags.includes(cat) : true;
const pagesCompute = (movies, pageSize) => Math.ceil(movies.length / pageSize);
const filteredMovies = (movies, tags, pageSize) => Math.ceil(movies.filter(m => filterCheck(m.category, tags)).length / pageSize);

const movieSlice = createSlice({
	name: "movie",
	initialState,
	reducers: {
		filter: (state, action) => {
			state.tagsActive.includes(action.payload) ? 
				state.tagsActive.splice(state.tagsActive.indexOf(action.payload), 1) :
				state.tagsActive.push(action.payload);

			state.pages = filteredMovies(state.movies, state.tagsActive, state.pageSize);
			state.page = pageCheck(state.page, state.pages);

		},
		remove: (state, action) => {
			const cat = state.movies.find(movie => movie.id === action.payload).category;
			state.movies = state.movies.filter(movie => movie.id !== action.payload);

			!state.movies.some(movie => movie.category === cat) &&
				(state.tagsPool.splice(state.tagsPool.indexOf(cat), 1),
				state.tagsActive.splice(state.tagsActive.indexOf(cat), 1));
			state.pages = pagesCompute(state.movies, state.pageSize);
			state.page = pageCheck(state.page, state.pages);
		},
		toggleLike: (state, { payload }) => {
			const target = state.movies.find(movie => movie.id === payload.id);

			switch(payload.value) {
			case 1:
				state.likedMovies.push(payload.id);
				target.likes++;
				break;
			case -1:
				state.dislikedMovies.push(target.id);
				state.likedMovies.splice(state.likedMovies.indexOf(payload.id), 1);
				target.likes--;
				target.dislikes++;
				break;
			case 0:
				state.dislikedMovies.splice(state.dislikedMovies.indexOf(payload.id), 1);
				target.dislikes--;
				break;
			}
		},
		setPage: (state, {payload}) => {
			state.page = payload;
		},
		setPageSize: (state, {payload}) => {
			state.pageSize = payload;
			state.pages = filteredMovies(state.movies, state.tagsActive, state.pageSize);
			state.page = pageCheck(state.page, state.pages);
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.GetMovies.matchFulfilled,
			(state, action) => {
				state.movies = action.payload;
				state.tagsPool = Array.from(new Set(action.payload.map(movie => movie.category)));
				state.pages = pagesCompute(state.movies, state.pageSize);
			});
	}
});

export const {
	filter,
	remove,
	toggleLike,
	setPage,
	setPageSize,
} = movieSlice.actions;

export default movieSlice.reducer;