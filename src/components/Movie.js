import { Card, CardContent, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {useNavigate } from "react-router-dom";
export function Stars({ n = 0}) {
	let stars = [];
	for (let i = 0; i < n; ++i) {
		stars.push(<StarIcon key={i} sx={{ color: "#fff", fontSize: 13 }} />);
	}
	return <div className="Stars">{stars}</div>;
}
export function Movie({ movie }) {
	const styles = {
		cardStyle: {
			width: "100%",
			height: 440,
			backgroundImage: `linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.8) 80.79%), url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			
			borderRadius: 0,
			display: "flex",
			flexDirection: "column-reverse"
		},
		genre: {
			fontSize: 14,
			color: "#0FEFFD",
		},
		title: {
			fontFamily: "Roboto",
			fontStyle: "normal",
			fontWeight: 500,
			fontSize: 24,
			color: "#FFFFFF",
		
		},
	};
	function convertVote(vote) {
		return (5 * vote) / 10;
	}
	function getGenreById(genre_id) {
		switch (genre_id) {
			case 16:
				return "Animation";
			case 28:
				return "Fantasy";
			case 80:
				return "Drama";
			case 53:
				return "Action";
			default:
				return "Comedy";
		}
	}

	const navigate = useNavigate();
	return (
		<Card onClick={() => navigate(`/movies/${movie.id}`)} style={styles.cardStyle} className="card_block">
			<CardContent>
				<Typography style={styles.genre}>
					{getGenreById(movie.genre_ids[0])}
				</Typography>
				<Stars n={convertVote(movie.vote_average)} />
				<Typography style={styles.title}>{movie.original_title}</Typography>
			</CardContent>
		</Card>
	);
}
