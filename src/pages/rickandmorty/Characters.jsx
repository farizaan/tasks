import { Container, Grid } from "@mui/material";
import { CharacterBlock } from "../../components/rickandmorty/CharacterBlock";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Button, Checkbox, Pagination, TextField } from "@mui/material";
import styled from "@emotion/styled";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const StyledPagination = styled(Pagination)`
	color: #fff;

	ul {
		justify-content: center;
		color: #fff;

		button {
			color: #fff;
		}
	}
	div {
		color: #fff;
	}

	.css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected {
		background-color: rgba(1, 0, 0, 0.98);
	}
`;
const StyledInput = styled(TextField)`
	input {
		color: #fff;
	}
	fieldset {
		border-color: grey;
	}
`;
const StyledSelect = styled(Select)`
	margin-right: 5px;
	min-width: 100px;
	div {
		color: #fff;
	}
	input {
		color: #fff;
	}
	fieldset {
		border-color: grey;
	}
	.css-f9bjls-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
		color: grey;
	}
	fieldset:focus {
		border-color: grey !important;
	}
`;
export function Characters() {
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState("");
	const [filterByStatus, setFilterByStatus] = useState("");

	const statuses = [
		{
			value: "alive",
			label: "Alive",
		},
		{
			value: "dead",
			label: "Dead",
		},
		{
			value: "unknown",
			label: "Unknown",
		},
	];

	async function fetchCharacters(page = 1, filterStatus) {
		console.log(filterStatus);
		let search = "";
		if (query && query.length > 0) search = `&name=${query}`;
		let status = "";
		if (filterStatus) status = `&status=${filterStatus}`;
		const response = await fetch(
			`https://rickandmortyapi.com/api/character?page=${page}${search}${status}`
		);
		return response.json();
	}
	const { data, status, refetch } = useQuery(
		["characters", page, filterByStatus],
		() => fetchCharacters(page, filterByStatus),
		{
			keepPreviousData: true,
		}
	);
	if (status === "loading") return <div>Loading...</div>;
	if (status === "error") return <div>Error</div>;
	return (
		<div style={{ background: "rgb(36, 40, 47)", flex: 1 }}>
			<Container
				maxWidth="xl"
				sx={{ height: "100%", display: "flex", flexDirection: "column" }}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "cneter",
						padding: 15,
					}}
				>
					<h1
						style={{
							margin: 0,
							fontWeight: 900,
							color: "rgb(245, 245, 245)",
						}}
					>
						The Rick and Morty
					</h1>
					<div style={{ display: "flex" }}>
						<FormControl>
							<InputLabel sx={{ color: "#fff" }} id="demo-simple-select-label">
								Status
							</InputLabel>
							<StyledSelect
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={filterByStatus}
								onChange={(event) => {
									setFilterByStatus(event.target.value);
									setPage(1);
								}}
							>
								{statuses &&
									statuses.map((status, i) => (
										<MenuItem key={i} value={status.value}>
											{status.label}
										</MenuItem>
									))}
							</StyledSelect>
						</FormControl>
						<form
							style={{ display: "flex" }}
							onSubmit={(e) => {
								console.log("submit", e);
								e.preventDefault();
								refetch();
							}}
						>
							<div style={{ display: "flex", alignItems: "center" }}>
								<StyledInput
									value={query}
									placeholder="Search"
									onChange={(e) => setQuery(e.target.value)}
								></StyledInput>

								<Button
									sx={{ color: "#fff" }}
									onClick={() => {
										setPage(1);
										refetch();
									}}
								>
									Search
								</Button>
							</div>
						</form>
					</div>
				</div>
				<Grid container spacing={2} sx={{ flex: 1 }}>
					{data.error && (
						<p style={{ color: "#fff", fontSize: "28px" }}>{data.error}</p>
					)}
					{data &&
						data.results &&
						data.results.map((character) => (
							<Grid key={character.id} item xs={6} xl={4}>
								<CharacterBlock key={character.id} character={character} height="220px" />
							</Grid>
						))}
				</Grid>
				<StyledPagination
					sx={{ marginBottom: 2, color: "#fff" }}
					count={data && data.info ? data.info.pages : 0}
					page={page}
					onChange={(event, value) => {
						setPage(value);
					}}
				></StyledPagination>
			</Container>
		</div>
	);
}
