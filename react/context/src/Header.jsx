import React from "react";
import { useContext } from "react";
import { ThemeContext } from "./contexts/theme";

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 30px",
        backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
      }}
    >
      <h1>Header</h1>
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  );
};

export default Header;
