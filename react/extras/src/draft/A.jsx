import React, { memo } from "react";

const A = ({ count }) => {
  console.log("A rendered");
  return <div>A {count}</div>;
};

export default memo(A);
