import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDialog } from "@/hooks/useDialog";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Heading = ({ total = 0 }) => {
  console.log("total", total);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === '') {
        setSearchParams({});
        return;
      }
      setSearchParams({ search: search });
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);


  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-bold text-muted-foreground text-3xl tracking-widest">
          Search Users
        </h1>
        <p className="text-xs">
          Result :{" "}
          <span className="font-semibold text-muted-foreground">{total}</span>
        </p>
      </div>
      <div>
        <Input
          type="text"
          placeholder='Search users...'
          className='border shadow-lg '
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};
