import React from "react";
import { ProductTable } from "./_components/ProductTable";
import prisma from "@/lib/prisma";
import { ProductDialog } from "./_components/ProductDialog";
import { EModalType } from "@/types";
import { CategoryTable } from "./_components/CategoryTable";
import { CategoryDialog } from "./_components/CategoryDialog";

const DashboardPage = async () => {
  const products = await prisma.product.findMany();
  const categories = await prisma.category.findMany();

  return (
    <div className="max-w-screen-lg mx-auto py-12">
      <div className="my-6">
        <div className="pb-4 border-b border-blue-700 flex justify-between">
          <h1 className="text-3xl font-bold text-blue-800">Products</h1>
          <ProductDialog categories={categories} type={EModalType.CREATE} />
        </div>
        <ProductTable products={products} />
      </div>
      <div className="my-6">
        <div className="pb-4 border-b border-blue-700 flex justify-between">
          <h1 className="text-3xl font-bold text-blue-800">Categories</h1>
          <CategoryDialog type={EModalType.CREATE} />
        </div>
        <CategoryTable categories={categories} />
      </div>
    </div>
  );
};

export default DashboardPage;
