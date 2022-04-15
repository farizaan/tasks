import React, { useEffect, useState } from "react";
import { fetchFilms } from "../fetchers/fetchFilms";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Movie } from "../components/Movie";
import { Button, Checkbox, Pagination, TextField } from "@mui/material";
import styled from "@emotion/styled";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
export function Movies() {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState("");
	const [includeAdult, setIncludeAdult] = useState(false);
	const [sortValue, setSortValue] = useState("popularity.desc");
	const [pageInfo, setPageInfo] = useState({
		currentPage: 1,
		totalPages: 0,
	});
	useEffect(() => {
		// loadDefaultMovies();
		searchMovies();

		return () => {
			window.scrollTo(0,0)
		}
	}, []);
	function searchMovies({ page = 1, sort = sortValue } = {}) {
		// e && e.preventDefault();
		console.log("Search");
		let method = "discover";
		if (query && query.length > 0) {
			method = "search";
		}
		fetch(
			`https://api.themoviedb.org/3/${method}/movie?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU&sort_by=${sort}&include_adult=false&include_video=${includeAdult}&page=${page}&with_watch_monetization_types=flatrate&query=${query}`
		)
			.then((response) => response.json())
			.then((resp) => {
				setMovies(resp.results);
				setPageInfo({
					currentPage: resp.page,
					totalPages: Math.min(resp.total_pages, 500),
				});
			})
			.catch((err) => console.error(err));
	}

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
						<FormControl >
							<InputLabel id="demo-simple-select-label">Sort by</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={sortValue}
								label="Sortby"
								disabled={query && query.length > 0}
								onChange={(event) => {
									setSortValue(event.target.value);
									searchMovies({ sort: event.target.value });
								}}
							>
								{sortTypes &&
									sortTypes.map((sort) => (
										<MenuItem value={sort.value}>{sort.title}</MenuItem>
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
					</form>
					<Button onClick={() => searchMovies()}>Search</Button>
				</div>
			</div>

			<Grid container spacing={2} sx={{ justifyContent: "center" }}>
				{console.log(movies)}
				{movies.map((movie, i) => (
					<Grid item xs={12 / 5} key={i}>
						<Movie movie={movie} key={i} />
					</Grid>
				))}
			</Grid>
			<Pagination
				sx={{ marginTop: 2 }}
				count={pageInfo.totalPages}
				page={pageInfo.currentPage}
				onChange={(event, value) => {
					searchMovies({ page: value });
				}}
			/>
		</Container>
	);
}
