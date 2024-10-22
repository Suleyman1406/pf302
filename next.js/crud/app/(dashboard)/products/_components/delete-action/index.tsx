"use client";

import { Button } from "@/components/ui/button";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  id: string;
};
const ProductDeleteAction = ({ id }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      toast.success("Product deleted");
    } else {
      toast.error("Failed to delete product");
    }
    setIsLoading(false);
  }
  return (
    <div>
      <Menu as="div" className="relative ml-3">
        <Button asChild variant="outline" size="icon">
          <MenuButton className="">
            <Trash2Icon className="w-4 h-4" />
          </MenuButton>
        </Button>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in flex flex-col gap-y-1"
        >
          <MenuItem>
            <Button disabled={isLoading} size="sm" variant={"ghost"}>
              Cancel
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              disabled={isLoading}
              onClick={handleDelete}
              variant={"destructive"}
              size="sm"
            >
              Confirm
            </Button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default ProductDeleteAction;
