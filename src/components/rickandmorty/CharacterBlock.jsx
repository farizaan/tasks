import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
const Character = styled("div")`
	height: ${(props) => `${props.height}`};
	display: flex;
	overflow: hidden;
	background: rgb(60, 62, 68);
	border-radius: 0.5rem;
	margin: 0.75rem;
	font-size: 16px;
	box-shadow: rgb(0 0 0 / 10%) 0px 4px 6px -1px,
		rgb(0 0 0 / 6%) 0px 2px 4px -1px;

	.img_wrapper {
		flex: 2 1 0%;
		width: 100%;

		img {
			width: 100%;
			height: 100%;
			margin: 0px;
			object-position: center center;
			object-fit: cover;
		}
	}
	.content_wrapper {
		flex: 3 1 0%;
		position: relative;
		padding: 0.75rem;
		color: rgb(255, 255, 255);
		display: flex;
		flex-direction: column;
		justify-content: center;

		.name {
			margin-bottom: 5px;
			font-size: 1.8rem;

			color: rgb(245, 245, 245);

			&:hover {
				color: rgb(255, 152, 0);
			}
		}
		.status {
			margin: 0;
			display: flex;
			align-items: center;
			margin-bottom: 2rem;
		}
		p {
			margin: 0;
		}
		.box {
			margin-bottom: 10px;
		}
		.label {
			color: rgb(158, 158, 158);
		}
		.value {
			color: rgb(245, 245, 245);
			font-size: 20px;
			&:hover {
				color: rgb(255, 152, 0);
			}
		}
	}
`;

const StyledCircleIcon = styled(CircleIcon)`
	width: 0.7rem;
	height: 0.7rem;
	margin-right: 7px;
	color: ${(props) => {
		if (props.status === "Alive") return "rgb(85, 204, 68)";
		if (props.status === "Dead") return "rgb(214, 61, 46)";
		if (props.status === "unknown") return "rgb(158, 158, 158)";
	}};
`;
export function CharacterBlock({ character, height, show = false }) {
	return (
		<Character height={height}>
			<div className="img_wrapper">
				<img src={character.image} alt="" />
			</div>
			<div className="content_wrapper">
				<Link to={`/rickandmorty/${character.id}`}>
					<h2 className="name">{character.name}</h2>{" "}
				</Link>
				<div className="status">
					<StyledCircleIcon status={character.status}></StyledCircleIcon>{" "}
					<p>
						{character.status} - {character.species}
					</p>
				</div>
				<div className="box">
					<p className="label">Last known location:</p>
					<Link to="#">
						<p className="value">{character.location.name}</p>
					</Link>
				</div>
				{show && (
					<div>
						<div className="box">
							<p className="label">Gender:</p>
							<Link to="#">
								<p className="value">{character.gender}</p>
							</Link>
						</div>
						<div className="box">
							<p className="label">Origin:</p>
							<Link to="#">
								<p className="value">{character.origin.name}</p>
							</Link>
						</div>
					</div>
				)}
			</div>
		</Character>
	);
}
