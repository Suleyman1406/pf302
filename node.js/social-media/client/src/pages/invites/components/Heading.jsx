import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDialog } from "@/hooks/useDialog";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Heading = ({ total = 0 }) => {

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-bold text-muted-foreground text-3xl tracking-widest">
          Follow Requests
        </h1>
        <p className="text-xs">
          Result :{" "}
          <span className="font-semibold text-muted-foreground">{total}</span>
        </p>
      </div>
      {/* <div>
        <Input
          type="text"
          placeholder='Search users...'
          className='border shadow-lg '
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div> */}
    </div>
  );
};
