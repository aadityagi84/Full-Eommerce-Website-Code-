import { useState, useEffect } from "react";
import "./toggle.css";

const DarkMode = () => {
  // Initialize theme based on localStorage value or default to "light"
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle theme handler
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save the theme in localStorage
  };

  useEffect(() => {
    // Apply theme class to body based on localStorage value
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`app ${theme}`}>
      <div className="toggle-container">
        <span>☀️</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"} // Ensure the checkbox reflects the current theme
          />
          <span className="slider"></span>
        </label>
        <span>🌙</span>
      </div>
    </div>
  );
};

export default DarkMode;
