import React, { useCallback, useMemo } from "react";
import { TodoListItem } from "./TodoListItem";
export function TodoList({ lists, onRemove, onChangeDone }) {

	const doneTodos = useMemo(()=> {
		const s = [...lists]
		return s.filter((item)=> item.done)
	},[lists])
	const notDoneTodos = useMemo(()=> {
		const s = [...lists]
		return s.filter((item)=> !item.done)
	},[lists])
    
	return (
		<div style={{display:"flex", justifyContent: "space-between"}}>
			<div style={{width: "40%"}}>
				<h2>To Do</h2>
				{notDoneTodos.map((list, i) => (
				<TodoListItem
					key={list.created_at}
					todo={list}
					onRemove={onRemove}
					onChangeDone={onChangeDone}
				></TodoListItem>
			))}
			</div>
			<div style={{width: "40%"}}>
				<h2>Done</h2>
				{doneTodos.map((list, i) => (
				<TodoListItem
					key={list.created_at}
					todo={list}
					onRemove={onRemove}
					onChangeDone={onChangeDone}
				></TodoListItem>
			))}
			</div>

			
		</div>
	);
}
