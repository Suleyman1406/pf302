import React from "react";
import { TodoItem } from "./TodoItem";
import { Todo } from "@prisma/client";

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <div className="flex flex-col gap-3 my-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
