import { SET_CHARACTERS, SET_PAGE_INFO } from "../reducers/rickandmorty";

export const fetchCharacters = (query, page=1, filterStatus) => (dispatch) => {
	let search = "";
	if (query && query.length > 0) search = `&name=${query}`;
	let status = "";
	if (filterStatus) status = `&status=${filterStatus}`;

	fetch(
		`https://rickandmortyapi.com/api/character?page=${page}${search}${status}`
	)
		.then((res) => res.json())
		.then((data) => {
			dispatch({ type: SET_CHARACTERS, payload: data.results });
			dispatch({type: SET_PAGE_INFO, payload: data.info})
		})
		.catch((err) => console.error(err));
};
