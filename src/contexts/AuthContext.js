import React, {useContext, useEffect, useState} from 'react';
import "firebase/auth"
import { auth } from "../firebase";

// Setting up context for authorisation etc

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({children}) {
	const [currentUser, setCurrentUser] = useState()
	// using this to allow firebase time to check if 
	// there's cookies on the user already saved in the browser
	const [loading, setLoading] = useState(true) 
	
	
	// Create user 
	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
	}
	
	// User login
	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
	}
	
	// User logout
	const logout = () => {
		return auth.signOut()
	}
	
	// Setting up created user to our state = currentUser. Runs once on page load
	useEffect(() => {
		return auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})
	}, []);
	
	const value = {
		currentUser,
		signup,
		login,
		logout
	}
	
	return (
		<AuthContext.Provider value={value}>
			{/* Render only if loading is false and currentUser is set */}
			{!loading && children} 
		</AuthContext.Provider>
	);
}
