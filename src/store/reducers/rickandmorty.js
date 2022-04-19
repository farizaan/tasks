export const SET_CHARACTERS = "setCharacters";
export const SET_PAGE = "setPage ";
export const SET_QUERY = "setFilterByStatus";
export const SET_FILTER_BY_STATUS = "setFilterByStatus";
export const SET_PAGE_INFO = "setPageInfo";
const initState = {
	characters: [],
	status: "loading",
	page: 1,
	query: "",
	filterByStatus: "",
	info: {},
};

export function rickandmorty(state = initState, action) {
	const newState = { ...state };
	switch (action.type) {
		case SET_CHARACTERS:
			newState.characters = action.payload;
			break;
		case SET_PAGE:
			newState.page = action.payload;
			break;
		case SET_QUERY:
			newState.query = action.payload;
			break;
		case "setFilter":
			newState.filterByStatus = action.payload;
			break;
		case SET_PAGE_INFO:
			newState.info = action.payload;
			break;
		default:
			return state;
	}

	return newState;
}
