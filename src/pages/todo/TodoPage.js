import { TodoForm } from "../../components/todo/TodoForm";
import React, { useState, useCallback,useEffect } from "react";
import { TodoList } from "../../components/todo/TodoList";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
export function Todo() {

	const dispatch = useDispatch()
	const todos = useSelector(state => state.todos)
	// const [todoList, setTodoList] = useState(
	// 	JSON.parse(localStorage.getItem("todos")) || []
	// );
	console.log("Todos",todos);
	// useEffect(() => {
    //     localStorage.setItem('todos', JSON.stringify(todoList))
    // }, [todoList])
	const handleRemove = useCallback((created) => {
		console.log("remove",created);
		dispatch({type: "todos/remove", payload: created})
		// setTodoList((prev) => {
		// 	const newTodos = [...prev];
		// 	newTodos.splice(index, 1);
		// 	return newTodos;
		// });
	}, [dispatch]);

	const handleCreate = useCallback((todo) => {
		dispatch({type: "todos/add", payload: todo})
		// const newTodos = [
		// 	...todoList,
		// 	{ title: data, created_at: new Date(), done: false },
		// ];
		// setTodoList((todoList) => [
		// 	...todoList,
		// 	{ title: data, created_at: new Date(), done: false },
		// ]);
	}, [dispatch]);

	const handleDone = useCallback((created, isDone) => {
		dispatch({type: "todos/doneChange", payload: created, value: isDone})
		// setTodoList((prev) => {
		// 	const items = [...prev];
		// 	let item = {
		// 		...items[index],
		// 		done: is_done,
		// 	};
		// 	items[index] = item;
		// 	return items;
		// });
	}, [dispatch]);

	return (
		<Container maxWidth={"xl"} sx={{ padding: "33px 0" }}>
			<div style={{ width: "50%" }}>
				<TodoForm onCreate={(data) => handleCreate(data)}></TodoForm>
				<TodoList
					lists={todos}
					onRemove={handleRemove}
					onChangeDone={handleDone}
				></TodoList>
			</div>
		</Container>
	);
}
