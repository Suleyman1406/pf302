import React from "react";
import { ProductTable } from "./_components/ProductTable";
import prisma from "@/lib/prisma";
import { ProductDialog } from "./_components/ProductDialog";
import { EProductModalType } from "@/types";

const DashboardPage = async () => {
  const products = await prisma.product.findMany();
  console.log(products);
  return (
    <div className="max-w-screen-lg mx-auto py-12">
      <div className="pb-4 border-b border-blue-700 flex justify-between">
        <h1 className="text-3xl font-bold text-blue-800">Products</h1>
        <ProductDialog type={EProductModalType.CREATE} />
      </div>
      <ProductTable products={products} />
    </div>
  );
};

export default DashboardPage;
