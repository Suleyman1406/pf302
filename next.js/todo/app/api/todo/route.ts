import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { title, description } = await req.json();

  // prisma.todo.
}
