import { Container, Grid } from "@mui/material";
import { CharacterBlock } from "../../components/rickandmorty/CharacterBlock";
import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { Button, Checkbox, Pagination, TextField } from "@mui/material";
import styled from "@emotion/styled";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import {
	SET_FILTER_BY_STATUS,
	SET_PAGE,
	SET_QUERY,
} from "../../store/reducers/rickandmorty";
import { fetchCharacters } from "../../store/actions/fetchRickAndMorty";

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
	const dispatch = useDispatch();
	const page = useSelector((state) => state.rickandmorty.page);
	const query = useSelector((state) => state.rickandmorty.query);
	const characters = useSelector((state) => state.rickandmorty.characters);
	const info = useSelector((state) => state.rickandmorty.info);
	const filterByStatus = useSelector(
		(state) => state.rickandmorty.filterByStatus
	);
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

	useEffect(() => {
		dispatch(fetchCharacters());
	}, [dispatch]);
	const setPage = useCallback(
		(payload) => {
			dispatch({ type: SET_PAGE, payload });
		},
		[dispatch]
	);
	const setQuery = useCallback(
		(payload) => {
			dispatch({ type: SET_QUERY, payload });
		},
		[dispatch]
	);
	const setFilterByStatus = useCallback(
		(payload) => {
			dispatch({ type: "setFilter", payload });
		},
		[dispatch]
	);
	const searchCharacters = useCallback(
		({ page, filterStatus = filterByStatus } = {}) => {
			dispatch(fetchCharacters(query, page, filterStatus));
		},
		[dispatch, query, filterByStatus]
	);

	// if (status === "loading") return <div>Loading...</div>;
	// if (status === "error") return <div>Error</div>;
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
						alignItems: "center",
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
						<form
							style={{ display: "flex" }}
							onSubmit={(e) => {
								console.log("submit", e);
								e.preventDefault();
								searchCharacters();
								// refetch();
							}}
						>
							<FormControl>
								<InputLabel
									sx={{ color: "#fff" }}
									id="demo-simple-select-label"
								>
									Status
								</InputLabel>
								<StyledSelect
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={filterByStatus}
									onChange={(event) => {
										setFilterByStatus(event.target.value);
										setPage(1);
										searchCharacters({ filterStatus: event.target.value });
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

							<div style={{ display: "flex", alignItems: "center" }}>
								<StyledInput
									value={query}
									placeholder="Search"
									onChange={(e) => setQuery(e.target.value)}
								></StyledInput>

								<Button sx={{ color: "#fff" }} type="submit">
									Search
								</Button>
							</div>
						</form>
					</div>
				</div>
				<Grid container spacing={2} sx={{ flex: 1 }}>
					{/* {data?.error && (
						<p style={{ color: "#fff", fontSize: "28px" }}>{data.error}</p>
					)} */}
					{characters?.map((character) => (
						<Grid key={character.id} item xs={12} sm={6} md={4}>
							<CharacterBlock
								key={character.id}
								character={character}
								height="220px"
							/>
						</Grid>
					))}
				</Grid>
				<StyledPagination
					sx={{ marginBottom: 2, color: "#fff" }}
					count={info?.pages}
					page={page}
					onChange={(event, value) => {
						setPage(value);
						searchCharacters({ page: value });
					}}
				></StyledPagination>
			</Container>
		</div>
	);
}
