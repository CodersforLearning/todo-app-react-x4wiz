import './App.css'
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";


import Signup from "./components/Signup";
import {AuthProvider} from "./contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRout from "./components/PrivateRout";

function App() {
	
	return (
		<>
			<Router>
				<AuthProvider>
					<Switch>
						<PrivateRout exact path="/" component={Dashboard}/>
						<Route path="/signup" component={Signup}/>
						<Route path="/login" component={Login}/>
					</Switch>
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
