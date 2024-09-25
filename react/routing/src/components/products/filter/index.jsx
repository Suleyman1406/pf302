import { Avatar, Box, Chip, Input, Option, Select } from "@mui/joy";
import React from "react";
import { useSearchParams } from "react-router-dom";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { useState } from "react";
import { useEffect } from "react";
import { getCreators } from "../../../service/creator";
import { useSelector } from "react-redux";
import { selectCreatorData } from "../../../redux/features/creatorsSlice";

let timeoutId = null;
const sortOptions = [
  { value: "name-asc", label: "Name", icon: <NorthIcon fontSize="12" /> },
  { value: "name-desc", label: "Name", icon: <SouthIcon fontSize="12" /> },
  { value: "price-asc", label: "Price", icon: <NorthIcon fontSize="12" /> },
  { value: "price-desc", label: "Price", icon: <SouthIcon fontSize="12" /> },
];
function renderValue(option) {
  if (!option) {
    return null;
  }

  return (
    <React.Fragment>
      <ListItemDecorator sx={{ mr: 3 }}>
        {sortOptions.find((o) => o.value === option.value)?.icon}
      </ListItemDecorator>
      {option.label}
    </React.Fragment>
  );
}

export const ProductsFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultSearchValue = searchParams.get("searchStr") || "";
  const defaultSortValue = searchParams.get("sort") || "";
  const defaultCreatorsValue = searchParams.get("creators") || "";
  const { items: creators } = useSelector(selectCreatorData);

  const handleSearch = (value) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (value) searchParams.set("searchStr", value);
      else searchParams.delete("searchStr");
      setSearchParams(searchParams);
    }, 400);
  };

  const handleSortChange = (value) => {
    if (value) searchParams.set("sort", value);
    else searchParams.delete("sort");
    setSearchParams(searchParams);
  };

  const handleCreatorChange = (value) => {
    const creators = value.join(",");
    if (creators) searchParams.set("creators", creators);
    else searchParams.delete("creators");
    setSearchParams(searchParams);
  };

  const creatorOptions = creators.map((creator) => {
    return {
      value: creator.id,
      label: creator.name,
      src: creator.profileImgPath,
    };
  });

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Input
            sx={{
              width: 350,
            }}
            defaultValue={defaultSearchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Write for search products"
          />
        </Box>
        <Select
          sx={{ width: 150 }}
          placeholder="Select Sort"
          renderValue={renderValue}
          onChange={(_, value) => handleSortChange(value)}
          defaultValue={defaultSortValue}
        >
          {sortOptions.map((option) => (
            <Option
              key={option.value}
              value={option.value}
              label={option.label}
            >
              <ListItemDecorator>{option.icon}</ListItemDecorator>
              {option.label}
            </Option>
          ))}
        </Select>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 4, mt: 2 }}>
        <Select
          multiple
          placeholder="Filter Creator"
          sx={{
            width: 350,
          }}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", gap: "0.25rem" }}>
              {selected.map((selectedOption, idx) => (
                <Chip key={idx} variant="soft" color="primary">
                  {selectedOption.label}
                </Chip>
              ))}
            </Box>
          )}
          onChange={(_, value) => handleCreatorChange(value)}
          defaultValue={defaultCreatorsValue.split(",")}
        >
          {creatorOptions.map((option) => (
            <Option
              key={option.value}
              value={option.value}
              label={option.label}
            >
              <ListItemDecorator>
                <Avatar size="sm" src={option.src} />
              </ListItemDecorator>
              {option.label}
            </Option>
          ))}
        </Select>
      </Box>
    </Box>
  );
};
