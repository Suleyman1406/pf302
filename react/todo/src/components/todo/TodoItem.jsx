import React, { useRef, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

export const TodoItem = ({ todo, handleTodoAction }) => {
  const { title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const editInputRef = useRef();

  const onEdit = (e) => {
    e.preventDefault();
    let title = editInputRef.current.value;
    handleTodoAction("edit", {
      ...todo,
      title,
    });
    setIsEditing(false);
  };

  const onCompletedChange = () => {
    handleTodoAction("edit", {
      ...todo,
      completed: !completed,
    });
  };

  const onDelete = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      handleTodoAction("delete", todo);
    }
  };

  return (
    <div className="flex items-center justify-between border border-gray-300 p-3 my-2 rounded-md mx-2">
      <div className="flex items-center gap-x-[6px]">
        <input
          checked={completed}
          onChange={onCompletedChange}
          type="checkbox"
          className="mr-3"
        />
        {isEditing ? (
          <form onSubmit={onEdit}>
            <input
              ref={editInputRef}
              className="border border-gray-300 rounded-lg px-2 py-0.5 w-full focus:outline-none focus:ring focus:border-blue-300 focus:ring-blue-200"
              type="text"
              defaultValue={title}
            />
          </form>
        ) : (
          <span className={completed ? "line-through" : ""}>{title}</span>
        )}
      </div>
      <div>
        <button className="cursor-pointer hover:scale-110 mr-2">
          {isEditing ? (
            <IoMdClose
              onClick={() => setIsEditing(false)}
              size={22}
              className="text-yellow-500"
            />
          ) : (
            <MdEdit
              onClick={() => setIsEditing(true)}
              size={22}
              className="text-yellow-500"
            />
          )}
        </button>
        <button className="cursor-pointer hover:scale-110">
          <MdDelete onClick={onDelete} size={22} className="text-red-600" />
        </button>
      </div>
    </div>
  );
};
