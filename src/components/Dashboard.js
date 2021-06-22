import '../App.css';
import React, {useEffect, useState} from 'react';
import Todos from "./Todos";
import Form from "./Form";
import {useAuth} from "../contexts/AuthContext";

import {Container, Card, Navbar, NavItem, Button, Alert} from "react-bootstrap";
import {Link, useHistory } from "react-router-dom";


function Dashboard() {
	
	const [inputText, setInputText] = useState("")
	const [todos, setTodos] = useState([])
	const [filteredTodos, setFilteredTodos] = useState([])
	const [status, setStatus] = useState("all")
	const [error, setError] = useState('')
	const history = useHistory()
	
	const { currentUser, logout } = useAuth()
	
	
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
		if (localStorage.getItem('todos') === null) {
			localStorage.setItem('todos', JSON.stringify([]))
		} else {
			setTodos(JSON.parse(localStorage.getItem('todos')))
		}
	}
	
	const logoutHandle = async () => {
		try {
			await logout()
			history.push("/")
		} catch {
			setError("Couldn't logout")
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
		<div>
			<Container className="d-flex justify-content-center" style={{minHeight: "100vh"}}>
				<div className="w-100" style={{maxWidth: "600px"}}>
					<div className="App">
						<Navbar>
							<NavItem>
								Hello {JSON.stringify(currentUser.email)}
							</NavItem>
							<NavItem>
								<Button variant="link" onClick={logoutHandle}>Log out</Button>
							</NavItem>
						</Navbar>
						{error && <Alert variant="danger">{error}</Alert>} {/* Showing error message*/}
						<Card>
							<Card.Body>
								<Form setInputText={setInputText} setTodos={setTodos} todos={todos} inputText={inputText}
											setStatus={setStatus}/>
								<Todos todos={todos} filteredTodos={filteredTodos} setTodos={setTodos} status={status}/>
							</Card.Body>
						</Card>
					</div>
				</div>
			
			</Container>
		</div>
	
	);
}

export default Dashboard;
