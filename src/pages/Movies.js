import React, { useEffect, useState } from "react";
import { fetchFilms } from "../fetchers/fetchFilms";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Movie } from "../components/Movie";
export function Movies() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetchFilms().then((resp) => setMovies(resp.results));
	}, []);

	return (
		<Container maxWidth="xl">
			<Grid container spacing={1} sx={{ justifyContent: "center" }}>
				{console.log(movies)}
				{movies.map((movie, i) => (
					<Grid key={i}>
						<Movie movie={movie} key={i} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
