import React, { useState, useContext } from "react";
import { todosContext } from "../App";

function ToDoItem({ todo, todoId }) {
  // State to manage the checkout status of the todo item and getting todos state:-
  const [checkout, setCheckout] = useState(false);
  const { todos, setTodos, setTodo } = useContext(todosContext);

  // This function updates the checkout state to true or false based on the current state:-
  const toggleCheckout = () => {
    setCheckout(!checkout);
  };

  // Edit the todo item with the specified ID from the list:-
  const handleEdit = (id) => {
    const entry = todos.find((item) => {
      return item.id === id;
    });

    setTodo(entry.todo);

    setTodos(
      todos.filter((item) => {
        return item.id !== id;
      })
    );
  };

  // Delete the todo item with the specified ID from the list:-
  const handleDelete = (id) => {
    setTodos(
      todos.filter((item) => {
        return item.id !== id;
      })
    );
  };

  return (
    <div className="w-full md:w-[90%] lg:w-[75%] flex gap-1 items-center rounded-sm bg-slate-200">
      <div className="flex items-center gap-1 lg:gap-2.5 w-full py-0.5 px-1">
        <input
          onClick={toggleCheckout}
          className="cursor-pointer"
          title="checkout Todo"
          type="checkbox"
          name="checkTodo"
        />
        <p className={checkout ? "line-through" : "font-normal"}>{todo}</p>
      </div>
      <div className="flex items-center gap-1 md:gap-4">
        <button
          onClick={() => {
            handleEdit(todoId);
          }}
          className="cursor-pointer"
          type="button"
          title="editTodo"
        >
          <img src="../src/assets/edit.svg" alt="edit" width={25} height={25} />
        </button>
        <button
          onClick={() => {
            handleDelete(todoId);
          }}
          className="mr-1 cursor-pointer"
          type="button"
          title="deleteTodo"
        >
          <img
            src="../src/assets/delete.svg"
            alt="delete"
            width={25}
            height={25}
          />
        </button>
      </div>
    </div>
  );
}

export default ToDoItem;
