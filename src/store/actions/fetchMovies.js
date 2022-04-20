export const fetchMovies =
	({ query, page = 1, sort = "popularity.desc" } = {}) =>
	(dispatch) => {
		console.log("Search");
		let method = "discover";
		if (query && query.length > 0) {
			method = "search";
		}
		fetch(
			`https://api.themoviedb.org/3/${method}/movie?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&query=${query}`
		)
			.then((response) => response.json())
			.then((data) => {
				dispatch({ type: "movies/set", payload: data.results });
				dispatch({
					type: "movies/setPageInfo",
					payload: {
						page: data.page,
						total_pages: Math.min(data.total_pages, 500),
					},
				});
			})
			.catch((err) => console.error(err));
	};
export const fetchMovieById =
	({ movieId } = {}) =>
	(dispatch) => {
		console.log(movieId);
		fetch(
			`https://api.themoviedb.org/3/movie/${+movieId}?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU`
		)
			.then((response) => response.json())
			.then((data) => {
				dispatch({ type: "movies/setMovie", payload: data });
			})
			.catch((err) => console.error(err));
	};
export const fetchSimilarMoviesById =
	({ movieId } = {}) =>
	(dispatch) => {
		return fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU`
		)
			.then((response) => response.json())
			.then(data => {
				dispatch({type: "movies/setSimilarMovies", payload: data.results})
			})
			.catch((err) => console.error(err));
	};
