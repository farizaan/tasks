import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import { useMemo, useState } from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
const Item = styled("div")`
	border: 1px solid #ccc;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 30px;
	padding: 15px;
	margin-bottom: 5px;
	width: 95%;
`;
export function BasketItem({
	product,
	onRemoveProduct,
	onChangeCount,
	onDecrementProduct,onIncrementProduct
}) {
	// const [count, setCount] = useState(product.quantity);
	const count = useMemo(() => product.quantity, [product]);
	// console.log("rerebder", product,count);
	return (
		<Item>
			{product.title}, {product.price}$
			<div
				style={{
					display: "flex",
					alignItems: "center",
					width: "40%",
					justifyContent: "flex-end",
				}}
			>
				<RemoveIcon
					sx={{ cursor: "pointer", color: "#ccd" }}
					onClick={onDecrementProduct}
				></RemoveIcon>
				<TextField
					sx={{ width: "70px" }}
					value={count}
					onChange={(e) => {
						onChangeCount(product.id, e.target.value);
					}}
				/>
				<AddIcon
					sx={{ cursor: "pointer", color: "#ccd" }}
					onClick={onIncrementProduct}
				></AddIcon>
				<DeleteIcon
					sx={{ cursor: "pointer", color: "red" }}
					onClick={onRemoveProduct}
				></DeleteIcon>
			</div>
		</Item>
	);
}
