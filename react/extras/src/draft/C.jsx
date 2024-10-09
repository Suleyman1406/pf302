import React from "react";

const C = ({ getData }) => {
  console.log("C rendered");
  return <div>C</div>;
};

export default React.memo(C);
