import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { createPost } from "@/services/posts";
import { POST_QUERY_KEY } from "@/constants/query-keys";
import { useRef } from "react";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Olmaz bele yazmaq, 3 herf!",
  }),
  content: z.string().min(10),
  tags: z.string(),
  image: z.instanceof(File, {
    message: "Image is required",
  }),
});

export const CreatePostDialog = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      image: null,
    },
  });
  const closeButtonRef = useRef(null);
  const { mutate, isPending, data } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      closeButtonRef.current.click();
      form.reset();
      queryClient.invalidateQueries({ queryKey: [POST_QUERY_KEY] });
    },
  });

  function onSubmit(values) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("tags", values.tags);
    formData.append("image", values.image);
    mutate(formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Create Post</Button>
      </DialogTrigger>
      <DialogContent className="w-[360px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
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
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
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
            <DialogClose asChild ref={closeButtonRef}>
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
