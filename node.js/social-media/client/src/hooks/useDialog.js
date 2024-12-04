import { MODAL_TYPE } from "@/constants";
import { create } from "zustand";

export const useDialog = create((set) => ({
  isOpen: false,
  data: null,
  type: MODAL_TYPE.CREATE,
  setIsOpen: (isOpen, type = MODAL_TYPE.CREATE, data = null) =>
    set({ isOpen, type, data }),
}));
