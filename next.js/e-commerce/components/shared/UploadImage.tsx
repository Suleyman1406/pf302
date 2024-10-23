import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";

type Props = {
  url: string;
  handleChange: (url: string) => void;
};

export const UploadSingleImage = ({ url, handleChange }: Props) => {
  if (url) {
    return (
      <div className="relative">
        <Image
          src={url}
          alt="Product"
          width={200}
          height={200}
          className="mx-auto"
        />
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="absolute right-0 top-0"
          onClick={() => handleChange("")}
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        if (res[0]) {
          handleChange(res[0].url);
        }
      }}
      onUploadError={(error: Error) => {
        console.error(error);
        toast.error("Something went wrong!");
      }}
    />
  );
};
