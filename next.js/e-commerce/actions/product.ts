"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type CreateProductParams = {
  name: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
  categoryId: string;
};

export async function createProduct({
  name,
  price,
  quantity,
  description,
  imageUrl,
  categoryId,
}: CreateProductParams) {
  try {
    const result = await prisma.product.create({
      data: {
        name,
        price,
        quantity,
        description,
        imageUrl,
        categoryId,
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
      error: "Something went wrong",
    };
  }
}
