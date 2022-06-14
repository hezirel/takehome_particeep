import React from "react";

import PropTypes from "prop-types";

const MovieCard = ({ movie }) => {
	return (
		<div className="movie-card">
			<div className="movieCardTitle">{movie.title}</div>
		</div>
	);

};

MovieCard.propTypes = {
	movie: PropTypes.object
};

export default MovieCard;