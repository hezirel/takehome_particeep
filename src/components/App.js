import {
	React,
} from "react";

import {
	useGetMoviesQuery,
} from "../redux/api/fetch";

import Filters from "./filters/Filters";
import Movies from "./movies/Movies";

function App() {

	const {data, isLoading} = useGetMoviesQuery();

	return (
		<>
			{isLoading && <div>Loading...</div>}
			{
				data && <> 
					<Filters />
					<Movies />
				</>
			}
		</>
	);
}

export default App;
