import { Cart, CartItem, Product } from "@prisma/client";

export enum EModalType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

export type CartWithCartItemWithProduct = Cart & {
  cartItems: CartItemWithProduct[];
};

export type CartItemWithProduct = CartItem & {
  product: Product;
};
