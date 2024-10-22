"use client";
import React, { useEffect, useState } from "react";

const HomeTabs = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 4) {
      throw new Error("Count is greater than 4");
    }
  }, [count]);
  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
      <p>Count: {count}</p>
    </div>
  );
};

export default HomeTabs;
