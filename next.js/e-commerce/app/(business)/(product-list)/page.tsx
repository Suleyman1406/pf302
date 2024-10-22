import { ProductCard } from "@/components/shared/ProductCard";
import prisma from "@/lib/prisma";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

async function ProdutsPage({ searchParams }: { searchParams: SearchParams }) {
  const { sort } = searchParams;

  const orderBy: Record<string, string> = {};

  if (sort && typeof sort === "string") {
    const [key, value] = sort.split("-");
    orderBy[key] = value;
  }

  const products = await prisma.product.findMany({
    orderBy,
  });

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProdutsPage;
