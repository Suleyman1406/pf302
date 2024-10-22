import { products } from "@/data";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { title, description, price } = await req.json();
    if (!title || !description || !price || !id) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = products.find((product) => product.id === id);

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    product.title = title;
    product.description = description;
    product.price = price;

    return Response.json({ message: "Product updated", product });
  } catch (e) {
    return Response.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { title, description, price } = await req.json();
    if (!id) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!title && !description && !price) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = products.find((product) => product.id === id);

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;

    return Response.json({ message: "Product updated", product });
  } catch (e) {
    return Response.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  const product = products.splice(index, 1)[0];

  return Response.json({ message: "Product deleted", product });
}
