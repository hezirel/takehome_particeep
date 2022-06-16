import React from "react";

import { 
	useDispatch,
	useSelector
} from "react-redux";

import PropTypes from "prop-types";

import {
	remove,
	toggleLike,
} from "../../redux/features/movies/movieSlice";

const likeSvg = (
	<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
		<path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
	</svg>
);

const trashSvg = (
	<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
		<path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
	</svg>
);

const MovieCard = ({ movie }) => {
	
	const dispatch = useDispatch();
	const likedMovies = useSelector(state => state.movies.likedMovies);
	const dislikedMovies = useSelector(state => state.movies.dislikedMovies);

	const handleRemove = () => {
		dispatch(remove(movie.id));
	};

	const handleLike = (value) => {
		dispatch(toggleLike({id: movie.id, value}));
	};

	const ratio = movie.likes / (movie.likes + movie.dislikes);

	return (
		<div
			className="movie-card"
			style={{
				backgroundImage: `linear-gradient(to bottom, green 0% ${ratio*100}%, red ${100-(ratio*100)}% 100%)`,
			}}
		>
			<div className="movie-card-title">
				<h5 className="movieCardTitle">{movie.title}</h5>
				<p className="movieCardCategory">{movie.category}
				</p>
			</div>
			<img></img>
			<div className="movieCardUIControls">
				{
					(likedMovies.includes(movie.id) && <button className="liked" onClick={() => handleLike(-1)}>{likeSvg}</button>)
					|| (dislikedMovies.includes(movie.id) && <button className="disliked" onClick={() => handleLike(0)}>{likeSvg}</button>)
					|| <button className="movieCardLikeButton" onClick={() => handleLike(1)}>{likeSvg}</button>
				}
				<button className="movieCardRemoveButton" onClick={handleRemove}>{trashSvg}</button>
			</div>
		</div>
	);

};

MovieCard.propTypes = {
	movie: PropTypes.object
};

export default MovieCard;