import React from 'react';
import Todo from './Todo'

function Todos({todos, setTodos, filteredTodos, deleteTodo, toggleTodo}) {
	return (
		<div className="todo-container">
			<ul className="todo-list">
				{/* displaying all todos in the array */}
				{
					filteredTodos.map(el => (
						<Todo toggleTodo={toggleTodo} todo={el} key={el.id} setTodos={setTodos} todos={todos} deleteTodo={deleteTodo}/>
					))
				}
			</ul>
		</div>
	);
}

export default Todos;
