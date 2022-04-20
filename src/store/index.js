import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { movies } from "./reducers/movies";
import { todos } from "./reducers/todos";
import { rickandmorty } from "./reducers/rickandmorty";
import { shop } from "./reducers/shop";
// const initialValue = {
// 	todos: JSON.parse(localStorage.getItem("todos")) || [],
// 	movies: [],
// 	query: "",
// 	sortValue: "popularity.desc",
// 	pageInfo: {
// 		currentPage: 1,
// 		totalPages: 0,
// 	},
// };
// const reducer = function (state = initialValue, action) {
// 	let newState = { ...state };
// 	switch (action.type) {
// 		case "todos/add":
// 			console.log("ADD", action);
// 			newState.todos = [...state.todos, action.payload];
// 			break;
// 		case "todos/remove":
// 			console.log(new Date(action.payload).toLocaleTimeString());

// 			newState.todos = state.todos.filter((todo) => {
// 				console.log(todo);
// 				return todo.created_at !== action.payload;
// 			});
// 			break;
// 		case "todos/doneChange":
// 			newState.todos = state.todos.map((todo) => {
// 				if (todo.created_at === action.payload) {
// 					return {
// 						...todo,
// 						done: action.value,
// 					};
// 				}
// 				return todo;
// 			});
// 			break;

// 		default:
// 			return state;
// 	}
// 	localStorage.setItem("todos", JSON.stringify(newState.todos));
// 	return newState;
// };
export const store = createStore(
	combineReducers({ movies, todos, rickandmorty ,shop}),
	composeWithDevTools(applyMiddleware(thunk))
);
