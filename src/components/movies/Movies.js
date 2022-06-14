import React from "react";

import "./Movies.css";

import { useSelector } from "react-redux";


const Movies = () => {

	const movies = useSelector(state => state.movies.movies);

	return (
		<div className="movies">
			{
				movies && movies.map(movie => {
					return (
						<div key={movie.id} className="movie">
							<div className="movie__title">{movie.title}</div>
							<div className="movie__year">{movie.year}</div>
						</div>
					);
				})
			}
		</div>
	);
};

export default Movies;