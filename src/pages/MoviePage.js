import React, { useEffect, useState } from "react";
import { fetchFilmById, fetchSimilarFilmsById } from "../fetchers/fetchFilms";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import { Stars } from "../components/Movie";
import { Movie } from "../components/Movie";

const Banner = styled("div")`
	width: 100%;
	height: 90vh;
	background-size: cover;
	background-image: ${(props) =>
		`linear-gradient(269.96deg, rgba(29, 29, 29, 0) 0.04%, rgba(29, 29, 29, 0.8) 99.5%), url("https://image.tmdb.org/t/p/original${props.imageUrl}");`};
`;
const Genres = styled("div")`
	font-size: 14px;
	color: #0feffd;
	text-transform: uppercase;
	margin-bottom: 16px;

	span {
		background: rgba(29, 29, 29, 0.5);
		border-radius: 0px 8px;
		padding: 4px 8px;
		margin-right: 7px;
	}
`;
const SimTitle = styled("p")`
	font-weight: 700;
	font-size: 34px;
	color: #fff;
	margin: 0;
    margin-bottom: 16px
`;

const SimilarMoviesBlock = styled("div")`
	background: #1D1D1D;;
	padding: 30px 0;
`;
const styles = {
	title: {
		fontWeight: 500,
		fontSize: 56,
		color: "#FFFFFF",
		marginBottom: 16,
		marginTop: 18,
	},
	overview: {
		color: "#FFFFFF",
		fontSize: 16,
		lineHeight: 2,
	},
};
export function MoviePage() {
	let { movieId } = useParams();
	const [movie, setMovie] = useState({});
	const [similarMovies, setSimilarMovies] = useState([]);

	useEffect(() => {
		fetchFilmById(movieId).then((res) => setMovie(res));
		fetchSimilarFilmsById(movieId).then((res) => setSimilarMovies(res.results));
	}, [movieId]);
	return (
		<div>
			<Banner imageUrl={movie.backdrop_path}>
				<Container
					sx={{ height: "100%", display: "flex", alignItems: "center" }}
				>
					<div style={{ width: "70%" }}>
						<Genres>
							{movie.genres &&
								movie.genres.map((genre) => <span>{genre.name} </span>)}
						</Genres>
						<Stars n={(5 * movie.vote_average) / 10} />
						<h1 style={styles.title}>{movie.title}</h1>
						<p style={styles.overview}>{movie.overview}</p>
					</div>
				</Container>
			</Banner>
			<SimilarMoviesBlock>
				<Container maxWidth="xl">
					<SimTitle>Similar movies</SimTitle>

					
					<div style={{ display: "flex", overflowX: "scroll", width: "100%" }}>
						{similarMovies &&
							similarMovies.map((movie, i) => (
                                <div  key ={i} style={{minWidth: "292px", display: "flex", marginRight: "16px", transition: '0.2s'}}>
                                    <Movie movie={movie} key={i} />
                                </div>
                            ))}
					</div>
				</Container>
			</SimilarMoviesBlock>
		</div>
	);
}
