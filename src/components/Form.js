import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from '@fortawesome/free-solid-svg-icons'

function Form({ setInputText, setTodos, todos, inputText, setStatus }) {
	const inputTextHandler = (e) => {
		e.preventDefault()
		setInputText(e.target.value)
	}
	
	// update state with new todo
	const submitTodo = (e) => {
		e.preventDefault()
		setTodos([
			...todos, {
				"text": inputText,
				"done": false,
				"id": Math.random() * 1000 // random id for now
			}
		])
		setInputText("") // clearing entered text
	}

	return (
		<div>
			<form>
				<input value={inputText} type="text" className="todo-input" onChange={inputTextHandler}/>
				<button className="todo-button" onClick={submitTodo}>
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
