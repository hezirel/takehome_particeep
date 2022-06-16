import React from "react";

import "./Movies.css";
import MovieCard from "./MovieCard";

import { 
	useSelector,
} from "react-redux";

const Movies = () => {

	const cursor = useSelector(state => state.movies.cursor);

	return (
		<div className="movies">
			{cursor && cursor.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
		</div>
	);
};

export default Movies;