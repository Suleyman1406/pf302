// import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data";
import { Product } from "@/types";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const sort = searchParams.get("sort");
  const filteredProducts = [...products];

  if (sort === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return Response.json({ products: filteredProducts });
}

export async function POST(request: NextRequest) {
  const { title, description, price, imageUrl } = await request.json();
  // console.log(request.headers);
  if (!title || !description || !price) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const product: Product = {
    id: uuidv4(),
    title,
    description,
    price,
    imageUrl,
  };

  products.push(product);

  return Response.json(
    { message: "Product created", product },
    {
      status: 201,
    }
  );
}
