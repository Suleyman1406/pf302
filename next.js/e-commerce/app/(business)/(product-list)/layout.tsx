import { PropsWithChildren } from "react";
import { LayoutHeader } from "./_components/LayoutHeader";
import { LayoutFilter } from "./_components/LayoutFilter";
import prisma from "@/lib/prisma";
import { Cart } from "@/components/shared/Cart";
import getCurrentUser from "@/lib/current-user";

async function ProductListLayout({ children }: PropsWithChildren) {
  const categories = await prisma.category.findMany();
  const user = await getCurrentUser();
  const cart = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  type Cart = {
    id: number;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <LayoutHeader />
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 mt-6">
              {/* Filters */}
              <LayoutFilter categories={categories} />
              {/* Product grid */}
              <div className="lg:col-span-3">{children}</div>
            </div>
          </section>
        </main>
      </div>
      <Cart cart={cart} />
    </div>
  );
}
export default ProductListLayout;
