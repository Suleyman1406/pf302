import React from "react";

export const PostsWrapper = ({ children }) => {
  return (
    <div className="flex flex-col gap-5 items-center pt-6">{children}</div>
  );
};
