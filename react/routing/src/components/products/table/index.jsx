import React from "react";
import Skeleton from "react-loading-skeleton";
import { TableHeading } from "./TableHeading";
import { TableBody } from "./TableBody";
import { useEffect } from "react";
import { useState } from "react";

export const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://northwind.vercel.pp/api/products")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setProducts(data);
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {});
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHeading />
        <TableBody products={products} />
      </table>
      {loading && <Skeleton className="w-full h-[200px]" />}
    </div>
  );
};
