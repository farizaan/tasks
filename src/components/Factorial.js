import {factorial} from "../function"
import React,{useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
export function Factorial(){
    const [number, setNumber] = useState(null);
	function handleChange(e) {
		setNumber(+e.target.value);
	}
    return(
        <Box
			component="form"
			sx={{
				"& > :not(style)": { m: 1, width: "25ch" },
			}}
			noValidate
			autoComplete="off"
		>
			<TextField id="outlined-basic" label="Factorial" variant="outlined" onChange={handleChange} />
			<div>Factorial: {factorial(number)}</div>
		</Box>
    )
}