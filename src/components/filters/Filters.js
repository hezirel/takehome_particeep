import {
	React
} from "react";

import { 
	useSelector
} from "react-redux";

import "./Filters.css";

const Filters = () => {

	const filters = useSelector(state => state.movies.filters);

	return (
		<div className="filters">
			{
				filters && filters.map((filter, index) => (
					<li key={index}>{filter}</li>
				))
			}
		</div>
	);
};

export default Filters;