"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const sortOptions = [
  {
    label: "Newest",
    value: "createdAt-desc",
  },
  {
    label: "Oldest",
    value: "createdAt-asc",
  },
  {
    label: "Price: Low to High",
    value: "price-asc",
  },
  {
    label: "Price: High to Low",
    value: "price-desc",
  },
];

export const LayoutHeader = () => {
  const searchParams = useSearchParams();
  const sortValue = searchParams.get("sort") ?? undefined;
  const pathname = usePathname();
  const router = useRouter();

  const handleSortChange = (value: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set("sort", value);
    const searchParamsStr = searchParams.toString();

    router.push(`${pathname}?${searchParamsStr}`);
  };

  return (
    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Products
      </h1>
      <Select defaultValue={sortValue} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[170px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
