import {
	ADD_TO_BASKET,
	CLOSE_MODAL,
	DECREMENT_PRODUCT,
	INCREMENT_PRODUCT,
	OPEN_MODAL,
	REMOVE_ALL_FROM_BASKET,
	REMOVE_FROM_BASKET,
	SET_LOADING,
	SET_PRODUCTS,
	UPDATE_PRODUCT,
} from "../actions/shopActions";

const initState = {
	products: [],
	basket: JSON.parse(localStorage.getItem("basket")) || [],
	isLoading: true,
	modalOpen: false
};
export function shop(state = initState, action) {
	const newState = { ...state };
	switch (action.type) {
		case SET_PRODUCTS:
			newState.products = action.payload;
			break;
		case ADD_TO_BASKET:
			let prod = action.payload;
			let existed_product = newState.basket.find(
				(product) => product.id === prod.id
			);
			if (existed_product) {
				newState.basket = newState.basket.map((p) =>
					p.id === prod.id ? { ...p, quantity: p.quantity + 1 } : p
				);
			} else {
				prod.quantity = 1;
				newState.basket = [...newState.basket, prod];
			}

			break;
		case REMOVE_FROM_BASKET:
			newState.basket = state.basket.filter((product) => {
				return product.id !== action.payload;
			});

			break;
		case REMOVE_ALL_FROM_BASKET:
			newState.basket = [];
			break;
		case DECREMENT_PRODUCT:
			let prod_to_dec = state.basket.find(
				(product) => product.id === action.payload
			);
			if (prod_to_dec.quantity === 1) {
				newState.basket = state.basket.filter((product) => {
					return product.id !== action.payload;
				});
			} else {
				newState.basket = state.basket.map((p) =>
					p.id === action.payload ? { ...p, quantity: +p.quantity - 1 } : p
				);
			}
			break;
		case INCREMENT_PRODUCT:
			newState.basket = state.basket.map((p) =>
				p.id === action.payload ? { ...p, quantity: +p.quantity + 1 } : p
			);

			break;
		case UPDATE_PRODUCT:
			newState.basket = newState.basket.map((p) =>
				p.id === action.payload ? { ...p, quantity: action.count } : p
			);
			break;
		case SET_LOADING:
			newState.isLoading = action.payload;
			break;
		case OPEN_MODAL:
			newState.modalOpen = true;
			break;
		case CLOSE_MODAL:
			newState.modalOpen = false;
			break;
		default:
			return state;
	}
	localStorage.setItem("basket", JSON.stringify(newState.basket));
	return newState;
}
