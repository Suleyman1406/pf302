import { ProductCard } from "@/components/shared/ProductCard";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

async function ProdutsPage({ searchParams }: { searchParams: SearchParams }) {
  let { category } = searchParams;
  const { sort } = searchParams;
  const where: Prisma.ProductWhereInput = {};

  if (category) {
    if (typeof category === "string") {
      category = [category];
    }
    where.categoryId = {
      in: category,
    };
  }

  const orderBy: Record<string, string> = {};

  if (sort && typeof sort === "string") {
    const [key, value] = sort.split("-");
    orderBy[key] = value;
  }

  const products = await prisma.product.findMany({
    where,
    orderBy,
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProdutsPage;
