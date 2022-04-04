import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useContext } from "react";
import { Auth } from "../context/Auth";
const Form = styled("form")`
	display: flex;
	flex-direction: column;
`;
export function SignInForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
// const [idToken, setIdToken] = useState(localStorage.getItem("idToken"));


const {token,setToken} = useContext(Auth);

	const validateForm = (e) => {
		e.preventDefault();

		if (password.length < 8) {
			alert("length 8");
			return;
		}
		sendUserData({
			email,
			password,
		});
	};

	function sendUserData(userData) {
		axios
			.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuHsqhY4QZKFs0X487o2bM7ITRnzbYJHU`,
				{
					email: userData.email,
					password: userData.password,
					returnSecureToken: true,
				}
			)
			.then((data) => {
				alert("Success!")

                setToken(data.data.idToken)
                localStorage.setItem("idToken", data.data.idToken)
				console.log(data);
			})
			.catch((error) => {
				alert(
					`Failed to authorize. Error message: ${error.response.data.error.message}`
				);
			});
	}

	return (
		<Form onSubmit={validateForm}>
			<TextField
				required
				value={email}
				size="small"
				type="email"
				label="Email"
				placeholder="Enter email"
				onChange={(e) => {
					setEmail(e.target.value);
				}}
			/>
			<br />
			<TextField
				required
				value={password}
				size="small"
				type="password"
				label="Password"
				placeholder="Enter password"
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			/>
			<br />
			<br />
			{/* <TextField type="submit" /> */}
			<Button type="submit" variant="contained">
				Submit
			</Button>
		</Form>
	);
}
