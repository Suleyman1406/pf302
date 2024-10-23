"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { EProductModalType } from "@/types";
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
});

type Props = {
  type: EProductModalType;
};
export const ProductDialog = ({ type }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isCreate = type === EProductModalType.CREATE;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      description: "",
      imageUrl: "",
    },
  });
  const imageUrlValue = form.watch("imageUrl");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { ok, error } = await createProduct({ product: values });

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
          <DialogTitle>Are you absolutely sure?</DialogTitle>
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
              <DialogClose>
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
