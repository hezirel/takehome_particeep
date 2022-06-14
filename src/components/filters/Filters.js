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

	const filters = useSelector(state => state.movies.tagsPool);

	const handleSubmit = ({ target: { outerText: tag}}) => {
		dispatch(filter(tag));
	};

	return (
		<div className="filters">
			{
				filters && filters.map((filter, index) => (
					<button key={index} onClick={handleSubmit}>
						{filter}
					</button>
				))
			}
		</div>
	);
};

export default Filters;