import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString != null) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveTodoLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter((item) => {
      return item.id === id
    })
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTodoLs()
  }

  const handleDelete = (e, id) => {
    confirm("Are you sure you want to delete this todo!")
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTodoLs()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveTodoLs()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveTodoLs()
  }

  return (
    <>
      <Navbar />
      <div className="md:container md:w-1/2 min-h-[90vh] bg-violet-100 mx-auto p-2 my-4 rounded-xl">
        <h2 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h2>
        <div className="addTodo m-3 flex flex-col gap-3 p-2">
          <h3 className='font-bold text-xl'>Add a Todo</h3>
          <div className="input-box w-full flex">
            <input onChange={handleChange} value={todo} type="text" name="" id="" placeholder='Add your todos' className='w-[90%] p-1 px-4 rounded-full' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='px-4 py-1 hover:bg-violet-900 hover:font-bold disabled:bg-violet-400 transition-all bg-violet-800 text-white rounded-full mx-2'>Save</button>
          </div>
          <div className="check-box flex items-center gap-2">
            <input onChange={toggleFinished} type="checkbox" name="" id="c1" className='cursor-pointer' checked={showFinished} />
            <label htmlFor="c1">Show Finished</label>
          </div>
        </div>
        <div className="line-sepration w-[90%] border border-gray-600 border-opacity-20 mx-auto"></div>
        <h1 className='font-bold text-xl mx-5 my-2'>Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display!</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex items-center gap-2 my-3 md:w-3/5 justify-between mx-5">
              <div className='flex gap-5 items-center'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" className='cursor-pointer' />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex items-center gap-1">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='p-2 hover:bg-violet-900 hover:font-bold transition-all bg-violet-800 text-white rounded-lg mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='p-2 hover:bg-violet-900 hover:font-bold transition-all bg-violet-800 text-white rounded-lg mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
