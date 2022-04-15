import { Button, TextField } from "@mui/material";
import React, { useMemo, useState, useCallback } from "react";
import styled from "@emotion/styled";

const StyledInput = styled( TextField )`
	border: 1px solid #ccc;
	box-sizing: border-box;
	border-radius: 4px;
	width: 100%;
	margin-right: 20px;
`;
export function TodoForm ( { onCreate } )
{
	const [ text, setText ] = useState( "" );

	const handleCreate = useCallback( ( e ) =>
	{
		e.preventDefault();
		setText( "" );
		onCreate( { title: text, created_at: new Date(), done: false } );
	}, [ onCreate, text ] )

	const isDisabled = useMemo( () =>
	{
		return text.trim().length === 0;
	}, [ text ] );
	return (
		<div
			style={ {
				display: "flex",
				marginBottom: "40px",
				width: "100%",
				justifyContent: "space-between",
			} }
		>
			<form
				onSubmit={ handleCreate }
				style={ { width: "100%", display: "flex", justifyContent: "space-between" } }
			>
				<StyledInput
					value={ text }
					size="small"
					type="text"
					placeholder="Enter text"
					onChange={ ( e ) =>
					{
						setText( e.target.value );
					} }
				></StyledInput>


				<Button disabled={isDisabled} variant="contained" type="submit">
					Create
				</Button>
			</form>
		</div>
	);
}
