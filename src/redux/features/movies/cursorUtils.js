const computePagination = (state) => {
	return state.tagsActive.length ?
		Math.ceil(state.movies.filter(movie => state.tagsActive.includes(movie.category)).length / state.pageSize)
		: Math.ceil(state.movies.length / state.pageSize);
};

const computeCursor = (state) => {
	return (
		state.movies.filter(m => state.activeFilters.length ? state.activeFilters.includes(m.category) : true)
			.slice(state.activePage * state.pageSize, (state.activePage + 1) * state.pageSize)
	);
};

const pageCheck = (state) => state.page > state.pages - 1 ? state.pages - 1 : state.page;

export {
	computePagination,
	computeCursor,
	pageCheck
};