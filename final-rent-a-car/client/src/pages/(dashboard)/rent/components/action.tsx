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
import locationService from "@/services/location";
import categoryService from "@/services/category";
import rentService from "@/services/rent";
import { AxiosResponseError } from "@/types";

const getFormSchema = (isEdit: boolean) =>
  z.object({
    title: z.string().min(2),
    description: z.string().min(2, "Description is required"),
    price: z
      .number({
        invalid_type_error: "Price must be a number",
        required_error: "Price is required",
      })
      .positive(),
    discountPrice: z
      .number({
        invalid_type_error: "Discounted Price must be a number",
        required_error: "Discounted Price is required",
      })
      .nullable(),
    category: z.string().min(2, { message: "Category is required" }),
    fuel: z
      .number({
        invalid_type_error: "Fuel must be a number",
        required_error: "Fuel is required",
      })
      .positive(),
    gear: z.string().min(2),
    pickUpLocations: z.array(z.string().min(2)),
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
          // .refine(
          //   (files) => {
          //     const allowedTypes: { [key: string]: boolean } = {
          //       "image/jpeg": true,
          //       "image/png": true,
          //       "image/*": true,
          //     };
          //     return Array.from(files).every((file) => allowedTypes[file.type]);
          //   },
          //   {
          //     message: "Invalid file type. Allowed types: JPG, PNG",
          //   }
          // )
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

const onError = (error: AxiosResponseError) => {
  console.log(error);

  toast.error(error.response?.data.message ?? "Something went wrong");
};

const ActionForm = ({ type }: Props) => {
  const isEdit = type === "update";
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_RENT_BY_ID, id],
    queryFn: () => rentService.getById({ id: id! }),
    enabled: isEdit,
  });

  const editItem = data?.data.item || null;

  const { mutate: mutateCreate } = useMutation({
    mutationFn: rentService.create,
    onSuccess: () => {
      toast.success("Rent created successfully");
      navigate(paths.DASHBOARD.RENTS.LIST);
    },
    onError,
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: rentService.edit,
    onSuccess: () => {
      toast.success("Rent edited successfully");
      navigate(paths.DASHBOARD.RENTS.LIST);
    },
    onError,
  });
  const { data: locationData } = useQuery({
    queryKey: [QUERY_KEYS.LOCATIONS],
    queryFn: locationService.getAll,
  });
  const { data: categoryData } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: categoryService.getAll,
  });

  const locationOptions = useMemo(() => {
    if (!locationData?.data.items) return [];

    return locationData.data.items.map((item) => ({
      value: item._id,
      label: item.title,
    }));
  }, [locationData]);
  const categoryOptions = useMemo(() => {
    if (!categoryData?.data.items) return [];

    return categoryData.data.items.map((item) => ({
      value: item._id,
      label: item.title,
    }));
  }, [categoryData]);

  const formSchema = useMemo(() => getFormSchema(isEdit), [isEdit]);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      discountPrice: null,
      category: "",
      fuel: 0,
      gear: "",
      pickUpLocations: [],
      dropOffLocations: [],
      capacity: 0,
      showInRecommendation: false,
      images: [],
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (editItem) {
      form.setValue("title", editItem.title);
      form.setValue("description", editItem.description);
      form.setValue("price", editItem.price);
      form.setValue("discountPrice", editItem.discountPrice);
      form.setValue("category", editItem.category._id);
      form.setValue("fuel", +editItem.fuel);
      form.setValue("gear", editItem.gear);
      form.setValue(
        "pickUpLocations",
        editItem.pickUpLocations.map((item) => item._id)
      );
      form.setValue(
        "dropOffLocations",
        editItem.dropOffLocations.map((item) => item._id)
      );
      form.setValue("capacity", editItem.capacity);
      form.setValue("showInRecommendation", editItem.showInRecommendation);
    }
  }, [editItem]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      title: values.title,
      description: values.description,
      price: values.price,
      discountPrice: values.discountPrice,
      category: values.category,
      fuel: values.fuel,
      gear: values.gear,
      pickUpLocations: values.pickUpLocations,
      dropOffLocations: values.dropOffLocations,
      capacity: values.capacity,
      showInRecommendation: values.showInRecommendation,
      images: values.images,
    };
    console.log(values.images);

    if (type === "create") {
      mutateCreate(data);
    } else {
      mutateUpdate({
        id: id!,
        data,
      });
    }
  }

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Create Rent</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
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
              name="gear"
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
                      step={0.01}
                      onChange={(e) => {
                        field.onChange({
                          target: {
                            value: e.target.value
                              ? parseFloat(e.target.value)
                              : "",
                          },
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
              name="discountPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discounted Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="100"
                      {...field}
                      value={field.value || ""}
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
              name="category"
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
              name="pickUpLocations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pick Up Locaitons</FormLabel>
                  <MultiSelect
                    options={locationOptions}
                    onValueChange={field.onChange}
                    // defaultValue={field.value}
                    value={field.value}
                    placeholder="Select Pick Up Locations"
                    variant="inverted"
                  />
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
              !!editItem?.imageUrls.length && !form.watch("images")?.length
            }
          >
            <h4>Existing Images</h4>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {editItem?.imageUrls.map((image: string) => (
                <img
                  src={image}
                  alt="Rent Image"
                  className="w-full object-co ver rounded-lg"
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
      </Form>
    </div>
  );
};

export default ActionForm;
