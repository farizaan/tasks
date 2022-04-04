import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { SignUpForm } from "../components/SignUpForm";
import { SignInForm } from "../components/SignInForm";
const Wrapper = styled("div")`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 50px;
`;

const data = [
	{ email: "admin@admin", password: "qwert" },
	{ email: "user@user", password: "qwert" },
	{ email: "test@test", password: "qwer" },
];

const UserBox = styled("div")`
	width: 250px;
	heigth: 40px;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 5px;
	margin: 8px;
`;
export function SignInPage() {

    const [users, setUsers] = useState(data);
	return (
		<>
			<Wrapper>
                <SignInForm/>
                <div style={{width: 30}}></div>
				<SignUpForm onSuccess={data => {setUsers([...users,data])}}/>
			</Wrapper>

			{users.map((item) => (
				<UserBox>
					email: {item.email}
					<br />
					password: {item.password}
				</UserBox>
			))}
		</>
	);
}
