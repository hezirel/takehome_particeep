import React from "react";

import PropTypes from "prop-types";

const MovieCard = ({ movie }) => {
	return (
		<li className="movie-card">
			<div className="movieCardTitle">{movie.title}</div>
		</li>
	);

};

MovieCard.propTypes = {
	movie: PropTypes.object
};

export default MovieCard;