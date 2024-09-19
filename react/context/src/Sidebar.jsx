import React from "react";
import { useContext } from "react";
import { ThemeContext } from "./contexts/theme";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
        padding: "20px",
      }}
    >
      Sidebar
    </div>
  );
};

export default Sidebar;
