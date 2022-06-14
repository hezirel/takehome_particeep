import React from "react";

import "./Movies.css";
import MovieCard from "./MovieCard";

import { useSelector } from "react-redux";

const Movies = () => {

	const movies = useSelector(state => state.movies.movies);
	const filter = useSelector(state => state.movies.tagsActive);

	return (
		<div className="movies">
			{
				movies && movies.map((movie) => {
					if (filter.length) {
						return filter.includes(movie.category) && <MovieCard key={movie.id} movie={movie} />;
					}
					return <MovieCard key={movie.id} movie={movie} />;
				})
			}
		</div>
	);
};

export default Movies;