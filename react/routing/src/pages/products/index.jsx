import React from "react";
import Button from "@mui/joy/Button";
import { useEffect } from "react";
import { ProductCard } from "../../components/products/card";
import { Box, Typography } from "@mui/joy";
import { ProductActionModal } from "../../components/products/action-modal";
import { ProductsFilter } from "../../components/products/filter";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getMoreNftData,
  getNftData,
  selectNftData,
} from "../../redux/features/nftsSlice";
import { useDispatch } from "react-redux";
import { getCreatorsData } from "../../redux/features/creatorsSlice";

const ProductsPage = () => {
  const { loading, loadMoreLoading, items, paginationData } =
    useSelector(selectNftData);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchStr = searchParams.get("searchStr") || "";
  const sort = searchParams.get("sort") || "";
  const creators = searchParams.get("creators") || "";

  const { hasMore, totalCount } = paginationData;

  function handleLoadMore() {
    dispatch(getMoreNftData({ searchStr, sort, creators, skip: items.length }));
  }

  useEffect(() => {
    dispatch(getNftData({ searchStr, sort, creators }));
  }, [searchParams]);

  useEffect(() => {
    dispatch(getCreatorsData());
  }, []);

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
          items.map((product) => (
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
