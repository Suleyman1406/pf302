import React from "react";
import { useContext } from "react";
import { ThemeContext } from "./contexts/theme";

const Content = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        width: "calc(100% - 200px)",
        height: "100vh",
        padding: "20px",
        backgroundColor: theme === "light" ? "#cfd4d3" : "#34423f", // Change this to #34423f
        color: theme === "light" ? "black" : "white", // "white"
      }}
    >
      Content
    </div>
  );
};

export default Content;
