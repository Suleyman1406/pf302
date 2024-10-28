"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type CreateCategoryParams = {
  name: string;
};
export async function createCategory({ name }: CreateCategoryParams) {
  try {
    const result = await prisma.category.create({
      data: {
        name,
      },
    });

    revalidatePath("/dashboard");
    return {
      ok: true,
      result,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: "Failed to create category",
    };
  }
}
