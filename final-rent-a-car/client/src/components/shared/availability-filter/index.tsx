import SwapIcon from "@/assets/icons/swap.svg";
import { Button } from "@/components/ui/button";
import React from "react";
import { CustomSelect } from "../Select";
import { SelectOption } from "@/types";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";

export const AvailabilityFilter = () => {
  return (
    <div className="grid lg:grid-cols-[1fr_60px_1fr] gap-x-5 lg:gap-x-7 xl:gap-x-[44px] items-center">
      <Card
        type="pickup"
        locationsOptions={[]}
        categoryOptions={[]}
        heading={
          <div className="flex items-center gap-x-2">
            <span className="inline-block w-4 h-4 border-4 border-[rgba(53,99,233,0.30)] rounded-full">
              <span className="block w-2 h-2 bg-primary rounded-full" />
            </span>
            <p className="text-secondary-500 font-semibold text-base leading-[20px] tracking-[-0.32px]">
              Pick - Up
            </p>
          </div>
        }
      />
      <Button
        onClick={() => {}}
        className={cn(
          "w-fit h-fit p-[18px] mx-auto -my-4 lg:my-0 z-10 transition-all duration-300"
          // rotate ? "rotate-180" : "rotate-0"
        )}
      >
        <img src={SwapIcon} alt="Swap" className="w-6 h-6" />
      </Button>
      <Card
        type="dropoff"
        locationsOptions={[]}
        categoryOptions={[]}
        heading={
          <div className="flex items-center gap-x-2">
            <span className="inline-block w-4 h-4 border-4 border-[rgba(53,99,233,0.30)] rounded-full">
              <span className="block w-2 h-2 bg-information rounded-full" />
            </span>
            <p className="text-secondary-500 font-semibold text-base leading-[20px] tracking-[-0.32px]">
              Drop - Off
            </p>
          </div>
        }
      />
    </div>
  );
};

const Card = ({
  locationsOptions,
  heading,
  type,
}: {
  locationsOptions: SelectOption[];
  categoryOptions: SelectOption[];
  heading: React.ReactNode;
  type: "pickup" | "dropoff";
}) => {
  return (
    <div className="bg-white rounded-[10px] h-[136px] w-full pt-4 lg:pt-6 pb-5 lg:pb-7 px-6 xl:px-12">
      {heading}
      <div className="mt-3 lg:mt-4 grid grid-cols-[1fr_1px_1fr] gap-x-2 md:gap-x-3  xl:gap-x-6">
        <CustomSelect
          value={null}
          onChange={(value) => {}}
          label="Locations"
          options={locationsOptions}
          placeholder="Select your city"
        />
        <div className="w-full h-full bg-[#c3d4e966]" />
        <div>
          <h5 className="text-secondary-500 text-base font-bold leading-[20px] tracking-[-0.32px] mb-1.5">
            Date
          </h5>
          <DatePicker
            hidePastDates
            defaultDate={null}
            onChange={(date) => {}}
          />
        </div>
      </div>
    </div>
  );
};
