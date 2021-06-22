import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

function Todo({ todo, deleteTodo, toggleTodo }) {
	return (
		<div className="todo">
			{/* Adding class "completed" if todo.done === true */}
			<li className={`todo-item ${todo.done ? 'completed' : ''}`}>{todo.text}</li> 
			<button className="complete-btn" onClick={() => toggleTodo(todo.id, todo.done)}><FontAwesomeIcon icon={faCheck}/></button>
			<button className="trash-btn" onClick={() => deleteTodo(todo.id)}><FontAwesomeIcon icon={faTrash}/></button>
		</div>
	);
}

export default Todo;
