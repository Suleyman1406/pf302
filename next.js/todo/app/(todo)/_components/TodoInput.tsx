"use client";

import { createTodo } from "@/actions/todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CheckIcon } from "lucide-react";
import React, { useRef } from "react";

export const TodoInput = () => {
  const ref = useRef<HTMLInputElement>(null);

  const handleTodoCreate = async () => {
    const title = ref.current?.value.trim();
    if (!title || !ref.current) return;

    const result = await createTodo({ title });
    if (!result) return;
    ref.current.value = "";
  };

  return (
    <div className="flex gap-2">
      <Input ref={ref} placeholder="Type todo..." />
      <Button onClick={handleTodoCreate} size="icon" variant="outline">
        <CheckIcon />
      </Button>
    </div>
  );
};
