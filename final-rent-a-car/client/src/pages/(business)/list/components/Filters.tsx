import { Button } from "@/components/ui/button";
import { useMemo, useRef, useState } from "react";
import { FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import MultiRangeSlider from "@/components/shared/multi-range-slider";

type Filters = {
  label: string;
  options: {
    value: string;
    label: string;
    count?: number;
  }[];
}[];

export const Filters = () => {
  const [searchParams, setSearcParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filters: Filters = useMemo(
    () => [
      {
        label: "Category",
        options: [],
      },
      {
        label: "Capacity",
        options: [
          {
            value: "2",
            label: "2 Person",
          },
          {
            value: "4",
            label: "4 Person",
          },
          {
            value: "6",
            label: "6 Person",
          },
          {
            value: "8",
            label: "8 Person",
          },
        ],
      },
    ],
    []
  );

  function toggle() {
    setIsOpen(!isOpen);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleChange(type: string, option: string) {}

  function handleRangeChange(min: number, max: number) {}

  useOnClickOutside(ref, handleClose);

  return (
    <>
      <div
        ref={ref}
        className={cn(
          "p-8 bg-white w-[360px] h-[calc(100vh-94px)] md:h-[calc(100vh-128px)] overflow-auto fixed top-[94px] md:top-[128px] z-20 duration-200 pb-20",
          isOpen ? "left-0" : "-left-[360px] xl:left-0"
        )}
      >
        <div className="flex flex-col gap-y-8 lg:gap-y-14">
          {filters.map((filter) => (
            <div key={filter.label}>
              <h4 className="text-xs font-semibold tracking-[-0.24px] text-secondary mb-7 uppercase">
                {filter.label}
              </h4>
              <div className="flex flex-col gap-y-4 lg:gap-y-8">
                {filter.options.map((option) => (
                  <div key={option.value} className="flex gap-x-2 items-center">
                    <Checkbox
                      id={`${filter.label}-${option.value}`}
                      onClick={() => handleChange(filter.label, option.value)}
                      defaultChecked={searchParams
                        .getAll(filter.label.toLowerCase())
                        .includes(option.value)}
                      className="h-5 w-5"
                    />
                    <label
                      htmlFor={`${filter.label}-${option.value}`}
                      className="text-secondary text-lg lg:text-xl font-semibold leading-[150%] tracking-[-0.4px] cursor-pointer"
                    >
                      {option.label}{" "}
                      {option.count && (
                        <span className="text-secondary-300">
                          ({option.count})
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div>
            <h4 className="text-xs font-semibold tracking-[-0.24px] text-secondary mb-7 uppercase">
              Price
            </h4>
            <MultiRangeSlider min={0} max={1000} onChange={handleRangeChange} />
          </div>
        </div>
      </div>
      <Button
        variant={"outline"}
        onClick={toggle}
        className="xl:hidden w-fit ml-6 lg:ml-8 mt-4 -mb-4"
      >
        <FilterIcon className="text-primary" />
      </Button>
    </>
  );
};
