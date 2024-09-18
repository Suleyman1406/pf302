import React from "react";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos, handleTodoAction }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleTodoAction={handleTodoAction}
        />
      ))}
    </div>
  );
};
