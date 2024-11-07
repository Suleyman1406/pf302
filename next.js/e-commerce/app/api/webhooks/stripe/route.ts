import Stripe from "stripe";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import stripe from "@/lib/stripe";
import prisma from "@/lib/prisma";

type METADATA = {
  orderId: string;
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const sig = headers().get("stripe-signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  const eventType = event.type;

  try {
    if (eventType === "checkout.session.completed") {
      const { orderId } = event.data.object.metadata as METADATA;
      if (!orderId)
        return new Response("Order ID not found", {
          status: 400,
        });
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "CONFIRMED",
        },
      });
    }

    return new Response("Payment Success", {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response("Server error", {
      status: 500,
    });
  }
}
