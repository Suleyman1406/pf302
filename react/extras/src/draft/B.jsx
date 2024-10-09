import React from "react";

const B = ({ products }) => {
  console.log("B rendered");
  return (
    <div>
      {products.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
};

export default React.memo(B);
