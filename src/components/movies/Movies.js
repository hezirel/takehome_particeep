import React from "react";

import "./Movies.css";
import MovieCard from "./MovieCard";

import {
	setPagesList
} from "../../redux/features/movies/movieSlice";
import { 
	useSelector,
	useDispatch
} from "react-redux";

const Movies = () => {

	const dispatch = useDispatch();

	const movies = useSelector(state => state.movies.movies);
	const filter = useSelector(state => state.movies.tagsActive);

	const activePage = useSelector(state => state.movies.page);
	const pageSize = useSelector(state => state.movies.pageSize);

	const filtered = filter.length ? movies.filter(movie => filter.includes(movie.category)) : movies;
	const cursor = filtered.slice(activePage * pageSize, (activePage + 1) * pageSize);
	dispatch(setPagesList(filtered.length));

	return (
		<div className="movies">
			{cursor.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
		</div>
	);
};

export default Movies;