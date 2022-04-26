import styled from "@emotion/styled";
import { useCallback, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import {
	decrementProduct,
	DECREMENT_PRODUCT,
	incrementProduct,
	INCREMENT_PRODUCT,
	OPEN_MODAL,
	removeAllProducts,
	removeProduct,
	REMOVE_FROM_BASKET,
	updateProduct,
} from "../../store/actions/shopActions";
import { BasketItem } from "./BasketItem";
import CloseIcon from "@mui/icons-material/Close";
import { Badge, Box, Button, Drawer } from "@mui/material";
const Wrapper = styled("div")`
	position: fixed;
	z-index: 1000;
	top: 90px;
	right: 30px;
	transition: 0.2s;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const StyledShoppingBasketIcon = styled(ShoppingCartIcon)`
	cursor: pointer;
	font-size: 40px;
`;
const StyledCloseIcon = styled(CloseIcon)`
	cursor: pointer;
`;
const StyledBox = styled(Box)`
	background: rgb(243, 243, 247);
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
`;
const Title = styled("h1")`
	margin: 0;
	font-size: 24px;
	font-weight: 500;
`;
const Section = styled("section")`
	padding: 16px;
`;
const SubtotalSection = styled("section")`
	padding: 16px;
	background-color: #fff;
`;
const Subtotal = styled("div")`
	display: flex;
	justify-content: space-between;
	font-size: 14px;
	padding-bottom: 16px;

	p {
		margin: 0;
	}
	.summa {
		font-weight: 500;
		font-size: 18px;
	}
`;
const NoItems = styled("div")`
	display: flex;
	flex-direction: column;
	flex: 0 1 auto;
	padding: 16px;
	height: 100%;

	.text {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		flex-direction: column;
	}
`;
const Footer = styled("div")`
	bottom: 0;
	position: sticky;
	background: #f3f3f7;
	text-align: center;
	padding: 16px;
	margin-top: auto;
`;
export function Basket() {
	const dispatch = useDispatch();

	const [expanded, setExpanded] = useState(false);

	const basket = useSelector((state) => state.shop.basket);
	const totalInfo = {};
	totalInfo.count = useMemo(
		() => basket.reduce((acc, item) => acc + +item.quantity, 0),
		[basket]
	);
	totalInfo.price = useMemo(
		() => basket.reduce((acc, item) => acc + item.quantity * item.price, 0),
		[basket]
	);

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

	const handleModalOpen = useCallback(() => {
		dispatch({ type: OPEN_MODAL });
	}, [dispatch]);
	return (
		<>
			<Wrapper>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "100%",
						marginBottom: "15px",
					}}
				>
					<Badge badgeContent={totalInfo.count} color="primary">
						<StyledShoppingBasketIcon
							onClick={() => setExpanded(!expanded)}
						></StyledShoppingBasketIcon>
					</Badge>
				</div>
			</Wrapper>
			<Drawer
				open={expanded}
				anchor={"right"}
				onClose={() => setExpanded(!expanded)}
			>
				<StyledBox
					sx={{
						width: {
							md: "500px",
							xs: "100%",
						},
					}}
				>
					{basket.length > 0 ? (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								height: "100%",
								position: "relative"
							}}
						>
							<Section
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: "4px",
								}}
							>
								<Title>
									{totalInfo.count} товара на {totalInfo.price.toFixed(2)}$
								</Title>
								<StyledCloseIcon
									onClick={() => setExpanded(!expanded)}
								></StyledCloseIcon>
							</Section>
							<div>
								{basket.map((product) => (
									<BasketItem
										key={product.id}
										product={product}
										onRemoveProduct={() => {
											handleRemoveProduct(product.id);
										}}
										onChangeCount={handleCountChange}
										onDecrementProduct={() =>
											handleDecrementProduct(product.id)
										}
										onIncrementProduct={() =>
											handleIncrementProduct(product.id)
										}
									/>
								))}
							</div>

							<SubtotalSection>
								<Subtotal
									style={{
										borderBottom: "1px solid rgb(226, 226, 233)",
										marginBottom: "16px",
									}}
								>
									<p>{totalInfo.count} товара</p>
									<p>{totalInfo.price.toFixed(2)}$</p>
								</Subtotal>
								<Subtotal>
									<p className="summa">Сумма заказа</p>
									<p className="summa">{totalInfo.price.toFixed(2)}$</p>
								</Subtotal>
							</SubtotalSection>
							<Footer>
								<Button
									onClick={handleModalOpen}
									variant="outlined"
									sx={{ marginTop: "auto", width: "50%", alignSelf: "center" }}
								>
									Оформить заказ
								</Button>
							</Footer>
						</div>
					) : (
						<NoItems>
							<div>
								<StyledCloseIcon
									onClick={() => setExpanded(!expanded)}
								></StyledCloseIcon>
							</div>
							<div className="text">
								<p>Ой, пусто!</p>
								<p>
									Ваша корзина пуста, откройте «Shop» и выберите понравившийся
									товар.
								</p>
							</div>
						</NoItems>
					)}
				</StyledBox>
			</Drawer>
		</>
	);
}
