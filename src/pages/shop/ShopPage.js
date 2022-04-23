import { Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, fetchProducts } from "../../store/actions/shopActions";
import { useCallback, useEffect } from "react";
import { ProductBlock } from "../../components/shop/ProductBlock";
import { Basket } from "../../components/shop/Basket";
import CircularProgress from "@mui/material/CircularProgress";
export function ShopPage() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.shop.products);
	const isLoading = useSelector((state) => state.shop.isLoading);
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
				{isLoading ? (
					<div style={{padding: "16px", display: "flex", justifyContent:"center"}}>
						<CircularProgress />
					</div>
					
				) : (
					<Grid container spacing={2} sx={{ justifyContent: "center" }}>
						{products?.map((product) => (
							<Grid item lg={3} md={4} xs={12} sm={6} key={product.id}>
								<ProductBlock
									product={product}
									onAddToBasket={() => handleAddToBasket(product)}
								></ProductBlock>
							</Grid>
						))}
					</Grid>
				)}
			</Container>
		</div>
	);
}
