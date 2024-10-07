import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = ({ size = 16 }) => {
  return <ClipLoader size={size} />;
};

export default Spinner;
