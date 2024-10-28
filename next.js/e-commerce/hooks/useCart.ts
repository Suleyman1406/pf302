import { create } from "zustand";

interface CartState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useCart = create<CartState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
