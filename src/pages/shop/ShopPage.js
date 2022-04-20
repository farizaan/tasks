import { Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	addToBasket,
	fetchProducts,
} from "../../store/actions/shopActions";
import { useCallback, useEffect } from "react";
import { ProductBlock } from "../../components/shop/ProductBlock";
import { Basket } from "../../components/shop/Basket";
export function ShopPage() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.shop.products);
	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	const handleAddToBasket = useCallback(
		(product) => {
            
			dispatch(addToBasket(product));
		},
		[dispatch]
	);
	return (
		<div>
			<Container maxWidth="xl">
				<Basket></Basket>

				<Grid container spacing={2} sx={{ justifyContent: "center" }}>
					{products?.map((product) => (
						<Grid item xs={12 / 5} key={product.id}>
							<ProductBlock
								product={product}
								onAddToBasket={() => handleAddToBasket(product)}
							></ProductBlock>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
}
