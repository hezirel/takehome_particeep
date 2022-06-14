import {
	React
} from "react";

import { 
	useSelector,
	useDispatch
} from "react-redux";

import {
	filter
} from "../../redux/features/movies/movieSlice";


import "./Filters.css";

const Filters = () => {

	const dispatch = useDispatch();

	const tagsList = useSelector(state => state.movies.tagsPool);
	const tagsActive = useSelector(state => state.movies.tagsActive);

	const handleSubmit = ({ target: { outerText: tag}}) => {
		dispatch(filter(tag));
	};

	return (
		<div className="filters">
			{
				tagsList && tagsList.map((filter, index) => (
					<button 
						key={index}
						onClick={handleSubmit}
						className={tagsActive.includes(filter) ? "active" : "tags"}
					>
						{filter}
					</button>
				))
			}
		</div>
	);
};

export default Filters;