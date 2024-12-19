import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { RenderIf } from "@/components/shared/RenderIf";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";
import { Location } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { Spinner } from "@/components/shared/Spinner";
import { paths } from "@/constants/paths";
import { toast } from "sonner";

const FormSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  phoneNumber: z.string().min(1, {
    message: "Phone number is required",
  }),
  address: z.string().min(4, {
    message: "Address must be at least 4 characters.",
  }),
  city: z.string().min(4, {
    message: "City must be at least 4 characters.",
  }),
  pickUpLocation: z.string().min(1, {
    message: "Pick up location is required",
  }),
  dropOffLocation: z.string().min(1, {
    message: "Drop off location is required",
  }),
  pickUpDate: z.string().min(1, {
    message: "Pick up date is required",
  }),

  dropOffDate: z.string().min(1, {
    message: "Drop off date is required",
  }),
  newsLetter: z.literal<boolean>(true, {
    message: "You must agree to receive newsletter",
  }),
  termsConditions: z.literal<boolean>(true, {
    message: "You must agree to terms and conditions",
  }),
});

type FormType = UseFormReturn<z.infer<typeof FormSchema>>;

export const Steps = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
      city: "",
      pickUpLocation: "",
      dropOffLocation: "",
      pickUpDate: "",
      dropOffDate: "",
      newsLetter: false,
      termsConditions: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const payload = {
      rentId: id!,
      startDate: data.pickUpDate,
      endDate: data.dropOffDate,
      billingName: data.name,
      billingPhoneNumber: data.phoneNumber,
      billingAddress: data.address,
      billingTownCity: data.city,
      dropOffLocation: data.dropOffLocation,
      pickUpLocation: data.pickUpLocation,
    };
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col lg:gap-y-8 gap-y-6 lg:order-none order-1"
      >
        <BillingStep form={form} />
        <RentalStep form={form} />
        <ConfirmationStep pending={false} form={form} />
      </form>
    </Form>
  );
};

const BillingStep = ({ form }: { form: FormType }) => {
  return (
    <div className="rounded-[10px] bg-white w-full lg:p-6 p-4">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-lg lg:text-xl font-bold leading-[150%] tracking-[-0.6px] text-secondary-500">
            Billing Info
          </h3>
          <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6">
            Please enter your billing info
          </p>
        </div>
        <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6">
          Step 1 of 3
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 lg:gap-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry="US"
                  international
                  placeholder="Your number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Your address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Town / City</FormLabel>
              <FormControl>
                <Input placeholder="Town or city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

const RentalStep = ({ form }: { form: FormType }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="rounded-[10px] bg-white w-full lg:p-6 p-4">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-lg lg:text-xl font-bold leading-[150%] tracking-[-0.6px] text-secondary-500">
            Rental Info
          </h3>
          <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6">
            Please select your rental date
          </p>
        </div>
        <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6">
          Step 2 of 3
        </p>
      </div>
      <div className="flex items-center gap-x-2 mb-4 lg:mb-6">
        <span className="inline-block w-4 h-4 border-4 border-[rgba(53,99,233,0.30)] rounded-full">
          <span className="block w-2 h-2 bg-primary rounded-full" />
        </span>
        <p className="text-secondary-500 font-semibold text-base leading-[20px] tracking-[-0.32px] ">
          Pick - Up
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 lg:gap-y-6">
        <FormField
          control={form.control}
          name="pickUpLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* <SelectItem value={pickupLocation._id} disabled>
                    {pickupLocation.name}
                  </SelectItem> */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pickUpDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <DatePicker
                hidePastDates
                variant="secondary"
                onChange={(date) => field.onChange(date?.toISOString() || "")}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex items-center gap-x-2 mb-4 lg:mb-6 mt-8">
        <span className="inline-block w-4 h-4 border-4 border-[rgba(53,99,233,0.30)] rounded-full">
          <span className="block w-2 h-2 bg-information rounded-full" />
        </span>
        <p className="text-secondary-500 font-semibold text-base leading-[20px] tracking-[-0.32px] ">
          Drop - Off
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 lg:gap-y-6">
        <FormField
          control={form.control}
          name="dropOffLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* <RenderIf condition={possibleDropOffLocations.length === 0}>
                    <SelectItem value="-" disabled>
                      No drop off locations available
                    </SelectItem>
                  </RenderIf> */}
                  {/* {possibleDropOffLocations.map((location) => (
                    <SelectItem key={location._id} value={location._id}>
                      {location.name}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dropOffDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <DatePicker
                hidePastDates
                variant="secondary"
                onChange={(date) => field.onChange(date?.toISOString() || "")}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

const ConfirmationStep = ({
  form,
  pending,
}: {
  form: FormType;
  pending: boolean;
}) => {
  const errors = form.formState.errors;

  return (
    <div className="rounded-[10px] bg-white w-full lg:p-6 p-4">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-lg lg:text-xl font-bold leading-[150%] tracking-[-0.6px] text-secondary-500">
            Confirmation
          </h3>
          <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6">
            We are getting to the end. Just few clicks and your rental is ready!
          </p>
        </div>
        <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6">
          Step 3 of 3
        </p>
      </div>
      <FormField
        control={form.control}
        name="newsLetter"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-5 space-y-0 rounded-[10px] bg-[#F6F7F9] p-4 lg:px-8 ">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="leading-none">
              <FormLabel
                className={cn(
                  "cursor-pointer",
                  errors.newsLetter && "text-red-500"
                )}
              >
                I agree with sending an Marketing and newsletter emails. No
                spam, promissed!
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="termsConditions"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-5 space-y-0 rounded-[10px] bg-[#F6F7F9] p-4 lg:px-8 mt-6">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="leading-none">
              <FormLabel
                className={cn(
                  "cursor-pointer",
                  errors.termsConditions && "text-red-500"
                )}
              >
                I agree with our terms and conditions and privacy policy.
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
      <Button disabled={pending} className="lg:mt-8 mt-6">
        <RenderIf condition={pending}>
          <Spinner />
        </RenderIf>
        Rent Now
      </Button>
    </div>
  );
};
