import { Button } from "@/components/ui/button";
import { useDialog } from "@/hooks/useDialog";
import React from "react";

export const Heading = ({ total }) => {
  const { setIsOpen } = useDialog();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-bold text-muted-foreground text-3xl tracking-widest">
          Posts
        </h1>
        <p className="text-xs">
          Total Posts:{" "}
          <span className="font-semibold text-muted-foreground">{total}</span>
        </p>
      </div>
      <div>
        <Button size="sm" onClick={() => setIsOpen(true)}>
          Create Post
        </Button>
      </div>
    </div>
  );
};
