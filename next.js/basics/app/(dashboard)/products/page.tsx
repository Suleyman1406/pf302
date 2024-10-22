import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Products",
};

const ProductsPage = () => {
  return (
    <div>
      <Button variant="secondary" size={"icon"}>
        <HomeIcon />
      </Button>
    </div>
  );
};

export default ProductsPage;
