import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    
  });
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/addUser",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    
  
      setFormData(response.data);
      if (response.data.success) {
    
        setShowAlert(true);
    
        setTimeout(() => {
          navigate("/");
        }, 2000); 
      }
      // if (formData.role === "admin") {
      //   navigate("/admin");
      // } else {
      //   navigate("/home");
      // }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
 
  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Create an account</h2>

      <div className="form-group">
        <label htmlFor="username">Your Name</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div className="roles-container">
      <label htmlFor="role">Role</label>
      <div className="form-group">
        <label >
          <input
            type="checkbox"
            name="role"
            value="admin"
            checked={formData.role === "admin"}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.checked ? "admin" : "user" })
            }
          />{" "}
          Admin
        </label>
        <label>
          <input
            type="checkbox"
            name="role"
            value="user"
            checked={formData.role === "user"}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.checked ? "user" : "admin" })
            }
          />{" "}
          User
        </label>
      </div>
</div>
      <button type="submit" className="submit-btn" onClick={handleLoginClick}>
        Register
      </button>

      {showAlert && (
        <div className="alert" >
          Registered successfully! Redirecting to login page...
        </div>
      )}
      <p className="login-link">
        Have already an account?{" "}
        <span className="login" onClick={handleLoginClick} >
          Login here
        </span>
      </p>
    </form>
  );
};

export default RegistrationForm;
