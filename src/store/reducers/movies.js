export const SET_MOVIES = "movies/set";
export const SET_QUERY = "movies/setQuery";
export const SET_MOVIES_SORT_BY = "movies/setSortValue";
const initialState = {
	movies: [],
	query: "",
	sortValue: "popularity.desc",
	pageInfo: {
		page: 1,
		total_pages: 0,
	},
};

export const movies = function moviesReducer(state = initialState, action) {
	const newState = { ...state };
	switch (action.type) {
		case SET_MOVIES:
			newState.movies = action.payload;
			break;
		case SET_QUERY:
			newState.query = action.payload;
			break;
		case SET_MOVIES_SORT_BY:
			newState.sortValue = action.payload;
			break;
		case "movies/setPageInfo":
			newState.pageInfo = action.payload;
			break;

		default:
			return state;
	}
	return newState;
};
