import styled from "@emotion/styled";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	decrementProduct,
	DECREMENT_PRODUCT,
	incrementProduct,
	INCREMENT_PRODUCT,
	removeAllProducts,
	removeProduct,
	REMOVE_FROM_BASKET,
	updateProduct,
} from "../../store/actions/shopActions";
import { BasketItem } from "./BasketItem";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
const Wrapper = styled("div")`
	position: fixed;
	z-index: 1000;
	top: 80px;
	right: 10px;
	width: 50px;
	height: 50px;
	transition: 0.2s;
	display: flex;
	align-items: center;
	justify-content: center;
	${({ expanded }) =>
		expanded && {
			width: "600px",
			height: "500px",
			background: "white",
			border: "1px solid red",
			borderRadius: "5px",
			flexDirection: "column",
			alignItems: "flex-start",
			justifyContent: "flex-start",
			padding: "16px",
			overflowY: "auto",
		}}
`;
const StyledShoppingBasketIcon = styled(ShoppingBasketIcon)`
	cursor: pointer;
`;
const StyledCloseIcon = styled(CloseIcon)`
	cursor: pointer;
`;

export function Basket() {
	const dispatch = useDispatch();
	const [expanded, setExpanded] = useState(false);
	const basket = useSelector((state) => state.shop.basket);
	const totalInfo = useSelector((state) => state.shop.total);
	// console.log("rerender basket", basket);
	const handleRemoveProduct = useCallback(
		(productId) => {
			dispatch(removeProduct(productId));
		},
		[dispatch]
	);
	const handleCountChange = useCallback(
		(productId, count) => {
			dispatch(updateProduct(productId, count));
		},
		[dispatch]
	);
	const handleDecrementProduct = useCallback(
		(productId) => {
			dispatch(decrementProduct(productId));
		},
		[dispatch]
	);
	const handleIncrementProduct = useCallback(
		(productId) => {
			dispatch(incrementProduct(productId));
		},
		[dispatch]
	);
	const handleRemoveAll = useCallback(() => {
		dispatch(removeAllProducts());
	}, [dispatch]);
	return (
		<Wrapper expanded={expanded}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
					marginBottom: "15px",
				}}
			>
				<StyledShoppingBasketIcon
					onClick={() => setExpanded(!expanded)}
				></StyledShoppingBasketIcon>
				{expanded && (
					<>
						<Button onClick={handleRemoveAll}>Clear All</Button>
						<StyledCloseIcon
							onClick={() => setExpanded(!expanded)}
						></StyledCloseIcon>
					</>
				)}
			</div>
			<div style={{flex:"1", width: "100%"}}>
				{expanded &&
					basket?.length > 0 &&
					basket.map((product) => (
						<BasketItem
							key={product.id}
							product={product}
							onRemoveProduct={() => {
								handleRemoveProduct(product.id);
							}}
							onChangeCount={handleCountChange}
							onDecrementProduct={() => handleDecrementProduct(product.id)}
							onIncrementProduct={() => handleIncrementProduct(product.id)}
						/>
					))}
			</div>
			{expanded && (
				<div style={{ width: "100%", justifySelf: "flex-end" }}>
					<hr></hr>
					<p>Amount: {totalInfo.count}</p>
					<p>Total price: {totalInfo.price.toFixed(2)}$</p>
				</div>
			)}
		</Wrapper>
	);
}
