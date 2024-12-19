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
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserId } from "@/lib/utils";
import { QUERY_KEYS } from "@/constants/query-keys";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
});

export const CreateConversation = () => {
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     email: user?.email || "",
  //     name: user?.name ? `${user?.name} ${user?.surname}` : "",
  //   },
  // });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // mutate({
    //   userEmail: data.email,
    //   userName: data.name,
    //   userId,
    // });
  }
  return (
    <div>
      <h1 className="text-muted-foreground text-2xl font-semibold mt-3">
        Need help? Start a conversation.
      </h1>
      <p className="my-3 text-primary">
        Fill out the form below for starting a conversation with our support
      </p>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input disabled={!!user} placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={!!user}
                    placeholder="name@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            Start Conversation
          </Button>
        </form>
      </Form> */}
    </div>
  );
};
