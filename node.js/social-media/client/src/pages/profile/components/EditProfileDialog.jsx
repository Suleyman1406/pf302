import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
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
import { useState } from 'react';
import { useEffect } from 'react';
import { editUser } from '@/services/users';
import { XIcon } from 'lucide-react';
import { toast } from 'react-toastify';


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  avatar: z.any().nullable(),
});

const EditProfileDialog = ({ user }) => {
  const [imagePreview, setImagePreview] = useState(user?.avatar);
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      avatar: user?.avatar,
    },
  });

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.avatar) formData.append("avatar", values.avatar);
    await editUser(formData);
    setIsOpen(false);
    toast.success("Profile updated successfully");
  }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Name..." defaultValue={user?.name} {...field} />
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
                  name="avatar"
                  render={() => (
                    <FormItem>
                      <FormLabel>Post Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              form.setValue("avatar", file);
                              form.clearErrors("avatar");
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  );
};

export default EditProfileDialog;