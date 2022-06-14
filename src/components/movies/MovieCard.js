import React from "react";

import PropTypes from "prop-types";

const MovieCard = ({ key, movie }) => {
	return (
		<li key={key} className="movie-card">
			<div className="movieCardTitle">{movie.title}</div>
		</li>
	);

};

MovieCard.propTypes = {
	key: PropTypes.string.isRequired,
	movie: PropTypes.object
};

export default MovieCard;