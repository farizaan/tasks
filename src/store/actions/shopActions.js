import axios from "axios";
export const SET_PRODUCTS = "shop/setProducts";
export const ADD_TO_BASKET = "shop/addToBasket";
export const UPDATE_PRODUCT = "shop/updProduct";
export const REMOVE_FROM_BASKET = "shop/removeFromBasket";
export const REMOVE_ALL_FROM_BASKET = "shop/removeAllFromBasket";
export const DECREMENT_PRODUCT = "shop/decrementProduct";
export const INCREMENT_PRODUCT = "shop/incrementProduct";
export const SET_TOTAL = "shop/setTotal";
export const SET_LOADING = "shop/setLoading";
export const fetchProducts = () => (dispatch) => {
	axios.get(`https://fakestoreapi.com/products`).then((res) => {
		console.log(res);
		dispatch({ type: SET_PRODUCTS, payload: res.data });
		dispatch({ type: SET_LOADING, payload: false });
	});
};

export const addToBasket = (product) => (dispatch) => {
	dispatch({ type: ADD_TO_BASKET, payload: product });
};
export const updateProduct = (productId, count) => (dispatch) => {
	dispatch({ type: UPDATE_PRODUCT, payload: productId, count });
};
export const decrementProduct = (productId, count) => (dispatch) => {
	dispatch({ type: DECREMENT_PRODUCT, payload: productId, count });
};
export const incrementProduct = (productId, count) => (dispatch) => {
	dispatch({ type: INCREMENT_PRODUCT, payload: productId, count });
};
export const removeProduct = (productId, count) => (dispatch) => {
	dispatch({ type: REMOVE_FROM_BASKET, payload: productId, count });
};

export const removeAllProducts = () => (dispatch) => {
	dispatch({ type: REMOVE_ALL_FROM_BASKET });
};
