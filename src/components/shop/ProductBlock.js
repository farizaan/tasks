import styled from "@emotion/styled";
import { Button } from "@mui/material";

const Box = styled("div")`
	width: 300px;
	height: 480px;
	padding: 16px 16px 12px 16px;
	box-sizing: border-box;
	transition: 0.2s;
	display: flex;
	flex-direction: column;
	&:hover {
		box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 1);
		border-radius: 8px;
	}
`;

const Image = styled("img")`
	width: 240px;
	height: 260px;
	object-fit: contain;
`;
const Title = styled("h3")`
	font-size: 16px;
	font-weight: normal;
	color: #19191d;
	margin-top: 12px;
	height: 80px;
`;
const Price = styled("h3")`
	font-size: 24px;
	color: #19191d;
	margin-top: 12px;
`;
const StyledButton = styled(Button)`
	align-self: flex-end;
`;

export function ProductBlock({ product, onAddToBasket }) {
	return (
		<Box>
			<Image src={product.image} alt="Product Image"></Image>
			<Title>{product.title}</Title>
			<Price>{product.price}$</Price>

			<StyledButton onClick={onAddToBasket}>Add to Basket</StyledButton>
		</Box>
	);
}
