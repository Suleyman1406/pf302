import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, editPost } from "@/services/posts";
import { POST_QUERY_KEY } from "@/constants/query-keys";
import { MODAL_TYPE } from "@/constants";
import { useDialog } from "@/hooks/useDialog";
import { useEffect } from "react";
import { XIcon } from "lucide-react";

const getFormSchema = (isEdit) =>
  z.object({
    title: z.string().min(3, {
      message: "Olmaz bele yazmaq, 3 herf!",
    }),
    content: z.string().min(10),
    tags: z.string(),
    image: isEdit
      ? z.any().nullable()
      : z.instanceof(File, {
          message: "Image is required",
        }),
  });

export const PostActionDialog = () => {
  const { type, isOpen, setIsOpen, data } = useDialog();
  const [imagePreview, setImagePreview] = useState(null);
  const queryClient = useQueryClient();
  const isEdit = type === MODAL_TYPE.EDIT;

  const form = useForm({
    resolver: zodResolver(getFormSchema(isEdit)),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      image: null,
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: isEdit ? editPost : createPost,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: [POST_QUERY_KEY] });
    },
  });

  function onSubmit(values) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("tags", values.tags);
    if (values.image) formData.append("image", values.image);
    mutate(isEdit ? { id: data._id, data: formData } : { data: formData });
  }

  useEffect(() => {
    if (isOpen && isEdit) {
      form.setValue("title", data.title);
      form.setValue("content", data.content);
      form.setValue("tags", data.tags.join(","));
      setImagePreview(data.image);
    }
    if (!isOpen) {
      form.reset();
      setImagePreview(null);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[360px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Post" : "Create Post"}</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Type here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Content</FormLabel>
                  <FormControl>
                    <Input placeholder="Type here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="tag1,tag2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {imagePreview ? (
              <div className="relative h-24 w-fit mx-auto">
                <img src={imagePreview} alt="Post" className="h-full" />
                <XIcon
                  onClick={() => setImagePreview(null)}
                  className="absolute right-0 top-0 cursor-pointer text-destructive"
                />
              </div>
            ) : (
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Post Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            form.setValue("image", file);
                            form.clearErrors("image");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogClose asChild>
              <Button
                variant="secondary"
                className="mr-2"
                disabled={isPending}
                type="button"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
