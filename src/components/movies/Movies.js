import React from "react";

import "./Movies.css";
import MovieCard from "./MovieCard";

import { 
	useSelector,
} from "react-redux";

const Movies = () => {

	const filter = useSelector(state => state.movies.tagsActive);
	const movies = filter.length ?
		useSelector(state => state.movies.movies).filter(movie => filter.includes(movie.category))
		: useSelector(state => state.movies.movies);

	const activePage = useSelector(state => state.movies.page);
	const pageSize = useSelector(state => state.movies.pageSize);

	const cursor = movies.slice(activePage * pageSize, (activePage + 1) * pageSize);

	return (
		<div className="movies">
			{cursor.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
		</div>
	);
};

export default Movies;