import React from "react";
import { ProductTable } from "../../components/products/table";

const ProductsPage = () => {
  return (
    <div className=" w-full px-8 lg:px-0 lg:max-w-[900px] mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 my-6">
        Products Table
      </h1>
      <ProductTable />
    </div>
  );
};

export default ProductsPage;
