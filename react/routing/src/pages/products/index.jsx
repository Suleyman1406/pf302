import React from "react";
import Button from "@mui/joy/Button";
import { useState, useEffect } from "react";
import { ProductCard } from "../../components/products/card";
import { Box, Typography } from "@mui/joy";
import { ProductActionModal } from "../../components/products/action-modal";
import { ProductsFilter } from "../../components/products/filter";
import { useSearchParams } from "react-router-dom";

let timeoutId = null;

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [paginationData, setPaginationData] = useState({
    hasMore: false,
    totalCount: 0,
  });
  const searchStr = searchParams.get("searchStr") || "";
  const sort = searchParams.get("sort") || "";
  const creators = searchParams.get("creators") || "";

  const { hasMore, totalCount } = paginationData;

  useEffect(() => {
    getData();
  }, [searchParams]);

  async function fetchData(pageSize = 6, skip = 0) {
    const response = await fetch(
      `http://localhost:3000/api/nfts?pageSize=${pageSize}&skip=${skip}&searchStr=${searchStr}&sort=${sort}&creators=${creators}`
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
      <div className="mt-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 ">
            Products Table
          </h1>
          <Typography level="body-md">Total Count: {totalCount}</Typography>
        </div>
        <ProductActionModal />
      </div>
      <ProductsFilter />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {loading ? (
          <>
            <ProductCard.Skeleton />
            <ProductCard.Skeleton />
            <ProductCard.Skeleton />
            <ProductCard.Skeleton />
            <ProductCard.Skeleton />
            <ProductCard.Skeleton />
          </>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
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
