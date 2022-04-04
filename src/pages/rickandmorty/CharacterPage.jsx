import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "@emotion/styled";
import { Container } from "@mui/material";
import { CharacterBlock } from "../../components/rickandmorty/CharacterBlock";

const Wrapper = styled("div")`
	// background: ${(props) => `url("${props.imageUrl}");`};
	background: rgb(36, 40, 47);
	flex: 1;
	display: flex;
`;
export function CharacterPage() {
	let { characterId } = useParams();
	useEffect(() => {
		getEpisodes();
	}, []);
	async function fetchCharacter() {
		const response = await fetch(
			`https://rickandmortyapi.com/api/character/${characterId}`
		);
		return response.json();
	}
	const { data, status, refetch } = useQuery("character", fetchCharacter, {
		keepPreviousData: true,
	});

	function getEpisodes() {
		let episodes = [];
		if (data && data.episode.length > 0) {
			data.episode.forEach((item) => {
				let temp = item.split("/");
				let episode_id = temp[temp.length - 1];
				episodes.push(episode_id);
			});

			console.log(episodes);
		}
	}

	if (status === "loading") return <div>Loading...</div>;
	if (status === "error") return <div>Error</div>;

	return (
		<Wrapper imageUrl={data.image}>
			{getEpisodes()}
			<Container>
				<CharacterBlock character={data} height="500px" show="true" />
			</Container>
		</Wrapper>
	);
}
