import React, { useContext } from "react";
import ToDoItem from "./ToDoItem";
import { todosContext } from "../App";

// This component is used to display the list of todos:-
function ToDoList() {
  const { todos } = useContext(todosContext);
  return todos.map((item) => {
    return <ToDoItem key={item.id} todoId={item.id} todo={item.todo} />;
  });
}

export default ToDoList;
