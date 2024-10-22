"use client";

import { deleteTodo, updateTodo } from "@/actions/todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Todo } from "@prisma/client";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const { title, description } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = () => {
    deleteTodo({ id: todo.id });
  };

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = inputRef.current?.value.trim();
    if (!title || !inputRef.current) return;

    const result = await updateTodo({ id: todo.id, title });
    if (!result) return;
    setIsEditing(false);
  };

  return (
    <div className="border border-black/15 shadow-sm p-2 rounded-md relative">
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <Input
            placeholder="title"
            defaultValue={title}
            ref={inputRef}
            className="w-[200px] !text-sm py-0.5"
          />
        </form>
      ) : (
        <h3 className="font-semibold mb-1">{title}</h3>
      )}
      {description && (
        <p className="ml-1 texsm text-muted-foreground">{description}</p>
      )}
      <Button
        size="icon"
        variant={"destructive"}
        onClick={handleDelete}
        className="absolute right-2 top-2 h-6 w-6"
      >
        <Trash2Icon className="w-2 h-2" />
      </Button>
      <Button
        size="icon"
        variant={"outline"}
        onClick={() => setIsEditing(!isEditing)}
        className="absolute right-10 top-2 h-6 w-6"
      >
        <Edit2Icon className="w-2 h-2" />
      </Button>
    </div>
  );
};
