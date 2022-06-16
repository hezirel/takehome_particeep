const computePagination = ({tagsActive, movies, pageSize}) => {
	return tagsActive.length ?
		Math.ceil(movies.filter(movie => tagsActive.includes(movie.category)).length / pageSize)
		: Math.ceil(movies.length / pageSize);
};

const computeCursor = ({pageSize, activePage, movies, activeFilters}) => {
	return (
		movies.filter(m => activeFilters.length ? activeFilters.includes(m.category) : true)
			.slice(activePage * pageSize, (activePage + 1) * pageSize)
	);
};

const pageCheck = (state) => state.page > state.pages - 1 ? state.pages - 1 : state.page;

export const refresh = (state) => {
	state.pages = computePagination(state);
	state.page = pageCheck(state);
	state.cursor = computeCursor(state);
};
