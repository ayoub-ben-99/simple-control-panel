import "./style/App.css";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const NavBar = ({onSearch}) => {
  const searchRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="navbar">
      <div className="navbar2">
        <div className="nameAndIcon">
          <h1>Control panel</h1>
          <span className="ri-gemini-fill animeStyle"></span>
        </div>

        <form onSubmit={handleSearch}>
          <input
            ref={searchRef}
            type="text"
            name="searchUser"
            placeholder="Search for a user"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch(e.target.value);
            }}
          />
          <label>Ctrl+k</label>
          <button type="submit">
            <i className="ri-search-2-line"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default NavBar;
