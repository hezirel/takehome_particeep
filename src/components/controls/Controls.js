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

import "./Controls.css";


const Filters = () => {

	const dispatch = useDispatch();

	const activePage = useSelector(state => state.movies.page);
	const pageSize = useSelector(state => state.movies.pageSize);
	const pages = useSelector(state => state.movies.pages);

	return (
		<div className="pageControls">
			<button disabled={activePage <= 0} onClick={() => dispatch(setPage(activePage-1))}>&lt;</button>
			<span>
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
				<label>Entry / pages</label>
			</span>
			<button disabled={activePage >= pages-1} onClick={() => dispatch(setPage(activePage+1))}>&gt;</button>
		</div>
	);
};

export default Filters;