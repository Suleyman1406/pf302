"use client";

import { addToCart } from "@/actions/cart";
import { getCurrencySymbol } from "@/lib/utils";
import { Product } from "@prisma/client";
import { ImageOffIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { name, price, imageUrl, discount, currency, rate } = product;
  const discountedPrice = price - (price * discount) / 100;

  async function handleAddToCart() {
    const { ok, error } = await addToCart(product.id);

    if (ok) {
      toast.success("Product added to cart");
    } else {
      toast.error(error);
    }
  }

  return (
    <div className="relative  flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href="#"
      >
        {imageUrl ? (
          <Image
            className="object-cover mx-auto"
            src={imageUrl}
            alt="product image"
            width={200}
            height={300}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <ImageOffIcon />
          </div>
        )}
        {!!discount && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {discount}% OFF
          </span>
        )}
      </a>
      <div className="mt-4 px-5 pb-5">
        <div>
          <a href="#">
            <h5 className="text-xl tracking-tight text-slate-900 line-clamp-2">
              {name}
            </h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900">
                {discountedPrice} {getCurrencySymbol(currency)}
              </span>
              {!!discount && (
                <span className="text-sm text-slate-900 line-through">
                  {price} {getCurrencySymbol(currency)}
                </span>
              )}
            </p>
            <div className="flex items-center">
              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                {rate}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};
