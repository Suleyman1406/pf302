"use server";

import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function createCheckoutSession(cartId: string) {
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

    const origin = headers().get("origin");

    const lineItems = cart.cartItems.map((cartItem) => {
      return {
        quantity: cartItem.quantity,
        price_data: {
          currency: cartItem.product.currency,
          unit_amount: cartItem.product.price * 100,
          product_data: {
            name: cartItem.product.name,
            description: cartItem.product.description ?? "",
            images: [cartItem.product.imageUrl],
          },
        },
      };
    });

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: lineItems,
        success_url: `${origin}/success`,
        cancel_url: `${origin}/payment-failed`,
        metadata: {
          orderId: order.id,
        },
      });

    return {
      ok: true,
      url: checkoutSession.url,
    };
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Something went wrong!" };
  }
}
