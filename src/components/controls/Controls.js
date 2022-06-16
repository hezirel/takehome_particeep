import {
	React
} from "react";

import { 
	useSelector,
	useDispatch
} from "react-redux";

import {
	setPage,
	setPageSize
} from "../../redux/features/movies/movieSlice";


const Filters = () => {

	const dispatch = useDispatch();

	const activePage = useSelector(state => state.movies.page);
	const pageSize = useSelector(state => state.movies.pageSize);
	const pages = useSelector(state => state.movies.pages);

	return (
		<div className="pageControls">
			{activePage > 0 && <button onClick={() => dispatch(setPage(activePage-1))}>Prev</button>}
			<span>
				<label>Page size: </label>
				<select
					name="pageSize"
					id="pageSize"
					value={pageSize}
					onChange={(e) => {
						dispatch(setPageSize(e.target.value));
						dispatch(setPage(0));
					}}
				>
					<option value={4}>4</option>
					<option value={8}>8</option>
					<option value={12}>12</option>
				</select>
			</span>
			{activePage < pages-1 && <button onClick={() => dispatch(setPage(activePage+1))}>Next</button>}
		</div>
	);
};

export default Filters;