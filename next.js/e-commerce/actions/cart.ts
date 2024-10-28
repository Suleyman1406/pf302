"use server";

import getCurrentUser from "@/lib/current-user";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: string, quantity = 1) {
  try {
    const user = await getCurrentUser();
    const cart = await prisma.cart.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!cart) return { ok: false, error: "Cart not found" };

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (cartItem) {
      await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: cartItem.quantity + quantity,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          quantity,
          productId,
        },
      });
    }

    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    console.log(err);
    return { ok: false, error: "Something went wrong!" };
  }
}

export async function removeFromCart(cartItemId: string) {
  try {
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    console.log(err);
    return { ok: false, error: "Something went wrong!" };
  }
}
