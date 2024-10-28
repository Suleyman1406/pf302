"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { EModalType } from "@/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadSingleImage } from "@/components/shared/UploadImage";
import { createProduct } from "@/actions/product";
import { toast } from "sonner";
import { Category } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  price: z.preprocess((a) => parseFloat(z.any().parse(a)), z.number()),
  quantity: z.preprocess(
    (a) => parseInt(z.any().parse(a), 10),
    z.number().gte(0)
  ),
  description: z.string().min(2).max(500),
  imageUrl: z.string().min(1, {
    message: "Please upload an image",
  }),
  categoryId: z.string().min(1, {
    message: "Please select a category",
  }),
});

type Props = {
  type: EModalType;
  categories: Category[];
};
export const ProductDialog = ({ type, categories }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isCreate = type === EModalType.CREATE;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      description: "",
      imageUrl: "",
      categoryId: "",
    },
  });
  const imageUrlValue = form.watch("imageUrl");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { ok, error } = await createProduct(values);
    if (!ok) {
      return toast.error(error);
    }
    toast.success("Product created successfully");
    form.reset();
    setIsDialogOpen(false);
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-800">
          {isCreate && (
            <>
              <PlusIcon /> Add Product
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isCreate ? "Create Product" : "Update Product"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <UploadSingleImage
                    url={imageUrlValue}
                    handleChange={(url) => {
                      if (url) {
                        form.clearErrors("imageUrl");
                      }
                      form.setValue("imageUrl", url);
                    }}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant={"secondary"} type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {isCreate ? "Create Product" : "Update Product"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
