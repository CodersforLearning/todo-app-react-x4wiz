import './App.css';
import Todos from "./components/Todos";
import Form from "./components/Form";
import {useState, useEffect} from "react";

function App() {
	const [inputText, setInputText] = useState("")
	const [todos, setTodos] = useState([])
	const [filteredTodos, setFilteredTodos] = useState([])
	const [status, setStatus] = useState("all")
	
	
	// filter by done / undone / all and save to a separate state
	const filterTodos = () => {
		switch (status) {
			case 'done':
				setFilteredTodos(todos.filter(el => el.done === true))
				break
			case 'undone':
				setFilteredTodos(todos.filter(el => el.done === false))
				break
			default:
				setFilteredTodos(todos)
				break
		}
	}
	
	// saving to local storage
	const saveToLStorage = () => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}
	
	// getting from local storage if it's there
	const getFromLStorage = () => {
		if (localStorage.getItem('todos') === null ) {
			localStorage.setItem('todos', JSON.stringify([]))
		} else {
			setTodos(JSON.parse(localStorage.getItem('todos')))
		}
	}
	
	// run once on page load
	useEffect(() => {
		getFromLStorage()
	}, [])
	
	// run when todos or status change
	useEffect(() => {
		filterTodos()
		saveToLStorage()
	}, [todos, status])
	
	return (
		<div className="App">
			<header>
				<h1>
					Yay, another todo list!
				</h1>
			</header>
			<Form setInputText={setInputText} setTodos={setTodos} todos={todos} inputText={inputText} setStatus={setStatus}/>
			<Todos todos={todos} filteredTodos={filteredTodos} setTodos={setTodos} status={status}/>
		
		</div>
	);
}

export default App;
