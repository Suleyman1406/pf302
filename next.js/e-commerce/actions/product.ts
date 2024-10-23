"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type CreateProductParams = {
  product: {
    name: string;
    price: number;
    quantity: number;
    description: string;
    imageUrl: string;
  };
};

export async function createProduct({ product }: CreateProductParams) {
  try {
    const result = await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        imageUrl: product.imageUrl,
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
