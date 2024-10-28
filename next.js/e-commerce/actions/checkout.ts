"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrder(cartId: string) {
  try {
    const cart = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!cart) return { ok: false, error: "Cart not found" };

    const totalAmount = cart.cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.product.price * cartItem.quantity;
    }, 0);

    const order = await prisma.order.create({
      data: {
        totalAmount,
        userId: cart.userId,
      },
    });

    cart.cartItems.forEach(async (cartItem) => {
      await prisma.orderItem.create({
        data: {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          orderId: order.id,
        },
      });
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    revalidatePath("/");
    return { ok: true, order };
  } catch (err) {
    console.log(err);
    return { ok: false, error: "Something went wrong!" };
  }
}
