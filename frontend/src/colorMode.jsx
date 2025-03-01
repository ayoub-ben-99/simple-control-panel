import { useState, useEffect } from "react";
import "./style/App.css"
function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark"; // الوضع المظلم هو الافتراضي
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.removeAttribute("data-theme"); // إزالة `data-theme` للوضع المظلم
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button onClick={toggleTheme} className="toggleThemeBtn">
      {theme === "dark" ? (
        <i className="ri-sun-fill"></i>
      ) : (
        <i className="ri-moon-fill"></i>
      )}
    </button>
  );
}

export default ThemeToggle;
