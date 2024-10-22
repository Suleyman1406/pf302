import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export const TodoInput = ({ setTodos }) => {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const todo = {
      id: uuidv4(),
      title: inputRef.current.value,
      completed: false,
    };
    setTodos((prev) => [...prev, todo]);
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter your todo"
        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300 focus:ring-blue-200"
      />
    </form>
  );
};
