import NavBar from "./navBar";
import "./style/addUser.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddOrEditUser = () => {
  const { id } = useParams();
  console.log(`ID : ${id}`);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    age: "",
    country: "",
    gender: "",
  });

useEffect(() => {
  if (!id) return;

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/view/${id}`);
      if (!response.ok) throw new Error("User not found");

      const userData = await response.json();
      console.log("Fetched user data:", userData); // ✅ تحقق من البيانات هنا

      setFormData((prevData) => ({ ...prevData, ...userData }));
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("User not found!");
      navigate("/");
    }
  };

  fetchUser();
}, [id, navigate]);


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


const handleSubmit = async (e) => {
  e.preventDefault();

if (
  Object.values(formData).some(
    (value) => typeof value === "string" && value.trim() === ""
  )
) {
  alert("Please fill in all required fields.");
  return;
}

  console.log("Submitting data:", formData); // ✅ تحقق من البيانات قبل الإرسال

  try {
    const url = `http://localhost:5000/users/${id ? `update/${id}` : "add"}`;
    const method = id ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log("Server response:", result); // ✅ تحقق من الرد القادم من السيرفر

    if (response.ok) {
      alert(id ? "User updated successfully!" : "User added successfully!");
      navigate("/");
    } else {
      alert(result.message || "Failed to save user.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert(`Error: ${error.message}`);
  }
};


  return (
    <div className="pageAddUser">
      <NavBar />
      <div className="addUser">
        <form
          className="col-md-6"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="inputs">
            {[
              { name: "firstName", placeholder: "First Name", type: "text" },
              { name: "lastName", placeholder: "Last Name", type: "text" },
              { name: "email", placeholder: "Email", type: "email" },
              { name: "telephone", placeholder: "Telephone", type: "tel" },
              { name: "age", placeholder: "Age", type: "number" },
              { name: "country", placeholder: "Country", type: "text" },
            ].map((input) => (
              <div className="inputGroup" key={input.name}>
                <input
                  id={input.name}
                  name={input.name}
                  placeholder={`Enter your ${input.placeholder}`}
                  type={input.type}
                  value={formData[input.name]}
                  onChange={handleChange}
                  required
                />
                <label htmlFor={input.name}>{input.placeholder}</label>
              </div>
            ))}

            <div className="inputGroup">
              <select
                id="inputGender"
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" hidden disabled>
                  Choose here...
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label htmlFor="inputGender">Gender</label>
            </div>
          </div>

          <button type="submit">{id ? "Update User" : "Add User"}</button>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditUser;
