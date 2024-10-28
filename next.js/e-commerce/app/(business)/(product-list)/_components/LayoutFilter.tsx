"use client";

import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  categories: Category[];
};
export const LayoutFilter = ({ categories }: Props) => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const filters = [
    {
      type: "category",
      name: "Category",
      options: categories.map((category) => ({
        value: category.id,
        label: category.name,
        defaultChecked: searchParams.getAll("category").includes(category.id),
      })),
    },
  ];

  function handleFilterChange(type: string, value: string, checked: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.append(type, value);
    } else {
      params.delete(type, value);
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          key={section.type}
          as="div"
          className="border-b border-gray-200 py-6"
        >
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
              <span className="ml-6 flex items-center">
                <PlusIcon
                  aria-hidden="true"
                  className="h-5 w-5 group-data-[open]:hidden"
                />
                <MinusIcon
                  aria-hidden="true"
                  className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    defaultValue={option.value}
                    defaultChecked={option.defaultChecked}
                    id={`filter-${section.type}-${optionIdx}`}
                    name={`${section.type}[]`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={(e) =>
                      handleFilterChange(
                        section.type,
                        option.value,
                        e.target.checked
                      )
                    }
                  />
                  <label
                    htmlFor={`filter-${section.type}-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </form>
  );
};
