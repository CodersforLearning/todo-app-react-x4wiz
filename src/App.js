import './App.css';
import Todos from "./components/Todos";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <h1>
        Hello todo list
        <Form />
        <Todos />
      </h1>
    </div>
  );
}

export default App;
