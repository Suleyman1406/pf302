import Link from "next/link";
import React, { PropsWithChildren } from "react";

const CommentsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <nav className="flex w-full mb-4 items-center justify-end bg-purple-900 p-5">
        <Link href="/dashboard/products">Products</Link>
        <Link href="/dashboard/favorites">Favorites</Link>
      </nav>
      {children}
    </div>
  );
};

export default CommentsLayout;
