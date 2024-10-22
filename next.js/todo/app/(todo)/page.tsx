import prisma from "@/lib/prisma";
import { TodoInput } from "./_components/TodoInput";
import { TodoList } from "./_components/TodoList";
import { TodoHeader } from "./_components/TodoHeader";

export default async function Home() {
  const search = "Mehelle";
  const todos = await prisma.todo.findMany({
    where: {
      // title: {
      //   contains: "y",
      //   mode: "insensitive",
      // },
      // completed: true,
      // createdAt: {
      //   gte: new Date(1729529228484),
      // },
      // title: {
      //   contains: search,
      // },
      // description: {
      //   contains: search,
      // },
      // OR: [
      //   {
      //     title: {
      //       contains: search,
      //     },
      //   },
      //   {
      //     description: {
      //       contains: search,
      //     },
      //   },
      // ],
    },
    // orderBy: {
    //   title: "asc",
    //   description: "asc",
    // },
    // select: {
    //   title: true,
    //   description: true,
    // },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="p-4 rounded-md mx-auto max-w-md my-10 border border-muted-foreground shadow-sm shadow-amber-500">
      <TodoHeader />
      <TodoInput />
      <TodoList todos={todos} />
    </div>
  );
}
