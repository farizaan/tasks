import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import { useMemo, useState } from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
const Item = styled("div")`
	padding: 12px 16px;
	background: rgb(255, 255, 255);
	margin-bottom: 8px;
	/* border: 1px solid #ccc;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 30px;
	padding: 15px;
	margin-bottom: 5px;
	width: 95%; */
`;
const Top = styled("div")`
	display: flex;
	border-bottom: 1px solid rgb(226, 226, 233);
	padding-bottom: 12px;
	margin-bottom: 12px;
`;
const Img = styled("img")`
	width: 64px;
	height: 64px;
	flex: 0 0 auto;
	margin: 0px 16px 0px 0px;
`;
const ProductTitle = styled("h3")`
	font-weight: 600;
	font-size: 16px;
	margin: 0 0 4px;
`;
const Description = styled("p")`
	color: rgb(92, 99, 112);
	margin: 0px;
	white-space: pre-wrap;
	text-overflow: ellipsis;
	font-size: 12px;
`;
const Bottom = styled("div")`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const Price = styled("h3")`
	font-size: 16px;
	font-weight: 600;
	margin: 0;
`;
const CountBlock = styled("div")`
	background-color: rgb(243, 243, 247);
	box-sizing: border-box;
	border-radius: 9999px;
	width: 96px;
	height: 32px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px;
`;
export function BasketItem({
	product,
	onRemoveProduct,
	onChangeCount,
	onDecrementProduct,
	onIncrementProduct,
}) {
	const count = useMemo(() => product.quantity, [product]);
	return (
		<Item>
			<Top>
				<Img src={product.image} alt="Product" />
				<div style={{ dispay: "flex" }}>
					<ProductTitle>{product.title}</ProductTitle>
					<Description>{product.description}</Description>
				</div>
			</Top>
			<Bottom>
				<Price>{product.price} $</Price>
				<CountBlock>
					<RemoveIcon
						sx={{ cursor: "pointer", color: "#ccd" }}
						onClick={onDecrementProduct}
					></RemoveIcon>
					{count}
					<AddIcon
						sx={{ cursor: "pointer", color: "#ccd" }}
						onClick={onIncrementProduct}
					></AddIcon>
				</CountBlock>
			</Bottom>
			{/* кнопка удаления
			<div
				style={{
					display: "flex",
					alignItems: "center",
					width: "40%",
					justifyContent: "flex-end",
				}}
			>
				<DeleteIcon
					sx={{ cursor: "pointer", color: "red" }}
					onClick={onRemoveProduct}
				></DeleteIcon>
			</div> */
			/* инпут для количества
			<TextField
			sx={{ width: "70px" }}
			value={count}
			onChange={(e) => {
				onChangeCount(product.id, e.target.value);
			}}
		/> */}
		</Item>
	);
}
