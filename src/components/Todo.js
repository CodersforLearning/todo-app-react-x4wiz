import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

function Todo({ todo, setTodos, todos }) {
	
	// removing todo from the list
	const deleteTodo = () => {
		setTodos(todos.filter(el => el.id !== todo.id))
	}
	
	// changing "done" to the opposite
	const toggleTodo = () => {
		setTodos(todos.map(el => {
			if (el.id === todo.id) {
				return {
					...el,
					done: !el.done
				}
			}
			return el
		}))
	} 
	return (
		<div className="todo">
			{/* Adding class "completed" if todo.done === true */}
			<li className={`todo-item ${todo.done ? 'completed' : ''}`}>{todo.text}</li> 
			<button className="complete-btn" onClick={toggleTodo}><FontAwesomeIcon icon={faCheck}/></button>
			<button className="trash-btn" onClick={deleteTodo}><FontAwesomeIcon icon={faTrash}/></button>
		</div>
	);
}

export default Todo;
