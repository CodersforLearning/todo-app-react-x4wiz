import '../App.css';
import React, {useEffect, useState} from 'react';
import Todos from "./Todos";
import Form from "./Form";
import { useAuth } from "../contexts/AuthContext";
import app from "../firebase";

import {Container, Card, Navbar, NavItem, Button, Alert} from "react-bootstrap";
import { useHistory } from "react-router-dom";


function Dashboard() {
	
	const [inputText, setInputText] = useState("")
	const [todos, setTodos] = useState([])
	const [filteredTodos, setFilteredTodos] = useState([])
	const [status, setStatus] = useState("all")
	const [error, setError] = useState('')
	const history = useHistory()
	const db = app.firestore()
	
	const { currentUser, logout } = useAuth()
	
	const fetchdata = async () => {
		const data = await db.collection("todos").where("uid", "==", currentUser.uid).get()
		const todos = data.docs.map(doc => {
			return {...doc.data(), id: doc.id}
		})
		setTodos(todos)
	}
	
	
	const addTodo = async (text) => {
		await db.collection("todos").add({
			text: text,
			uid: currentUser.uid,
			done: false
		})
		fetchdata()
	} 
	
	const deleteTodo = async (todoid) => {
		await db.collection("todos").doc(todoid).delete().then(() => {
			console.log("deleted!")
		})
		fetchdata()
	}
	
	const toggleTodo = async (todoid, done) => {
		await db.collection("todos").doc(todoid).update({
			done: !done
		})
		fetchdata()
	}
	
	
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
		fetchdata()
	}, [])
	
	
	// run when todos or status change
	useEffect(() => {
		filterTodos()
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
								<Form setInputText={setInputText} addTodo={addTodo} setTodos={setTodos} todos={todos} inputText={inputText}
											setStatus={setStatus}/>
								<Todos toggleTodo={toggleTodo} deleteTodo={deleteTodo} todos={todos} filteredTodos={filteredTodos} setTodos={setTodos} status={status}/>
							</Card.Body>
						</Card>
					</div>
				</div>
			</Container>
		</div>
	
	);
}

export default Dashboard;
