import React from "react";
import Button from "@mui/joy/Button";
import { useEffect } from "react";
import { useState } from "react";
import { ProductCard } from "../../components/products/card";
import { Box, Typography } from "@mui/joy";
import { ProductActionModal } from "../../components/products/action-modal";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [paginationData, setPaginationData] = useState({
    hasMore: false,
    totalCount: 0,
  });

  const { hasMore, totalCount } = paginationData;

  useEffect(() => {
    getData();
  }, []);

  async function fetchData(pageSize = 6, skip = 0, searchStr = "") {
    const response = await fetch(
      `http://localhost:3000/api/nfts?pageSize=${pageSize}&skip=${skip}&searchStr=${searchStr}`
    );
    return await response.json();
  }

  async function getData() {
    setLoading(true);
    const data = await fetchData();
    const { nfts, ...paginationData } = data;
    setProducts(nfts);
    setPaginationData(paginationData);
    setLoading(false);
  }

  async function handleLoadMore() {
    setLoadMoreLoading(true);
    const data = await fetchData(6, products.length);
    const { nfts, ...paginationData } = data;
    setProducts((prev) => [...prev, ...nfts]);
    setPaginationData(paginationData);
    setLoadMoreLoading(false);
  }

  return (
    <div className="w-full px-8 lg:px-0 lg:max-w-[900px] mx-auto">
      <div className="my-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 ">
            Products Table
          </h1>
          <Typography level="body-md">Total Count: {totalCount}</Typography>
        </div>
        <ProductActionModal />
      </div>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {loading && (
          <>
            <ProductCard.Skeleton />
            <ProductCard.Skeleton />
            <ProductCard.Skeleton />
            <ProductCard.Skeleton />
            <ProductCard.Skeleton />
            <ProductCard.Skeleton />
          </>
        )}
      </div>
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        {hasMore && (
          <Button
            loading={loadMoreLoading}
            onClick={handleLoadMore}
            variant="soft"
          >
            Load More
          </Button>
        )}
      </Box>
    </div>
  );
};

export default ProductsPage;
