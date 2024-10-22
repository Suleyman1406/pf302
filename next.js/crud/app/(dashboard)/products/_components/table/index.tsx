import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import React from "react";
import { ProductModal } from "../modal";
import ProductDeleteAction from "../delete-action";
import Image from "next/image";

type Props = {
  products: Product[];
};

export const ProductTable = ({ products }: Props) => {
  return (
    <Table>
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Product ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="w-[120px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.id}</TableCell>
            <TableCell>
              <div className="w-full aspect-[16/9] relative">
                {product.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt="Product"
                    fill
                    className=""
                  />
                )}
              </div>
            </TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell className="text-right">${product.price}</TableCell>
            <TableCell className="justify-end flex gap-3">
              <ProductModal type="update" editedProduct={product} />
              <ProductDeleteAction id={product.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
