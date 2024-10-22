"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTodo({ title }: { title: string }) {
  try {
    const result = await prisma.todo.create({
      data: {
        title,
      },
    });
    revalidatePath("/");

    return result;
  } catch (err) {
    return false;
  }
}

export async function deleteTodo({ id }: { id: string }) {
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    return true;
  } catch (err) {
    return false;
  }
}

export async function updateTodo({ title, id }: { title: string; id: string }) {
  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    revalidatePath("/");
    return true;
  } catch (err) {
    return false;
  }
}
