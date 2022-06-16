import {
	createSlice,
} from "@reduxjs/toolkit";

import api from "../../api/fetch";
import {
	refresh
} from "./cursorUtils";

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


const movieSlice = createSlice({
	name: "movie",
	initialState,
	reducers: {
		filter: (state, action) => {
			state.tagsActive.includes(action.payload) ? 
				state.tagsActive.splice(state.tagsActive.indexOf(action.payload), 1) :
				state.tagsActive.push(action.payload);

			refresh(state);
		},
		remove: (state, action) => {

			const cat = state.movies.find(movie => movie.id === action.payload).category;
			state.movies = state.movies.filter(movie => movie.id !== action.payload);

			!state.movies.some(movie => movie.category === cat) &&
				(state.tagsPool.splice(state.tagsPool.indexOf(cat), 1),
				state.tagsActive.splice(state.tagsActive.indexOf(cat), 1));

			refresh(state);
		},
		toggleLike: (state, { payload }) => {
			const target = state.movies.find(movie => movie.id === payload.id);
			switch(payload.value) {
			case 1:
				state.likedMovies.push(payload.id);
				target.likes++;
				break;
			case -1:
				state.dislikedMovies.push(payload.id);
				state.likedMovies.splice(state.likedMovies.indexOf(payload.id), 1);
				target.likes--;
				target.dislikes++;
				break;
			default:
				state.dislikedMovies.splice(state.dislikedMovies.indexOf(payload.id), 1);
				target.dislikes--;
				break;
			}
			refresh(state);
		},
		setPage: (state, {payload}) => {
			state.page = payload;
			refresh(state);
		},
		setPageSize: (state, {payload}) => {
			state.pageSize = payload;
			refresh(state);
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.GetMovies.matchFulfilled,
			(state, action) => {
				state.movies = action.payload;
				state.tagsPool = Array.from(new Set(action.payload.map(movie => movie.category)));
				refresh(state);
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