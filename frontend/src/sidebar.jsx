import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style/sidebar.css";
import ThemeToggle from "./colorMode";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // الحصول على المسار الحالي

  const [isSmall, setIsSmall] = useState(
    localStorage.getItem("isSmall") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isSmall", isSmall);
  }, [isSmall]);

  const handleNavigation = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className={`sidebar ${isSmall ? "small" : ""}`}>
      <div className="container">

      <button className="toggle-btn" onClick={() => setIsSmall(!isSmall)}>
        {isSmall ? (
          <i className="ri-arrow-right-wide-line"></i>
        ) : (
          <>
            <i className="ri-close-fill"></i>
          </>
        )}
      </button>

      <hr />

      <nav className="homeAndAdd">
        <button
          className={location.pathname === "/users" ? "active" : ""}
          onClick={() => handleNavigation("users")}
        >
          <i className="ri-home-fill"></i>
          {!isSmall && <span>Home</span>}
        </button>
        <button
          className={location.pathname === "/users/add" ? "active" : ""}
          onClick={() => handleNavigation("users/add")}
        >
          <i className="ri-user-add-fill"></i>
          {!isSmall && <span>Add User</span>}
        </button>
      </nav>
      </div>

      <div className="themeToggle">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
