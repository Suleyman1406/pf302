import React, { useEffect, useState } from "react";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  // let count = 0;

  function handleTodoAction(type, todo) {
    if (type === "edit") {
      const todoIndex = todos.findIndex((t) => t.id === todo.id);
      todos[todoIndex].completed = todo.completed;
      todos[todoIndex].title = todo.title;
      setTodos([...todos]);
    } else if (type === "delete") {
      setTodos(todos.filter((t) => t.id !== todo.id));
    }
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log(count++);
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log("Component did update");
  // });

  return (
    <div className="w-[600px] mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center">Todo List</h1>
      <TodoInput setTodos={setTodos} />
      <TodoList handleTodoAction={handleTodoAction} todos={todos} />
    </div>
  );
};
