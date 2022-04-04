import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useContext } from "react";
import { Auth } from "../context/Auth";
const Form = styled("form")`
	display: flex;
	flex-direction: column;
`;
export function SignUpForm({ onSuccess }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cPassword, setCPassword] = useState("");
	const { token, setToken } = useContext(Auth);
	const validateForm = (e) => {
		e.preventDefault();
		// [A-Z]\d[!,@,#,$,%,^,&,*,?,_,+]/
		const regex = new RegExp(
			/([a-z])*([A-Z])*(\d)*([!,@,#,$,%,^,&,*,?,_,+])*(.{7,})/
		);
		const similar = new RegExp(/(\d)\1{2,}/);
		// console.log(password, similar.test(password));
		if (regex.test(password) && !similar.test(password)) {
			if (cPassword !== password) {
				alert("Passwords Are not the same");
				return;
			}
			sendUserData({
				email,
				password,
			});

			return;
		}
		alert("Password do not match requirements");
	};

	function sendUserData(userData) {
		axios
			.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuHsqhY4QZKFs0X487o2bM7ITRnzbYJHU`,
				{
					email: userData.email,
					password: userData.password,
					returnSecureToken: true,
				}
			)
			.then((data) => {
				alert("Successfully registered!");
				setToken(data.data.idToken);
				localStorage.setItem("idToken", data.data.idToken);
				console.log(data);
			})
			.catch((error) => {
				alert(
					`User not registered. Error message: ${error.response.data.error.message}`
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
			<TextField
				required
				value={cPassword}
				size="small"
				type="password"
				label="Confirm Password"
				placeholder="Confirm password"
				onChange={(e) => {
					setCPassword(e.target.value);
				}}
			/>
			<br />
			{/* <TextField type="submit" /> */}
			<Button type="submit" variant="contained">
				Submit
			</Button>
		</Form>
	);
}
