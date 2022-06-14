import {
	React
} from "react";

import { 
	useSelector
} from "react-redux";

import "./Filters.css";

const Filters = () => {

	const filters = useSelector(state => state.filters);

	filters ? true: false;

	return (
		<div className="filters">FILTERS</div>
	);
};

export default Filters;