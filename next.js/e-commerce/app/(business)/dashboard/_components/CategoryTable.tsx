import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@prisma/client";
import moment from "moment";
import React from "react";

type Props = {
  categories: Category[];
};

export const CategoryTable = ({ categories }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>
              {moment(category.createdAt).format("MMM Do YY")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
