import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@prisma/client";
import moment from "moment";
import React from "react";

type Props = {
  products: Product[];
};

export const ProductTable = ({ products }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.currency}</TableCell>
            <TableCell>{product.discount}</TableCell>
            <TableCell>
              {moment(product.createdAt).format("MMM Do YY")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
