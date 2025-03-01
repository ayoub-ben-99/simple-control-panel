import "./style/App.css";
import NavBar from "./navBar.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../services/userService";
import { format } from "date-fns";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching users:", error);
        }
      }
    };
    fetchUsers();
    return () => controller.abort();
  }, []);

  // Search function to filter users by first name, last name, or email
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        `${user.firstName} ${user.lastName} ${user.email}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  // Toggle action menu
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".moreTable") &&
        !event.target.closest(".more")
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="homePage">
      <NavBar onSearch={handleSearch} />
      <div className="viewUsers p-5">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Country</th>
              <th>Age</th>
              <th>Last updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.gender}</td>
                  <td>{user.country}</td>
                  <td>{user.age}</td>
                  <td>{format(new Date(user.updatedAt), "MM-dd / HH:mm")}</td>
                  <td>
                    <button
                      className="more"
                      onClick={() => toggleMenu(user._id)}
                    >
                      <i className="ri-more-line"></i>
                    </button>
                    {openMenuId === user._id && (
                      <ul className="moreTable">
                        <li>
                          <a
                            onClick={() =>
                              navigate(`/users/update/${user._id}`)
                            }
                          >
                            <i className="ri-pencil-fill"></i> Edit
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => navigate(`/users/view/${user._id}`)}
                          >
                            <i className="ri-eye-fill"></i> View
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleDeleteUser(user._id)}>
                            <i className="ri-delete-bin-fill"></i> Delete
                          </a>
                        </li>
                      </ul>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  <i className="ri-error-warning-line"></i> No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUsers;
