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
import { createCategory } from "@/actions/category";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

type Props = {
  type: EModalType;
};
export const CategoryDialog = ({ type }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isCreate = type === EModalType.CREATE;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { ok, error } = await createCategory(values);
    if (!ok) {
      return toast.error(error);
    }

    toast.success("Category created successfully");
    form.reset();
    setIsDialogOpen(false);
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-800">
          {isCreate && (
            <>
              <PlusIcon /> Add Category
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isCreate ? "Create Category" : "Update Category"}
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
            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant={"secondary"} type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {isCreate ? "Create Category" : "Update Category"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
