import SwapIcon from "@/assets/icons/swap.svg";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { CustomSelect } from "../Select";
import { SelectOption } from "@/types";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import locationService from "@/services/location";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "@/constants/paths";

export const AvailabilityFilter = () => {
  const [rotate, setRotate] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const {data} = useQuery({
    queryKey: [QUERY_KEYS.LOCATIONS],
    queryFn: locationService.getAll
  })

  const locations = data?.data?.items.map(item=>({
    label: item.title,
    value: item._id
  })) || []

  function handleSwap(){
    setRotate(!rotate);
    const pickupLocation = searchParams.get("pickup_location");
    const dropoffLocation = searchParams.get("dropoff_location");
    

    if(dropoffLocation) searchParams.set("pickup_location", dropoffLocation );
    else searchParams.delete("pickup_location");
    if(pickupLocation)searchParams.set("dropoff_location", pickupLocation );
    else searchParams.delete("dropoff_location");
  
    setSearchParams(searchParams);
  }

  return (
    <div className="grid lg:grid-cols-[1fr_60px_1fr] gap-x-5 lg:gap-x-7 xl:gap-x-[44px] items-center">
      <Card
        type="pickup"
        locationsOptions={locations}
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
        onClick={handleSwap}
        className={cn(
          "w-fit h-fit p-[18px] mx-auto -my-4 lg:my-0 z-10 transition-all duration-300",
          rotate ? "rotate-180" : "rotate-0"
        )}
      >
        <img src={SwapIcon} alt="Swap" className="w-6 h-6" />
      </Button>
      <Card
        type="dropoff"
        locationsOptions={locations}
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
  heading: React.ReactNode;
  type: "pickup" | "dropoff";
}) => {
  const [searchParams,setSearchParams] = useSearchParams();
  const dropoffDate = searchParams.get("dropoff_date");
  const pickupDate = searchParams.get("pickup_date");
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();

  const disabledDates = type ==="pickup" ? {
    before: new Date(),
    after: dropoffDate ? new Date(dropoffDate) : undefined,
  }:{
    before: pickupDate ? new Date(pickupDate) : new Date(),
  }

  return (
    <div className="bg-white rounded-[10px] h-[136px] w-full pt-4 lg:pt-6 pb-5 lg:pb-7 px-6 xl:px-12">
      {heading}
      <div className="mt-3 lg:mt-4 grid grid-cols-[1fr_1px_1fr] gap-x-2 md:gap-x-3  xl:gap-x-6">
        <CustomSelect
          value={searchParams.get(`${type}_location`)}
          onChange={(value) => {
            searchParams.set(`${type}_location`,value);
            if(isHomePage){
              navigate(paths.LIST + "?" + searchParams.toString());
            }else{
              setSearchParams(searchParams);
            }
          }}
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
            disabledDates={disabledDates}
            defaultDate={searchParams.get(`${type}_date`)}
            onChange={(date) => {
              if(date){
                searchParams.set(`${type}_date`, date.toISOString());
                if(isHomePage){
                  navigate(paths.LIST + "?" + searchParams.toString());
                }else{
                  setSearchParams(searchParams);
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
