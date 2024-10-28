import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./prisma";

export default async function getCurrentUser() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const user = await prisma.user.findUnique({
    where: {
      externalId: userId,
    },
  });
  if (!user) {
    redirect("/sign-in");
  }

  return user;
}
