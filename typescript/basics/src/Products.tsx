import React from "react";
import { Product } from "./types";

type Props = {
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
};

const Products = ({ products, setSelectedProduct, selectedProduct }: Props) => {
  setSelectedProduct((prev) => prev);
  return products.map((product) => (
    <div key={product.id}>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <button onClick={() => setSelectedProduct(product)}>Select</button>
    </div>
  ));
};

export default Products;
