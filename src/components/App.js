import {
	React,
} from "react";

import {
	useGetMoviesQuery,
} from "../redux/api/fetch";

import Filters from "./filters/Filters";
import Movies from "./movies/Movies";
import Controls from "./controls/Controls";

function App() {

	const {data, isLoading} = useGetMoviesQuery();

	return (
		<>
			{isLoading && <div>Loading...</div>}
			{
				data && <> 
					<Filters />
					<Movies />
					<Controls />
				</>
			}
		</>
	);
}

export default App;
