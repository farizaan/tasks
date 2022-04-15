import styled from "@emotion/styled";
import Moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { useMemo, useState } from "react";
const ListItem = styled("div")`
	border: 1px solid #c8c8c8;
	box-sizing: border-box;
	border-radius: 4px;
	padding: 14px;
	margin-bottom: 40px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	.title {
		font-weight: 400;
		font-size: 20px;
		margin: 0;
		margin-bottom: 7px;
	}
	.greyText {
		color: #797979;
		font-weight: 400;
		font-size: 14px;
		margin: 0;
	}
`;
export function TodoListItem({ todo, onRemove, onChangeDone }) {


	const created = useMemo(() => {
		return Moment(todo.created_at).format("DD.MM.yyyy HH:mm");
	}, [todo.created_at]);

	return (
		<div>
			<ListItem>
				<Checkbox
					checked={todo.done}
					onChange={(e) => {
						onChangeDone(todo.created_at, !todo.done);
					}}
				/>
				<div style={{ width: "100%" }}>
					<h3
						className="title"
						style={{ textDecoration: todo.done ? "line-through" : "none" }}
					>
						{todo.title}
					</h3>
					<p className="greyText">created {created}</p>
				</div>
				<DeleteIcon sx={{ cursor: "pointer" }} onClick={() => onRemove(todo.created_at)}></DeleteIcon>
			</ListItem>
		</div>
	);
}
