import React from 'react';
import Todo from './Todo'

function Todos({todos, setTodos, filteredTodos}) {
	return (
		<div className="todo-container">
			<ul className="todo-list">
				{/* displaying all todos in the array */}
				{
					filteredTodos.map(el => (
						<Todo todo={el} key={el.id} setTodos={setTodos} todos={todos}/>
					))
				}
			</ul>
		</div>
	);
}

export default Todos;
