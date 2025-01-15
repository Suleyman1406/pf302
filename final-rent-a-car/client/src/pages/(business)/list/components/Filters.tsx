import { Button } from "@/components/ui/button";
import { useMemo, useRef, useState } from "react";
import { FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import MultiRangeSlider from "@/components/shared/multi-range-slider";
import { QUERY_KEYS } from "@/constants/query-keys";
import categoryService from "@/services/category";

type Filters = {
  label: string;
  options: {
    value: string;
    label: string;
    count?: number;
  }[];
}[];

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: categoryService.getAll,
  });
  const categoryOptions = data?.data?.items.map((category) => ({
    value: category._id,
    label: category.title,
    count: category.rents.length,
  }));

  const filters: Filters = useMemo(
    () => [
      {
        label: "category",
        options: categoryOptions ?? [],
      },
      {
        label: "capacity",
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
    [categoryOptions]
  );

  function toggle() {
    setIsOpen(!isOpen);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleChange(type: string, option: string) {
    const params = searchParams.getAll(type);
    const paramIndex = params.indexOf(option);
    if (paramIndex !== -1) {
      params.splice(paramIndex, 1);
    } else {
      params.push(option);
    }
    searchParams.delete(type);
    params.forEach((param) => {
      searchParams.append(type, param);
    });

    setSearchParams(searchParams);
  }

  function handleRangeChange(min: number, max: number) {
    searchParams.delete("minPrice");
    searchParams.delete("maxPrice");
    if (min !== 0) searchParams.set("minPrice", min.toString());
    if (max !== 1000) searchParams.set("maxPrice", max.toString());
    setSearchParams(searchParams);
  }

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
                      onClick={() => {
                        handleChange(filter.label, option.value);
                      }}
                      defaultChecked={searchParams
                        .getAll(filter.label)
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
            <MultiRangeSlider
              min={0}
              max={1000}
              minimumValue={
                searchParams.get("minPrice")
                  ? parseInt(searchParams.get("minPrice") as string)
                  : null
              }
              maximumValue={
                searchParams.get("maxPrice")
                  ? parseInt(searchParams.get("maxPrice") as string)
                  : null
              }
              onChange={handleRangeChange}
            />
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
