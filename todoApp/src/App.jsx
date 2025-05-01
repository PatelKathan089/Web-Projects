import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

// Creating a context to manage the todos state across the nested components:-
export const todosContext = createContext(null);

function App() {
  // State to manage the todo input, the list of todos and any error messages:-
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  // Updating the todo when the input changes:-
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Adding the todo to the list when the button is clicked:-
  const handleAdd = (e) => {
    if (todo === "") {
      setError("Please Enter your todo!");
    } else if (todo.length < 4) {
      setError("Please Enter atleast 4 character long todo!");
    } else {
      setError("");
      setTodos([...todos, { id: uuidv4(), todo: todo }]);
      setTodo("");
    }
  };

  return (
    <>
      <Header />
      <div className="container flex flex-col items-center gap-2 p-1 min-h-[94vh] bg-gradient-to-b from-[#ff00005e] to-[#0000ff5b]">
        <div className="addTodo w-full py-1 px-2 text-slate-800">
          <h2 className="md:font-semibold md:text-center md:text-lg">
            Add your Todos
          </h2>
          <form
            action=""
            className="flex flex-col md:flex-row justify-center items-center gap-2 mt-1"
          >
            <input
              className="bg-slate-200 w-full lg:w-[80%] px-2 py-1 rounded"
              type="text"
              value={todo}
              onChange={handleChange}
              placeholder="Enter your Todos..."
              title="Enter your todos"
            />
            <button
              className="px-2 py-1 rounded mt-0.5 cursor-pointer bg-gray-400 hover:bg-gray-300 hover:outline"
              type="button"
              title="Submit todo"
              onClick={handleAdd}
            >
              Add
            </button>
          </form>
          {error !== "" && (
            <p className="text-red-600 text-center font-semibold">{error}</p>
          )}
        </div>
        <div className="todos p-1 w-full py-1 px-2">
          <h2 className="md:font-semibold md:text-center md:text-lg mb-1">
            Todo List
          </h2>
          <todosContext.Provider
            value={{ todos: todos, setTodos: setTodos, setTodo: setTodo }}
          >
            <div className="flex flex-col md:items-center gap-2">
              <ToDoList />
            </div>
          </todosContext.Provider>
        </div>
      </div>
    </>
  );
}

export default App;
