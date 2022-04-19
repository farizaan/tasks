
//  JSON.parse(localStorage.getItem("todos")) || 
const initialValue = {
	todos:[]
	
};
export const  todos = function (state = initialValue, action) {
	let newState = { ...state };
	switch (action.type) {
		case "todos/add":
			console.log("ADD", action);
			newState.todos = [...state.todos, action.payload];
			break;
		case "todos/remove":
			console.log(new Date(action.payload).toLocaleTimeString());

			newState.todos = state.todos.filter((todo) => {
				console.log(todo);
				return todo.created_at !== action.payload;
			});
			break;
		case "todos/doneChange":
			newState.todos = state.todos.map((todo) => {
				if (todo.created_at === action.payload) {
					return {
						...todo,
						done: action.value,
					};
				}
				return todo;
			});
			break;

		default:
			return state;
	}
	localStorage.setItem("todos", JSON.stringify(newState.todos));
	return newState;
};
