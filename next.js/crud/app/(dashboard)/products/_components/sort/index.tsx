"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const ProductSort = () => {
  const router = useRouter();

  function handleChange(value: string) {
    const searchParams = new URLSearchParams();
    searchParams.set("sort", value);
    router.push(`/products?${searchParams.toString()}`);
  }

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">
          <div className="flex gap-3">
            <ArrowUpIcon />
            Price
          </div>
        </SelectItem>
        <SelectItem value="desc">
          <div className="flex gap-3">
            <ArrowDownIcon />
            Price
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
