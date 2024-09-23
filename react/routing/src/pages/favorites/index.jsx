import { Typography } from "@mui/joy";
import React from "react";
import { ProductCard } from "../../components/products/card";
import { useContext } from "react";
import { FavoriteContext } from "../../context/favorite";

const FavoritesPage = () => {
  const { favorites } = useContext(FavoriteContext);

  return (
    <div className="w-full px-8 lg:px-0 lg:max-w-[900px] mx-auto">
      <div className="my-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 ">
            Favorite Products
          </h1>
          <Typography level="body-md">
            Total Count: {favorites.length}
          </Typography>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
