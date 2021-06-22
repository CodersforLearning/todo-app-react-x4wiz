import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from '@fortawesome/free-solid-svg-icons'

function Form({ setInputText, addTodo, inputText, setStatus }) {
	
	return (
		<div>
			<form className="add-todo-form">
				<input value={inputText} type="text" className="todo-input" onChange={(e) => {
					e.preventDefault()
					setInputText(e.target.value)
				}}/>
				<button className="todo-button" onClick={(e) => {
					e.preventDefault()
					addTodo(inputText)
				}}>
					<FontAwesomeIcon icon={faPlus}/>
				</button>
				<div className="select">
					<select onChange={e => setStatus(e.target.value)} name="todos" className="filter-todo">
						<option value="all">All</option>
						<option value="done">Done</option>
						<option value="undone">Undone</option>
					</select>
				</div>
			</form>
		</div>
	);
}

export default Form;
