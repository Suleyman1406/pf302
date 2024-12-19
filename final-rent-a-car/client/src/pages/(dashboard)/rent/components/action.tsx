import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { QUERY_KEYS } from "@/constants/query-keys";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { MAX_FILE_SIZE } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { paths } from "@/constants/paths";
import { RenderIf } from "@/components/shared/RenderIf";
import { Spinner } from "@/components/shared/Spinner";

const getFormSchema = (isEdit: boolean) =>
  z.object({
    name: z.string().min(2),
    description: z.string().min(2, "Description is required"),
    price: z
      .number({
        invalid_type_error: "Price must be a number",
        required_error: "Price is required",
      })
      .positive(),
    discount: z.number({
      invalid_type_error: "Discount must be a number",
      required_error: "Discount is required",
    }),

    categoryId: z.string().min(2, { message: "Category is required" }),
    fuel: z
      .number({
        invalid_type_error: "Fuel must be a number",
        required_error: "Fuel is required",
      })
      .positive(),
    gearBox: z.string().min(2),
    pickUpLocation: z.string().min(2),
    dropOffLocations: z.array(z.string().min(2)),
    capacity: z.number().positive(),
    showInRecommendation: z.boolean(),
    images: isEdit
      ? z.any().optional()
      : z
          .instanceof(FileList, { message: "Images are required" })
          .refine((list) => list.length > 2, "Minimum 3 files required")
          .refine((list) => list.length <= 5, "Maximum 5 files allowed")
          .transform((list) => Array.from(list))
          .refine(
            (files) => {
              const allowedTypes: { [key: string]: boolean } = {
                "image/jpeg": true,
                "image/png": true,
                "application/pdf": true,
                "application/msword": true,
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                  true,
              };
              return Array.from(files).every((file) => allowedTypes[file.type]);
            },
            {
              message:
                "Invalid file type. Allowed types: JPG, PNG, PDF, DOC, DOCX",
            }
          )
          .refine(
            (files) => {
              return Array.from(files).every(
                (file) => file.size <= MAX_FILE_SIZE
              );
            },
            {
              message: "File size should not exceed 5MB",
            }
          ),
  });

type Props = {
  type: "create" | "update";
};

const ActionForm = ({ type }: Props) => {
  const isEdit = type === "update";
  const { id } = useParams();

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Create Rent</h1>

      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Mercedes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fuel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuel</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="10"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange({
                          target: { value: parseFloat(e.target.value) },
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gearBox"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gear Box</FormLabel>
                  <FormControl>
                    <Input placeholder="Manual" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="100"
                      {...field}
                      onChange={(e) => {
                        field.onChange({
                          target: { value: parseFloat(e.target.value) },
                        });
                      }}
                    />
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
                    <Input
                      type="number"
                      placeholder="100"
                      {...field}
                      onChange={(e) => {
                        field.onChange({
                          target: { value: parseFloat(e.target.value) },
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="100"
                      {...field}
                      onChange={(e) => {
                        field.onChange({
                          target: { value: parseFloat(e.target.value) },
                        });
                      }}
                    />
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
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
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
              name="pickUpLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pick Up Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locationOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
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
              name="dropOffLocations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drop Off Locaitons</FormLabel>
                  <MultiSelect
                    options={locationOptions}
                    onValueChange={field.onChange}
                    // defaultValue={field.value}
                    value={field.value}
                    placeholder="Select Drop Off Locations"
                    variant="inverted"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Input
                      multiple
                      type="file"
                      onChange={(e) => {
                        field.onChange(e.target.files);
                      }}
                      accept="image/*"
                    />
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
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="showInRecommendation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 mt-5">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Show in recommendation</FormLabel>
                    <FormDescription>
                      Show this product in recommendation section
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <RenderIf
            condition={
              !!editItem?.images.length && !form.watch("images")?.length
            }
          >
            <h4>Existing Images</h4>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {editItem?.images.map((image: string) => (
                <img
                  src={image}
                  alt="Rent Image"
                  className="w-full object-cover rounded-lg"
                />
              ))}
            </div>
          </RenderIf>
          <div className="flex justify-end mt-4">
            <Button asChild variant="secondary">
              <Link to="/dashboard/rents" className="mr-2">
                Back
              </Link>
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form> */}
    </div>
  );
};

export default ActionForm;
