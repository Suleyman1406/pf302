import React from "react";
import { ProductTable } from "./_components/table";
import { ProductModal } from "./_components/modal";
import { ProductSort } from "./_components/sort";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: {
    sort: string;
  };
}) => {
  const { sort } = searchParams;

  const response = await fetch(
    `http://localhost:3000/api/products?sort=${sort}`
  );

  const { products } = await response.json();

  return (
    <div className="max-w-screen-lg py-10 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-purple-500 text-4xl font-bold mb-8">Products</h1>
        <div className="flex gap-3 items-center">
          <ProductSort />
          <ProductModal />
        </div>
      </div>
      <ProductTable products={products} />
    </div>
  );
};

export default ProductsPage;
