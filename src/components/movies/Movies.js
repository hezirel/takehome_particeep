import React from "react";

import "./Movies.css";
import MovieCard from "./MovieCard";

import { useSelector } from "react-redux";

const Movies = () => {

	const movies = useSelector(state => state.movies.movies);

	return (
		<div className="movies">
			{
				movies && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
			}
		</div>
	);
};

export default Movies;