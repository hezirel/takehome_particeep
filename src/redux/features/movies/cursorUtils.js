import {
	createSelector
} from "@reduxjs/toolkit";

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

export const refresh = (state) => {
	state.pages = computePagination(state);
	state.page = state.page > state.pages - 1 ? state.pages - 1 : state.page;
	state.cursor = computeCursor(state);
};
