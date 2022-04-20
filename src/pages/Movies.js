import React, { useCallback, useEffect, useState } from "react";
import { fetchFilms } from "../fetchers/fetchFilms";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Movie } from "../components/Movie";
import { Button, Checkbox, Pagination, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/actions/fetchMovies";
import {
	SET_MOVIES,
	SET_MOVIES_SORT_BY,
	SET_QUERY,
} from "../store/reducers/movies";
export function Movies() {
	const movies = useSelector((state) => state.movies.movies);
	const query = useSelector((state) => state.movies.query);
	const sortValue = useSelector((state) => state.movies.sortValue);
	const pageInfo = useSelector((state) => state.movies.pageInfo);
	const dispatch = useDispatch();
	const [includeAdult, setIncludeAdult] = useState(false);
	useEffect(() => {
		// console.log("use effect",movies)
		// searchMovies();
		dispatch(fetchMovies());
		return () => {
			window.scrollTo(0, 0);
		};
	}, [dispatch]);

	function setMovies(movies) {
		dispatch({ type: SET_MOVIES, payload: movies });
	}
	const setQuery = useCallback(
		(query) => {
			dispatch({ type: SET_QUERY, payload: query });
		},
		[dispatch]
	);
	const setSortValue = useCallback(
		(sort) => {
			dispatch({ type: SET_MOVIES_SORT_BY, payload: sort });
		},
		[dispatch]
	);
	function setPageInfo(pageInfo) {
		dispatch({ type: "movies/setPageInfo", payload: pageInfo });
	}
	console.log("pageInfo", pageInfo);
	const searchMovies = useCallback(
		({ page,sort = sortValue } = {}) => {
			dispatch(fetchMovies({ query, page, sort }));
		},
		[dispatch, query, sortValue]
	);
	// function searchMovies({ page = 1, sort = sortValue } = {}) {
	// 	// dispatch({type: 'movies/searchMovies',page: page})
	// 	// e && e.preventDefault();
	// 	// console.log("Search");
	// 	// let method = "discover";
	// 	// if (query && query.length > 0) {
	// 	// 	method = "search";
	// 	// }
	// 	// fetch(
	// 	// 	`https://api.themoviedb.org/3/${method}/movie?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU&sort_by=${sort}&include_adult=false&include_video=${includeAdult}&page=${page}&with_watch_monetization_types=flatrate&query=${query}`
	// 	// )
	// 	// 	.then((response) => response.json())
	// 	// 	.then((resp) => {
	// 	// 		setMovies(resp.results);
	// 	// 		setPageInfo({
	// 	// 			currentPage: resp.page,
	// 	// 			totalPages: Math.min(resp.total_pages, 500),
	// 	// 		});
	// 	// 	})
	// 	// 	.catch((err) => console.error(err));
	// }

	const sortTypes = [
		{
			value: "popularity.asc",
			title: "popularity.asc",
		},
		{
			value: "popularity.desc",
			title: "popularity.desc",
		},
		{
			value: "release_date.asc",
			title: "release_date.asc",
		},
		{
			value: "release_date.desc",
			title: "release_date.desc",
		},
		{
			value: "original_title.desc",
			title: "original_title.desc",
		},
		{
			value: "vote_average.desc",
			title: "vote_average.desc",
		},
		{
			value: "vote_count.desc",
			title: "vote_count.desc",
		},
	];

	return (
		<Container maxWidth="xl">
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "cneter",
				}}
			>
				<h1>Movies</h1>

				<div style={{ display: "flex", alignItems: "center" }}>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							searchMovies();
						}}
					>
						<FormControl>
							<InputLabel id="demo-simple-select-label">Sort by</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={sortValue}
								label="Sortby"
								// disabled={query && query.length > 0}
								onChange={(event) => {
									setSortValue(event.target.value);
									searchMovies({ sort: event.target.value });
								}}
							>
								{sortTypes &&
									sortTypes.map((sort, i) => (
										<MenuItem key={i} value={sort.value}>
											{sort.title}
										</MenuItem>
									))}
							</Select>
						</FormControl>

						<Checkbox
							value={includeAdult}
							onChange={(e) => setIncludeAdult(e.target.checked)}
						/>
						<TextField
							value={query}
							placeholder="Search"
							onChange={(e) => setQuery(e.target.value)}
						/>
						<Button type="submit">Search</Button>
					</form>
				</div>
			</div>

			<Grid container spacing={2} sx={{ justifyContent: "center" }}>
				{console.log(movies)}
				{movies.map((movie, i) => (
					<Grid item xs={12/5} key={movie.id}>
						<Movie movie={movie} key={movie.id} />
					</Grid>
				))}
			</Grid>
			<Pagination
				sx={{ marginTop: 2 }}
				count={pageInfo.total_pages}
				page={pageInfo.page}
				onChange={(event, value) => {
					searchMovies({ page: value });
				}}
			/>
		</Container>
	);
}
