import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { POST_COMMENT_QUERY_KEY } from "@/constants/query-keys";
import { createPostComment } from "@/services/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  comment: z.string().min(1),
});

export const CommentCreate = ({ postId }) => {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: createPostComment,
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({
        queryKey: [POST_COMMENT_QUERY_KEY, postId],
      });
    },
  });

  function onSubmit(values) {
    const content = values.comment;
    mutate({
      postId,
      content,
    });
  }
  return (
    <Form {...form}>
      <form
        className="flex items-center gap-1"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="mt-2"
                  disabled={isPending}
                  placeholder="Write your comment..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={isPending} variant="ghost" className="mt-2 px-2">
          <CheckIcon />
        </Button>
      </form>
    </Form>
  );
};
