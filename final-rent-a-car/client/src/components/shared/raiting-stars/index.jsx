import React from "react";
import ReactStars from "react-rating-stars-component";

export const RaitingStars = ({ value, onChange }) => {
  return (
    <ReactStars
      count={5}
      value={value}
      onChange={onChange}
      size={28}
      activeColor="#ffd700"
    />
  );
};
